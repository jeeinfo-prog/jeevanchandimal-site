// pages/store/cancel.js

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import JeevanChandimalNavi from "../../components/layout/jeevan-chandimal-navi";
import JeevanChandimalNewFooter from "../../components/layout/jeevan-chandimal-new-footer";

export default function StoreCancel() {
  const router = useRouter();
  const orderId =
    typeof router.query.order_id === "string" ? router.query.order_id : "";

  const [status, setStatus] = React.useState("PENDING");
  const [msg, setMsg] = React.useState("Checking payment status…");

  React.useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 30; // 60 seconds

    async function poll() {
      tries += 1;

      try {
        const r = await fetch(
          `/api/orders/${encodeURIComponent(orderId)}?t=${Date.now()}`,
          { headers: { "Cache-Control": "no-store" } }
        );

        if (!r.ok) {
          setStatus("ERROR");
          setMsg(`Order check failed (${r.status}).`);
          return;
        }

        const data = await r.json();
        if (cancelled) return;

        const s = data?.status || "PENDING";
        setStatus(s);

        // ✅ If webhook says PAID, continue to download even from "cancel"
        if (s === "PAID") {
          router.replace(`/store/download?order_id=${encodeURIComponent(orderId)}`);
          return;
        }

        if (s === "FAILED") {
          setMsg("Payment failed. Please try again.");
          return;
        }

        if (s === "CANCELED") {
          setMsg("Payment canceled.");
          return;
        }

        // Still pending: keep waiting because webhook may arrive late
        setMsg("Payment is still processing… please wait a few seconds.");
      } catch (e) {
        setStatus("ERROR");
        setMsg(e?.message || "Error checking payment.");
        return;
      }

      if (!cancelled && tries < maxTries) {
        setTimeout(poll, 2000);
      } else if (!cancelled) {
        setMsg("Still processing. You can refresh this page.");
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
        <title>Payment Status | Store</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="card">
          <h1 className="title">Payment status</h1>

          <p className="p">
            Order ID: <span className="mono">{orderId || "-"}</span>
          </p>

          <div className="badge">Status: {status}</div>
          <p className="p2">{msg}</p>

          <p className="p2">
            <Link href="/store">
              <a className="link">Back to store</a>
            </Link>
          </p>
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap { max-width: 900px; margin: 0 auto; padding: 50px 20px 90px; }
        .card { border: 1px solid rgba(245,244,244,0.12); border-radius: 18px; background: rgba(255,255,255,0.02); padding: 18px; }
        .title { margin: 0 0 10px; font-size: 22px; }
        .p { margin: 0; opacity: 0.85; line-height: 1.6; }
        .p2 { margin: 10px 0 0; opacity: 0.85; line-height: 1.6; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 13px; }
        .badge { display: inline-block; margin-top: 12px; padding: 6px 12px; border-radius: 999px; font-size: 12px; border: 1px solid rgba(245,244,244,0.18); }
        .link { text-decoration: underline; text-underline-offset: 3px; }
      `}</style>
    </>
  );
}
