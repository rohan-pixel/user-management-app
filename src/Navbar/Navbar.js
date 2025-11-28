import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Helper: Check active path
  const isActive = (path) =>
    location.pathname === path
      ? "text-amber-200 font-bold"
      : "hover:text-amber-200";

  return (
    <>
      {/* NAVBAR */}
      <nav className="backdrop-blur-md bg-amber-500/90 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide flex items-center gap-3">
            <i className="fa fa-users text-2xl drop-shadow-sm scale-95 hover:scale-110 transition"></i>
            User Management
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-semibold">

            <Link to="/" className={`flex items-center gap-2 ${isActive("/")}`}>
              <i className="fa fa-home"></i> Home
            </Link>

            <Link
              to="/comp/userlist"
              className={`flex items-center gap-2 ${isActive("/comp/userlist")}`}
            >
              <i className="fa fa-list"></i> Users
            </Link>

            <Link
              to="/comp/userform"
              className={`flex items-center gap-2 ${isActive("/comp/userform")}`}
            >
              <i className="fa fa-plus-circle"></i> Add User
            </Link>
          </div>

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden text-3xl focus:outline-none hover:scale-110 transition"
            onClick={() => setOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-amber-600 to-amber-700 text-white shadow-2xl transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out z-50`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-amber-400/40">
          <h1 className="text-xl font-semibold tracking-wide">Menu</h1>
          <button
            onClick={() => setOpen(false)}
            className="text-3xl hover:scale-110 transition"
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col mt-4 space-y-5 px-6 text-lg">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 ${isActive("/")}`}
          >
            <i className="fa fa-home"></i> Home
          </Link>

          <Link
            to="/comp/userlist"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 ${isActive("/comp/userlist")}`}
          >
            <i className="fa fa-list"></i> Users
          </Link>

          <Link
            to="/comp/userform"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 ${isActive("/comp/userform")}`}
          >
            <i className="fa fa-plus-circle"></i> Add User
          </Link>
        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
        ></div>
      )}
    </>
  );
};

export default Navbar;
