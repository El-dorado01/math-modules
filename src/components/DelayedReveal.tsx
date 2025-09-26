import { useState, useEffect, useRef } from "react";
import React from "react";

export const DelayedReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  if (!isVisible) return null;

  return <div className="animate-fade-in">{children}</div>;
};
