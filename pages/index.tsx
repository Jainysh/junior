// pages/index.js

import React from "react";
import styles from "../styles/Home.module.css";
import CountdownTimer from "@/components/Countdown/countdown";
import Milestones from "@/components/Milestone/Milestone";
import ScrollButton from "@/components/ScrollButton/ScrollButton";

const HomePage = () => {
  // Define your due date here
  const dueDate = new Date("July 11, 2023 04:37:00");

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
              <div className={styles.timerContainer}>
                <CountdownTimer dueDate={dueDate} message="I am growing!" />
              </div>
              {/* <p className={styles.subText}>
                  We are excited to welcome our little princess!
                </p> */}
            </div>
          </div>
        </div>
        <a
          href="recommend-name"
          className={`mb-4 z-50 border-slate-300 border hover:bg-slate-400 rounded-full text-center text-lg px-4 py-1`}
        >
          Recommend me a name
        </a>
        {/* <ScrollButton/> */}
      </div>
      {/* <Milestones /> */}
    </>
  );
};

export default HomePage;
