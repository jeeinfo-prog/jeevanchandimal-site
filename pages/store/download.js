// pages/store/download.js

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import JeevanChandimalNavi from "../../components/jeevan-chandimal-navi";
import JeevanChandimalNewFooter from "../../components/jeevan-chandimal-new-footer";

export default function StoreDownload() {
  const router = useRouter();
  const orderId = typeof router.query.order_id === "string" ? router.query.order_id : "";

  const [status, setStatus] = React.useState("PENDING");
  const [msg, setMsg] = React.useState("");
  const [downloadUrl, setDownloadUrl] = React.useState("");

  async function load() {
    if (!orderId) return;

    setMsg("");
    setDownloadUrl("");

    const r = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      headers: { "Cache-Control": "no-store" },
    });

    if (!r.ok) {
      setStatus("ERROR");
      setMsg("Order not found.");
      return;
    }

    const order = await r.json();
    setStatus(order.status || "PENDING");

    if (order.status !== "PAID") {
      setMsg("This order is not paid yet. Please complete payment first.");
      return;
    }

    // Create secure token
    const t = await fetch("/api/download/create-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    const data = await t.json();

    if (!t.ok) {
      setMsg(data?.error || "Failed to create download link.");
      return;
    }

    // ✅ Fix: ensure we always use the correct download endpoint
    // Preferred: API returns { token }
    // Backward compat: API might return { url } but old url may point to /api/download/file (deleted)
    const token = data?.token;
    const url = data?.url;

    if (typeof url === "string" && url.includes("/api/download?token=")) {
      setDownloadUrl(url);
      return;
    }

    if (typeof token === "string" && token.length > 10) {
      setDownloadUrl(`/api/download?token=${encodeURIComponent(token)}`);
      return;
    }

    setMsg("Download token missing. Please try again.");
  }

  React.useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <>
      <Head>
        <title>Download | Store</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="card">
          <h1 className="title">Download</h1>

          {!orderId ? (
            <p className="p">
              Missing order id. Go back to the{" "}
              <Link href="/store">
                <a className="link">store</a>
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="p">
                Order: <span className="mono">{orderId}</span>
              </p>

              {status !== "PAID" && (
                <>
                  <div className="badge pending">Status: {status}</div>
                  <p className="p2">{msg || "Waiting for payment confirmation."}</p>
                  <p className="p2">
                    <Link href={`/store/return?order_id=${encodeURIComponent(orderId)}`}>
                      <a className="link">Back to payment status</a>
                    </Link>
                  </p>
                </>
              )}

              {status === "PAID" && (
                <>
                  <div className="badge paid">Payment confirmed ✅</div>
                  <p className="p2">Your secure link expires in 10 minutes.</p>

                  {downloadUrl ? (
                    <a className="btn" href={downloadUrl}>
                      Download file
                    </a>
                  ) : (
                    <button className="btn" onClick={load} type="button">
                      Generate download link
                    </button>
                  )}

                  {msg ? <p className="p2 warn">{msg}</p> : null}
                </>
              )}
            </>
          )}
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 50px 20px 90px;
        }
        .card {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          padding: 18px;
        }
        .title {
          margin: 0 0 10px;
          font-size: 22px;
        }
        .p {
          margin: 0;
          opacity: 0.85;
          line-height: 1.6;
        }
        .p2 {
          margin: 10px 0 0;
          opacity: 0.85;
          line-height: 1.6;
        }
        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
            monospace;
          font-size: 13px;
          opacity: 0.95;
        }
        .badge {
          display: inline-block;
          margin-top: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
        }
        .pending {
          opacity: 0.9;
        }
        .paid {
          opacity: 0.95;
        }
        .btn {
          display: inline-block;
          margin-top: 14px;
          padding: 12px 16px;
          border-radius: 999px;
          background: #f5f4f4;
          color: #222222;
          font-weight: 700;
          text-decoration: none;
          border: 0;
          cursor: pointer;
        }
        .btn:hover {
          opacity: 0.95;
        }
        .link {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .warn {
          opacity: 0.85;
        }
      `}</style>
    </>
  );
}
