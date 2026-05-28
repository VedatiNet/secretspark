import Head from "next/head";
import Link from "next/link";

export default function Page() {
  return (
    <main className="legal">
      <Head><title>Privacy Policy — SecretSpark</title></Head>
      <article>
        <Link href="/">← Back</Link>
        <h1>Privacy Policy</h1>
        <p>SecretSpark may store message text, category, delivery links, timestamps, and basic events needed to provide the service.</p>
      </article>
    </main>
  );
}
