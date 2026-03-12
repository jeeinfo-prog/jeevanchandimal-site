export default function handler(req, res) {
  res.setHeader('WWW-Authenticate', 'Basic realm="Admin Dashboard"')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  return res.status(401).end()
}