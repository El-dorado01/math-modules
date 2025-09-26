"use client";

import React, { useEffect, useRef, useState } from "react";
import { Title } from "@/data/modules";
import { modifyChapterName } from "@/lib/fetch-chapter";
import OnThisPage from "./on-this-page";
import ChapterContents from "./chapter-contents";
import ChapterHeader from "./chapter-header";
import ChapterObjectives from "./chapter-objectives";
import { Separator } from "./ui/separator";
import {
  ArrowLeft,
  BadgeQuestionMarkIcon,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatSubscript } from "@/lib/format";

interface ClientChapterWrapperProps {
  header: {
    id: number;
    chapter_name: string;
    title: string;
  };
  objectives: {
    id: number;
    text: string;
  }[];
  titles: Title[];
  contents: {
    id: number;
    title: string;
    body: {
      id: number;
      type: string;
      text_content?: string;
      img_path?: string;
    }[];
  }[];
  chapterName: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: { option: string; text: string; isCorrect: boolean }[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

const ClientChapterWrapper = ({
  header,
  objectives,
  titles,
  contents,
  chapterName,
}: ClientChapterWrapperProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState<{
    [key: number]: { option: string; option_text: string };
  }>({});
  const [error, setError] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState<boolean[]>(
    Array(5).fill(false)
  );
  const [answerWrong, setAnswerWrong] = useState<boolean[]>(
    Array(5).fill(false)
  );

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Define quiz questions with all required properties
  const baseQuizQuestions: {
    id: number;
    question: string;
    options: { text: string; isCorrect: boolean }[];
    hint: string;
    explanation: string;
  }[] = [
    {
      id: 1,
      question: `Convert ${formatSubscript("119", "10")} to base 4.`,
      options: [
        { text: formatSubscript("1 313", "4"), isCorrect: true },
        { text: formatSubscript("1 331", "4"), isCorrect: false },
        { text: formatSubscript("3 113", "4"), isCorrect: false },
        { text: formatSubscript("1 113", "4"), isCorrect: false },
      ],
      hint: "Divide 119 by 4 and take the remainders!",
      explanation: `${formatSubscript(
        "119",
        "10"
      )} to the base of 4 is indeed ${formatSubscript("1 313", "4")}`,
    },
    {
      id: 2,
      question: `Convert ${formatSubscript("45", "10")} to base 8.`,
      options: [
        { text: formatSubscript("55", "8"), isCorrect: true },
        { text: formatSubscript("65", "8"), isCorrect: false },
        { text: formatSubscript("53", "8"), isCorrect: false },
        { text: formatSubscript("45", "8"), isCorrect: false },
      ],
      hint: "Divide 45 by 8 repeatedly, collecting remainders from bottom to top.",
      explanation: `${formatSubscript(
        "45",
        "10"
      )} to the base of 8 is indeed ${formatSubscript("55", "8")}`,
    },
    {
      id: 3,
      question: `Convert ${formatSubscript("10110", "2")} to base 10.`,
      options: [
        { text: formatSubscript("22", "10"), isCorrect: true },
        { text: formatSubscript("14", "10"), isCorrect: false },
        { text: formatSubscript("18", "10"), isCorrect: false },
        { text: formatSubscript("26", "10"), isCorrect: false },
      ],
      hint: "Use the positional values (2⁴, 2³, 2², 2¹, 2⁰) and multiply each digit.",
      explanation: `${formatSubscript(
        "10110",
        "2"
      )} to the base of 10 is indeed ${formatSubscript("22", "10")}`,
    },
    {
      id: 4,
      question: `Convert ${formatSubscript("2A", "16")} to base 2.`,
      options: [
        { text: formatSubscript("101010", "2"), isCorrect: true },
        { text: formatSubscript("110100", "2"), isCorrect: false },
        { text: formatSubscript("100101", "2"), isCorrect: false },
        { text: formatSubscript("101110", "2"), isCorrect: false },
      ],
      hint: "Convert each hexadecimal digit to its 4-bit binary equivalent.",
      explanation: `${formatSubscript(
        "2A",
        "16"
      )} to the base of 2 is indeed ${formatSubscript("101010", "2")}`,
    },
    {
      id: 5,
      question: `Convert ${formatSubscript("231", "5")} to base 10.`,
      options: [
        { text: formatSubscript("66", "10"), isCorrect: true },
        { text: formatSubscript("56", "10"), isCorrect: false },
        { text: formatSubscript("76", "10"), isCorrect: false },
        { text: formatSubscript("61", "10"), isCorrect: false },
      ],
      hint: "Calculate using powers of 5 (5², 5¹, 5⁰) for each digit.",
      explanation: `${formatSubscript(
        "231",
        "5"
      )} to the base of 10 is indeed ${formatSubscript("66", "10")}`,
    },
  ];

  // Shuffle options and assign letters (A, B, C, D)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const shuffledQuestions = baseQuizQuestions.map((question) => {
      const shuffledOptions = shuffleArray(question.options);
      const optionLetters = ["A", "B", "C", "D"];
      const newOptions = shuffledOptions.map((opt, index) => ({
        option: optionLetters[index],
        text: opt.text,
        isCorrect: opt.isCorrect,
      }));
      const correctOption = newOptions.find((opt) => opt.isCorrect);
      return {
        id: question.id,
        question: question.question,
        options: newOptions,
        correctAnswer: correctOption ? correctOption.option : "A",
        hint: question.hint,
        explanation: question.explanation,
      };
    });
    setQuizQuestions(shuffledQuestions);
  }, []);

  const tryAgain = () => {
    setChosenAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: { option: "", option_text: "" },
    }));
    setError("");
    setAnswerCorrect((prev) => {
      const newState = [...prev];
      newState[currentQuestionIndex] = false;
      return newState;
    });
    setAnswerWrong((prev) => {
      const newState = [...prev];
      newState[currentQuestionIndex] = false;
      return newState;
    });
  };

  const checkAnswer = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const chosenAnswer = chosenAnswers[currentQuestionIndex] || {
      option: "",
      option_text: "",
    };

    if (chosenAnswer.option === "") {
      setError("Please select an answer!");
      return;
    }

    if (chosenAnswer.option === currentQuestion.correctAnswer) {
      setAnswerCorrect((prev) => {
        const newState = [...prev];
        newState[currentQuestionIndex] = true;
        return newState;
      });
      setAnswerWrong((prev) => {
        const newState = [...prev];
        newState[currentQuestionIndex] = false;
        return newState;
      });
    } else {
      setAnswerWrong((prev) => {
        const newState = [...prev];
        newState[currentQuestionIndex] = true;
        return newState;
      });
      setAnswerCorrect((prev) => {
        const newState = [...prev];
        newState[currentQuestionIndex] = false;
        return newState;
      });
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setError("");
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setError("");
    }
  };

  return (
    <>
      <div className="flex-1 lg:flex-3/5 lg:p-2">
        {/* Chapter Header */}
        <ChapterHeader
          id={header.id}
          chapter_name={header.chapter_name}
          title={header.title}
        />

        {/* Chapter Objectives */}
        <ChapterObjectives objectives={objectives} />

        <Separator className="my-10" />
        <ChapterContents contents={contents} titles={titles} />

        {/* Quiz Panel */}
        <div className="mt-10 flex flex-col gap-5 items-center justify-center">
          {/* Icon */}
          <div className="rounded-full p-3 flex items-center justify-center min-w-10 bg-blue-400 ">
            <BadgeQuestionMarkIcon />
          </div>

          {/* Text */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <h2 className="font-bold text-lg">It&apos;s time to take a quiz!</h2>
            <span>
              Test your knowledge and see what you&apos;ve just learned.
            </span>
          </div>

          {/* Question panel */}
          <div className="w-full flex flex-col items-center justify-center space-y-4 border p-4 rounded-md">
            {/* Question */}
            <h2 className="font-extrabold text-lg mt-2">
              {quizQuestions[currentQuestionIndex]?.question || "Loading..."}
            </h2>
            {/* Incorrect Answer */}
            {answerWrong[currentQuestionIndex] && (
              <>
                <div className="flex flex-col items-center justify-center space-y-2 border rounded-md w-full p-4">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10">
                      {chosenAnswers[currentQuestionIndex]?.option}
                    </span>
                    <span>
                      {chosenAnswers[currentQuestionIndex]?.option_text}
                    </span>
                  </div>
                  <div className="rounded-full bg-yellow-700 text-yellow-400 font-bold flex items-center justify-center my-4 py-2 px-4">
                    <X className="mr-2 w-5 h-5" />
                    Not Quite
                  </div>
                  <span className="mt-3">
                    {quizQuestions[currentQuestionIndex]?.hint}
                  </span>
                </div>
                <Button
                  variant={"outline"}
                  className="self-center flex items-center justify-center"
                  onClick={tryAgain}
                >
                  <ArrowLeft className="mr-1 w-5 h-5" />
                  Try Again
                </Button>
              </>
            )}
            {/* Incorrect Answer Ends Here */}

            {/* Correct Answer */}
            {answerCorrect[currentQuestionIndex] && (
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-md w-full p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10">
                    {chosenAnswers[currentQuestionIndex]?.option}
                  </span>
                  <span>
                    {chosenAnswers[currentQuestionIndex]?.option_text}
                  </span>
                </div>
                <div className="rounded-full bg-green-700 text-green-400 font-bold flex items-center justify-center my-4 py-2 px-4">
                  <Check className="mr-2 w-5 h-5" />
                  Correct
                </div>
                <span className="mt-3">
                  {quizQuestions[currentQuestionIndex]?.explanation}
                </span>
              </div>
            )}

            {/* Options */}
            {!answerCorrect[currentQuestionIndex] &&
              !answerWrong[currentQuestionIndex] && (
                <>
                  <div className="flex flex-col rounded-md border w-full">
                    {quizQuestions[currentQuestionIndex]?.options.map((opt) => (
                      <div
                        key={opt.option}
                        className={`p-3 border-b cursor-pointer ${
                          opt.option ===
                          chosenAnswers[currentQuestionIndex]?.option
                            ? "bg-sidebar"
                            : "bg-white"
                        } hover:bg-sidebar flex items-center justify-start ${
                          opt.option ===
                          quizQuestions[currentQuestionIndex]?.options[0].option
                            ? "rounded-t-md"
                            : opt.option ===
                              quizQuestions[currentQuestionIndex]?.options[3]
                                .option
                            ? "rounded-b-md"
                            : ""
                        }`}
                        onClick={() =>
                          setChosenAnswers((prev) => ({
                            ...prev,
                            [currentQuestionIndex]: {
                              option: opt.option,
                              option_text: opt.text,
                            },
                          }))
                        }
                      >
                        <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10 mr-4">
                          {opt.option}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="self-end cursor-pointer"
                    disabled={!chosenAnswers[currentQuestionIndex]?.option}
                    onClick={checkAnswer}
                  >
                    Check Answer
                  </Button>
                </>
              )}

            {/* Navigation Buttons */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                disabled={currentQuestionIndex === 0}
                onClick={goToPreviousQuestion}
              >
                <ChevronLeft className="mr-1 w-5 h-5" />
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={currentQuestionIndex === quizQuestions.length - 1}
                onClick={goToNextQuestion}
              >
                Next
                <ChevronRight className="ml-1 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center space-y-3 border rounded-md w-full p-4">
          <div className="font-extrabold text-lg">
            Would you love to try our Number Base System Tutoring Calculator?
          </div>
          <Button className="" variant={"outline"} asChild>
            <Link href="/number-base-calculator">Try Calculator</Link>
          </Button>
        </div>
      </div>
      <OnThisPage titles={titles} />
    </>
  );
};

export default ClientChapterWrapper;
