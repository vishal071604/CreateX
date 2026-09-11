
import { logoutUser } from "../services/authService";

function Navbar({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      onLogout();
    }
  };

  return (
    <nav className="navbar">
      <h2>CreateX</h2>

      {user && (
        <div>
          <span>
            Hi, {user.name}
          </span>

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

