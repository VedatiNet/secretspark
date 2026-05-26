import Head from "next/head";
import Link from "next/link";
export default function Reveal() {
  return (
    <main className="reveal">
      <Head><title>SecretSpark Reveal</title></Head>
      <div className="shootingStar" />
      <section className="letter">
        <div className="seal">✦</div>
        <h1>A SecretSpark is waiting</h1>
        <p>This is the cinematic reveal preview. Next phase: real Supabase messages, paid delivery, and private links.</p>
        <Link href="/" className="previewBtn">Create your own</Link>
      </section>
    </main>
  );
}