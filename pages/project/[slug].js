import Head from "next/head"

// Strip HTML tags for clean meta descriptions
function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function getServerSideProps({ params }) {
  const base = process.env.NEXT_PUBLIC_WP_BASE_URL || ""
  const slug = params?.slug || ""

  if (!base || !slug) return { notFound: true }

  // IMPORTANT: projects endpoint (not posts)
  const postUrl = `${base.replace(/\/$/, "")}/wp-json/wp/v2/projects?slug=${encodeURIComponent(
    slug
  )}&_embed=1`

  const res = await fetch(postUrl)
  if (!res.ok) return { notFound: true }

  const data = await res.json()
  const post = data?.[0]
  if (!post) return { notFound: true }

  const titleHtml = post.title?.rendered ?? ""
  const excerptHtml = post.excerpt?.rendered ?? ""
  const contentHtml = post.content?.rendered ?? ""

  const title = stripHtml(titleHtml)

  // Prefer excerpt; fallback to first part of content
  const description =
    stripHtml(excerptHtml) || stripHtml(contentHtml).slice(0, 160)

  // Featured image: prefer large size for performance, fallback to full
  const fm = post?._embedded?.["wp:featuredmedia"]?.[0]
  const featuredImage =
    fm?.media_details?.sizes?.large?.source_url ||
    fm?.source_url ||
    ""

  const canonical = `https://jeevanchandimal.com/project/${post.slug}`

  return {
    props: {
      post: {
        id: post.id,
        slug: post.slug,
        title,
        description,
        content: contentHtml,
        featuredImage,
        canonical,
      },
    },
  }
}

export default function ProjectSlugPage({ post }) {
  const pageTitle = post?.title || "Project"
  const pageDesc = post?.description || "Project details"

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={post.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={post.canonical} />
        {post.featuredImage ? (
          <>
            <meta property="og:image" content={post.featuredImage} />
            {/* Optional hints (platforms may ignore, but helps sometimes) */}
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        ) : null}

        {/* Twitter */}
        <meta
          name="twitter:card"
          content={post.featuredImage ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        {post.featuredImage ? (
          <meta name="twitter:image" content={post.featuredImage} />
        ) : null}
      </Head>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        {/* Featured image on the page */}
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={pageTitle}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 16,
              marginBottom: 16,
              display: "block",
            }}
          />
        ) : null}

        <h1 style={{ marginBottom: 12 }}>{pageTitle}</h1>

        {/* WordPress HTML */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  )
}
