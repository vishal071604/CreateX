import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./App.css";

function App() {
  // =========================
  // GET SAVED USER
  // =========================
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid saved user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  // =========================
  // CURRENT PAGE
  // =========================
  const [page, setPage] = useState(
    user ? "home" : "login"
  );

  // =========================
  // LOGIN
  // =========================
  const handleLogin = (userData) => {
    setUser(userData);
    setPage("home");
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setPage("login");
  };

  // =========================
  // AUTH PAGES
  // =========================
  if (!user) {
    return (
      <div className="auth-page">
        {page === "login" ? (
          <Login
            onLogin={handleLogin}
            onRegister={() =>
              setPage("register")
            }
          />
        ) : (
          <Register
            onLogin={() =>
              setPage("login")
            }
          />
        )}
      </div>
    );
  }

  // =========================
  // HOME PAGE
  // =========================
  return (
    <>
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <Home />
    </>
  );
}

export default App;