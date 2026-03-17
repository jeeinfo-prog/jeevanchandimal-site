export function generateCaption({ title, description, storeUrl }) {

  const hashtags = [
    "#srilanka",
    "#travelphotography",
    "#fineartphotography",
    "#naturephotography",
    "#landscapephotography",
    "#exploresrilanka",
    "#visualstorytelling",
    "#photography"
  ]

  return `${title}

${description}

Available as a print and digital download.

${storeUrl}

${hashtags.join(" ")}`
}