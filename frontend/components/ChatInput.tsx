import React, { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit(event);
          }
        }}
        className="flex-grow border border-gray-300 rounded-lg py-2 px-4 mr-2 text-stone-900 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
