import { useCallback } from "react";
import { DelayedReveal } from "@/components/DelayedReveal";
import {
  Calculator,
  CheckCircle,
  FileText,
  Hash,
  Ruler,
  Target,
  X,
  BookOpen,
  Lightbulb,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import React from "react";
import { TypeWriter } from "@/components/Type_Writer";

export enum Base {
  Binary = "2",
  Octal = "8",
  Decimal = "10",
  Hexadecimal = "16",
  Ternary = "3",
  Septenary = "7",
  Duodecimal = "12",
  Base36 = "36",
}

interface Result {
  base: string;
  value: string;
}

interface ChatMessage {
  type: "user" | "system";
  message: React.ReactNode;
  id: number;
  isTyping?: boolean;
}

export const useBaseConverter = () => {
  const isValidNumber = useCallback((num: string, base: number): boolean => {
    if (!num) return false;
    const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
    return num
      .toUpperCase()
      .split("")
      .every((char) => validChars.includes(char));
  }, []);

  const formatSuperscript = useCallback(
    (base: string, exponent: number): string => {
      const superscripts = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
      return (
        base +
        exponent
          .toString()
          .split("")
          .map((digit) => superscripts[parseInt(digit)])
          .join("")
      );
    },
    []
  );

  const formatSubscript = useCallback(
    (text: string, subscript: string): string => {
      const subscripts = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
      const subText = subscript
        .split("")
        .map((digit) => subscripts[parseInt(digit)] || digit)
        .join("");
      return text + subText;
    },
    []
  );

  const convertNumber = useCallback(
    (
      inputValue: string,
      fromBase: Base,
      toBase: Base,
      setResults: (results: Result[]) => void,
      addMessages: (
        messages: { type: "user" | "system"; message: React.ReactNode }[]
      ) => void
    ) => {
      if (!inputValue.trim()) {
        addMessages([
          {
            type: "user",
            message: `Convert "${inputValue}" from base ${fromBase} to base ${toBase}`,
          },
          {
            type: "system",
            message: (
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 mt-0.5 text-amber-500" />
                <TypeWriter speed={30}>
                  I need a number to work with! Please enter a valid number and
                  I&apos;ll show you exactly how to convert it step by step.
                </TypeWriter>
              </div>
            ),
          },
        ]);
        return;
      }

      const fromBaseNum = parseInt(fromBase);
      const toBaseNum = parseInt(toBase);

      if (!isValidNumber(inputValue, fromBaseNum)) {
        const validDigits =
          fromBaseNum <= 10
            ? "0123456789".slice(0, fromBaseNum)
            : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, fromBaseNum);

        addMessages([
          {
            type: "user",
            message: `Convert "${inputValue}" from base ${fromBase} to base ${toBase}`,
          },
          {
            type: "system",
            message: (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-0.5 text-red-500" />
                  <TypeWriter speed={30}>
                    "{inputValue}" isn&apos;t valid in base
                    {formatSubscript("", fromBase)}!
                  </TypeWriter>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 mt-0.5 text-blue-500" />
                  <TypeWriter speed={30}>
                    Remember: Base{formatSubscript("", fromBase)} only uses
                    these digits: {validDigits}
                  </TypeWriter>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-500" />
                  <TypeWriter speed={30}>
                    Tip: In base{formatSubscript("", fromBase)}, each digit
                    position represents a power of {fromBase}. Make sure all
                    your digits are less than {fromBase}!
                  </TypeWriter>
                </div>
              </div>
            ),
          },
        ]);
        return;
      }

      try {
        const decimalValue = parseInt(inputValue.toUpperCase(), fromBaseNum);
        const convertedValue = decimalValue.toString(toBaseNum).toUpperCase();

        const allConversions: Result[] = [
          { base: Base.Binary, value: decimalValue.toString(2) },
          { base: Base.Octal, value: decimalValue.toString(8) },
          { base: Base.Decimal, value: decimalValue.toString(10) },
          {
            base: Base.Hexadecimal,
            value: decimalValue.toString(16).toUpperCase(),
          },
        ];

        setResults(allConversions);

        const explanationParts: React.ReactNode[] = [];
        let delayMs = 500;
        const delayIncrement = 1200;

        explanationParts.push(
          <DelayedReveal key="header" delay={delayMs}>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
              <TypeWriter speed={30}>
                Great! Let me walk you through this conversion:
              </TypeWriter>
            </div>
          </DelayedReveal>
        );
        delayMs += delayIncrement;

        if (fromBaseNum !== 10) {
          explanationParts.push(
            <DelayedReveal key="input" delay={delayMs}>
              <div className="flex items-start gap-2">
                <Hash className="w-4 h-4 mt-0.5 text-blue-500" />
                <TypeWriter speed={30}>
                  Your number "{inputValue}" is in base
                  {formatSubscript("", fromBase)}.
                </TypeWriter>
              </div>
            </DelayedReveal>
          );
          delayMs += delayIncrement;

          if (inputValue.length > 1) {
            if (fromBaseNum === 16) {
              const hasHexLetters = /[A-F]/i.test(inputValue);
              if (hasHexLetters) {
                explanationParts.push(
                  <DelayedReveal key="hex-explanation" delay={delayMs}>
                    <div className="space-y-1">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 mt-0.5 text-cyan-500" />
                        <TypeWriter speed={30}>
                          In hexadecimal, letters represent values:
                        </TypeWriter>
                      </div>
                      <div className="ml-6 text-sm space-y-1">
                        <div>
                          • A = 10, B = 11, C = 12, D = 13, E = 14, F = 15
                        </div>
                      </div>
                    </div>
                  </DelayedReveal>
                );
                delayMs += delayIncrement;
              }
            }

            explanationParts.push(
              <DelayedReveal key="breakdown" delay={delayMs}>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <Ruler className="w-4 h-4 mt-0.5 text-purple-500" />
                    <TypeWriter speed={30}>
                      Breaking it down by place values:
                    </TypeWriter>
                  </div>
                  <div className="ml-6 space-y-1">
                    {Array.from(inputValue)
                      .reverse()
                      .map((digit, i) => {
                        const placeValue = Math.pow(fromBaseNum, i);
                        const digitValue = parseInt(digit, fromBaseNum);
                        const contribution = digitValue * placeValue;
                        const digitExplanation =
                          fromBaseNum === 16 && /[A-F]/i.test(digit)
                            ? `${digit.toUpperCase()} (${digitValue})`
                            : digit;
                        return (
                          <div key={i} className="text-sm">
                            • {digitExplanation} ×{" "}
                            {formatSuperscript(fromBase, i)} = {digitValue} ×{" "}
                            {placeValue} = {contribution}
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex items-start gap-2">
                    <Calculator className="w-4 h-4 mt-0.5 text-green-500" />
                    <TypeWriter speed={30}>
                      Adding them up: {decimalValue}
                      {formatSubscript("", "10")}
                    </TypeWriter>
                  </div>
                </div>
              </DelayedReveal>
            );
            delayMs += delayIncrement;
          } else {
            explanationParts.push(
              <DelayedReveal key="simple" delay={delayMs}>
                <div className="ml-6">
                  <TypeWriter speed={30}>
                    This equals {decimalValue}
                    {formatSubscript("", "10")}.
                  </TypeWriter>
                </div>
              </DelayedReveal>
            );
            delayMs += delayIncrement;
          }
        } else {
          explanationParts.push(
            <DelayedReveal key="decimal" delay={delayMs}>
              <div className="flex items-start gap-2">
                <Hash className="w-4 h-4 mt-0.5 text-blue-500" />
                <TypeWriter speed={30}>
                  Your number {inputValue} is already in decimal
                  {formatSubscript("", "10")}.
                </TypeWriter>
              </div>
            </DelayedReveal>
          );
          delayMs += delayIncrement;
        }

        if (toBaseNum !== 10) {
          explanationParts.push(
            <DelayedReveal key="convert-header" delay={delayMs}>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 mt-0.5 text-orange-500" />
                <TypeWriter speed={30}>
                  Converting {decimalValue}
                  {formatSubscript("", "10")} to base
                  {formatSubscript("", toBase)}:
                </TypeWriter>
              </div>
            </DelayedReveal>
          );
          delayMs += delayIncrement;

          if (decimalValue === 0) {
            explanationParts.push(
              <DelayedReveal key="zero" delay={delayMs}>
                <div className="ml-6">
                  <TypeWriter speed={30}>
                    Since the number is 0, it&apos;s 0 in any base!
                  </TypeWriter>
                </div>
              </DelayedReveal>
            );
            delayMs += delayIncrement;
          } else {
            let temp = decimalValue;
            const steps: string[] = [];
            while (temp > 0) {
              const remainder = temp % toBaseNum;
              const quotient = Math.floor(temp / toBaseNum);
              const remainderChar =
                remainder < 10
                  ? remainder.toString()
                  : String.fromCharCode(65 + remainder - 10);
              steps.push(
                `${temp} ÷ ${toBaseNum} = ${quotient} remainder ${remainder} (${remainderChar})`
              );
              temp = quotient;
            }

            explanationParts.push(
              <DelayedReveal key="division" delay={delayMs}>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-0.5 text-indigo-500" />
                    <TypeWriter speed={30}>
                      Using the division method:
                    </TypeWriter>
                  </div>
                  <div className="ml-6 space-y-1">
                    {steps.map((step, index) => (
                      <div key={index} className="text-sm">
                        • {step}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-0.5 text-cyan-500" />
                    <TypeWriter speed={30}>
                      Reading remainders from bottom to top: {convertedValue}
                    </TypeWriter>
                  </div>
                </div>
              </DelayedReveal>
            );
            delayMs += delayIncrement;
          }
        }

        explanationParts.push(
          <DelayedReveal key="final" delay={delayMs}>
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 mt-0.5 text-yellow-500" />
              <TypeWriter speed={30} onComplete={() => {}}>
                Final answer: {inputValue}
                {formatSubscript("", fromBase)} = {convertedValue}
                {formatSubscript("", toBase)}
              </TypeWriter>
            </div>
          </DelayedReveal>
        );

        addMessages([
          {
            type: "user",
            message: `Convert "${inputValue}" from base ${fromBase} to base ${toBase}`,
          },
          {
            type: "system",
            message: <div className="space-y-2">{explanationParts}</div>,
          },
        ]);
      } catch (error) {
        addMessages([
          {
            type: "user",
            message: `Convert "${inputValue}" from base ${fromBase} to base ${toBase}`,
          },
          {
            type: "system",
            message: (
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 mt-0.5 text-red-500" />
                <TypeWriter speed={30}>
                  Oops! Something went wrong with the conversion. This might
                  happen with very large numbers. Try a smaller number and
                  I&apos;ll help you understand the process!
                </TypeWriter>
              </div>
            ),
          },
        ]);
      }
    },
    [isValidNumber, formatSuperscript, formatSubscript]
  );

  return { isValidNumber, formatSuperscript, formatSubscript, convertNumber };
};
