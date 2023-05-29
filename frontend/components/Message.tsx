import React from "react";

const Message: React.FC<{ body: string }> = (props) => {
  return (
    <div className="flex flex-col items-start my-2">
      <div className="bg-blue-700 rounded-lg p-2">
        <p className="text-sm">{props.body}</p>
      </div>
    </div>
  );
};

export default Message;
