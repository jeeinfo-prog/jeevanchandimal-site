import Head from "next/head"

export async function getServerSideProps({ params }) {
  const base = process.env.NEXT_PUBLIC_WP_BASE_URL || ""
  const slug = params?.slug || ""

  if (!base) {
    return { props: { debug: "BASE_MISSING" } }
  }

  if (!slug) {
    return { props: { debug: "SLUG_MISSING" } }
  }

  const postUrl = `${base.replace(/\/$/, "")}/wp-json/wp/v2/projects?slug=${encodeURIComponent(
    slug
  )}&_embed=1`

  try {
    const res = await fetch(postUrl)

    if (!res.ok) {
      return {
        props: {
          debug: `FETCH_FAILED_${res.status}`,
          postUrl,
        },
      }
    }

    const data = await res.json()
    const post = data?.[0]

    if (!post) {
      return {
        props: {
          debug: "NO_PROJECT_FOUND",
          postUrl,
        },
      }
    }

    return {
      props: {
        debug: "OK_PROJECT_FOUND",
        slug,
        postUrl,
        projectId: post.id,
        projectSlug: post.slug,
        title: post.title?.rendered || "",
      },
    }
  } catch (error) {
    return {
      props: {
        debug: "FETCH_EXCEPTION",
        postUrl,
        error: String(error),
      },
    }
  }
}

export default function ProjectSlugPage(props) {
  return (
    <>
      <Head>
        <title>Debug – Project</title>
      </Head>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <h1>Debug Output</h1>
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
          {JSON.stringify(props, null, 2)}
        </pre>
      </main>
    </>
  )
}
