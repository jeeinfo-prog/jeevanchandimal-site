export function generateCaption({title,description,storeUrl}){

 const tags = [
  "#srilanka",
  "#travelphotography",
  "#fineartphotography",
  "#naturephotography",
  "#landscapephotography",
  "#exploresrilanka"
 ]

 return `${title}

${description}

Available as print and digital download.

${storeUrl}

${tags.join(" ")}`
}