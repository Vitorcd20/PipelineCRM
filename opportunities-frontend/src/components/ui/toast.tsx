import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

type ToastKind = 'ok' | 'err'
interface ToastItem { id:string; msg:string; kind:ToastKind }

let listeners: ((t:ToastItem[])=>void)[] = []
let queue: ToastItem[] = []
const push = (msg:string, kind:ToastKind) => {
  queue = [...queue, { id: Math.random().toString(36).slice(2), msg, kind }]
  listeners.forEach(l => l([...queue]))
}
export const toast = { success:(m:string)=>push(m,'ok'), error:(m:string)=>push(m,'err') }

function remove(id:string){ queue=queue.filter(t=>t.id!==id); listeners.forEach(l=>l([...queue])) }

function ToastItem({ item }:{ item:ToastItem }) {
  useEffect(()=>{ const t=setTimeout(()=>remove(item.id),3500); return ()=>clearTimeout(t) },[item.id])
  return (
    <div className={`toast ${item.kind}`}>
      {item.kind==='ok' ? <CheckCircle size={15}/> : <XCircle size={15}/>}
      <span>{item.msg}</span>
      <button className="toast-x" onClick={()=>remove(item.id)}><X size={13}/></button>
    </div>
  )
}

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([])
  useEffect(()=>{ listeners.push(setItems); return ()=>{ listeners=listeners.filter(l=>l!==setItems) } },[])
  if (!items.length) return null
  return <div className="toast-wrap">{items.map(i=><ToastItem key={i.id} item={i}/>)}</div>
}
