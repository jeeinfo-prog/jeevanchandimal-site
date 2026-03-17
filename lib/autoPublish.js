import { generateCaption } from "./aiCaptionGenerator"

async function safeJson(resp){
 const text = await resp.text()
 try { return JSON.parse(text) } catch { return {} }
}

export async function runAutoPublishing({
 siteBase,
 photoId,
 previewUrl,
 storeUrl,
 title,
 description
}){

 const caption = generateCaption({title,description,storeUrl})

 const results = {}

 /* FACEBOOK */

 try{

  const r = await fetch(`${siteBase}/api/facebook/auto-post`,{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
    "x-autopost-secret":process.env.FACEBOOK_AUTOPOST_SECRET || ""
   },
   body:JSON.stringify({
    message:caption,
    photoUrl:previewUrl
   })
  })

  results.facebook = await safeJson(r)

 }catch(e){
  results.facebook = { ok:false, error:e.message }
 }

 /* INSTAGRAM */

 try{

  const r = await fetch(`${siteBase}/api/instagram/auto-post`,{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify({
    imageUrl:previewUrl,
    caption
   })
  })

  results.instagram = await safeJson(r)

 }catch(e){
  results.instagram = { ok:false, error:e.message }
 }

 /* PINTEREST */

 try{

  const r = await fetch(`${siteBase}/api/pinterest/auto-post`,{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify({
    imageUrl:previewUrl,
    title,
    description:caption,
    link:storeUrl
   })
  })

  results.pinterest = await safeJson(r)

 }catch(e){
  results.pinterest = { ok:false, error:e.message }
 }

 return results
}