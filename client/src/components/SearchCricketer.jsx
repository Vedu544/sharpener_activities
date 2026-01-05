import { useState } from "react";
import { searchCricketers } from "../services/api";
import React from "react";

export default function SearchCricketer({ onSelect }) {
  const [list, setList] = useState([]);

  const search = async (e) => {
    const res = await searchCricketers(e.target.value);
    setList(res.data);
  };

  return (
    <div className="max-w-xl mx-auto p-2">
      <h1 className="text-xl font-bold mb-4 whitespace-nowrap">
        Search for your favorite cricketer
      </h1>
      <input
        placeholder="Search cricketer"
        onChange={search}
        className="w-full border p-2"
      />

      {list.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          {c.name}
        </div>
      ))}
    </div>
  );
}
