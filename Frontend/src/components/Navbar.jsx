import { logoutUser } from "../services/authService";

function Navbar({ user, onLogout }) {
  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  return (
    <nav className="navbar">
      <h2>CreateX</h2>

      {user && (
        <div>
          <span>Hi, {user.name}</span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;