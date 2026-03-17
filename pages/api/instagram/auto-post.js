export default async function handler(req,res){

 return res.status(200).json({
  skipped:true,
  reason:"Instagram autopost not configured yet"
 })

}