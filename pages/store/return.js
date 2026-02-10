// pages/store/return.js

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import JeevanChandimalNavi from "../../components/jeevan-chandimal-navi";
import JeevanChandimalNewFooter from "../../components/jeevan-chandimal-new-footer";

export default function StoreReturn() {
  const router = useRouter();
  const orderId = typeof router.query.order_id === "string" ? router.query.order_id : "";

  const [status, setStatus] = React.useState("PENDING"); // PENDING | PAID | FAILED | CANCELED | NOT_FOUND | ERROR
  const [order, setOrder] = React.useState(null);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 30; // 30 * 2s = 60s

    async function poll() {
      tries += 1;

      try {
        const r = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
          method: "GET",
          headers: { "Cache-Control": "no-store" },
        });

        if (!r.ok) {
          if (r.status === 404) {
            if (!cancelled) {
              setStatus("NOT_FOUND");
              setMsg("Order not found. (If you just paid, wait a few seconds and refresh.)");
            }
            return;
          }
          throw new Error(`Order lookup failed: ${r.status}`);
        }

        const data = await r.json();
        if (cancelled) return;

        setOrder(data);
        setStatus(data.status || "PENDING");

        // Stop polling when final
        if (data.status === "PAID" || data.status === "FAILED" || data.status === "CANCELED") return;
      } catch (e) {
        if (!cancelled) {
          setStatus("ERROR");
          setMsg(e?.message || "Something went wrong.");
        }
        return;
      }

      if (!cancelled && tries < maxTries) {
        setTimeout(poll, 2000);
      } else if (!cancelled) {
        setMsg("Still waiting for payment confirmation. You can refresh this page.");
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return (
    <>
      <Head>
        <title>Payment Status | Store</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="card">
          <h1 className="title">Payment status</h1>

          {!orderId && (
            <p className="p">
              Missing order id. Go back to the <Link href="/store"><a className="link">store</a></Link>.
            </p>
          )}

          {orderId && (
            <>
              <p className="p">
                Order: <span className="mono">{orderId}</span>
              </p>

              {status === "PENDING" && (
                <div className="state">
                  <div className="badge pending">Pending…</div>
                  <p className="p2">Waiting for PayHere confirmation. This can take a few seconds.</p>
                  {msg ? <p className="p2 warn">{msg}</p> : null}
                </div>
              )}

              {status === "PAID" && (
                <div className="state">
                  <div className="badge paid">Payment confirmed ✅</div>
                  <p className="p2">Your download is ready.</p>

                  <Link href={`/store/download?order_id=${encodeURIComponent(orderId)}`}>
                    <a className="btn">Download file</a>
                  </Link>

                  <p className="p2 fine">
                    If the download page says “expired”, just refresh it to generate a new secure link.
                  </p>
                </div>
              )}

              {status === "FAILED" && (
                <div className="state">
                  <div className="badge fail">Payment failed</div>
                  <p className="p2">Please try again from the photo page.</p>
                  <Link href="/store"><a className="link">Back to store</a></Link>
                </div>
              )}

              {status === "CANCELED" && (
                <div className="state">
                  <div className="badge cancel">Payment canceled</div>
                  <p className="p2">You canceled the payment.</p>
                  <Link href="/store"><a className="link">Back to store</a></Link>
                </div>
              )}

              {status === "NOT_FOUND" && (
                <div className="state">
                  <div className="badge cancel">Order not found</div>
                  <p className="p2">{msg || "Try refreshing the page."}</p>
                  <Link href="/store"><a className="link">Back to store</a></Link>
                </div>
              )}

              {status === "ERROR" && (
                <div className="state">
                  <div className="badge cancel">Error</div>
                  <p className="p2">{msg || "Something went wrong."}</p>
                  <Link href="/store"><a className="link">Back to store</a></Link>
                </div>
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
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 13px;
          opacity: 0.95;
        }
        .state {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(245, 244, 244, 0.12);
        }
        .badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
        }
        .pending { opacity: 0.9; }
        .paid { opacity: 0.95; }
        .fail { opacity: 0.95; }
        .cancel { opacity: 0.95; }

        .btn {
          display: inline-block;
          margin-top: 14px;
          padding: 12px 16px;
          border-radius: 999px;
          background: #f5f4f4;
          color: #222222;
          font-weight: 700;
          text-decoration: none;
        }
        .btn:hover { opacity: 0.95; }

        .link {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .warn { opacity: 0.85; }
        .fine { opacity: 0.7; font-size: 12px; }
      `}</style>
    </>
  );
}
