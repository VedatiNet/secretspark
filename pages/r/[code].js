import Head from "next/head";
import Link from "next/link";

export default function Reveal() {
  return (
    <main className="revealPage">
      <Head><title>Your SecretSpark Reveal</title></Head>
      <div className="fallingStar" />
      <section className="envelope">
        <div className="seal">✦</div>
        <h1>A SecretSpark is waiting</h1>
        <p>This is the cinematic reveal preview. The full delivery system will connect to Supabase and payments in the next phase.</p>
        <Link href="/" className="mainBtn">Create your own</Link>
      </section>
    </main>
  );
}
