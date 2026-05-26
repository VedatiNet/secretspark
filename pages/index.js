import { useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

const categories = {
  PARTNER: { icon:'💗', title:'Partner', sub:'Romantic', color:'#ff6fe7', sample:'There is something about you that feels like home and magic at the same time. I just wanted you to know that.' },
  FAMILY: { icon:'🏠', title:'Family', sub:'Heartfelt', color:'#ffd54c', sample:'Some people are blessings we get used to too easily. Today I just wanted to remind you that you are one of mine.' },
  FRIEND: { icon:'👥', title:'Friends', sub:'Memorable', color:'#7aa2ff', sample:'Some friendships do not need daily conversations to stay real. Yours is one of those rare ones.' },
  WORK: { icon:'💼', title:'Work', sub:'Respectful', color:'#47d18c', sample:'Your effort, calmness, and reliability are noticed more than you think. This is a small reminder of that.' }
};

function makeCode(){ return 'SK-' + Math.random().toString(36).slice(2,10).toUpperCase(); }
function safeRecipient(method, value){ if(!value) return 'Receiver selected'; if(method==='email') return value.replace(/(.{2}).+(@.+)/,'$1***$2'); if(method==='telegram') return value.startsWith('@')? value : '@'+value; return value.length>4 ? '•••• '+value.slice(-4) : value; }

export default function Home(){
  const [category,setCategory]=useState('PARTNER');
  const [message,setMessage]=useState('');
  const [preview,setPreview]=useState(false);
  const [delivery,setDelivery]=useState(false);
  const [payment,setPayment]=useState(false);
  const [ready,setReady]=useState(null);
  const [method,setMethod]=useState('whatsapp');
  const [recipient,setRecipient]=useState('');
  const [sender,setSender]=useState('');
  const [nameMode,setNameMode]=useState('add_at_end');
  const active=categories[category];
  const displayMessage = message.trim() || 'Your words will appear here as a soft preview before the cinematic reveal.';

  function magic(){ setMessage(active.sample); }
  async function createSpark(){
    const secret_code = makeCode();
    const payload = { secret_code, category, message_text: message.trim() || active.sample, sender_name: sender.trim(), name_display_mode:nameMode, delivery_method: method, recipient_raw: recipient, recipient_safe: safeRecipient(method, recipient), price_usd:1.99, payment_status:'paid_demo' };
    try { await supabase.from('sparks').insert(payload); } catch(e){ console.error('SecretSpark save failed', e); }
    setReady({ secret_code, link: `${window.location.origin}/r/${secret_code}`, method, recipient: safeRecipient(method,recipient) });
  }

  return <main className="page"><div className="stars" />
    <section className="phone">
      <div className="brand"><h1>SecretSpark</h1><p>Turn emotions into unforgettable moments.</p><span className="price">$1.99 per SecretSpark moment</span></div>
      <div className="section-label">CHOOSE THE FEELING</div>
      <div className="feelings">{Object.entries(categories).map(([key,c])=><button key={key} onClick={()=>setCategory(key)} className={`feeling ${category===key?'active':''}`} style={category===key?{borderColor:c.color, boxShadow:`0 0 28px ${c.color}44`}:null}><span className="ico">{c.icon}</span><b>{c.title}</b><small>{c.sub}</small></button>)}</div>
      <div className="section-label">LIVE MESSAGE PREVIEW</div>
      <div className="preview"><div><div className="spark">✣</div><blockquote>“{displayMessage}”</blockquote><small>Prepared for a {active.title} reveal</small></div></div>
      <div className="section-label">WRITE THE MESSAGE</div>
      <textarea className="textarea" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write something they will feel, not just read..." />
      <button className="btn btn-outline" onClick={magic}>✣ Spark the emotion</button>
      <button className="btn btn-primary" onClick={()=>setPreview(true)}>▶ Preview the Cinematic Reveal</button>
      <button className="btn btn-dark" disabled={!message.trim()} onClick={()=>setDelivery(true)}>Deliver this moment — $1.99</button>
      <footer className="footer"><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a></footer>
    </section>

    {preview&&<div className="modal"><div className="modal-card"><div className="topbar"><button className="ghost" onClick={()=>setPreview(false)}>‹</button><b>SecretSpark Preview</b><span /></div><div className="reveal-card" style={{minHeight:440,marginTop:18}}><div className="envelope">💌</div><p className="message">“{displayMessage}”</p><small className="from">Does this reveal feel perfect?</small></div><button className="btn btn-outline" onClick={()=>setPreview(false)}>Edit</button><button className="btn btn-gold" onClick={()=>{setPreview(false);setDelivery(true)}}>Approve</button></div></div>}

    {delivery&&<div className="modal"><div className="modal-card"><div className="topbar"><button className="ghost" onClick={()=>setDelivery(false)}>‹</button><b>Delivery</b><span /></div><div className="field"><label>How should your name appear?</label><select className="input" value={nameMode} onChange={e=>setNameMode(e.target.value)}><option value="add_at_end">Add my name at the end</option><option value="already_in_message">My name is already inside the message</option><option value="no_name">Continue without adding a name</option></select></div>{nameMode==='add_at_end'&&<div className="field"><label>The name they know you by</label><input className="input" value={sender} onChange={e=>setSender(e.target.value)} placeholder="Your name" /></div>}<div className="method-grid">{['whatsapp','sms','email','telegram'].map(m=><button className={`method ${method===m?'active':''}`} onClick={()=>setMethod(m)} key={m}>{m==='whatsapp'?'💬 WhatsApp':m==='sms'?'✨ SMS':m==='email'?'✉️ Email':'🔒 Telegram'}</button>)}</div><div className="field"><label>Receiver {method==='email'?'email':method==='telegram'?'Telegram username':'phone number'}</label><input className="input" value={recipient} onChange={e=>setRecipient(e.target.value)} placeholder={method==='email'?'receiver@email.com':method==='telegram'?'@receiver':'+1 555 000 000'} /></div><div className="summary"><div className="row"><span>Channel</span><b>{method}</b></div><div className="row"><span>Receiver</span><b>{safeRecipient(method,recipient)}</b></div></div><button className="btn btn-primary" onClick={()=>{setDelivery(false);setPayment(true)}}>Continue to Payment</button></div></div>}

    {payment&&<div className="modal"><div className="modal-card"><div className="topbar"><button className="ghost" onClick={()=>setPayment(false)}>‹</button><b>Payment</b><span /></div><div className="ready"><div className="seal">🔐</div><h2>Deliver this moment ✨</h2><p>A private cinematic reveal, prepared for one receiver.</p><div className="summary"><div className="row"><span>Price</span><b>$1.99</b></div><div className="row"><span>Channel</span><b>{method}</b></div><div className="row"><span>Receiver</span><b>{safeRecipient(method,recipient)}</b></div></div><button className="btn btn-gold" onClick={createSpark}>Simulate Payment</button><small>Demo mode: no real payment is charged yet.</small></div></div></div>}

    {ready&&<div className="modal"><div className="modal-card ready"><div className="seal">💌</div><h2>Your moment is ready ✨</h2><p>Demo mode: no real message has been sent yet.</p><div className="summary"><div className="row"><span>Channel</span><b>{ready.method}</b></div><div className="row"><span>Receiver</span><b>{ready.recipient}</b></div><div className="row"><span>Reveal link</span><b>{ready.link.replace(window.location.origin,'')}</b></div></div><button className="btn btn-primary" onClick={()=>window.open(ready.link,'_blank')}>Open receiver reveal</button><button className="btn btn-outline" onClick={()=>navigator.clipboard?.writeText(ready.link)}>Copy reveal link</button><button className="btn btn-dark" onClick={()=>setReady(null)}>Done</button></div></div>}
  </main>
}
