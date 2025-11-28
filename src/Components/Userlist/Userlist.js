import React, { useEffect, useState } from "react";
import { Userservice } from "../../Services/Userservice";
import { Link } from "react-router-dom";

let Userlist = () => {
  let [currentPage, setCurrentPage] = useState(1);
  let recordsPerPage = 10;

  let [query, setQuery] = useState({ text: "" });

  let [state, setState] = useState({
    loading: false,
    users: [],
    filteredUsers: [],
    errorMsg: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const response = await Userservice.getAllUsers();

        setState((prev) => ({
          ...prev,
          loading: false,
          users: response.data,
          filteredUsers: response.data,
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, loading: false, errorMsg: error.message }));
      }
    }
    fetchData();
  }, []);

  // Delete user
  let clickDelete = async (userId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (!confirmed) return;

      setState((prev) => ({ ...prev, loading: true }));
      await Userservice.deleteUser(userId);

      const response = await Userservice.getAllUsers();

      setState((prev) => ({
        ...prev,
        loading: false,
        users: response.data,
        filteredUsers: response.data,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, errorMsg: error.message }));
    }
  };

  // Search
  let searchUser = (e) => {
    setQuery({ ...query, text: e.target.value });

    let results = state.users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setState((prev) => ({ ...prev, filteredUsers: results }));
  };

  let { filteredUsers } = state;

  // Pagination Logic
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  let records = filteredUsers.slice(firstIndex, lastIndex);
  let nPage = Math.ceil(filteredUsers.length / recordsPerPage);
  let numbers = [...Array(nPage + 1).keys()].slice(1);

  return (
    <>
      {/* Header */}
      <div className="container mx-auto px-10 mt-6 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
          User Management
        </h1>

       <Link to="/comp/userform">
  <button className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 shadow-md px-4 sm:px-6 py-2 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
    + Add User
  </button>
</Link>

      </div>

      {/* Search Section */}
      <div className="container mx-auto mt-8 px-10">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <i className="fa fa-search text-gray-500 text-xl"></i>
            <input
              type="text"
              value={query.text}
              onChange={searchUser}
              placeholder="Search user by name..."
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="container mx-auto mt-10 px-10">
        <div className="overflow-x-auto bg-white shadow-2xl rounded-xl p-6 border border-gray-200">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-700 to-cyan-600 text-white">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-cyan-50 transition-all duration-200"
                >
                  <td className="py-3 px-4 text-gray-700">{user.id}</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-gray-700">{user.username}</td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 text-gray-700">{user.role}</td>

                  <td className="py-3 px-4 text-center space-x-6 text-xl">
                    <Link to={`/comp/userview/${user.id}`}>
                      <i className="fa fa-eye text-blue-600 hover:text-blue-800 transition"></i>
                    </Link>

                    <Link to={`/comp/userupdate/${user.id}`}>
                      <i className="fa fa-edit text-green-600 hover:text-green-800 transition"></i>
                    </Link>

                    <button onClick={() => clickDelete(user.id)}>
                      <i className="fa fa-trash text-red-600 hover:text-red-800 transition"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={prePage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            {numbers.map((n) => (
              <button
                key={n}
                onClick={() => changeCPage(n)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === n
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === nPage}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );

  function prePage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < nPage) setCurrentPage(currentPage + 1);
  }
};

export default Userlist;