import { logoutUser } from "../services/authService";

function Navbar({ user, onLogout }) {
  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  return (
    <nav className="navbar">
      {/* App Name */}
      <h2>CreateX</h2>

      {/* User Information */}
      {user && (
        <div>
          <span>Hi, {user.name}</span>

          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;