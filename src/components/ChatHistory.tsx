import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface ChatMessage {
  type: "user" | "system";
  message: React.ReactNode;
  id: number;
  isTyping?: boolean;
}

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
  visibleMessages: Set<number>;
}

export const ChatHistory = ({
  chatHistory,
  visibleMessages,
}: ChatHistoryProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div ref={chatContainerRef} className="space-y-4 max-h-96 overflow-y-auto">
      {chatHistory.map((entry) => (
        <div
          key={entry.id}
          className={`transition-all duration-500 ease-out ${
            visibleMessages.has(entry.id)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          } ${
            entry.type === "user" ? "bg-primary/10 ml-4" : "bg-muted mr-4"
          } p-3 rounded-lg`}
        >
          <div className="flex items-start gap-2">
            <Badge
              variant={entry.type === "user" ? "default" : "secondary"}
              className="text-xs"
            >
              {entry.type === "user" ? "You" : "Calculator"}
            </Badge>
          </div>
          <div className="text-sm mt-2">{entry.message}</div>
        </div>
      ))}
    </div>
  );
};
