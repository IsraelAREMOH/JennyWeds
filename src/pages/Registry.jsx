import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Admin/Login";
import DashBoard from "./Admin/DashBoard";
import GuestList from "./Admin/GuestList";
import CheckInPage from "./Admin/CheckInPage";
import { adminLogout } from "../api/adminApi";

export default function AdminPage() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!token) return <Login />;

  function handleLogout() {
    adminLogout();
    navigate("/admin");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-[#4B2C28] text-white px-6 py-3 relative">
        <h1 className="text-lg md:text-xl font-semibold">Admin Panel</h1>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* NAVIGATION */}
        <nav
          className={`flex-col absolute top-full left-0 w-full bg-[#4B2C28] transition-all duration-300 ease-in-out
            md:static md:flex md:flex-row md:bg-transparent md:w-auto md:gap-6
            ${menuOpen ? "flex" : "hidden"}
          `}
        >
          <Link
            to="/admin/dashboard"
            className="py-2 px-4 hover:bg-[#8B0000] md:hover:bg-transparent md:hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/guests"
            className="py-2 px-4 hover:bg-[#8B0000] md:hover:bg-transparent md:hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Guests
          </Link>
          <Link
            to="/admin/verify"
            className="py-2 px-4 hover:bg-[#8B0000] md:hover:bg-transparent md:hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Verify
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="py-2 px-4 hover:bg-[#8B0000] md:hover:bg-transparent md:hover:underline text-left"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-1 p-4 overflow-x-hidden">
        <Routes>
          <Route index element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="guests" element={<GuestList />} />
          <Route path="verify" element={<CheckInPage />} />
        </Routes>
      </main>
    </div>
  );
}
