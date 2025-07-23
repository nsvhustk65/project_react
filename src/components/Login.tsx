import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNotAllowed(false);
    try {
      const res = await fetch(
        `http://localhost:3001/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );
      const users = await res.json();
      if (users.length > 0) {
        const user = users[0];
        if (user.role === "admin") {
          localStorage.setItem("token", "fake-jwt-token");
          onLogin("fake-jwt-token");
          navigate("/admin");
        } else {
          setNotAllowed(true);
          setError("Bạn không được phép truy cập trang admin");
        }
      } else {
        setError("Sai tài khoản hoặc mật khẩu");
      }
    } catch (err) {
      setError("Lỗi kết nối tới server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 340,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 8, color: "#222" }}>Đăng nhập</h2>
        {error && <p style={{ color: notAllowed ? "#e67e22" : "#e74c3c", textAlign: "center", margin: 0 }}>{error}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontWeight: 500, color: "#555" }}>Tên đăng nhập</label>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 15,
              transition: "border 0.2s",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontWeight: 500, color: "#555" }}>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 15,
              transition: "border 0.2s",
            }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#4f8cff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 0",
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(79,140,255,0.08)",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <div style={{ textAlign: "center", marginTop: 4, color: "#888" }}>
          <span>Chưa có tài khoản? </span>
          <Link to="/register" style={{ color: "#4f8cff", textDecoration: "none", fontWeight: 500 }}>Đăng ký</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 