import Avatar from "../common/Avatar";

const ChatList = ({ rooms, activeRoom, onSelect }) => {
  return (
    <div className="w-100 border-r overflow-y-auto">
      {rooms.map((room) => (
        <div
          key={room._id}
          onClick={() => onSelect(room)}
          className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
            activeRoom?._id === room._id ? "bg-gray-200" : ""
          }`}
        >
          <Avatar name={room.groupName || room.members[0]?.name} />
          <div>
            <p className="font-semibold">
              {room.groupName || room.members[0]?.name}
            </p>
            <p className="text-sm text-gray-500">
              {room.lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
