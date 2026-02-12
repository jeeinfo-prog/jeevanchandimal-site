import React from 'react'
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminUploadPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [session, setSession] = React.useState(null)
  const [isAdmin, setIsAdmin] = React.useState(false)

  // Queue system
  const [queue, setQueue] = React.useState([])
  const [concurrency] = React.useState(4) // ✅ Safe default
  const [busy, setBusy] = React.useState(false)
  const [logs, setLogs] = React.useState([])

  const runningRef = React.useRef(false)

  function log(line) {
    setLogs((p) => [...p, `${new Date().toLocaleTimeString()} — ${line}`])
  }

  function setItem(id, patch) {
    setQueue((q) => q.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  // --------------------------
  // Auth
  // --------------------------

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) =>
      setSession(data?.session || null)
    )
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s)
    )
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  React.useEffect(() => {
    async function checkAdmin() {
      if (!session?.user?.id) {
        setIsAdmin(false)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (error) {
        log(`❌ Profile check failed: ${error.message}`)
        setIsAdmin(false)
        return
      }

      const ok = data?.role === 'admin'
      setIsAdmin(ok)
      log(ok ? '✅ Admin verified' : '❌ Not admin')
    }

    checkAdmin()
  }, [session?.user?.id])

  async function signIn() {
    setBusy(true)
    setLogs([])
    try {
      const { error } = await sup
