import Head from 'next/head';
import { useMemo, useState } from 'react';

const feelings = [
  { id: 'partner', icon: '💗', title: 'Partner', sub: 'Romantic', sample: 'You have a way of making ordinary moments feel unforgettable.' },
  { id: 'family', icon: '🏠', title: 'Family', sub: 'Heartfelt', sample: 'Some people are home, even when they are far away.' },
  { id: 'friends', icon: '👥', title: 'Friends', sub: 'Memorable', sample: 'Some friendships do not need daily words to stay close.' },
  { id: 'work', icon: '💼', title: 'Work', sub: 'Respectful', sample: 'Your effort, consistency, and kindness do not go unnoticed.' }
];

function Stars(){
  return <div className="stars" aria-hidden="true">{Array.from({length: 64}).map((_,i)=><span key={i} style={{'--x':`${(i*37)%100}%`,'--y':`${(i*61)%100}%`,'--d':`${(i%7)+4}s`}} />)}</div>
}

export default function Home(){
  const [active,setActive]=useState(feelings[0]);
  const [msg,setMsg]=useState('');
  const preview = useMemo(()=> msg.trim() || 'Your words will appear here as a soft preview before the cinematic reveal.',[msg]);
  return <>
    <Head>
      <title>SecretSpark — Turn emotions into unforgettable moments</title>
      <meta name="description" content="Create a cinematic emotional reveal with SecretSpark." />
      <meta property="og:title" content="SecretSpark" />
      <meta property="og:description" content="Turn emotions into unforgettable moments." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    </Head>
    <main className="stage">
      <Stars />
      <div className="aurora auroraOne" />
      <div className="aurora auroraTwo" />
      <section className="shell">
        <header className="hero">
          <div className="logoGlow" />
          <h1>SecretSpark</h1>
          <p>Turn emotions into unforgettable moments.</p>
          <div className="price">$1.99 per SecretSpark moment</div>
        </header>

        <section className="block">
          <h2>Choose the feeling</h2>
          <div className="feelGrid">
            {feelings.map(f=><button key={f.id} className={`feelCard ${active.id===f.id?'active':''}`} onClick={()=>setActive(f)}>
              <span className="feelIcon">{f.icon}</span><b>{f.title}</b><small>{f.sub}</small>
            </button>)}
          </div>
        </section>

        <section className="block previewBlock">
          <h2>Live message preview</h2>
          <div className="previewCard">
            <div className="spark">✣</div>
            <p>“{preview}”</p>
            <small>Prepared for a {active.title} reveal</small>
          </div>
        </section>

        <section className="block writeBlock">
          <h2>Write the message</h2>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} maxLength={700} placeholder="Write something they will feel, not just read..." />
          <button className="outlineBtn" onClick={()=>setMsg(active.sample)}>✣ Spark the emotion</button>
          <button className="primaryBtn">▶ Preview the Cinematic Reveal</button>
          <button className="ghostBtn">Deliver this moment — $1.99</button>
        </section>

        <footer><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a></footer>
      </section>
    </main>
  </>
}
