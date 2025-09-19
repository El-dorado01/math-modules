"use client";

import React, { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";
import "mathlive/static.css";

const MathEditor: React.FC = () => {
  const mathfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    MathfieldElement.fontsDirectory = "/fonts";
    MathfieldElement.soundsDirectory = "/sounds";

    // Create a new MathfieldElement
    const mathfield = new MathfieldElement();

    // Append it to the container div
    if (mathfieldRef.current) {
      mathfieldRef.current.appendChild(mathfield);
    }

    // Cleanup on unmount
    return () => {
      if (mathfieldRef.current) {
        mathfieldRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div className="border border-red-500" ref={mathfieldRef} />;
};

export default MathEditor;
