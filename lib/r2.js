import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const {
  R2_ENDPOINT,
  R2_BUCKET,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
} = process.env

if (!R2_ENDPOINT) throw new Error('Missing R2_ENDPOINT')
if (!R2_BUCKET) throw new Error('Missing R2_BUCKET')
if (!R2_ACCESS_KEY_ID) throw new Error('Missing R2_ACCESS_KEY_ID')
if (!R2_SECRET_ACCESS_KEY) throw new Error('Missing R2_SECRET_ACCESS_KEY')

const client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT, // ⚠️ account-level endpoint ONLY
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

export async function getPresignedPutUrl({ key, contentType }) {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET, // bucket goes HERE
    Key: key,
    ContentType: contentType,
  })

  return getSignedUrl(client, command, { expiresIn: 60 * 10 })
}
