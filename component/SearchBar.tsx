"use client";

import { useState } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("blog");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const res = await axios.get(`/api/search?q=${query}&type=${type}`);
    setResults(res.data.data);
  };

  return (
    <div className=" bg-gray-200 p-2   text-gray-800 rounded-lg">
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 rounded bg-gray-50 text-gray-800 w-full"
          placeholder={`Search ${type}s...`}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-50 px-2 py-2 rounded text-gray-800"
        >
          <option value="blog">Blog</option>
          <option value="user">User</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {results.map((item: any) =>
          type === "blog" ? (
            <div
              key={item._id}
              className="border p-2 rounded bg-gray-50 hover:bg-gray-700"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs">{item.slug}</p>
            </div>
          ) : (
            <div
              key={item._id}
              className="flex items-center gap-2 border p-2 rounded bg-gray-50 hover:bg-gray-700"
            >
              <img
                src={item.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item.userName}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
