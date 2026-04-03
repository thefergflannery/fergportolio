"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(from);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Martian Mono', monospace",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "380px" }}>
        {/* Logo / heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#39FF14",
              color: "#111",
              fontWeight: 800,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "6px 14px",
              marginBottom: "16px",
            }}
          >
            FF Admin
          </div>
          <p style={{ color: "#666", fontSize: "11px", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "#ff3b3022",
                border: "1px solid #ff3b30",
                color: "#ff3b30",
                fontSize: "11px",
                padding: "10px 14px",
                borderRadius: "3px",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#39FF14",
              color: "#111",
              border: "none",
              borderRadius: "3px",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#666",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "6px",
  fontWeight: 700,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "#1a1a1a",
  border: "1.5px solid #333",
  borderRadius: "3px",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: "13px",
  boxSizing: "border-box",
  outline: "none",
};