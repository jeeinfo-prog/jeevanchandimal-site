import Head from "next/head"

// Strip HTML tags for clean meta descriptions
function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function getServerSideProps({ params, req }) {
  const base = process.env.NEXT_PUBLIC_WP_BASE_URL
  if (!base) return { notFound: true }

  const slug = params?.slug
  const postUrl = `${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`

  const res = await fetch(postUrl)
  if (!res.ok) return { notFound: true }

  const data = await res.json()
  const post = data?.[0]
  if (!post) return { notFound: true }

  const title = post.title?.rendered ?? ""
  const excerptHtml = post.excerpt?.rendered ?? ""
  const contentHtml = post.content?.rendered ?? ""

  // Prefer excerpt; fallback to first part of content
  const descriptionRaw =
    stripHtml(excerptHtml) || stripHtml(contentHtml).slice(0, 160)

  // Try to pull featured image via _embed
  const featured =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? ""

  // Canonical URL (use your real domain)
  const canonical = `https://jeevanchandimal.com/project/${post.slug}`

  return {
    props: {
      post: {
        id: post.id,
        slug: post.slug,
        title,
        description: descriptionRaw,
        content: contentHtml,
        featuredImage: featured,
        canonical,
      },
    },
  }
}

export default function ProjectSlugPage({ post }) {
  return (
    <>
      <Head>
        <title>{stripHtml(post.title) || "Project"}</title>
        <meta name="description" content={post.description || "Project details"} />
        <link rel="canonical" href={post.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={stripHtml(post.title)} />
        <meta property="og:description" content={post.description || ""} />
        <meta property="og:url" content={post.canonical} />
        {post.featuredImage ? (
          <meta property="og:image" content={post.featuredImage} />
        ) : null}

        {/* Twitter */}
        <meta name="twitter:card" content={post.featuredImage ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={stripHtml(post.title)} />
        <meta name="twitter:description" content={post.description || ""} />
        {post.featuredImage ? (
          <meta name="twitter:image" content={post.featuredImage} />
        ) : null}
      </Head>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <h1 style={{ marginBottom: 12 }}>{stripHtml(post.title)}</h1>

        {/* WordPress HTML */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  )
}
