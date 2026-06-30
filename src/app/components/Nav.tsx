import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav>
      <div className="nav-logo" onClick={() => go("/")}>
        <img src="/logo.png" alt="Tall Bridge Institute" />
        <div>
          <div className="nav-logo-text">Tall Bridge<span>.</span></div>
          <span className="nav-logo-sub">Institute</span>
        </div>
      </div>

      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        <li><a onClick={() => go("/")} className={isActive("/") ? "active" : ""}>Home</a></li>
        <li><a onClick={() => go("/courses")} className={isActive("/courses") ? "active" : ""}>Courses</a></li>
        <li><a onClick={() => go("/organisation")} className={isActive("/organisation") ? "active" : ""}>For Organisations</a></li>
        <li><a onClick={() => go("/about")} className={isActive("/about") ? "active" : ""}>About</a></li>
      </ul>

      <button
        className={`nav-mobile-toggle${menuOpen ? " open" : ""}`}
        id="mobile-nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className="nav-auth">
        <a onClick={() => go("/auth")} className="btn-ghost" style={{ cursor: "pointer" }}>Signup/Login</a>
      </div>
    </nav>
  );
}