import { useEffect, useState } from "react";
import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";
import { useAuth } from "../context/authContext";
import api from "../services/api";

const Chat = () => {
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.get("/rooms");
      setRooms(res.data.rooms);
    };
    fetchRooms();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 flex flex-col border-r">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold">Chats</h2>
          <button
            onClick={logout}
            className="text-sm text-red-500"
          >
            Logout
          </button>
        </div>
        <ChatList
          rooms={rooms}
          activeRoom={activeRoom}
          onSelect={setActiveRoom}
        />
      </div>

      {activeRoom ? (
        <ChatWindow room={activeRoom} user={user} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default Chat;
