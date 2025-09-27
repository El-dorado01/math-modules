"use client";

import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { ConverterForm } from "@/components/ConverterForm";
import { ChatHistory } from "@/components/ChatHistory";
import { EducationalInfo } from "@/components/EducationalInfo";
import { useBaseConverter, Base } from "@/hooks/useBaseConverter";
import React from "react";
import { TypeWriter } from "@/components/TypeWriter";

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

const BaseCalculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState<Base>(Base.Decimal);
  const [toBase, setToBase] = useState<Base>(Base.Binary);
  const [results, setResults] = useState<Result[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
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

  const { isValidNumber, convertNumber } = useBaseConverter();

  const addMessages = (
    messages: { type: "user" | "system"; message: React.ReactNode }[]
  ) => {
    const newMessages = messages.map((msg, index) => ({
      ...msg,
      id: nextMessageId + index,
      isTyping: msg.type === "system",
    }));

    setNextMessageId((prev) => prev + newMessages.length);
    setChatHistory((prev) => [...prev, ...newMessages]);

    newMessages.forEach((msg, index) => {
      setTimeout(
        () => {
          setVisibleMessages((prev) => new Set([...prev, msg.id]));
        },
        msg.type === "user" ? 0 : (index + 1) * 400
      );
    });
  };

  const handleConvertNumber = async () => {
    setIsConverting(true);
    try {
      convertNumber(inputValue, fromBase, toBase, setResults, addMessages);
    } finally {
      setIsConverting(false);
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
            <div className="flex items-center mb-8">
               <Button variant="ghost" size="sm" asChild>
                 <Link
                  href={"/modules/number-base-system"}
                  className="flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 min-w-4 mr-2" />
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
                    convertNumber={handleConvertNumber}
                    clearAll={clearAll}
                    results={results}
                    isConverting={isConverting}
                    isValidNumber={isValidNumber}
                  />
                </CardContent>
              </Card>

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
