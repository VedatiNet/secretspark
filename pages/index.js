import { useMemo, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { THEMES, SUGGESTIONS } from "../lib/themes";

const categories = Object.values(THEMES);

export default function Home() {
  const [category, setCategory] = useState("partner");
  const [message, setMessage] = useState("");
  const [sparked, setSparked] = useState(false);
  const [revealOpen, setRevealOpen] = useState(false);
  const suggestionIndex = useRef({ partner: 0, family: 0, friends: 0, work: 0 });
  const theme = THEMES[category];

  const previewText = useMemo(() => {
    const clean = message.trim();
    if (!clean) return "Your words will appear here as a soft preview before the cinematic reveal.";
    return clean.length > 190 ? clean.slice(0, 190) + "..." : clean;
  }, [message]);

  function sparkEmotion() {
    const list = SUGGESTIONS[category] || [];
    if (list.length) {
      const index = suggestionIndex.current[category] % list.length;
      setMessage(list[index]);
      suggestionIndex.current[category] = index + 1;
    }
    setSparked(true);
    window.setTimeout(() => setSparked(false), 900);
  }

  function changeCategory(next) {
    setCategory(next);
    setMessage("");
  }

  function openReveal() {
    setRevealOpen(false);
    window.setTimeout(() => setRevealOpen(true), 30);
  }

  return (
    <>
      <Head>
        <title>SecretSpark</title>
        <meta name="description" content="Turn emotions into unforgettable moments." />
        <meta name="theme-color" content="#050611" />
      </Head>

      <main className="app" style={{ "--primary": theme.primary, "--second": theme.second, "--soft": theme.soft }}>
        <div className="stars" />
        <section className="wrap">
          <header className="top">
            <div className="brand">
              <h1>SecretSpark</h1>
              <p>Turn emotions into unforgettable moments.</p>
              <strong>$1.99 per SecretSpark moment</strong>
            </div>

            <div className="selector">
              <div className="eyebrow">Choose the feeling</div>
              <div className="cats">
                {categories.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`cat ${category === item.key ? "active" : ""}`}
                    onClick={() => changeCategory(item.key)}
                  >
                    <span>{item.icon}</span>
                    <b>{item.label}</b>
                    <small>{item.sub}</small>
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className="mainGrid">
            <div>
              <div className="eyebrow">Live message preview</div>
              <article className="previewCard">
                <div className="sparkIcon">✣</div>
                <p>“{previewText}”</p>
                <small>Prepared for a {theme.label} reveal</small>
              </article>
            </div>

            <div>
              <label className="eyebrow" htmlFor="msg">Write the message</label>
              <div className="textareaWrap">
                <textarea
                  id="msg"
                  value={message}
                  maxLength={2200}
                  placeholder={theme.quote}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <small>{message.length}/2200</small>
              </div>

              <button className="sparkBtn" type="button" onClick={sparkEmotion}>✦ Spark the emotion</button>
              <button className="previewBtn" type="button" onClick={openReveal}>▶ Preview the Cinematic Reveal</button>
              <button className="approveBtn" type="button">Approve reveal to continue</button>
            </div>
          </section>

          <footer>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </footer>
        </section>

        {sparked && <div className="sparkBurst"><span>✦</span><span>✧</span><span>✣</span><span>✦</span></div>}

        {revealOpen && (
          <section className="originalReveal" role="dialog" aria-modal="true">
            <button className="closeReveal" type="button" onClick={() => setRevealOpen(false)}>×</button>
            <div className="revealSky" />
            <div className="loadingText">Loading Secret Spark</div>

            <div className="orbStage">
              <div className="orbRing ringA" />
              <div className="orbRing ringB" />
              <div className="orbRing ringC" />
              <div className="darkOrb" />
            </div>

            <div className="implosion">
              {Array.from({ length: 46 }).map((_, i) => (
                <i key={i} style={{ "--i": i }} />
              ))}
            </div>

            <div className="whiteFlash" />

            <div className="finalReveal">
              <div className="finalCard">
                <div className="finalIcon">✦</div>
                <p>“{previewText}”</p>
                <small>— Heart Moment</small>
              </div>
              <div className="approval">
                <span>Does this reveal feel perfect?</span>
                <div>
                  <button type="button" onClick={() => setRevealOpen(false)}>Edit</button>
                  <button type="button" className="approveMini">Approve</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
