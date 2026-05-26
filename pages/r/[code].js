import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { THEMES } from "../../lib/themes";

export default function Reveal() {
  const router = useRouter();
  const category = router.query.category || "partner";
  const theme = THEMES[category] || THEMES.partner;
  let message = "A SecretSpark is waiting for you.";
  try {
    if (router.query.message) message = decodeURIComponent(router.query.message);
  } catch {}

  return (
    <main
      className="revealPage"
      style={{
        "--primary": theme.primary,
        "--secondary": theme.secondary,
        "--haze-a": theme.hazeA,
        "--haze-b": theme.hazeB,
        "--deep": theme.deep
      }}
    >
      <Head><title>Your SecretSpark Reveal</title></Head>
      <div className="stars" />
      <div className="fallingStar" />
      <section className="envelope">
        <div className="seal">✦</div>
        <h1>A SecretSpark is waiting</h1>
        <p className="revealMessage">“{message}”</p>
        <Link href="/" className="mainBtn">Create your own</Link>
      </section>
    </main>
  );
}
