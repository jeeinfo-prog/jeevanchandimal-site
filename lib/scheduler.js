import { supabaseAdmin } from "./supabaseAdmin"

export async function scheduleReposts(photoId){

 const now = new Date()

 const posts = [

  {
    photo_id: photoId,
    platform: "facebook",
    run_at: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
  },

  {
    photo_id: photoId,
    platform: "pinterest",
    run_at: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  },

  {
    photo_id: photoId,
    platform: "instagram",
    run_at: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  }

 ]

 await supabaseAdmin.from("scheduled_posts").insert(posts)
}