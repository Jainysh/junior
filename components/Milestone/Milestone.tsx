import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ScrollButton from "../ScrollButton/ScrollButton";

const Milestones = () => {
  const milestones = [
    {
      date: "January 2023",
      event:
        "Found out we are expecting",
    },
    {
      date: "April 2023",
      event: "Baby gender reveal party",
    },
    {
      date: "August 2023",
      event: "Nursery decoration",
    },
    {
      date: "November 2023",
      event: "Baby shower celebration",
    },
    {
      date: "December 2023",
      event: "Baby's arrival!",
    },
  ];

  const milestonesRef = useRef<HTMLDivElement[]>([]);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  useEffect(() => {
    milestonesRef.current.forEach((ref, index) => {
      if (inView) {
        const delay = index * 0.2;
        ref.style.overflow = "hidden";
        ref.style.animation = `milestoneSlide 0.5s ease-in-out ${delay}s both`;
        ref.style.visibility = "visible";
      } else {
        ref.style.animation = "";
        ref.style.visibility = "hidden";
      }
    });
  }, [inView]);

  return (
    <section className="py-8 px-4 md:px-8 bg-gray-100 overflow-hidden flex flex-col justify-between" style={{minHeight: '100vh'}}>
      <div className="container mx-auto">
        <h2 className="text-3xl text-gray-600 font-semibold py-4">Milestones</h2>
        <ul className="display-flex flex-column">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} milestone={milestone} index={index} />
          ))}
        </ul>
      </div>
      <ScrollButton direction="up" textColor="text-gray-700"/>
    </section>
  );
};
const MilestoneCard = ({
  milestone,
  index,
}: {
  milestone: { date: string; event: string };
  index: number;
}) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  const slideDirection =
    index % 2 === 0 ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <li
      className={`flex flex-wrap md:flex-nowrap items-center opacity-0 transform rounded-lg bg-white my-4 p-4 shadow ${
        inView ? slideDirection : ""
      }`}
      ref={inViewRef}
    >
      <div className="flex-shrink-0">
        <div className="bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center mr-2 md:mr-8">
          <span className="text-white font-bold text-xl">{index + 1}</span>
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-lg text-gray-400 font-semibold">{milestone.date}</p>
        <p className="text-base text-gray-600">{milestone.event}</p>
      </div>
      <style jsx>{`
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-in-out both;
          overflow: hidden;
          animation-delay: ${0.2 * index}s;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-in-out both;
          animation-delay: ${0.2 * index}s;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </li>
  );
};

export default Milestones;
