import { useState } from "react";
import { users } from "./Data/dummyData";

function DataTable() {
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  function handleSort(key, direction) {
    setSortConfig({ key, direction });
  }

  function getFilteredUsers() {
    return users.filter((user) =>
      user.Title.toLowerCase().includes(filter.toLowerCase())
    );
  }

  function getSortedUsers(filtered) {
    return [...filtered].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }

  function SortControls({ column }) {
    return (
      <span className="ml-2 inline-flex items-center space-x-1">
        <button
          onClick={() => handleSort(column, "asc")}
          className={`text-xs sm:text-sm cursor-pointer transition ${
            sortConfig.key === column && sortConfig.direction === "asc" ? "font-bold text-blue-600" : "text-gray-500"
          }`}
          title={`Sort ${column} ascending`}
          aria-label={`Sort ${column} ascending`}> ▲
        </button>

        <button onClick={() => handleSort(column, "desc")}
          className={`text-xs sm:text-sm cursor-pointer transition ${
            sortConfig.key === column && sortConfig.direction === "desc" ? "font-bold text-blue-600" : "text-gray-500"
          }`}
          title={`Sort ${column} descending`}
          aria-label={`Sort ${column} descending`}> ▼
        </button>
      </span>
    );
  }

  const filteredUsers = getFilteredUsers();
  const sortedUsers = getSortedUsers(filteredUsers);

  return (
    <div className="w-full px-2 md:px-6 lg:px-12">
      <div className="text-center">
        <input type="text"
          placeholder="Filter by article title..."
          className="border p-2 mt-2 rounded w-56 text-center sm:text-sm md:w-72 lg:w-96 md:mt-0"
          value={filter}
          onChange={(e) => setFilter(e.target.value)} />
        <span> Sort<SortControls column="Title" /></span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border divide-y divide-gray-200 text-[10px] sm:text-xs md:text-sm lg:text-base">
          <caption className="text-left text-gray-600 font-medium mb-2 text-xs md:text-sm"> Article Data Overview </caption>
          <thead className="bg-gray-100 border-t border-b md:border-b-2">
            <tr>
              <th className="p-1 text-left break-words md:p-2 lg:p-3">Title</th>
              <th className="p-1 text-left break-words md:p-2 lg:p-3">Keyword</th>
              <th className="p-1 text-left break-words md:p-2 lg:p-3">Words</th>
              <th className="p-1 text-left break-words md:p-2 lg:p-3">Created</th>
              <th className="p-1 text-left break-words md:p-2 lg:p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 md:hover:bg-gray-100 transition">
                <td className="p-1 break-words md:p-2 lg:p-3">{user.Title}</td>
                <td className="p-1 break-words md:p-2 lg:p-3">{user.Keyword}</td>
                <td className="p-1 md:p-2 lg:p-3">{user.Words}</td>
                <td className="p-1 md:p-2 lg:p-3">{user.Created}</td>
                <td className="p-1 md:p-2 lg:p-3">
                  <button className="border border-green-500 text-green-500 px-2 py-0.5 rounded hover:bg-green-50 transition text-[10px] md:text-xs lg:text-sm md:px-3 md:py-1" aria-label="Perform action">
                    {user.Action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
