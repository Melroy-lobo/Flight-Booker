import { useEffect, useState } from 'react';
let push;
export function notify(msg){ if (push) push(msg); }
export default function Toast(){
  const [msg, setMsg] = useState(null);
  useEffect(()=>{ push = (m)=>{ setMsg(m); setTimeout(()=>setMsg(null), 2500); }; },[]);
  if (!msg) return null;
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-black text-white px-4 py-2 rounded-xl shadow">{msg}</div>
    </div>
  );
}
