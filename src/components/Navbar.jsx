import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* TOP SECTION */}
      <div className="nav-top">
        <h3 style={{ cursor: "pointer" }} onClick={() => user ? navigate("/dashboard") : navigate("/")}>
          💸 UPI App
        </h3>
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${open ? "active" : ""}`}>
        {!token ? (
          <>
            <Link to="/" onClick={() => setOpen(false)}>
              🔐 Login
            </Link>

            <Link to="/register" onClick={() => setOpen(false)}>
              📝 Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              🏠 Dashboard
            </Link>

            <Link to="/history" onClick={() => setOpen(false)}>
              📜 History
            </Link>

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