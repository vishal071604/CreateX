import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [register, setRegister] = useState(false);

  if (!user) {
    if (register) {
      return (
        <Register
          onLogin={() => setRegister(false)}
        />
      );
    }

    return (
      <Login
        onRegister={() => setRegister(true)}
        onLogin={(user) => setUser(user)}
      />
    );
  }

  return (
    <>
      <Navbar
        user={user}
        onLogout={() => setUser(null)}
      />

      <Home />
    </>
  );
}

export default App;

