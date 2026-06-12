import { useState, useEffect } from "react";
import styles from "../../styles/DarshHome.module.css";

function AgeTimer({ dueDate }: { dueDate: Date }) {
  const [vals, setVals] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - dueDate.getTime();
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      const days = Math.abs(
        Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
      );
      const hours = Math.abs(
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      const minutes = Math.abs(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
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

const NAME_LETTERS = ["D", "a", "r", "s", "h"];

export default function DarshHome({ dueDate }: { dueDate: Date }) {
  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
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
          <p className={styles.meaningLine}>
            <em className={styles.dictWord}>darsh</em>{" "}
            <em className={styles.dictPos}>n.</em> vision; auspicious sight; one
            who perceives the beautiful.
          </p>
        </header>

        <section className={styles.timerCard}>
          <h2 className={styles.timerHeading}>Our little Darsh is now</h2>
          <AgeTimer dueDate={dueDate} />
        </section>

        <footer className={styles.parents}>
          With all our love,
          <br />
          <span className={styles.parentNames}>
            Akshitha, Yash &amp; Family
          </span>
        </footer>
      </main>
    </div>
  );
}
