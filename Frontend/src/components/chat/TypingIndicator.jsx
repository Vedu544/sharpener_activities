const TypingIndicator = ({ user }) => {
  if (!user) return null;

  return (
    <p className="text-sm italic text-gray-500">
      {user} is typing...
    </p>
  );
};

export default TypingIndicator;
