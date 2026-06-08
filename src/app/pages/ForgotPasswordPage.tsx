import { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../lib/supabase";
import logo from "../../imports/logo.png";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailErr("Please enter a valid email address.");
      return;
    }
    setEmailErr("");
    setLoading(true);
    await db.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="auth-page">
      {/* Left brand panel */}
      <div className="auth-brand">
        <svg className="auth-brand-wave" viewBox="0 0 300 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0 C100 100,40 160,60 270 C80 380,200 420,180 550 C160 680,60 730,80 800 L300 800 L300 0 Z" fill="#96D74C" opacity="0.15"/>
          <path d="M170 0 C120 100,60 160,80 270 C100 380,220 420,200 550 C180 680,80 730,100 800 L300 800 L300 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.3"/>
        </svg>
        <a className="auth-brand-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Tall Bridge Institute" />
          <div>
            <div className="auth-brand-logo-text">Tall Bridge<span>.</span></div>
            <span className="auth-brand-logo-sub">Institute</span>
          </div>
        </a>
        <div className="auth-brand-body">
          <div>
            <h2 className="auth-brand-heading">Reset your <em>password.</em></h2>
            <p className="auth-brand-sub">{"We'll"} send a secure link to your email. Click it to choose a new password.</p>
          </div>
          <div className="auth-trust">
            {["Link expires in 60 minutes", "Secure reset — no password stored in email", "Return to login after resetting"].map(t => (
              <div className="auth-trust-item" key={t}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.5" stroke="#96D74C" strokeOpacity="0.5"/>
                  <path d="M5 8l2 2 4-4" stroke="#96D74C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-brand-footer"><p>Know, Do, Be, Have... More.</p></div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">

          {sent ? (
            <div className="auth-success visible">
              <div className="auth-success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8l9 6 9-6" stroke="#96D74C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Check your inbox.</h3>
              <p>
                We sent a password reset link to <strong>{email}</strong>.
                Open it and follow the instructions. The link expires in 60 minutes.
              </p>
              <p style={{ fontSize: ".82rem", color: "#7a6a8a", marginTop: ".5rem" }}>
                {"Didn't receive it? Check your spam folder, or "}
                <button
                  onClick={() => setSent(false)}
                  style={{ background: "none", border: "none", color: "#721CB8", fontWeight: 600, cursor: "pointer", fontSize: ".82rem", padding: 0 }}
                >
                  try again
                </button>.
              </p>
              <button className="btn-auth-submit" style={{ marginTop: "1.5rem" }} onClick={() => navigate("/auth?mode=login")}>
                Back to log in
              </button>
            </div>
          ) : (
            <>
              <h2 className="auth-form-heading">Forgot your <em>password?</em></h2>
              <p className="auth-form-sub">Enter the email address on your account and {"we'll"} send you a reset link.</p>

              <form className="auth-form" noValidate onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
                <div className="field-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailErr(""); }}
                    className={emailErr ? "error" : ""}
                    autoComplete="email"
                    autoFocus
                  />
                  {emailErr && <span className="field-error visible">{emailErr}</span>}
                </div>

                <button type="submit" className="btn-auth-submit lime" disabled={loading}>
                  {loading ? "Sending..." : "Send reset link →"}
                </button>
              </form>

              <p className="auth-switch" style={{ marginTop: "1.5rem" }}>
                Remember it? <a onClick={() => navigate("/auth?mode=login")} style={{ cursor: "pointer" }}>Back to log in</a>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
