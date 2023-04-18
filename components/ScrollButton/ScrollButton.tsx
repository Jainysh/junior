import React, { useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Home.module.css";

const ScrollButton = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    console.log(
      "called",
      window.pageYOffset,
      prevScrollPos,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const updateScrollDirection = () => {
      if (typeof window !== "undefined") {
        const currentScrollPos = window.pageYOffset;
        const maxScrollPos =
          document.documentElement.scrollHeight - window.innerHeight;

        if (currentScrollPos === maxScrollPos) {
          setDirection("up");
        } else if (currentScrollPos === 0) {
          setDirection("down");
        }
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [prevScrollPos]);

  const handleScroll = () => {
    if (direction === "up") {
      window.scrollTo({
        top: -window.innerHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <button
        className={`mb-4 z-50 border-slate-300 border animate-chevron hover:bg-slate-400 fixed right-4 bottom-4 rounded-full text-center text-lg px-4 py-1`}
        onClick={handleScroll}
      >
        {direction === "down" ? (
          <ChevronDownIcon className={`w-6 h-6 `} />
        ) : (
          <ChevronUpIcon className={`w-6 h-6 `} />
        )}
      </button>
      <style jsx>
        {`
          @keyframes moveDown {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          .animate-chevron {
            animation: moveDown 2s 2; /* Apply animation with 2 seconds duration and infinite loop */
          }
        `}
      </style>
    </>
  );
};

export default ScrollButton;
