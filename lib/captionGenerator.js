// lib/aiCaptionGenerator.js

function clean(v){
 return String(v || "").trim()
}

export function generateCaption({title,description,storeUrl}){

 const tags = [
  "#srilanka",
  "#travelphotography",
  "#fineartphotography",
  "#naturephotography",
  "#landscapephotography",
  "#exploresrilanka",
  "#jeevanchandimal"
 ]

 const safeTitle = clean(title)
 const safeDescription = clean(description)
 const safeStoreUrl = clean(storeUrl)

 return `${safeTitle}

${safeDescription}

Available as print and digital download.

${safeStoreUrl}

${tags.join(" ")}`
}