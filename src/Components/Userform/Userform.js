import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Userservice } from "../../Services/Userservice";

let Userform = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    user: {
      name: "",
      username: "",
      email: "",
      role: "",
    },
    errorMsg: "",
  });

  let updateInput = (e) => {
    setState({
      ...state,
      user: {
        ...state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  let submitForm = async (e) => {
    e.preventDefault();
    try {
      let response = await Userservice.createUser(state.user);
      if (response) {
        navigate("/comp/userlist", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMsg: error.message });
      navigate("/comp/userform", { replace: false });
    }
  };

  let { user } = state;

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-8 text-gray-800">
        Add New User
      </h1>

      <div className="container mx-auto max-w-lg mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
        <form onSubmit={submitForm} className="space-y-6">

          {/* Name */}
          <div>
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={user.name}
              onChange={updateInput}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 outline-none"
              placeholder="Enter name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              required
              value={user.username}
              onChange={updateInput}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 outline-none"
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={user.email}
              onChange={updateInput}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 outline-none"
              placeholder="Enter email"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-gray-700 font-medium">Role</label>
            <input
              type="text"
              name="role"
              required
              value={user.role}
              onChange={updateInput}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 outline-none"
              placeholder="Enter role"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="w-40 h-11 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full transition"
            >
              Add User
            </button>

            <Link
              to="/comp/userlist"
              className="w-40 h-11 flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-full transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Userform;
