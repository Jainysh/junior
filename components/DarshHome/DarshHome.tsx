import { useState, useEffect } from "react";
import styles from "../../styles/DarshHome.module.css";

// ── Gear polygon points centered at (cx, cy) ──────────────────────────────
function gearPts(
  cx: number,
  cy: number,
  R: number,
  r: number,
  teeth: number
): string {
  return Array.from({ length: teeth * 2 }, (_, i) => {
    const a = (i * Math.PI) / teeth - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    return `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

// ── Gear SVG: the gear is centered in its own SVG canvas ──────────────────
function Gear({
  size,
  teeth,
  className,
}: {
  size: number;
  teeth: number;
  className?: string;
}) {
  const c = size / 2;
  const R = c * 0.88;
  const r = c * 0.60;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      <polygon points={gearPts(c, c, R, r, teeth)} className={styles.gearFill} />
      <circle cx={c} cy={c} r={c * 0.22} className={styles.gearHole} />
      <circle cx={c} cy={c} r={c * 0.10} className={styles.gearPin} />
    </svg>
  );
}

// ── Neumorphic timer — seconds box remounts every tick via key change ──────
function GarageTimer({ dueDate }: { dueDate: Date }) {
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
          // seconds box remounts every tick → re-fires tickIn animation
          key={i === 4 ? `sec-${vals[4]}` : label}
          className={styles.timerBox}
        >
          <div className={styles.timerVal}>{vals[i] || "--"}</div>
          <div className={styles.timerLabel}>{label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
const FLOATERS = ["💻", "🔧", "🧰", "🤖", "📐", "🔩"];

export default function DarshHome({ dueDate }: { dueDate: Date }) {
  return (
    <div className={styles.wrapper}>
      {/* Background gear pairs */}
      <div className={styles.bgLayer} aria-hidden="true">
        <Gear size={200} teeth={13} className={`${styles.bgGear} ${styles.bgG1}`} />
        <Gear size={140} teeth={9}  className={`${styles.bgGear} ${styles.bgG2}`} />
        <Gear size={170} teeth={11} className={`${styles.bgGear} ${styles.bgG3}`} />
        <Gear size={110} teeth={7}  className={`${styles.bgGear} ${styles.bgG4}`} />
      </div>

      {/* Floating tech items */}
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

      {/* Central content */}
      <main className={styles.contentCard}>
        <div className={styles.babyBadge}>👶🏻</div>
        <h2 className={styles.title}>Welcome to Darsh&apos;s Garage</h2>
        <p className={styles.subtitle}>
          Baby to the excited parents:
          <br />
          Akshitha and Yash
        </p>

        {/* Machine card: gears → shaft → timer */}
        <div className={styles.machineCard}>
          {/* Gear train */}
          <div className={styles.gearRow}>
            {/* Gear 1: 72px, 9 teeth, 9s CW */}
            <Gear size={72} teeth={9} className={`${styles.mg} ${styles.mg1}`} />
            {/* Gear 2: 52px, 7 teeth, 7s CCW — meshing with gear 1 */}
            <Gear size={52} teeth={7} className={`${styles.mg} ${styles.mg2}`} />
            {/* Gear 3: 38px, 5 teeth, 5s CW — meshing with gear 2; drives the timer */}
            <Gear size={38} teeth={5} className={`${styles.mg} ${styles.mg3}`} />
          </div>

          {/* Output shaft connecting gear train to timer display */}
          <div className={styles.shaft}>
            <div className={styles.shaftLine} />
            <div className={styles.shaftArrow} />
          </div>

          {/* Timer powered by the gear train above */}
          <GarageTimer dueDate={dueDate} />
        </div>
      </main>
    </div>
  );
}
