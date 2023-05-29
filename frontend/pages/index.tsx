import ChatHistory from "@/components/ChatHistory";
import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import { connect, sendMsg } from "@/utils/connect";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export type Message = {
  body: string;
};

const ChatPage: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  useEffect(() => {
    connect((message: string) => {
      console.log(message)
      setChatMessages((chatMessages) => [...chatMessages, message]);
      console.log("chatMessages", chatMessages)
    });
  }, []);

  const handleSend = (message: string) => {
    const newMessage: Message = {
      body: message,
    };
    sendMsg(newMessage);
  };

  return (
    <>
      <Head>
        <title>Go Chat</title>
      </Head>
      <Header />
      <div className="flex flex-col p-4 h-screen">
        <div className="overflow-y-auto flex-grow">
          <ChatHistory messages={chatMessages} />
        </div>
        <div className="sticky bottom-4">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
