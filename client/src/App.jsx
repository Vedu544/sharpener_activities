import { useState } from "react";
import CricketerForm from "./components/CricketerForm";
import SearchCricketer from "./components/SearchCricketer";
import CricketerProfile from "./components/CricketerProfile";
import { getCricketerById } from "./services/api";
import React from "react";

export default function App() {
  const [profile, setProfile] = useState(null);

  const loadProfile = async (id) => {
    const res = await getCricketerById(id);
    setProfile(res.data);
  };

  return (
    <div className="flex flex-col">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-blue-700 mb-0 shadow-md bg-white px-6 py-3 rounded-xl">
        Sharpener Project – Cricket Form
      </h1>

      <div className="w-full max-w-3xl flex gap-3">
        <CricketerForm />
        <SearchCricketer onSelect={loadProfile} />
      </div>

      <div>
        <CricketerProfile data={profile} />
      </div>
    </div>
  );
}
