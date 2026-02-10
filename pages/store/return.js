// pages/store/return.js

import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import JeevanChandimalNavi from "../../components/jeevan-chandimal-navi";
import JeevanChandimalNewFooter from "../../components/jeevan-chandimal-new-footer";

export default function StoreReturn() {
  const router = useRouter();
  const orderId =
    typeof router.query.order_id === "string" ? router.query.order_id : "";

  const [status, setStatus] = React.useState("PENDING");
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
              setMsg("Order not found.");
            }
            return;
          }
          throw new Error("Order lookup failed");
        }

        const data = await r.json();
        if (cancelled) return;

        setStatus(data.status || "PENDING");

        // ✅ AUTO REDIRECT WHEN PAID
        if (data.status === "PAID") {
          router.replace(
            `/store/download?order_id=${encodeURIComponent(orderId)}`
          );
          return;
        }

        // Stop polling on final failure states
        if (
          data.status === "FAILED" ||
          data.status === "CANCELED"
        ) {
          return;
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("ERROR");
          setMsg("Something went wrong while confirming payment.");
        }
        return;
      }

      if (!cancelled && tries < maxTries) {
        setTimeout(poll, 2000);
      } else if (!cancelled) {
        setMsg("Still waiting for confirmation. You may refresh.");
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [orderId, router]);

  return (
    <>
      <Head>
        <title>Confirming Payment | Store</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="card">
          <h1 className="title">Confirming payment</h1>

          {!orderId && (
            <p className="p">Missing order ID.</p>
          )}

          {orderId && (
            <>
              <p className="p">
                Order ID: <span className="mono">{orderId}</span>
              </p>

              {status === "PENDING" && (
                <>
                  <div className="badge pending">Processing…</div>
                  <p className="p2">
                    Please wait while we confirm your payment.
                  </p>
                </>
              )}

              {status === "FAILED" && (
                <>
                  <div className="badge fail">Payment failed</div>
                  <p className="p2">Please try again.</p>
                </>
              )}

              {status === "CANCELED" && (
                <>
                  <div className="badge cancel">Payment canceled</div>
                  <p className="p2">You canceled the payment.</p>
                </>
              )}

              {status === "NOT_FOUND" && (
                <>
                  <div className="badge cancel">Order not found</div>
                  <p className="p2">{msg}</p>
                </>
              )}

              {status === "ERROR" && (
                <>
                  <div className="badge cancel">Error</div>
                  <p className="p2">{msg}</p>
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
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 13px;
        }
        .badge {
          display: inline-block;
          margin-top: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
        }
        .pending { opacity: 0.9; }
        .fail { opacity: 0.95; }
        .cancel { opacity: 0.95; }
      `}</style>
    </>
  );
}
