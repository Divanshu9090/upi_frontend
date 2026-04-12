import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/payment/history");
      if (res.data.error) {
        return alert(res.data.error);
      }
      setTransactions(res.data);
    } catch (err) {
      alert("Error fetching history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>⏳ Loading Transactions...</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="glass" style={{ width: "420px" }}>
        <h2 className="title">📜 Transaction History</h2>

        {transactions.length === 0 && (
          <p style={{ textAlign: "center" }}>No transactions found</p>
        )}

        {transactions.map((tx) => {
          const isSender = tx.sender?._id === user._id;

          return (
            <div key={tx._id} className="card">
              {/* Direction */}
              <p style={{ fontWeight: "bold" }}>
                {isSender ? "➡ Sent To" : "⬅ Received From"}
              </p>

              {/* Name */}
              <p>
                <b>Name:</b>{" "}
                {isSender
                  ? tx.receiver?.name || tx.receiverInfo?.name || "Unknown"
                  : tx.sender?.name}
              </p>

              {/* Phone */}
              <p>
                <b>Phone:</b>{" "}
                {isSender
                  ? tx.receiver?.phone || tx.receiverInfo?.phone
                  : tx.sender?.phone}
              </p>

              {/* Amount */}
              <p style={{ marginTop: "5px" }}>
                <b>Amount:</b>{" "}
                <span style={{ fontWeight: "bold" }}>₹{tx.amount}</span>
              </p>

              {/* Status */}
              <p>
                <b>Status:</b>{" "}
                {tx.fraud ? (
                  <span className="error">🚨 Fraud Blocked</span>
                ) : (
                  <span className="success">✅ Success</span>
                )}
              </p>

              {/* Date */}
              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                {new Date(tx.createdAt).toLocaleString()}
              </p>
            </div>
          );
        })}

        {/* Back Button */}
        <button className="btn" onClick={() => navigate("/dashboard")}>
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default History;
