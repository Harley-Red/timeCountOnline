import React from "react";

export default function History({ records }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">计时器记录</h1>
      {records.length === 0 ? (
        <p className="text-lg text-gray-500">暂无记录</p>
      ) : (
        <ul className="w-3/4 max-w-lg bg-white shadow-md rounded-lg p-4">
          {records.map((record, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <span className="text-lg font-medium">{record.time}</span>
              <span className="text-sm text-gray-500">{record.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}