const Avatar = ({ name }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
      {initials || "U"}
    </div>
  );
};

export default Avatar;
