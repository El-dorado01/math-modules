// ClientChapterWrapper.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Title } from "@/data/modules";
import { modifyChapterName } from "@/lib/fetch-chapter";
import OnThisPage from "./on-this-page";
import ChapterContents from "./chapter-contents";
import ChapterHeader from "./chapter-header";
import ChapterObjectives from "./chapter-objectives";
import { Separator } from "./ui/separator";
import { ArrowLeft, BadgeQuestionMarkIcon, Check, X } from "lucide-react";
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

const ClientChapterWrapper = ({
  header,
  objectives,
  titles,
  contents,
  chapterName,
}: ClientChapterWrapperProps) => {
  const [choosenAnswer, setChoosenAnswer] = useState({
    option: "",
    option_text: "",
  });
  const [error, setError] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [answerWrong, setAnswerWrong] = useState(false);

  const tryAgain = () => {
    // Reset choosen answer
    setChoosenAnswer({ option: "", option_text: "" });
    setError("");
    setAnswerCorrect(false);
    setAnswerWrong(false);
  };

  const checkAnswer = () => {
    const correctAnswer = "A";

    // Check if an answer is picked
    if (choosenAnswer.option === "" || choosenAnswer.option_text === "") {
      setError("Please select an answer!");
      return;
    }

    // Check answer
    if (choosenAnswer.option === correctAnswer) {
      setAnswerCorrect(true);
      setAnswerWrong(false);
    } else {
      setAnswerWrong(true);
      setAnswerCorrect(false);
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
        <ChapterContents contents={contents} />

        {/* Quiz Panel */}
        <div className="mt-10 flex flex-col gap-5 items-center justify-center">
          {/* Icon */}
          <div className="rounded-full p-3 flex items-center justify-center min-w-10 bg-blue-400 ">
            <BadgeQuestionMarkIcon />
          </div>

          {/* Text */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <h2 className="font-bold">It&apos;s time to take a quiz!</h2>
            <span>
              Test your knowledge and see what you&apos;ve just learned.
            </span>
          </div>

          {/* Question panel */}
          <div className="w-full flex flex-col items-center justify-center space-y-4 border p-4 rounded-md">
            {/* Question */}
            <h2 className="font-extrabold text-lg mt-2">
              Convert {formatSubscript("119", "10")} to base 4.
            </h2>
            {/* Incorrect Answer */}
            {answerWrong && (
              <>
                <div className="flex flex-col items-center justify-center space-y-2 border rounded-md w-full p-4">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10">
                      {choosenAnswer.option}
                    </span>
                    <span>{choosenAnswer.option_text}</span>
                  </div>
                  <div className="rounded-full bg-yellow-700 text-yellow-400 font-bold flex items-center justify-center my-4 py-2 px-4">
                    <X className="mr-2 w-5 h-5" />
                    Not Quite
                  </div>
                  <span className="mt-3">
                    Hint: Divide 119 by 4 and take the remainders!
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
            {answerCorrect && (
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-md w-full p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10">
                    {choosenAnswer.option}
                  </span>
                  <span>{choosenAnswer.option_text}</span>
                </div>
                <div className="rounded-full bg-green-700 text-green-400 font-bold flex items-center justify-center my-4 py-2 px-4">
                  <Check className="mr-2 w-5 h-5" />
                  Correct
                </div>
                <span className="mt-3">
                  {formatSubscript("119", "10")} to the base of 4 is indeed{" "}
                  {formatSubscript("1 313", "4")}
                </span>
              </div>
            )}

            {/* Options */}
            {answerCorrect === false && answerWrong === false && (
              <>
                <div className="flex flex-col rounded-md border w-full">
                  <div
                    className={`p-3 border-b cursor-pointer rounded-t-md ${
                      choosenAnswer.option === "A" ? "bg-sidebar" : "bg-white"
                    } hover:bg-sidebar flex items-center justify-start`}
                    onClick={() =>
                      setChoosenAnswer({
                        option: "A",
                        option_text: formatSubscript("1 313", "4"),
                      })
                    }
                  >
                    <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10 mr-4">
                      A
                    </span>
                    <span>{formatSubscript("1 313", "4")}</span>
                  </div>
                  <div
                    className={`p-3 border-b cursor-pointer ${
                      choosenAnswer.option === "B" ? "bg-sidebar" : "bg-white"
                    } hover:bg-sidebar flex items-center justify-start`}
                    onClick={() =>
                      setChoosenAnswer({
                        option: "B",
                        option_text: formatSubscript("1 331", "4"),
                      })
                    }
                  >
                    <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10 mr-4">
                      B
                    </span>
                    <span>{formatSubscript("1 331", "4")}</span>
                  </div>
                  <div
                    className={`p-3 border-b cursor-pointer ${
                      choosenAnswer.option === "C" ? "bg-sidebar" : "bg-white"
                    } hover:bg-sidebar flex items-center justify-start`}
                    onClick={() =>
                      setChoosenAnswer({
                        option: "C",
                        option_text: formatSubscript("3 113", "4"),
                      })
                    }
                  >
                    <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10 mr-4">
                      C
                    </span>
                    <span>{formatSubscript("3 113", "4")}</span>
                  </div>
                  <div
                    className={`p-3 border-b cursor-pointer rounded-b-md ${
                      choosenAnswer.option === "D" ? "bg-sidebar" : "bg-white"
                    } hover:bg-sidebar flex items-center justify-start`}
                    onClick={() =>
                      setChoosenAnswer({
                        option: "D",
                        option_text: formatSubscript("1 113", "4"),
                      })
                    }
                  >
                    <span className="rounded-full flex items-center justify-center bg-sidebar-accent w-10 h-10 min-w-10 mr-4">
                      D
                    </span>
                    <span>{formatSubscript("1 113", "4")}</span>
                  </div>
                </div>
                <Button
                  className="self-end cursor-pointer"
                  disabled={choosenAnswer.option === ""}
                  onClick={checkAnswer}
                >
                  Check Answer
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center space-y-3 border rounded-md w-full p-4">
          <div>
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
