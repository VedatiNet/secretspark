import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function Reveal(){
  const router=useRouter(); const {code}=router.query; const [spark,setSpark]=useState(null); const [loading,setLoading]=useState(true);
  useEffect(()=>{ if(!code) return; (async()=>{ try{ const {data}=await supabase.from('sparks').select('*').eq('secret_code',code).single(); setSpark(data); await supabase.from('spark_events').insert({secret_code:code,event_type:'opened'}).catch(()=>{}); }catch(e){console.error(e)} setLoading(false); })(); },[code]);
  if(loading) return <main className="reveal"><div className="stars"/><section className="reveal-card"><div className="moon"/><p>Loading SecretSpark...</p></section></main>;
  if(!spark) return <main className="reveal"><div className="stars"/><section className="reveal-card"><h1>SecretSpark not found</h1><p>This reveal link may be expired or unavailable.</p></section></main>;
  const showName=spark.name_display_mode==='add_at_end' && spark.sender_name;
  return <main className="reveal"><div className="stars"/><section className="reveal-card"><div className="moon"/><div className="envelope">💌</div><p className="message">“{spark.message_text}”</p>{showName&&<div className="from">From {spark.sender_name} ✨</div>}</section></main>
}
