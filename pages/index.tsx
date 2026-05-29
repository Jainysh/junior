// pages/index.js

import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import CountdownTimer from "@/components/Countdown/countdown";
import Milestones from "@/components/Milestone/Milestone";
import ScrollButton from "@/components/ScrollButton/ScrollButton";

const DAUGHTER_DATE = new Date("July 11, 2023 04:37:00");
const SON_DATE = new Date("2026-05-14T10:58:00");

const HomePage = () => {
  const [dueDate, setDueDate] = useState(DAUGHTER_DATE);

  useEffect(() => {
    const subdomain = window.location.hostname.split(".")[0];
    if (subdomain === "junior") {
      setDueDate(SON_DATE);
    }
  }, []);

  return (
    <>
      <div
        className="flex flex-col justify-around items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-col items-center">
          <div className={styles.container}>
            <div className={styles.greetingContainer}>
              <h2 className={styles.greetingText}>
                Welcome to my Website.
              </h2>
              <h2 className="text-lg">Baby to the excited parents: <br/>Akshitha and Yash</h2>
              <div className={`mt-4 ${styles.timerContainer}`}>
                <CountdownTimer dueDate={dueDate} message="I am growing!" />
              </div>
              {/* <p className={styles.subText}>
                  We are excited to welcome our little princess!
                </p> */}
            </div>
          </div>
        </div>
        <a
          href="name-suggestion"
          className="mb-4 z-50 text-center text-lg px-6 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(255,255,255,0.45)",
            color: "#fff",
            fontWeight: 600,
            letterSpacing: "0.3px",
            boxShadow:
              "0 4px 18px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
            transition: "all 0.2s ease",
            textDecoration: "none",
          }}
        >
          Name our Baby Boy 👶🏻
        </a>
        {/* <ScrollButton/> */}
      </div>
      {/* <Milestones /> */}
    </>
  );
};

export default HomePage;
