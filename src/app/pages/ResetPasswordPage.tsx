import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../lib/supabase";
<img src="/logo.png" />
function getPasswordStrength(val: string) {
  if (!val) return { width: "0%", bg: "#eee", label: "" };
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^a-zA-Z0-9]/.test(val)) score++;
  const levels = [
    { width: "0%", bg: "#eee", label: "" },
    { width: "25%", bg: "#e53e3e", label: "Weak" },
    { width: "50%", bg: "#ed8936", label: "Fair" },
    { width: "75%", bg: "#96D74C", label: "Good" },
    { width: "100%", bg: "#38a169", label: "Strong" },
  ];
  return levels[Math.max(1, score)];
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErr, setFieldErr] = useState({ pass: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when the user lands via the reset link
    const unsub = db.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      } else if (event === "SIGNED_IN") {
        // Covers the case where the token is already exchanged
        setReady(true);
      }
    });

    // Also check if we already have a valid session (user clicked link, session was set)
    db.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
      else {
        // If no session and no recovery event fires within 3s, the link is invalid/expired
        setTimeout(() => {
          setReady(r => { if (!r) setInvalidLink(true); return r; });
        }, 3000);
      }
    });

    return () => { unsub.data.subscription.unsubscribe(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const errs = { pass: "", confirm: "" };
    let valid = true;
    if (password.length < 8) { errs.pass = "Must be at least 8 characters."; valid = false; }
    if (password !== confirm) { errs.confirm = "Passwords do not match."; valid = false; }
    setFieldErr(errs);
    if (!valid) return;

    setLoading(true);
    const { error: updateErr } = await db.auth.updateUser({ password });
    setLoading(false);

    if (updateErr) {
      setError(updateErr.message || "Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
    await db.auth.signOut();
    setTimeout(() => navigate("/auth?mode=login"), 3000);
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="auth-page">
      {/* Left brand panel */}
      <div className="auth-brand">
        <svg className="auth-brand-wave" viewBox="0 0 300 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0 C100 100,40 160,60 270 C80 380,200 420,180 550 C160 680,60 730,80 800 L300 800 L300 0 Z" fill="#96D74C" opacity="0.15"/>
          <path d="M170 0 C120 100,60 160,80 270 C100 380,220 420,200 550 C180 680,80 730,100 800 L300 800 L300 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.3"/>
        </svg>
        <a className="auth-brand-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src="/logo.png" alt="Tall Bridge Institute" />
          <div>
            <div className="auth-brand-logo-text">Tall Bridge<span>.</span></div>
            <span className="auth-brand-logo-sub">Institute</span>
          </div>
        </a>
        <div className="auth-brand-body">
          <div>
            <h2 className="auth-brand-heading">Choose a new <em>password.</em></h2>
            <p className="auth-brand-sub">Make it strong. {"You'll"} use it every time you log in to your Tall Bridge account.</p>
          </div>
        </div>
        <div className="auth-brand-footer"><p>Know, Do, Be, Have... More.</p></div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">

          {success ? (
            <div className="auth-success visible">
              <div className="auth-success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="#96D74C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Password updated!</h3>
              <p>Your password has been changed successfully. Taking you to log in...</p>
            </div>
          ) : invalidLink ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
              <h2 className="auth-form-heading">Link expired.</h2>
              <p className="auth-form-sub">This reset link is invalid or has expired. Reset links are only valid for 60 minutes.</p>
              <button
                className="btn-auth-submit lime"
                style={{ marginTop: "1.5rem" }}
                onClick={() => navigate("/forgot-password")}
              >
                Request a new link →
              </button>
            </div>
          ) : !ready ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <div className="spinner" style={{ margin: "0 auto 1rem" }}></div>
              <p className="auth-form-sub">Verifying your reset link...</p>
            </div>
          ) : (
            <>
              <h2 className="auth-form-heading">New <em>password.</em></h2>
              <p className="auth-form-sub">Choose a strong password for your account.</p>

              <form className="auth-form" noValidate onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
                <div className="field-group">
                  <label>New password</label>
                  <input
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setFieldErr(f => ({ ...f, pass: "" })); }}
                    className={fieldErr.pass ? "error" : ""}
                    autoComplete="new-password"
                    autoFocus
                  />
                  <div className="password-strength">
                    <div className="password-strength-bar" style={{ width: strength.width, background: strength.bg }}></div>
                  </div>
                  {strength.label && <div className="password-strength-label" style={{ color: strength.bg }}>{strength.label}</div>}
                  {fieldErr.pass && <span className="field-error visible">{fieldErr.pass}</span>}
                </div>

                <div className="field-group">
                  <label>Confirm new password</label>
                  <input
                    type="password"
                    placeholder="Repeat your new password"
                    value={confirm}
                    onChange={e => { setConfirm(e.target.value); setFieldErr(f => ({ ...f, confirm: "" })); }}
                    className={fieldErr.confirm ? "error" : ""}
                    autoComplete="new-password"
                  />
                  {fieldErr.confirm && <span className="field-error visible">{fieldErr.confirm}</span>}
                </div>

                <button type="submit" className="btn-auth-submit lime" disabled={loading}>
                  {loading ? "Updating..." : "Set new password →"}
                </button>

                {error && <div className="auth-form-error visible">{error}</div>}
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
