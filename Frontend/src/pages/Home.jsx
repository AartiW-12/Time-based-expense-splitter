import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="card">
        {/* App Name & Tagline */}
        <h1 className="app-name">SmartSplit</h1>
        <p className="tagline">Smarter way to divide expenses</p>

        {/* Features */}
        <div className="features">
          <div>⚡ Smart Expense Split</div>
          <div>🕒 Time-Based Calculation</div>
          <div>🔒 Secure & Reliable</div>
        </div>

        {/* Buttons */}
        <div className="actions">
          <button className="btn login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
