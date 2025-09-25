"use client";

// pages/BaseCalculator.tsx (or wherever your main component is)
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Calculator,
  MessageCircle,
  Hand,
  Target,
  Hash,
  Ruler,
  FileText,
  BookOpen,
  Sparkles,
  HelpCircle,
  X,
  Lightbulb,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { DelayedReveal } from "@/components/delayed-reveal";
import { TypeWriter } from "@/components/typewriter";
import { ConverterForm } from "@/components/converter-form";
import { ChatHistory } from "@/components/chat-history";
import { EducationalInfo } from "@/components/educational-info";
import React from "react";

import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const BaseCalculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [results, setResults] = useState<{ base: string; value: string }[]>([]);
  const [chatHistory, setChatHistory] = useState<
    {
      type: "user" | "system";
      message: React.ReactNode;
      id: number;
      isTyping?: boolean;
    }[]
  >([
    {
      type: "system",
      id: 1,
      isTyping: false,
      message: (
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Hand className="w-4 h-4 min-w-4 mt-0.5 text-primary" />
            <span>
              Hello! I'm your Number Base Tutor. I'll help you understand how to
              convert numbers between different numeral systems.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 min-w-4 mt-0.5 text-green-500" />
            <span>
              Let's start by entering a number and selecting which bases to
              convert between. I'll explain each step of the conversion process!
            </span>
          </div>
        </div>
      ),
    },
  ]);
  const [visibleMessages, setVisibleMessages] = useState<Set<number>>(
    new Set([1])
  );
  const [nextMessageId, setNextMessageId] = useState(2);

  const isValidNumber = (num: string, base: number): boolean => {
    if (!num) return false;
    const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
    return num
      .toUpperCase()
      .split("")
      .every((char) => validChars.includes(char));
  };

  const formatSuperscript = (base: string, exponent: number): string => {
    const superscripts = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
    return (
      base +
      exponent
        .toString()
        .split("")
        .map((digit) => superscripts[parseInt(digit)])
        .join("")
    );
  };

  const formatSubscript = (text: string, subscript: string): string => {
    const subscripts = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
    const subText = subscript
      .split("")
      .map((digit) => subscripts[parseInt(digit)] || digit)
      .join("");
    return text + subText;
  };

  const addMessages = (
    messages: { type: "user" | "system"; message: React.ReactNode }[]
  ) => {
    const newMessages = messages.map((msg, index) => ({
      ...msg,
      id: nextMessageId + index,
      isTyping: msg.type === "system", // Only system messages should have typing effect
    }));

    setNextMessageId((prev) => prev + newMessages.length);
    setChatHistory((prev) => [...prev, ...newMessages]);

    // Show user messages immediately, system messages with delay
    newMessages.forEach((msg, index) => {
      setTimeout(
        () => {
          setVisibleMessages((prev) => new Set([...prev, msg.id]));
        },
        msg.type === "user" ? 0 : (index + 1) * 400
      );
    });
  };

  const convertNumber = () => {
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
              <HelpCircle className="w-4 h-4 min-w-4 mt-0.5 text-amber-500" />
              <TypeWriter speed={30}>
                I need a number to work with! Please enter a valid number and
                I'll show you exactly how to convert it step by step.
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
                <X className="w-4 h-4 min-w-4 mt-0.5 text-red-500" />
                <TypeWriter speed={30}>
                  "{inputValue}" isn't valid in base
                  {formatSubscript("", fromBase)}!
                </TypeWriter>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 min-w-4 mt-0.5 text-blue-500" />
                <TypeWriter speed={30}>
                  Remember: Base{formatSubscript("", fromBase)} only uses these
                  digits: {validDigits}
                </TypeWriter>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 min-w-4 mt-0.5 text-yellow-500" />
                <TypeWriter speed={30}>
                  Tip: In base{formatSubscript("", fromBase)}, each digit
                  position represents a power of {fromBase}. Make sure all your
                  digits are less than {fromBase}!
                </TypeWriter>
              </div>
            </div>
          ),
        },
      ]);
      return;
    }

    try {
      // Convert from source base to decimal
      const decimalValue = parseInt(inputValue.toUpperCase(), fromBaseNum);

      // Convert from decimal to target base
      const convertedValue = decimalValue.toString(toBaseNum).toUpperCase();

      // Show all common base conversions
      const allConversions = [
        { base: "2", value: decimalValue.toString(2) },
        { base: "8", value: decimalValue.toString(8) },
        { base: "10", value: decimalValue.toString(10) },
        { base: "16", value: decimalValue.toString(16).toUpperCase() },
      ];

      setResults(allConversions);

      // Create educational explanation components with staggered reveal
      const explanationParts: React.ReactNode[] = [];
      let delayMs = 500; // Start delay
      const delayIncrement = 1200; // Delay between each line (enough for typing to complete)

      // Header
      explanationParts.push(
        <DelayedReveal key="header" delay={delayMs}>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 min-w-4 mt-0.5 text-green-500" />
            <TypeWriter speed={30}>
              Great! Let me walk you through this conversion:
            </TypeWriter>
          </div>
        </DelayedReveal>
      );
      delayMs += delayIncrement;

      // Step 1: Explain the input
      if (fromBaseNum !== 10) {
        explanationParts.push(
          <DelayedReveal key="input" delay={delayMs}>
            <div className="flex items-start gap-2">
              <Hash className="w-4 h-4 min-w-4 mt-0.5 text-blue-500" />
              <TypeWriter speed={30}>
                Your number "{inputValue}" is in base
                {formatSubscript("", fromBase)}.
              </TypeWriter>
            </div>
          </DelayedReveal>
        );
        delayMs += delayIncrement;

        // Break down the place values (static content for clarity)
        if (inputValue.length > 1) {
          // Add hex digit explanation if converting from base 16
          if (fromBaseNum === 16) {
            const hasHexLetters = /[A-F]/i.test(inputValue);
            if (hasHexLetters) {
              explanationParts.push(
                <DelayedReveal key="hex-explanation" delay={delayMs}>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 min-w-4 mt-0.5 text-cyan-500" />
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
                  <Ruler className="w-4 h-4 min-w-4 mt-0.5 text-purple-500" />
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

                      // Show hex letter conversion if applicable
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
                  <Calculator className="w-4 h-4 min-w-4 mt-0.5 text-green-500" />
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
              <Hash className="w-4 h-4 min-w-4 mt-0.5 text-blue-500" />
              <TypeWriter speed={30}>
                Your number {inputValue} is already in decimal
                {formatSubscript("", "10")}.
              </TypeWriter>
            </div>
          </DelayedReveal>
        );
        delayMs += delayIncrement;
      }

      // Step 2: Explain the conversion to target base
      if (toBaseNum !== 10) {
        explanationParts.push(
          <DelayedReveal key="convert-header" delay={delayMs}>
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 min-w-4 mt-0.5 text-orange-500" />
              <TypeWriter speed={30}>
                Converting {decimalValue}
                {formatSubscript("", "10")} to base{formatSubscript("", toBase)}
                :
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
                  Since the number is 0, it's 0 in any base!
                </TypeWriter>
              </div>
            </DelayedReveal>
          );
          delayMs += delayIncrement;
        } else {
          // Show the division method
          let temp = decimalValue;
          let steps: string[] = [];
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
                  <FileText className="w-4 h-4 min-w-4 mt-0.5 text-indigo-500" />
                  <TypeWriter speed={30}>Using the division method:</TypeWriter>
                </div>
                <div className="ml-6 space-y-1">
                  {steps.map((step, index) => (
                    <div key={index} className="text-sm">
                      • {step}
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 min-w-4 mt-0.5 text-cyan-500" />
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

      // Final answer
      explanationParts.push(
        <DelayedReveal key="final" delay={delayMs}>
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 min-w-4 mt-0.5 text-yellow-500" />
            <TypeWriter speed={30} onComplete={() => {}}>
              Final answer: {inputValue}
              {formatSubscript("", fromBase)} = {convertedValue}
              {formatSubscript("", toBase)}
            </TypeWriter>
          </div>
        </DelayedReveal>
      );
      delayMs += delayIncrement;

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
              <X className="w-4 h-4 min-w-4 mt-0.5 text-red-500" />
              <TypeWriter speed={30}>
                Oops! Something went wrong with the conversion. This might
                happen with very large numbers. Try a smaller number and I'll
                help you understand the process!
              </TypeWriter>
            </div>
          ),
        },
      ]);
    }
  };

  const clearAll = () => {
    setInputValue("");
    setResults([]);
    const clearId = nextMessageId;
    setNextMessageId((prev) => prev + 1);
    setChatHistory([
      {
        type: "system",
        id: clearId,
        isTyping: true,
        message: (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <RotateCcw className="w-4 h-4 min-w-4 mt-0.5 text-blue-500" />
              <TypeWriter speed={30}>
                All cleared! Ready for a new conversion.
              </TypeWriter>
            </div>
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 min-w-4 mt-0.5 text-yellow-500" />
              <TypeWriter speed={30}>
                Pro tip: Try starting with simple numbers like 10, 15, or 255 to
                see how different bases represent the same value. Each base
                tells a different "story" about the same number!
              </TypeWriter>
            </div>
          </div>
        ),
      },
    ]);
    setVisibleMessages(new Set([clearId]));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title="Number Base Calculator" />
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={"/modules/number-base-system"}
                  className="flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Number Base Calculator
              </h1>
              <p className="text-muted-foreground">
                Convert numbers between different numeral systems
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Base Converter
                  </CardTitle>
                  <CardDescription>
                    Convert numbers between bases 2-36
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConverterForm
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    fromBase={fromBase}
                    setFromBase={setFromBase}
                    toBase={toBase}
                    setToBase={setToBase}
                    convertNumber={convertNumber}
                    clearAll={clearAll}
                    results={results}
                  />
                </CardContent>
              </Card>

              {/* Chat Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Conversion History
                  </CardTitle>
                  <CardDescription>Interactive conversion log</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatHistory
                    chatHistory={chatHistory}
                    visibleMessages={visibleMessages}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Educational Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Number Base Systems</CardTitle>
                <CardDescription>
                  Understanding different numeral systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EducationalInfo />
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BaseCalculator;
