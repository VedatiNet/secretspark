import { useMemo, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { THEMES, SUGGESTIONS } from "../lib/themes";
const categories = Object.values(THEMES);
export default function Home() {
  const [category,setCategory]=useState("partner");
  const [message,setMessage]=useState("");
  const [sparked,setSparked]=useState(false);
  const suggestionIndex=useRef({partner:0,family:0,friends:0,work:0});
  const theme=THEMES[category];
  const previewText=useMemo(()=>{const clean=message.trim(); if(!clean)return "Your words will appear here as a soft preview before the cinematic reveal."; return clean.length>150?clean.slice(0,150)+"...":clean;},[message]);
  function sparkEmotion(){const list=SUGGESTIONS[category]||[]; if(list.length){const i=suggestionIndex.current[category]%list.length; setMessage(list[i]); suggestionIndex.current[category]=i+1;} setSparked(true); setTimeout(()=>setSparked(false),1050);}
  function changeCategory(c){setCategory(c); setMessage("");}
  return <><Head><title>SecretSpark</title><meta name="theme-color" content={theme.deep}/></Head><main className={`app ${sparked?"sparked":""}`} style={{"--primary":theme.primary,"--second":theme.second,"--soft":theme.soft,"--deep":theme.deep,"--cta":theme.cta}}>
    <div className="grain"/><div className="stars"/><div className="ambient ambientLeft"/><div className="ambient ambientRight"/>
    {sparked&&<div className="sparkBurst"><span>✦</span><span>✧</span><span>✣</span><span>✦</span></div>}
    <section className="wrap"><header className="top"><div className="brand"><h1>SecretSpark</h1><p>Turn emotions into unforgettable moments.</p><strong>$1.99 per SecretSpark moment</strong></div><div className="selector"><div className="eyebrow">Choose the feeling</div><div className="cats">{categories.map(item=><button className={`cat ${category===item.key?"active":""}`} key={item.key} onClick={()=>changeCategory(item.key)} type="button"><span>{item.icon}</span><b>{item.label}</b><small>{item.sub}</small></button>)}</div></div></header>
    <section className="mainGrid"><div className="preview"><div className="eyebrow">Live message preview</div><article className="previewCard"><div className="sparkIcon">✣</div><p>“{previewText}”</p><small>Prepared for a {theme.label} reveal</small></article></div>
    <div className="composer"><label className="eyebrow" htmlFor="msg">Write the message</label><div className="textareaWrap"><textarea id="msg" value={message} maxLength={2200} placeholder={theme.quote} onChange={e=>setMessage(e.target.value)}/><small>{message.length}/2200</small></div><button onClick={sparkEmotion} className="sparkBtn" type="button">✦ Spark the emotion</button><Link className="previewBtn" href="/r/demo">▶ Preview the Cinematic Reveal</Link><button className="approveBtn" type="button">Approve reveal to continue</button></div></section>
    <footer><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/contact">Contact</Link></footer></section></main></>
}