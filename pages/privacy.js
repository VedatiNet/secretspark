import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <main className="legalPage">
      <Head><title>Privacy Policy — SecretSpark</title></Head>
      <article className="legalCard">
        <Link href="/" className="back">← Back</Link>
        <h1>Privacy Policy</h1>
        <p>SecretSpark may store message text, reveal category, generated links, timestamps, and basic usage events needed to deliver the experience.</p>
        <h2>Third parties</h2>
        <p>Hosting, database, analytics, and payment providers may process data required for the service.</p>
        <h2>Security</h2>
        <p>We design reveal links to be difficult to guess and avoid public listing of private messages.</p>
      </article>
    </main>
  );
}
