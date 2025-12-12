import { useState } from "react";
import { addCricketer } from "../services/api";
import React from "react";

export default function CricketerForm() {
  const [form, setForm] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await addCricketer(form);
    alert("Cricketer saved ✅");
  };

  return (
    <div className="max-w-xl mx-4 p-2">
      <h1 className="text-xl font-bold mb-4">
        Please fill information of your favorite cricketer
      </h1>

      {[
        ["name", "Name"],
        ["date_of_birth", "Date of Birth"],
        ["photo_url", "Photo URL"],
        ["birthplace", "Birthplace"],
        ["career", "Career"],
        ["fifties", "Fifties"],
        ["centuries", "Centuries"],
        ["average", "Average"],
      ].map(([key, label]) => (
        <input
          key={key}
          name={key}
          placeholder={label}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
      ))}

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
