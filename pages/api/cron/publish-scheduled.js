import { supabaseAdmin } from "../../../lib/supabaseAdmin"

export default async function handler(req,res){

 const now = new Date().toISOString()

 const { data } = await supabaseAdmin
  .from("scheduled_posts")
  .select("*")
  .eq("status","pending")
  .lte("run_at", now)

 for(const post of data){

   // call facebook/instagram/pinterest autopost again

   await supabaseAdmin
     .from("scheduled_posts")
     .update({ status:"done" })
     .eq("id",post.id)

 }

 res.json({ ok:true })
}