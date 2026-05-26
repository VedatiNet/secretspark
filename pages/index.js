import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { THEMES } from "../lib/themes";

const categories = Object.values(THEMES);

export default function Home() {
  const [category, setCategory] = useState("partner");
  const [message, setMessage] = useState("");
  const theme = THEMES[category];

  const previewText = useMemo(() => {
    const clean = message.trim();
    if (!clean) {
      return "Your words will appear here as a soft preview before the cinematic reveal.";
    }
    return clean.length > 145 ? clean.slice(0, 145) + "..." : clean;
  }, [message]);

  return (
    <>
      <Head>
        <title>SecretSpark — Turn emotions into unforgettable moments</title>
        <meta name="description" content="Create cinematic emotional reveal messages for people who matter." />
        <meta property="og:title" content="SecretSpark" />
        <meta property="og:description" content="Turn emotions into unforgettable moments." />
        <meta name="theme-color" content={theme.deep} />
      </Head>

      <main
        className="page"
        style={{
          "--primary": theme.primary,
          "--secondary": theme.secondary,
          "--soft": theme.soft,
          "--deep": theme.deep
        }}
      >
        <div className="stars" />
        <div className="orb orbA" />
        <div className="orb orbB" />
        <section className="shell">
          <header className="hero">
            <div className="brandWrap">
              <h1>SecretSpark</h1>
              <p>Turn emotions into unforgettable moments.</p>
              <div className="price">$1.99 per SecretSpark moment</div>
            </div>

            <div className="categoryBlock">
              <div className="label">Choose the feeling</div>
              <div className="categoryGrid">
                {categories.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`cat ${item.key === category ? "active" : ""}`}
                    onClick={() => setCategory(item.key)}
                    aria-pressed={item.key === category}
                  >
                    <span className="catIcon">{item.icon}</span>
                    <strong>{item.label}</strong>
                    <small>{item.sub}</small>
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className="experience">
            <div className="panel preview">
              <div className="label">Live message preview</div>
              <div className="previewCard">
                <div className="spark">✣</div>
                <blockquote>“{previewText}”</blockquote>
                <p>Prepared for a {theme.label} reveal</p>
              </div>
            </div>

            <div className="panel compose">
              <label className="label" htmlFor="message">Write the message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2200}
                placeholder={theme.quote}
              />
              <button className="ghostBtn" type="button">✣ Spark the emotion</button>
              <Link className="mainBtn" href="/r/demo">
                ▶ Preview the Cinematic Reveal
              </Link>
              <button className="approveBtn" type="button">Approve reveal to continue</button>
            </div>
          </section>

          <footer className="footer">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </footer>
        </section>
      </main>
    </>
  );
}
