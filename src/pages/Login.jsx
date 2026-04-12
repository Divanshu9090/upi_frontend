import { useState } from "react";
import API from "../utils/api";
import { Navigate } from "react-router-dom";

function Login() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!phone || !password) {
        return alert("Please fill all fields");
      }

      setLoading(true);

      const res = await API.post("/auth/login", {
        phone,
        password,
      });

      if (res.data.error) {
        return alert(res.data.error);
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="glass">
        <h2 className="title">🔐 Login</h2>

        <input
          className="input"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{ textAlign: "center", marginTop: "10px", cursor: "pointer" }}
          onClick={() => (window.location.href = "/register")}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}

export default Login;
