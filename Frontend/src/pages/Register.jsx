
import { useState } from "react";

import { registerUser } from "../services/authService";

import "../App.css";

function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await registerUser({
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");

      onLogin();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed";

      setError(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="register-card">

        <div className="register-logo">
          N
        </div>

        <h1 className="brand-name">
          Post<span>Sphere</span>
        </h1>

        <h2>Create Account</h2>

        <p className="register-subtitle">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Name</label>

            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>

            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Create Account
          </button>

        </form>

        <div className="signup-section">
          <span>
            Already have an account?
          </span>

          <button
            type="button"
            className="signup-link"
            onClick={onLogin}
          >
            Login
          </button>
        </div>

        <div className="security-text">
          🔒 Your data is safe and secure
        </div>

      </div>
    </div>
  );
}

export default Register;

