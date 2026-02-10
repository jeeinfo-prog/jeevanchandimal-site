// pages/store/return.js

import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import JeevanChandimalNavi from "../../components/jeevan-chandimal-navi";
import JeevanChandimalNewFooter from "../../components/jeevan-chandimal-new-footer";

export default function StoreReturn() {
  const router = useRouter();
  const orderId = typeof router.query.order_id === "string" ? router.query.order_id : "";

  const [status, setStatus] = React.useState("PENDING");
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 30; // 60s

    async function poll() {
      tries += 1;

      try {
        // Cache-bust query param so nothing can serve stale data
        const url = `/api/orders/${encodeURIComponent(orderId)}?t=${Date.now()}`;

        const r = await fetch(url, {
          method: "GET",
          headers: { "Cache-Control": "no-store" },
        });

        if (!r.ok) {
          setMsg(`Order check failed (${r.status}).`);
          return;
        }

        const data = await r.json();
        if (cancelled) return;

        const s = data?.status || "PENDING";
        setStatus(s);

        // ✅ AUTO REDIRECT WHEN PAID
        if (s === "PAID") {
          router.replace(`/store/download?order_id=${encodeURIComponent(orderId)}`);
          return;
        }

        // Stop polling on final failure states
        if (s === "FAILED" || s === "CANCELED") return;
      } catch (e) {
        if (!cancelled) setMsg(e?.message || "Error checking payment.");
        return;
      }

      if (!cancelled && tries < maxTries) {
        setTimeout(poll, 2000);
      } else if (!cancelled) {
        setMsg("Still waiting for confirmation. You can refresh.");
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
          <h1 className="title">Confirming payment…</h1>

          <p className="p">
            Order ID: <span className="mono">{orderId || "-"}</span>
          </p>

          <div className="badge">Status: {status}</div>
          {msg ? <p className="p2">{msg}</p> : <p className="p2">Please wait…</p>}
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
      `}</style>
    </>
  );
}
