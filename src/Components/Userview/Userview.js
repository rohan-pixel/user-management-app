import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Userservice } from "../../Services/Userservice";

let Userview = () => {
  let { userId } = useParams();

  let [state, setState] = useState({
    loading: false,
    user: {
      id: "",
      name: "",
      username: "",
      email: "",
      role: "",
    },
    errorMsg: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState((prev) => ({ ...prev, loading: true }));

        let response = await Userservice.getUser(userId);

        setState((prev) => ({
          ...prev,
          loading: false,
          user: response.data,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          errorMsg: error.message,
        }));
      }
    }
    fetchData();
  }, [userId]);

  let { user, loading, errorMsg } = state;

  return (
    <>
      <h2 className="font-bold text-2xl text-gray-800 text-center mt-4">
        User Details
      </h2>

      {loading && (
        <p className="text-blue-600 font-semibold text-center mt-2">
          Loading...
        </p>
      )}

      {errorMsg && (
        <p className="text-red-500 text-center mt-2">{errorMsg}</p>
      )}

      <div className="flex justify-center mt-6">
        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md border border-gray-200">

          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            User Information
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">ID:</span>
              <span className="text-gray-800">{user.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Name:</span>
              <span className="text-gray-800">{user.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Username:</span>
              <span className="text-gray-800">{user.username}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Role:</span>
              <span className="text-gray-800">{user.role}</span>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/comp/userlist">
              <button className="px-6 py-2 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition">
                Back
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Userview;
