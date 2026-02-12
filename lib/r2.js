import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

function must(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name} in env`)
  return v
}

const R2_ENDPOINT = must('R2_ENDPOINT')
const R2_BUCKET = must('R2_BUCKET')
const R2_ACCESS_KEY_ID = must('R2_ACCESS_KEY_ID')
const R2_SECRET_ACCESS_KEY = must('R2_SECRET_ACCESS_KEY')

export const r2 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

/*
  ✅ FIXED VERSION
  DO NOT bind ContentType in the signature.
  This prevents SignatureDoesNotMatch errors.
*/
export async function getPresignedPutUrl({ key }) {
  const cmd = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
  })

  return getSignedUrl(r2, cmd, { expiresIn: 600 })
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (c) => chunks.push(c))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

export async function r2GetObjectBuffer(key) {
  const out = await r2.send(
    new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    })
  )

  if (!out?.Body) {
    throw new Error('R2 GetObject returned empty body')
  }

  return streamToBuffer(out.Body)
}

/*
  PUBLIC upload helper
*/
export async function r2PutObjectPublic({ key, body, contentType, cacheControl }) {
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType || 'image/jpeg',
      CacheControl: cacheControl || 'public, max-age=31536000, immutable',
    })
  )

  // NOTE:
  // R2 S3 endpoint is NOT a public CDN URL.
  // You should ideally serve via your API or Cloudflare custom domain.
  return `https://${R2_BUCKET}.${R2_ENDPOINT.replace('https://', '')}/${key}`
}
