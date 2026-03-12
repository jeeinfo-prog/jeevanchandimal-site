export default function handler(req, res) {

  res.setHeader('WWW-Authenticate','Basic realm="Admin Dashboard"')

  res.status(401).send('Logged out')

}