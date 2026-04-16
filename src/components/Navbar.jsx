import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ theme, setTheme }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-top">
        <h3 onClick={() => (user ? navigate("/dashboard") : navigate("/"))}>
          💸 UPI App
        </h3>
      </div>

      {/* HAMBURGER (mobile only) */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${open ? "active" : ""}`}>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        {!token ? (
          <>
            <Link to="/" onClick={() => setOpen(false)}>🔐 Login</Link>
            <Link to="/register" onClick={() => setOpen(false)}>📝 Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" onClick={() => setOpen(false)}>🏠 Dashboard</Link>
            <Link to="/history" onClick={() => setOpen(false)}>📜 History</Link>

            <button
              className="logout-btn"
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
            >
              🔓 Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;