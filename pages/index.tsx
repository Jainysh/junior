import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type DateTime = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
};
export default function Home() {
  const [daysLeft, setDaysLeft] = useState<DateTime>();

  // bug in time calculation
  const diff_hours = () => {
    const today = new Date();
    const deliveryDate = new Date("July 22, 2023 00:00:01");
    var diff = (deliveryDate.getTime() - today.getTime()) / 1000;


    const seconds = Math.abs(Math.round(diff));
    const minutes = Math.abs(Math.round(seconds / 60));
    const hours = Math.abs(Math.round(minutes / (60)));
    const days = Math.abs(Math.round(hours / 24));
    const months = Math.abs(
      Math.round(deliveryDate.getMonth() - today.getMonth())
    );
    setDaysLeft({
      seconds: seconds%(60),
      minutes: minutes%(60),
      hours: hours%(24),
      days: days%(30),
      months,
    });
    console.log(seconds,minutes)
  };

  useEffect(() => {
    const interval = setInterval(() => diff_hours(), 1000);
    return () => clearInterval(interval)
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center align-center font-mono text-sm lg:flex">
        <div className="top-0  justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {/* <div> */}
          Join us in welcoming our junior champ🤞🏻
        </div>
        {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"> */}
        {/* <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a> */}
        {/* </div> */}
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          {daysLeft?.months} months | {daysLeft?.days} days | {daysLeft?.hours}{" "}
          hours | {daysLeft?.minutes} min | {daysLeft?.seconds} secs
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* {timeLeft} */}
      </div>
    </main>
  );
}
