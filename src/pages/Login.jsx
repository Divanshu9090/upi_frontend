import { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("token");
  if (token) {
    navigate("/dashboard");
  }

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleLogin = async () => {
    try {
      if (!phone || !password) {
        return setToast({
          type: "error",
          message: "Please fill all fields",
        });
      }

      setLoading(true);

      const res = await API.post("/auth/login", {
        phone,
        password,
      });

      if (res.data.error) {
        return setToast({
          type: "error",
          message: res.data.error || "Invalid credentials",
        });
      }

      setToast({
        type: "success",
        message: "Login successful",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setToast({
        type: "error",
        message: "Server error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* TOAST UI */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.type === "error" ? "❌" : "✅"}</span>
          <span>{toast.message}</span>
        </div>
      )}

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
          onClick={() => navigate("/register")}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}

export default Login;
