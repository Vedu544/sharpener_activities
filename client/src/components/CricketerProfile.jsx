import React from "react";

export default function CricketerProfile({ data }) {
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto p-2">
      {/* CARD */}
      <div className="border border-gray-300 rounded-xl shadow-sm bg-white">
        
        {/* HEADER */}
        <div className="border-b px-6 py-4 bg-gray-100 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">
            Player Profile
          </h2>
        </div>

        {/* MAIN CONTENT */}
        <div className="p-6 flex gap-6">

          {/* LEFT SECTION */}
          <div className="w-1/3">
            <img
              src={data.photo_url}
              className="rounded-lg w-full h-auto border shadow-sm"
              alt="Player"
            />

            {/* Stats Box */}
            <div className="mt-4 border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold mb-3 text-gray-700 border-b pb-2">
                Batting Stats
              </h3>

              <div className="space-y-2 text-gray-700">
                <p><b>Fifties:</b> {data.fifties}</p>
                <p><b>Centuries:</b> {data.centuries}</p>
                <p><b>Average:</b> {data.average}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-2/3 space-y-4">

            <div className="pb-3 border-b">
              <h2 className="text-3xl font-bold text-blue-700">{data.name}</h2>
            </div>

            <div className="space-y-2 text-gray-800">
              <p><b>Career:</b> {data.career}</p>
              <p><b>Date of Birth:</b> {data.date_of_birth}</p>
              <p><b>Birthplace:</b> {data.birthplace}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
