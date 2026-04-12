import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function Pay() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Other");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

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
        <h2>🚫 Merchants cannot make payments</h2>
      </div>
    );
  }

  const categoryMap = {
    Other: 0,
    Entertainment: 1,
    Fuel: 2,
    Food: 3,
    Utilities: 4,
    Grocery: 5,
    Shopping: 6,
    Transport: 7,
    Healthcare: 8,
    Education: 9,
  };

  const handlePayment = async () => {
    try {
      if (!phone || !amount) {
        return setToast({
          show: true,
          message: "⚠️ Please enter all fields",
          type: "error",
        });
      }

      if (amount <= 0) {
        return setToast({
          show: true,
          message: "⚠️ Invalid amount",
          type: "error",
        });
      }

      setLoading(true);

      const res = await API.post("/payment/pay", {
        receiverPhone: phone,
        category: categoryMap[category],
        amount: Number(amount),
      });

      if (res.data.error) {
        return alert(res.data.error);
      }

      if (res.data.message.includes("Fraud")) {
        setToast({
          show: true,
          message: "🚨 Fraud detected! Transaction blocked",
          type: "error",
        });

        setTimeout(() => {
          setToast({ show: false, message: "", type: "" });
        }, 3000);
      } else {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          navigate("/dashboard");
        }, 2500);
      }
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.error || "❌ Payment failed, try again",
        type: "error",
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="glass">
        <h2 className="title">💸 Send Money</h2>

        {/* Receiver */}
        <input
          className="input"
          placeholder="📱 Receiver Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Amount */}
        <input
          className="input"
          type="number"
          placeholder="💰 Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Category */}
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {Object.keys(categoryMap).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Preview */}
        {amount && (
          <div className="card" style={{ textAlign: "center" }}>
            <p>You're sending</p>
            <h2 style={{ color: "#22c55e" }}>₹{amount}</h2>
          </div>
        )}

        {/* Pay Button */}
        <button className="btn" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "🚀 Pay Now"}
        </button>

        {/* Back */}
        <button
          className="btn"
          style={{ background: "#334155" }}
          onClick={() => navigate("/dashboard")}
        >
          🔙 Back
        </button>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          <span className="icon">{toast.type === "success" ? "✅" : "🚨"}</span>
          <p>{toast.message}</p>
        </div>
      )}

      {/* SUCCESS ANIMATION */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="checkmark">✓</div>
            <h2>Payment Successful</h2>
            <p>Money sent successfully</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pay;
