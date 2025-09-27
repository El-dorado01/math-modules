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
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  if (typeof children === "string") {
    useEffect(() => {
      setCurrentIndex(0);
      setIsComplete(false);

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

      return () => {
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      };
    }, [children, speed, delay]);

    const text = typeof children === "string" ? children : "";
    const shown = text.slice(0, currentIndex);

    return (
      <>
        {shown}
        {!isComplete && <span className="animate-pulse">|</span>}
      </>
    );
  }

  useEffect(() => {
    setIsComplete(false);
    timeoutRef.current = setTimeout(() => {
      setIsComplete(true);
      onCompleteRef.current?.();
    }, delay + 300);

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [children, delay]);

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
