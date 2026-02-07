import Document, { Html, Head, Main, NextScript } from "next/document"

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Search Console verification */}
          <meta
            name="google-site-verification"
            content="google3e17ac464616f10c"
          />

          {/* Meta basics */}
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="twitter:card" content="summary_large_image" />

          {/* Reset styles */}
          <style
            dangerouslySetInnerHTML={{
              __html:
                'html { line-height: 1.15; } body { margin: 0; } * { box-sizing: border-box; border: 0; -webkit-font-smoothing: antialiased; }',
            }}
          />

          {/* Fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          />

          {/* Favicon */}
          <link
            rel="shortcut icon"
            href="/jc logo web 05.png"
            type="image/png"
            sizes="32x32"
          />

          {/* TeleportHQ styles */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/@teleporthq/teleport-custom-scripts/dist/style.css"
          />
        </Head>

        <body>
          <Main />
          <NextScript />

          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-PVHZMS0YH5"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-PVHZMS0YH5');
              `,
            }}
          />

          {/* TeleportHQ scripts */}
          <script
            defer
            src="https://unpkg.com/@teleporthq/teleport-custom-scripts"
          />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
