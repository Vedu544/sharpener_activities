import ReadReceipt from "./ReadRecipt";
import { formatTime } from "../../utilis/formatTime";

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[70%] px-4 py-2 rounded-xl text-sm
        ${isOwn 
          ? "bg-green-500 text-white rounded-br-none" 
          : "bg-gray-200 text-black rounded-bl-none"
        }`}
      >
        <p>{message.content}</p>

        {/* Time + Tick */}
        <div className="flex items-center justify-end gap-1 mt-1 text-[11px] opacity-80">
          <span>{formatTime(message.createdAt)}</span>

          {isOwn && (
            <ReadReceipt status={message.status || "sent"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
