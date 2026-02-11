import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const { R2_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env

if (!R2_ENDPOINT) throw new Error('Missing R2_ENDPOINT')
if (!R2_BUCKET) throw new Error('Missing R2_BUCKET')
if (!R2_ACCESS_KEY_ID) throw new Error('Missing R2_ACCESS_KEY_ID')
if (!R2_SECRET_ACCESS_KEY) throw new Error('Missing R2_SECRET_ACCESS_KEY')

export const r2 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT, // account endpoint
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

export async function getPresignedPutUrl({ key, contentType }) {
  const cmd = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    ContentType: contentType,
  })
  return getSignedUrl(r2, cmd, { expiresIn: 60 * 10 })
}

async function streamToBuffer(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks)
}

export async function getObjectBuffer(key) {
  const out = await r2.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }))
  if (!out?.Body) throw new Error('R2 getObject returned empty Body')
  return streamToBuffer(out.Body)
}

export async function putObjectBuffer({ key, buffer, contentType }) {
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )
  return key
}
