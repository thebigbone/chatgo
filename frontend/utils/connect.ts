import { Message } from "@/pages";

const socket = new WebSocket("ws://localhost:8080/ws");

export const connect = (cb: (msg: any) => void) => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onmessage = (msg) => {
    console.log("msgData", msg.data);
    const message = JSON.parse(msg.data);
    console.log("message: ", message);
    console.log("Message from web socket:", message.body);
    cb(message.body);
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
};

export const sendMsg = (msg: Message) => {
  console.log("sending msg: ", msg);
  socket.send(msg.body);
};
