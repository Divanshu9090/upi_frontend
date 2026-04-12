import { useState } from "react";
import API from "../utils/api";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    password: "",
    type: "normal",
  });


  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (!form.name || !form.age || !form.phone || !form.password) {
        return alert("Please fill all fields");
      }

      if (form.password.length < 6) {
        return alert("Password must be at least 6 characters");
      }

      setLoading(true);

      const res = await API.post("/auth/register", form);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("🎉 Registered Successfully!");
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="glass">
        <h2 className="title">📝 Create Account</h2>

        <input
          className="input"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          className="input"
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
        />

        <input
          className="input"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select
          className="input"
          name="type"
          onChange={handleChange}
        >
          <option value="normal">Normal User</option>
          <option value="merchant">Merchant</option>
        </select>

        <button className="btn" onClick={handleRegister} disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "12px",
            cursor: "pointer",
            color: "#38bdf8",
          }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;