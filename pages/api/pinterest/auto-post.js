export default async function handler(req,res){

 return res.status(200).json({
  skipped:true,
  reason:"Pinterest autopost not configured yet"
 })

}