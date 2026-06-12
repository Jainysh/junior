import React from "react";
import { GetServerSideProps } from "next";
import styles from "../styles/Home.module.css";
import CountdownTimer from "@/components/Countdown/countdown";
import DarshHome from "@/components/DarshHome/DarshHome";

const DAUGHTER_DATE = new Date("July 11, 2023 04:37:00");
const SON_DATE = new Date("2026-05-14T10:58:00");

const DARSH_SUBDOMAINS = ["junior", "darsh", "localhost"];

interface HomePageProps {
  isDarsh: boolean;
}

const HomePage = ({ isDarsh }: HomePageProps) => {
  const dueDate = isDarsh ? SON_DATE : DAUGHTER_DATE;

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host ?? "";
  const subdomain = host.split(":")[0].split(".")[0].toLowerCase();
  const isDarsh = DARSH_SUBDOMAINS.includes(subdomain);

  return { props: { isDarsh } };
};

export default HomePage;
