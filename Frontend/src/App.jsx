import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [page, setPage] = useState(
    user ? "home" : "login"
  );

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setPage("login");
  };

  if (!user) {
    return (
      <div className="auth-page">
        {page === "login" ? (
          <Login
            onLogin={handleLogin}
            onRegister={() => setPage("register")}
          />
        ) : (
          <Register
            onLogin={() => setPage("login")}
          />
        )}
      </div>
    );
  }

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