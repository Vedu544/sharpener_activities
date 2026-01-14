import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, getSocket } from "../services/socket";
import { useAuth } from "./authContext";

const SocketContext = createContext();

/* ================= PROVIDER ================= */
export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      const socketInstance = connectSocket(token);

      socketInstance.on("connect", () => {
        console.log("🔌 Socket connected:", socketInstance.id);
      });

      socketInstance.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useSocket = () => useContext(SocketContext);
