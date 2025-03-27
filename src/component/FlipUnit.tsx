import React, { useRef, useEffect } from "react";
import FlipCard from "./flipCard";
import type { FlipCardHandleInterface } from "./flipCard/interfaces";

interface FlipUnitProps {
  digit: string | number;
  prevDigit: string | number;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ digit, prevDigit }) => {
  const flipCardRef = useRef<FlipCardHandleInterface>(null);

  useEffect(() => {
    if (digit !== prevDigit) {
      // 调用 FlipCard 的翻转方法
      flipCardRef.current?.flipDown(prevDigit, digit);
    }
  }, [digit, prevDigit]);

  return (
    <div className="relative w-20 h-25">
      <FlipCard ref={flipCardRef} initFrontText={prevDigit.toString()} initBackText={digit.toString()} duration={600} />
    </div>
  );
};

export default FlipUnit;