// pages/index.js

import React from "react";
import styles from "../styles/Home.module.css";
import CountdownTimer from "@/components/Countdown/countdown";
import Milestones from "@/components/Milestone/Milestone";
import ScrollButton from "@/components/ScrollButton/ScrollButton";

const HomePage = () => {
  // Define your due date here
  const dueDate = new Date("July 22, 2023 00:00:01");

  return (
    <>
      <div className={styles.gradientBg}>
        <div
          className="flex flex-col justify-around items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="flex flex-col items-center">
            <div className={styles.timerContainer}>
              <CountdownTimer dueDate={dueDate} message="Awwwaiting!" />
            </div>
            <div className={styles.container}>
              <div className={styles.greetingContainer}>
                <h1 className={styles.greetingText}>
                  Welcome to Our Junior&apos;s Website
                </h1>
                <p className={styles.subText}>
                  We are excitedly awaiting our little bundle of joy!
                </p>
              </div>
            </div>
          </div>
          <ScrollButton direction="down" />
        </div>
        <Milestones />
      </div>
    </>
  );
};

export default HomePage;
