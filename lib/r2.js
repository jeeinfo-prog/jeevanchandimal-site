import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// --- Validate envs (fail fast on server startup) ---
const required = ['R2_ENDPOINT', 'R2_BUCKET', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY']
for (const k of required) {
  if (!process.env[k]) {
    throw new Error(`Missing ${k} in .env.local`)
  }
}

export const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT, // e.g. https://<accountid>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

/**
 * Presigned PUT (browser uploads directly to R2)
 * expiresInSeconds default 5 minutes
 */
export async function getPresignedPutUrl({
  key,
  contentType = 'application/octet-stream',
  expiresInSeconds = 60 * 5,
}) {
  const cmd = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ContentType: contentType,
  })

  return await getSignedUrl(r2, cmd, { expiresIn: expiresInSeconds })
}

/**
 * HEAD object (verify it exists + get metadata)
 */
export async function headObject(key) {
  return await r2.send(
    new HeadObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
    })
  )
}

/**
 * Presigned GET (optional usage)
 * Good when you want the client to download directly for a short time.
 */
export async function getPresignedGetUrl({ key, expiresInSeconds = 60 }) {
  const cmd = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
  })

  return await getSignedUrl(r2, cmd, { expiresIn: expiresInSeconds })
}

/**
 * Get object as stream (best for secure download API)
 * Returns: { Body, ContentType, ContentLength, ETag, ... }
 */
export async function getObjectStream(key) {
  return await r2.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
    })
  )
}
