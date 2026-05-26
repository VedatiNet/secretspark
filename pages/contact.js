import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="legalPage">
      <Head><title>Contact — SecretSpark</title></Head>
      <article className="legalCard">
        <Link href="/" className="back">← Back</Link>
        <h1>Contact</h1>
        <p>For support, questions, or abuse reports:</p>
        <p><strong>support@secretspark.me</strong></p>
      </article>
    </main>
  );
}
