import { useState, useEffect, useRef } from "react";
import React from "react";

export const TypeWriter = ({
  children,
  speed = 30,
  delay = 0,
  onComplete,
}: {
  children: React.ReactNode;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Update onCompleteRef when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Combined useEffect for both string and non-string children
  useEffect(() => {
    setCurrentIndex(0);
    setIsComplete(false);

    if (typeof children === "string") {
      // Handle string children (typing effect)
      const typeText = () => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= (children as string).length) {
            setIsComplete(true);
            onCompleteRef.current?.();
          }
          return next;
        });
        if (currentIndex + 1 < (children as string).length) {
          timeoutRef.current = setTimeout(typeText, speed);
        }
      };

      timeoutRef.current = setTimeout(typeText, delay + speed);
    } else {
      // Handle non-string children
      timeoutRef.current = setTimeout(() => {
        setIsComplete(true);
        onCompleteRef.current?.();
      }, delay + 300);
    }

    // Cleanup timeout on unmount or dependency change
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [children, speed, delay, currentIndex]);

  // Render logic
  if (typeof children === "string") {
    const text = typeof children === "string" ? children : "";
    const shown = text.slice(0, currentIndex);

    return (
      <>
        {shown}
        {!isComplete && <span className="animate-pulse">|</span>}
      </>
    );
  }

  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="animate-pulse">|</span>
      <span className="text-muted-foreground">Typing...</span>
    </div>
  );
};
