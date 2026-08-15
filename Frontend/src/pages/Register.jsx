import { useState } from "react";
import { registerUser } from "../services/authService";
import "../App.css";

function Register({ onLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
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
      setMessage("");

      const data = await registerUser(form);

      setMessage(
        data.message || "Registration successful"
      );

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="register-card">

        {/* Logo */}
        <div className="register-logo">
          N
        </div>

        {/* Brand */}
        <h1 className="brand-name">
          Post<span>Sphere</span>
        </h1>

        {/* Heading */}
        <h2>Create Account</h2>

        <p className="register-subtitle">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="input-group">
            <label htmlFor="name">
              Name
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                👤
              </span>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">
              Email
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                ✉
              </span>

              <input
                id="email"
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
            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                🔒
              </span>

              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
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

          {/* Register Button */}
          <button
            type="submit"
            className="login-button"
          >
            Create Account
          </button>
        </form>

        {/* Success Message */}
        {message && (
          <p className="login-success">
            {message}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {/* Login */}
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

        {/* Security */}
        <div className="security-text">
          🔒 Your data is safe and secure
        </div>

      </div>
    </div>
  );
}

export default Register;