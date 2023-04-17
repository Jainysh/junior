import React from 'react';

type ScrollButtonProps = {
  direction: 'up' | 'down',
  textColor?: string
}
const ScrollButton = ({direction, textColor=""}:ScrollButtonProps) => {
  const handleScroll = () => {
    if(direction === 'down') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: -window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      className={`mb-4 border-slate-300 border hover:bg-slate-400 self-center rounded-full text-center ${textColor} text-lg px-4 py-1`}
      onClick={handleScroll}
    >
      {direction === 'down'? 'Scroll below to see more' : 'Scroll top'}
    </button>
  );
};

export default ScrollButton;
