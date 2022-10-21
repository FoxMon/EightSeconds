import socketIOClient from "socket.io-client";

export const customSocket = socketIOClient(
  `${process.env.REACT_APP_SERVER_BASE_URL}/chat`,
  {
    path: "/chat-socket",
    transports: ["websocket"],
  }
);

export const customSocketConnectRequest = (eMsg: string, roomId: string) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    roomId: roomId,
  });
};

export const customSocketCreateRequest = (
  eMsg: string,
  userId: string,
  chat: string
) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    userId: userId,
    chat: chat,
  });
};

export const customSocketUpdateRequest = (
  eMsg: string,
  chatId: string,
  chat: string
) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    chatId: chatId,
    chat: chat,
  });
};

export const customSocketDeleteRequest = (eMsg: string, chatId: string) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    chatId: chatId,
  });
};

export const customSocketLeaveRequest = (eMsg: string, userId: string) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    userId: userId,
  });
};
