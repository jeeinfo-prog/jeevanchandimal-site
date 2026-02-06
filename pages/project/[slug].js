import Head from "next/head"

export async function getServerSideProps({ params }) {
  const base = process.env.NEXT_PUBLIC_WP_BASE_URL

  if (!base) {
    return { notFound: true }
  }

  const slug = params?.slug
  const url = `${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`

  const res = await fetch(url)
  if (!res.ok) {
    return { notFound: true }
  }

  const data = await res.json()
  const post = data?.[0]

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered ?? "",
        excerpt: post.excerpt?.rendered ?? "",
        content: post.content?.rendered ?? "",
        date: post.date ?? "",
      },
    },
  }
}

export default function ProjectSlugPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="Project details" />
      </Head>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <h1 style={{ marginBottom: 12 }}>{post.title}</h1>

        {/* WordPress HTML */}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </>
  )
}
