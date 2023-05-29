import React from "react";
import Message from "./Message";
import { Message as MsgType } from "@/pages";

type ChatHistoryProps = {
  messages: string[];
};

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* show start chatting if messages length is 0 */}
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <span className="text-2xl">start chatting</span>
        </div>
      ) : null}
      {messages.map((message, index) => (
        <Message key={index} body={message} />
      ))}
    </div>
  );
};

export default ChatHistory;
