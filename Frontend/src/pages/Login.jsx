import { useState } from "react";

import { loginUser } from "../services/authService";

import "../App.css";

function Login({ onRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const data = await loginUser({
        email,
        password,
      });

      onLogin(data.user);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed";

      setError(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card">

        <div className="login-logo">
          N
        </div>

        <h1 className="brand-name">
          Post<span>Sphere</span>
        </h1>

        <h2>Welcome back</h2>

        <p className="login-subtitle">
          Login to your account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>

            <div className="input-wrapper">
              <span className="input-icon">
                ✉
              </span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="input-icon">
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <div className="signup-section">
          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            className="signup-link"
            onClick={onRegister}
          >
            Sign up
          </button>
        </div>

        <div className="security-text">
          🔒 Your data is safe and secure
        </div>

      </div>
    </div>
  );
}

export default Login;

