"use client";

import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12; // Show 10 users per page

  const fetchUsers = async () => {
    setLoading(true);

    const res = await fetch("https://dummyjson.com/users");
    const data = await res.json();

    setUsers(data.users);
    setLoading(false);
  };

  // Pagination calculations
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        👤 Dummy Users With Pagination
      </h1>

      {/* FETCH BUTTON */}
      <div className="text-center mb-8">
        <button
          onClick={() => {
            fetchUsers();
            setCurrentPage(1); // Reset to page 1 when fetching new data
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Fetch Users
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-lg font-semibold">Loading users...</p>
      )}

      {/* USER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg shadow p-4 bg-white text-center"
          >
            <img
              src={user.image}
              alt={user.firstName}
              className="h-32 w-32 rounded-full mx-auto object-cover mb-4"
            />

            <h2 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-gray-500">{user.email}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {users.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
