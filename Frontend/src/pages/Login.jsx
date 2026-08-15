import { useState } from "react";
import { loginUser } from "../services/authService";
import "../App.css";

function Login({ onLogin, onRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const data = await loginUser(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      onLogin(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          N
        </div>

        {/* Brand */}
        <h1 className="brand-name">
          Note<span>Sphere</span>
        </h1>

        {/* Heading */}
        <h2>Welcome back</h2>

        <p className="login-subtitle">
          Login to your account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="login-email">
              Email
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                ✉
              </span>

              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="login-password">
              Password
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                🔒
              </span>

              <input
                id="login-password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {/* Sign Up */}
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

        {/* Security */}
        <div className="security-text">
          🔒 Your data is safe and secure
        </div>

      </div>
    </div>
  );
}

export default Login;