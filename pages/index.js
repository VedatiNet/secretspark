import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { THEMES } from "../lib/themes";

const categories = Object.values(THEMES);

function enhanceMessage(text, theme) {
  const clean = text.trim();
  if (!clean) {
    return {
      message: theme.placeholder,
      note: theme.sparkLine
    };
  }

  const endings = {
    partner: " — because some feelings deserve to arrive beautifully.",
    family: " — because home is a feeling, not just a place.",
    friends: " — because memories become brighter when they are shared.",
    work: " — with appreciation, clarity, and respect."
  };

  const alreadyLong = clean.length > 120;
  return {
    message: alreadyLong ? clean : clean + endings[theme.key],
    note: theme.sparkLine
  };
}

export default function Home() {
  const [category, setCategory] = useState("partner");
  const [message, setMessage] = useState("");
  const [sparked, setSparked] = useState(false);
  const [toast, setToast] = useState("");
  const theme = THEMES[category];

  const enhanced = useMemo(() => {
    if (!sparked) return null;
    return enhanceMessage(message, theme);
  }, [sparked, message, theme]);

  const previewText = useMemo(() => {
    const base = enhanced?.message || message.trim() || "Your words will appear here as a soft preview before the cinematic reveal.";
    return base.length > 165 ? base.slice(0, 165) + "..." : base;
  }, [enhanced, message]);

  const handleSpark = () => {
    setSparked(true);
    setToast(theme.sparkLine);
    window.setTimeout(() => setToast(""), 1800);
  };

  const handleCategory = (key) => {
    setCategory(key);
    setSparked(false);
  };

  return (
    <>
      <Head>
        <title>SecretSpark — Turn emotions into unforgettable moments</title>
        <meta name="description" content="Create cinematic emotional reveal messages for people who matter." />
        <meta name="theme-color" content={theme.deep} />
      </Head>

      <main
        className="page"
        style={{
          "--primary": theme.primary,
          "--secondary": theme.secondary,
          "--haze-a": theme.hazeA,
          "--haze-b": theme.hazeB,
          "--accent-soft": theme.accentSoft,
          "--deep": theme.deep
        }}
      >
        <div className="stars" />
        <div className="softHaze hazeLeft" />
        <div className="softHaze hazeRight" />
        <div className="vignette" />

        {toast && <div className="toast">{toast}</div>}

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
                    onClick={() => handleCategory(item.key)}
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
              <div className={`previewCard ${sparked ? "sparked" : ""}`}>
                <div className="spark">✣</div>
                <blockquote>“{previewText}”</blockquote>
                <p>{sparked ? enhanced?.note : `Prepared for a ${theme.label} reveal`}</p>
              </div>
            </div>

            <div className="panel compose">
              <label className="label" htmlFor="message">Write the message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setSparked(false);
                }}
                maxLength={2200}
                placeholder={theme.placeholder}
              />

              <div className="counter">{message.length}/2200</div>

              <button className="ghostBtn" type="button" onClick={handleSpark}>
                ✣ Spark the emotion
              </button>

              <Link
                className="mainBtn"
                href={{
                  pathname: "/r/demo",
                  query: { category, message: encodeURIComponent(previewText) }
                }}
              >
                ▶ Preview the Cinematic Reveal
              </Link>

              <button className="approveBtn" type="button" onClick={() => setToast("Payment + secret link comes in the next backend phase")}>
                Approve reveal to continue
              </button>
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
