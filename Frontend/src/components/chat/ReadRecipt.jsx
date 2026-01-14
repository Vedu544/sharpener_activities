const ReadReceipt = ({ status }) => {
  if (status === "sent") {
    return <span>✔</span>;              // sent
  }

  if (status === "delivered") {
    return <span>✔✔</span>;             // delivered
  }

  if (status === "read") {
    return <span className="text-blue-600">✔✔</span>; // read (blue)
  }

  return null;
};

export default ReadReceipt;
