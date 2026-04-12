import { useEffect, useState } from "react";
import API from "../utils/api";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");

      if (res.data.error) {
        alert(res.data.error);
        localStorage.clear();
        window.location.href = "/";
        return;
      }

      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Session expired");
      localStorage.clear();
      window.location.href = "/";
    }
  };
  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="page">
      <div className="glass">
        <h2 className="title">👋 Welcome {user.name}</h2>

        <div className="card">
          <p>📱 {user.phone}</p>
          <p>👤 {user.type}</p>
        </div>

        {user.type === "normal" && (
          <div className="card">
            <p className="balance">💰 ₹{user.balance}</p>
          </div>
        )}

        <button
          className="btn"
          onClick={() => (window.location.href = "/add-money")}
        >
          ➕ Add Money
        </button>

        <button className="btn" onClick={() => (window.location.href = "/pay")}>
          💸 Pay
        </button>

        <button
          className="btn"
          onClick={() => (window.location.href = "/history")}
        >
          📜 History
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
