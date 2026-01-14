import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({ room, user }) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (!socket || !room) return;

    socket.emit("join-room", room._id);

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", (name) => {
      setTypingUser(name);
      setTimeout(() => setTypingUser(null), 2000);
    });

    return () => {
      socket.off("receive-message");
      socket.off("typing");
    };
  }, [socket, room]);

  const sendMessage = () => {
  if (!message.trim()) return;

  const tempMessage = {
    _id: Date.now(),
    content: message,
    senderId: user._id,
    createdAt: new Date(),
    status: "sent",
  };

  setMessages((prev) => [...prev, tempMessage]);

  socket.emit("send-message", {
    roomId: room._id,
    content: message,
  });

  setMessage("");
};

  const handleTyping = () => {
    socket.emit("typing", user.name);
  };

  return (
    <div className="flex flex-col h-full w-3/4">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
           isOwn={msg.senderId === user._id}
          />
        ))}
        <TypingIndicator user={typingUser} />
      </div>

      <div className="flex p-3 border-t gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
