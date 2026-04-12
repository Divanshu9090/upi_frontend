import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");

      if (res.data.error) {
        alert(res.data.error);
        localStorage.clear();
        navigate("/");
        return;
      }

      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Session expired");
      localStorage.clear();
      navigate("/");
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

        <button className="btn" onClick={() => navigate("/add-money")}>
          ➕ Add Money
        </button>

        <button className="btn" onClick={() => navigate("/pay")}>
          💸 Pay
        </button>

        <button className="btn" onClick={() => navigate("/history")}>
          📜 History
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
