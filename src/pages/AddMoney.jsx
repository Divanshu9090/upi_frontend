import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function AddMoney() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="page">
        <h2>Please login</h2>
      </div>
    );
  }

  if (user.type === "merchant") {
    return (
      <div className="page">
        <h2>🚫 Merchants cannot add money</h2>
      </div>
    );
  }

  const handleAddMoney = async () => {
    try {
      if (!amount || amount <= 0) {
        return alert("Enter valid amount");
      }

      setLoading(true);

      const res = await API.post("/user/add-money", {
        amount: Number(amount),
      });
      if (res.data.error) {
        return alert(res.data.error);
      }
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Error adding money");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="glass">
        <h2 className="title">💰 Add Money</h2>

        {/* Amount Input */}
        <input
          className="input"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Live Preview */}
        {amount && (
          <div className="card" style={{ textAlign: "center" }}>
            <p>Adding</p>
            <h2 style={{ color: "#22c55e" }}>₹{amount}</h2>
          </div>
        )}

        {/* Add Button */}
        <button className="btn" onClick={handleAddMoney} disabled={loading}>
          {loading ? "Processing..." : "➕ Add Money"}
        </button>

        {/* Back Button */}
        <button
          className="btn"
          style={{ background: "#334155" }}
          onClick={() => navigate("/dashboard")}
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}

export default AddMoney;
