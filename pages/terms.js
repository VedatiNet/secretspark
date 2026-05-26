import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <main className="legalPage">
      <Head><title>Terms of Use — SecretSpark</title></Head>
      <article className="legalCard">
        <Link href="/" className="back">← Back</Link>
        <h1>Terms of Use</h1>
        <p>SecretSpark lets users create emotional reveal messages. Users are responsible for the content they submit.</p>
        <h2>Acceptable use</h2>
        <p>Do not use SecretSpark for harassment, threats, illegal content, spam, impersonation, or abusive messages.</p>
        <h2>Payments and refunds</h2>
        <p>Paid moments are digital experiences. Refund eligibility may depend on whether a reveal was created, delivered, or opened.</p>
        <h2>Limitations</h2>
        <p>SecretSpark is provided as-is and may change as the product evolves.</p>
      </article>
    </main>
  );
}
