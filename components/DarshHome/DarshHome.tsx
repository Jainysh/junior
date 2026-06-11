import { useState, useEffect } from "react";
import styles from "../../styles/DarshHome.module.css";

// ── Age ticker: counts up from Darsh's birth date ──────────────────────────
function AgeTimer({ dueDate }: { dueDate: Date }) {
  const [vals, setVals] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - dueDate.getTime();
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      const days = Math.abs(
        Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
      );
      const hours = Math.abs(
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const minutes = Math.abs(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      );
      const seconds = Math.abs(Math.floor((diff % (1000 * 60)) / 1000));
      setVals([months, days, hours, minutes, seconds]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dueDate]);

  const labels = ["Months", "Days", "Hours", "Minutes", "Seconds"];
  return (
    <div className={styles.timerDisplay}>
      {labels.map((label, i) => (
        <div
          // seconds box remounts every tick → re-fires popIn animation
          key={i === 4 ? `sec-${vals[4]}` : label}
          className={styles.timerBox}
        >
          <div className={styles.timerVal}>{vals[i]}</div>
          <div className={styles.timerLabel}>{label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Page data ───────────────────────────────────────────────────────────────
const NAME_LETTERS = ["D", "a", "r", "s", "h"];

const FLOATERS = ["✨", "🌙", "⭐", "🪁", "🦚", "💫", "☁️", "🌸"];

const MEANINGS = [
  {
    emoji: "👁️",
    title: "Sight · Vision",
    text: "From the Sanskrit दर्श (darśa) — “to see, to behold.” A beautiful glimpse, a vision worth pausing for.",
  },
  {
    emoji: "🦚",
    title: "A name of Lord Krishna",
    text: "Darsh is one of the cherished names of Lord Krishna — the one who is a delight to behold.",
  },
  {
    emoji: "🌑",
    title: "The New Moon",
    text: "In the Vedic calendar, Darsha is the night of the new moon — a quiet, auspicious new beginning.",
  },
];

// ── Main component ──────────────────────────────────────────────────────────
export default function DarshHome({ dueDate }: { dueDate: Date }) {
  return (
    <div className={styles.wrapper}>
      {/* Soft drifting glow blobs */}
      <div className={styles.bgLayer} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      {/* Floating sparkles & friends */}
      <div className={styles.floatLayer} aria-hidden="true">
        {FLOATERS.map((emoji, i) => (
          <span
            key={emoji}
            className={`${styles.floater} ${styles[`fl${i + 1}` as keyof typeof styles]}`}
          >
            {emoji}
          </span>
        ))}
      </div>

      <main className={styles.content}>
        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.babyBadge}>👶🏻</div>
          <p className={styles.kicker}>Say hello to</p>
          <h1 className={styles.name} aria-label="Darsh">
            {NAME_LETTERS.map((letter, i) => (
              <span
                key={i}
                className={styles.nameLetter}
                style={{ animationDelay: `${0.35 + i * 0.12}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className={styles.devanagari}>दर्श</p>
          <p className={styles.tagline}>
            &ldquo;a glimpse of the divine&rdquo; &nbsp;·&nbsp; pronounced{" "}
            <em>DHA-rsh</em>
          </p>
        </header>

        {/* Meaning cards */}
        <section className={styles.meanings}>
          {MEANINGS.map((m, i) => (
            <article
              key={m.title}
              className={styles.meaningCard}
              style={{ animationDelay: `${0.9 + i * 0.18}s` }}
            >
              <span className={styles.meaningEmoji}>{m.emoji}</span>
              <h2 className={styles.meaningTitle}>{m.title}</h2>
              <p className={styles.meaningText}>{m.text}</p>
            </article>
          ))}
        </section>

        {/* Age counter */}
        <section className={styles.timerCard}>
          <h2 className={styles.timerHeading}>Our little Darsh is now</h2>
          <AgeTimer dueDate={dueDate} />
        </section>

        <footer className={styles.parents}>
          With all our love,
          <br />
          <span className={styles.parentNames}>Akshitha &amp; Yash</span>
        </footer>
      </main>
    </div>
  );
}
