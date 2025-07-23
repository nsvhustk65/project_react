import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }
    try {
      // Kiểm tra trùng username
      const checkRes = await fetch(`http://localhost:3001/adminUsers?username=${encodeURIComponent(username)}`);
      const existed = await checkRes.json();
      if (existed.length > 0) {
        setError("Tên đăng nhập đã tồn tại");
        setLoading(false);
        return;
      }
      // Đăng ký mới
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, fullname, email, phone, address, role: "user", status: "active" })
      });
      if (res.ok) {
        setSuccess(true);
        setUsername("");
        setPassword("");
        setFullname("");
        setEmail("");
        setPhone("");
        setAddress("");
      } else {
        setError("Đăng ký thất bại");
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
        <h2 style={{ textAlign: "center", marginBottom: 8, color: "#222" }}>Đăng ký</h2>
        {success && <p style={{ color: "#27ae60", textAlign: "center", margin: 0 }}>Đăng ký thành công!</p>}
        {error && <p style={{ color: "#e74c3c", textAlign: "center", margin: 0 }}>{error}</p>}
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
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontWeight: 500, color: "#555" }}>Xác nhận mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
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
          <label style={{ fontWeight: 500, color: "#555" }}>Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
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
          <label style={{ fontWeight: 500, color: "#555" }}>Email</label>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <label style={{ fontWeight: 500, color: "#555" }}>Số điện thoại</label>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={e => setPhone(e.target.value)}
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
          <label style={{ fontWeight: 500, color: "#555" }}>Địa chỉ</label>
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={e => setAddress(e.target.value)}
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
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default Register; 