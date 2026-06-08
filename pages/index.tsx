import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import CountdownTimer from "@/components/Countdown/countdown";
import DarshHome from "@/components/DarshHome/DarshHome";

const DAUGHTER_DATE = new Date("July 11, 2023 04:37:00");
const SON_DATE = new Date("2026-05-14T10:58:00");

const DARSH_SUBDOMAINS = ["junior", "darsh"];

const HomePage = () => {
  const [dueDate, setDueDate] = useState(DAUGHTER_DATE);
  const [isDarsh, setIsDarsh] = useState(false);

  useEffect(() => {
    const subdomain = window.location.hostname.split(".")[0].toLowerCase();
    if (DARSH_SUBDOMAINS.includes(subdomain)) {
      setIsDarsh(true);
      setDueDate(SON_DATE);
    }
  }, []);

  if (isDarsh) {
    return <DarshHome dueDate={dueDate} />;
  }

  return (
    <>
      <div
        className="flex flex-col justify-around items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-col items-center">
          <div className={styles.container}>
            <div className={styles.greetingContainer}>
              <h2 className={styles.greetingText}>Welcome to my Website.</h2>
              <h2 className="text-lg">
                Baby to the excited parents: <br />
                Akshitha and Yash
              </h2>
              <div className={`mt-4 ${styles.timerContainer}`}>
                <CountdownTimer dueDate={dueDate} message="I am growing!" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
