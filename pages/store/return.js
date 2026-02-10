// pages/store/return.js

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import JeevanChandimalNavi from "../../components/jeevan-chandimal-navi";
import JeevanChandimalNewFooter from "../../components/jeevan-chandimal-new-footer";

export default function StoreReturn() {
  const router = useRouter();
  const orderId =
    typeof router.query.order_id === "string" ? router.query.order_id : "";

  const [status, setStatus] = React.useState("PENDING");
  const [order, setOrder] = React.useState(null);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 30; // 30 × 2s = 60 seconds

    async function poll() {
      tries += 1;

      try {
        const r = await fetch(
          `/api/orders/${encodeURIComponent(orderId)}`,
          {
            headers: { "Cache-Control": "no-store" },
          }
        );

        if (!r.ok) {
          if (r.status === 404) {
            if (!cancelled) {
              setStatus("NOT_FOUND");
              setMsg("Order not found. Please refresh or contact support.");
            }
            return;
          }
          throw new Error("Failed to fetch order");
        }

        const data = await r.json();
        if (cancelled) return;

        setOrder(data);
        setStatus(data.status || "PENDING");

        // Stop polling once final
        if (
          data.status === "PAID" ||
          data.status === "FAILED" ||
          data.status === "CANCELED"
        ) {
          return;
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("ERROR");
          setMsg("Something went wrong while checking payment.");
        }
        return;
      }

      if (!cancelled && tries < maxTries) {
        setTimeout(poll, 2000);
      } else if (!cancelled) {
        setMsg("Still waiting for payment confirmation. You may refresh.");
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
          <h1 className="title">Payment Status</h1>

          {!orderId && (
            <p className="p">
              Missing order ID. Go back to the{" "}
              <Link href="/store">
                <a className="link">store</a>
              </Link>.
            </p>
          )}

          {orderId && (
            <>
              <p className="p">
                Order ID: <span className="mono">{orderId}</span>
              </p>

              {status === "PENDING" && (
                <div className="state">
                  <span className="badge pending">Pending…</span>
                  <p className="p2">
                    Waiting for PayHere confirmation. This usually takes a few
                    seconds.
                  </p>
                  {msg && <p className="p2 warn">{msg}</p>}
                </div>
              )}

              {status === "PAID" && (
                <div className="state">
                  <span className="badge paid">Payment confirmed ✅</span>
                  <p className="p2">Your download is ready.</p>

                  <Link
                    href={`/store/download?order_id=${encodeURIComponent(
                      orderId
                    )}`}
                  >
                    <a className="btn">Download file</a>
                  </Link>

                  <p className="p2 fine">
                    The download link will expire for security. You can generate
                    a new one if needed.
                  </p>
                </div>
              )}

              {status === "FAILED" && (
                <div className="state">
                  <span className="badge fail">Payment failed</span>
                  <p className="p2">
                    The payment was not successful. Please try again.
                  </p>
                  <Link href="/store">
                    <a className="link">Back to store</a>
                  </Link>
                </div>
              )}

              {status === "CANCELED" && (
                <div className="state">
                  <span className="badge cancel">Payment canceled</span>
                  <p className="p2">You canceled the payment.</p>
                  <Link href="/store">
                    <a className="link">Back to store</a>
                  </Link>
                </div>
              )}

              {status === "NOT_FOUND" && (
                <div className="state">
                  <span className="badge cancel">Order not found</span>
                  <p className="p2">{msg}</p>
                  <Link href="/store">
                    <a className="link">Back to store</a>
                  </Link>
                </div>
              )}

              {status === "ERROR" && (
                <div className="state">
                  <span className="badge cancel">Error</span>
                  <p className="p2">{msg}</p>
                  <Link href="/store">
                    <a className="link">Back to store</a>
                  </Link>
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
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 13px;
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
        .pending {
          opacity: 0.9;
        }
        .paid {
          opacity: 0.95;
        }
        .fail {
          opacity: 0.95;
        }
        .cancel {
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
        .fine {
          opacity: 0.7;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}
