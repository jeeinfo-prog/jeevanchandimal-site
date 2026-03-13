// pages/api/member/status.js
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const MAX_DEVICES = 2
const SESSION_SECRET =
  process.env.MEMBER_SESSION_SECRET || process.env.DOWNLOAD_TOKEN_SECRET

function normalizeEmail(v){
  return String(v || '').trim().toLowerCase()
}

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function clean(v){
  return String(v || '').trim()
}

function isUuid(v){
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(v || '').trim()
  )
}

function isExpired(v){
  if(!v) return false
  const ms = new Date(v).getTime()
  if(!Number.isFinite(ms)) return false
  return ms < Date.now()
}

function isPastOrNow(v){
  if(!v) return false
  const ms = new Date(v).getTime()
  if(!Number.isFinite(ms)) return false
  return ms <= Date.now()
}

function cinematicKickMessage(){
  return {
    title:'Session closed',
    body:'This membership is active on another device.\n\nFor protection your session has been closed.',
    hint:'Max 2 devices'
  }
}

function verifySessionFromReq(req){

  const auth = String(req.headers.authorization || '')
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  if(!token){
    return { ok:false, code:'NO_SESSION', error:'Please sign in.' }
  }

  try{
    const payload = jwt.verify(token, SESSION_SECRET)
    return { ok:true, payload }
  }catch{
    return {
      ok:false,
      code:'SESSION_INVALID',
      error:'Session expired.',
      cinematic:cinematicKickMessage()
    }
  }
}

async function ensureActiveSession(userId, deviceId){

  const {data,error} = await supabaseAdmin
    .from('member_sessions')
    .select('id')
    .eq('user_id',userId)
    .eq('device_id',deviceId)
    .is('revoked_at',null)
    .maybeSingle()

  if(error) throw new Error(error.message)

  return !!data
}

async function countActiveSessions(userId){

  const {count,error} = await supabaseAdmin
    .from('member_sessions')
    .select('id',{count:'exact',head:true})
    .eq('user_id',userId)
    .is('revoked_at',null)

  if(error) throw new Error(error.message)

  return Number(count || 0)
}

export default async function handler(req,res){

  res.setHeader('Cache-Control','no-store')

  if(req.method !== 'GET'){
    return res.status(405).json({ok:false,error:'Method not allowed'})
  }

  try{

    const email = normalizeEmail(req.query?.email)

    if(!email || !isValidEmail(email)){
      return res.status(400).json({ok:false,error:'Invalid email'})
    }

    const sess = verifySessionFromReq(req)

    if(!sess.ok){
      return res.status(401).json(sess)
    }

    const tokenEmail = normalizeEmail(sess.payload.email)
    const deviceId = clean(sess.payload.deviceId)
    const userId = clean(sess.payload.userId)

    if(tokenEmail !== email || !isUuid(userId)){
      return res.status(401).json({
        ok:false,
        code:'SESSION_MISMATCH',
        error:'Session mismatch',
        cinematic:cinematicKickMessage(),
      })
    }

    const activeSession = await ensureActiveSession(userId,deviceId)

    if(!activeSession){
      return res.status(401).json({
        ok:false,
        code:'SESSION_REVOKED',
        error:'Session closed',
        cinematic:cinematicKickMessage(),
      })
    }

    const {data:member,error} = await supabaseAdmin
      .from('memberships')
      .select(
        'id,email,user_id,plan,status,end_date,monthly_download_limit,monthly_download_used,billing_cycle_end'
      )
      .eq('email',email)
      .eq('status','active')
      .order('created_at',{ascending:false})
      .limit(1)
      .maybeSingle()

    if(error){
      return res.status(500).json({ok:false,error:error.message})
    }

    if(!member || isExpired(member.end_date)){
      return res.status(200).json({ok:true,member:false})
    }

    const used = Number(member.monthly_download_used || 0)
    const limit = Number(member.monthly_download_limit || 0)

    const remaining = limit === 0 ? 0 : Math.max(0,limit - used)

    const activeDevices = await countActiveSessions(userId)

    return res.status(200).json({
      ok:true,
      member:true,
      tier:member.plan,
      used,
      limit,
      remaining,
      ends_at:member.end_date || null,
      reset_at:member.billing_cycle_end || null,
      devices:{
        active:activeDevices,
        max:MAX_DEVICES
      }
    })
  }
  catch(e){
    console.error('member/status error:',e)
    return res.status(500).json({ok:false,error:e?.message || 'Server error'})
  }
}