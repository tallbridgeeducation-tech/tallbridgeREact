import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { db, COURSES } from "../lib/supabase";
// CHANGED: Logo now served from public folder instead of import
// import logo from "../../imports/logo.png";

type Tab = "login" | "signup";
type View = "tabs" | "otp";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.712A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.712V4.956H.957A9.009 9.009 0 000 9c0 1.452.348 2.827.957 4.044l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.956L3.964 6.288C4.672 4.161 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

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

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = (searchParams.get("mode") || "login") as Tab;
  const course = searchParams.get("course") || "";

  const [tab, setTab] = useState<Tab>(mode);
  const [view, setView] = useState<View>("tabs");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loginFieldErr, setLoginFieldErr] = useState({ email: "", pass: "" });
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup state
  const [signupFirst, setSignupFirst] = useState("");
  const [signupLast, setSignupLast] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupErr, setSignupErr] = useState("");
  const [signupFieldErr, setSignupFieldErr] = useState({ first: "", last: "", email: "", pass: "", confirm: "" });
  const [signupLoading, setSignupLoading] = useState(false);

  // Google state
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleErr, setGoogleErr] = useState("");

  // OTP state
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpErr, setOtpErr] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const courseData = course && COURSES[course] ? COURSES[course] : null;

  const switchTab = (t: Tab) => {
    setTab(t);
    const p = new URLSearchParams(searchParams);
    p.set("mode", t);
    setSearchParams(p, { replace: true });
  };

  const redirectAfterAuth = () => {
    if (course) {
      navigate(`/payment?course=${course}`);
    } else {
      navigate("/dashboard");
    }
  };

  // CRITICAL FIX: Handle OAuth callback immediately on page load
  // This ensures the access_token in URL hash is processed before onAuthStateChange fires
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const hash = window.location.hash;
      // Check if this is an OAuth callback (has access_token or refresh_token)
      if (hash.includes("access_token") || hash.includes("refresh_token")) {
        // Give Supabase a moment to auto-process the hash
        await new Promise(resolve => setTimeout(resolve, 300));

        // Check if session was established
        const { data: { session } } = await db.auth.getSession();
        if (session) {
          redirectAfterAuth();
          return;
        }

        // If still no session, try once more after a short delay
        setTimeout(async () => {
          const { data: { session: retrySession } } = await db.auth.getSession();
          if (retrySession) redirectAfterAuth();
        }, 700);
      }
    };

    handleOAuthCallback();

    // Also listen for auth state changes (handles magic links and other auth events)
    const { data: { subscription } } = db.auth.onAuthStateChange((_event, session) => {
      if (session) redirectAfterAuth();
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleGoogle = async (e: React.MouseEvent) => {
    e.preventDefault();
    setGoogleErr("");
    setGoogleLoading(true);
    // Store course in localStorage so PaymentPage can read it after OAuth redirect
    if (course) localStorage.setItem("tb_pending_course", course);

    // CHANGED: Use current URL with hash fragment support for OAuth callback
    const redirect = `${window.location.origin}/auth`;
    const { error } = await db.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirect },
    });
    setGoogleLoading(false);
    if (error) {
      setGoogleErr(
        error.message.includes("provider") || error.message.includes("not enabled")
          ? "Google sign-in is not enabled yet. Please use email and password, or contact support@tallbridge.com."
          : "Google sign-in failed. Please try again or use email below."
      );
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    const errs = { email: "", pass: "" };
    let valid = true;
    if (!isValidEmail(loginEmail)) { errs.email = "Please enter a valid email."; valid = false; }
    if (!loginPass) { errs.pass = "Password is required."; valid = false; }
    setLoginFieldErr(errs);
    if (!valid) return;

    setLoginLoading(true);
    const { error } = await db.auth.signInWithPassword({ email: loginEmail, password: loginPass });
    setLoginLoading(false);

    if (error) {
      const msg = error.message.includes("Invalid")
        ? "Incorrect email or password. Please try again."
        : error.message;
      setLoginErr(msg);
      return;
    }

    const msg = course && courseData
      ? `Taking you to complete your ${courseData.name} enrollment...`
      : "Welcome back! Taking you to your dashboard...";
    setSuccessMsg(msg);
    setShowSuccess(true);
    setTimeout(redirectAfterAuth, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErr("");
    const errs = { first: "", last: "", email: "", pass: "", confirm: "" };
    let valid = true;
    if (!signupFirst) { errs.first = "Required."; valid = false; }
    if (!signupLast) { errs.last = "Required."; valid = false; }
    if (!isValidEmail(signupEmail)) { errs.email = "Please enter a valid email."; valid = false; }
    if (signupPass.length < 8) { errs.pass = "Must be at least 8 characters."; valid = false; }
    if (signupPass !== signupConfirm) { errs.confirm = "Passwords do not match."; valid = false; }
    setSignupFieldErr(errs);
    if (!valid) return;

    setSignupLoading(true);
    const { data, error } = await db.auth.signUp({
      email: signupEmail,
      password: signupPass,
      options: {
        data: { first_name: signupFirst, last_name: signupLast, full_name: `${signupFirst} ${signupLast}` },
      },
    });
    setSignupLoading(false);

    if (error) {
      const msg = error.message === "User already registered"
        ? "An account with this email already exists. Try logging in instead."
        : error.message;
      setSignupErr(msg);
      return;
    }

    // If Supabase auto-confirmed (session returned immediately), skip OTP
    if (data.session) {
      const msg = course && courseData
        ? `Account created! Taking you to complete your ${courseData.name} enrollment...`
        : "Account created! Taking you to your dashboard...";
      setSuccessMsg(msg);
      setShowSuccess(true);
      setTimeout(redirectAfterAuth, 1500);
      return;
    }

    // Move to OTP verification screen
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpErr("");
    setResendCooldown(60);
    setView("otp");
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpInput = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otpDigits];
    next[index] = digit;
    setOtpDigits(next);
    setOtpErr("");
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...otpDigits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtpDigits(next);
    const focusIndex = Math.min(pasted.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpDigits.join("");
    if (token.length < 6) {
      setOtpErr("Please enter the full 6-digit code.");
      return;
    }
    setOtpLoading(true);
    const { error } = await db.auth.verifyOtp({
      email: signupEmail,
      token,
      type: "signup",
    });
    setOtpLoading(false);

    if (error) {
      // Graceful fallback: if user is somehow already confirmed, just proceed
      const { data: { session } } = await db.auth.getSession();
      if (session) {
        redirectAfterAuth();
        return;
      }
      setOtpErr(
        error.message.includes("expired")
          ? "This code has expired. Please request a new one."
          : error.message.includes("invalid") || error.message.includes("Invalid")
          ? "Incorrect code. Double-check and try again."
          : error.message
      );
      return;
    }

    const msg = course && courseData
      ? `Email verified! Taking you to complete your ${courseData.name} enrollment...`
      : "Email verified! Taking you to your dashboard...";
    setSuccessMsg(msg);
    setShowSuccess(true);
    setTimeout(redirectAfterAuth, 1800);
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resendLoading) return;
    setResendLoading(true);
    await db.auth.resend({ email: signupEmail, type: "signup" });
    setResendLoading(false);
    setResendCooldown(60);
    setOtpErr("");
  };

  const strength = getPasswordStrength(signupPass);

  return (
    <div className="auth-page">
      {/* Left brand panel */}
      <div className="auth-brand">
        <svg className="auth-brand-wave" viewBox="0 0 300 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0 C100 100,40 160,60 270 C80 380,200 420,180 550 C160 680,60 730,80 800 L300 800 L300 0 Z" fill="#96D74C" opacity="0.15"/>
          <path d="M170 0 C120 100,60 160,80 270 C100 380,220 420,200 550 C180 680,80 730,100 800 L300 800 L300 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.3"/>
        </svg>
        <a className="auth-brand-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          {/* CHANGED: Use public folder path for logo instead of imported variable */}
          <img src="/logo.png" alt="Tall Bridge Institute" />
          <div>
            <div className="auth-brand-logo-text">Tall Bridge<span>.</span></div>
            <span className="auth-brand-logo-sub">Institute</span>
          </div>
        </a>
        <div className="auth-brand-body">
          <div>
            <h2 className="auth-brand-heading">The bridge to<br />where you <em>need to be.</em></h2>
            <p className="auth-brand-sub">Join thousands building real skills, real income, and real careers through Tall Bridge.</p>
          </div>
          {courseData && (
            <div className="auth-course-context visible">
              <div className="auth-course-context-label">You&apos;re enrolling in</div>
              <div className="auth-course-context-name">{courseData.name}</div>
              <div className="auth-course-context-price">
                From <strong>{courseData.price}</strong> · {courseData.badge}
              </div>
            </div>
          )}
          <div className="auth-trust">
            {[
              "Certificate included with every course",
              "Employment support included",
              "Pay only after creating your account",
            ].map(t => (
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

          {/* Mobile course strip */}
          {courseData && view !== "otp" && (
            <div className="auth-mobile-course visible">
              <div className="auth-mobile-course-label">Enrolling in</div>
              <div className="auth-mobile-course-name">{courseData.name}</div>
              <div className="auth-mobile-course-price">
                From <strong>{courseData.price}</strong> · {courseData.badge}
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {showSuccess && (
            <div className="auth-success visible">
              <div className="auth-success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="#96D74C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{"You're in."}</h3>
              <p>{successMsg}</p>
            </div>
          )}

          {/* OTP VERIFICATION PANEL */}
          {!showSuccess && view === "otp" && (
            <div className="otp-panel">
              <div className="otp-panel-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="20" fill="#f5eeff"/>
                  <path d="M10 14a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H12a2 2 0 01-2-2V14z" stroke="#721CB8" strokeWidth="1.5"/>
                  <path d="M10 14l10 9 10-9" stroke="#721CB8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="auth-form-heading">Check your <em>email.</em></h2>
              <p className="auth-form-sub otp-sub">
                We sent a 6-digit verification code to<br />
                <strong>{signupEmail}</strong>
              </p>

              <form className="auth-form" noValidate onSubmit={handleVerifyOtp}>
                <div className="otp-boxes" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el; }}
                      className={`otp-box${otpErr ? " error" : ""}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      autoComplete="one-time-code"
                      onChange={e => handleOtpInput(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      onFocus={e => e.target.select()}
                    />
                  ))}
                </div>
                {otpErr && <div className="auth-form-error visible" style={{ marginTop: ".25rem" }}>{otpErr}</div>}

                <button type="submit" className="btn-auth-submit lime" disabled={otpLoading || otpDigits.join("").length < 6} style={{ marginTop: "1.5rem" }}>
                  {otpLoading ? "Verifying..." : "Verify email →"}
                </button>
              </form>
              <p style={{ fontSize: ".78rem", color: "#999", textAlign: "center", marginTop: "1rem", lineHeight: 1.5 }}>
                Received a link instead of a code? Click the link in the email — it will log you in automatically.
              </p>

              <div className="otp-resend">
                {"Didn't receive a code?"}{" "}
                {resendCooldown > 0 ? (
                  <span className="otp-resend-timer">Resend in {resendCooldown}s</span>
                ) : (
                  <button
                    className="otp-resend-btn"
                    onClick={handleResendOtp}
                    disabled={resendLoading}
                  >
                    {resendLoading ? "Sending..." : "Resend code"}
                  </button>
                )}
              </div>

              <button
                className="otp-back-btn"
                onClick={() => { setView("tabs"); setOtpDigits(["", "", "", "", "", ""]); setOtpErr(""); }}
              >
                ← Back to sign up
              </button>
            </div>
          )}

          {/* TABS + LOGIN + SIGNUP */}
          {!showSuccess && view === "tabs" && (
            <>
              {/* Tabs */}
              <div className="auth-tabs" role="tablist">
                <button className={`auth-tab${tab === "login" ? " active" : ""}`} onClick={() => switchTab("login")}>Log in</button>
                <button className={`auth-tab${tab === "signup" ? " active" : ""}`} onClick={() => switchTab("signup")}>Sign up</button>
              </div>

              {/* LOGIN PANEL */}
              <div className={`auth-panel${tab === "login" ? " active" : ""}`}>
                <h2 className="auth-form-heading">Welcome <em>back.</em></h2>
                <p className="auth-form-sub">Log in to continue your learning journey.</p>
                <button className="btn-google" onClick={handleGoogle} disabled={googleLoading}>
                  <GoogleIcon /> {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
                </button>
                {googleErr && <div className="auth-form-error visible" style={{ marginTop: ".5rem" }}>{googleErr}</div>}
                <div className="auth-divider"><span>or</span></div>
                <form className="auth-form" noValidate onSubmit={handleLogin}>
                  <div className="field-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={e => { setLoginEmail(e.target.value); setLoginFieldErr(f => ({ ...f, email: "" })); }}
                      className={loginFieldErr.email ? "error" : ""}
                      autoComplete="email"
                    />
                    {loginFieldErr.email && <span className="field-error visible">{loginFieldErr.email}</span>}
                  </div>
                  <div className="field-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Your password"
                      value={loginPass}
                      onChange={e => { setLoginPass(e.target.value); setLoginFieldErr(f => ({ ...f, pass: "" })); }}
                      className={loginFieldErr.pass ? "error" : ""}
                      autoComplete="current-password"
                    />
                    {loginFieldErr.pass && <span className="field-error visible">{loginFieldErr.pass}</span>}
                    <button type="button" className="forgot-link" onClick={handleForgotPassword}>Forgot your password?</button>
                  </div>
                  <button type="submit" className="btn-auth-submit" disabled={loginLoading}>
                    {loginLoading ? "Logging in..." : "Log in →"}
                  </button>
                  {loginErr && (
                    <div className="auth-form-error visible" style={{
                      color: loginErr.includes("sent") ? "#509724" : "#e53e3e",
                      background: loginErr.includes("sent") ? "#f0fbe0" : "#fff5f5",
                      borderColor: loginErr.includes("sent") ? "#c5e896" : "#fed7d7",
                    }}>{loginErr}</div>
                  )}
                </form>
                <p className="auth-switch">{"Don't have an account?"} <a onClick={() => switchTab("signup")}>Sign up</a></p>
              </div>

              {/* SIGNUP PANEL */}
              <div className={`auth-panel${tab === "signup" ? " active" : ""}`}>
                <h2 className="auth-form-heading">Create your <em>account.</em></h2>
                <p className="auth-form-sub">One account. Every course {"you'll"} ever need.</p>
                <button className="btn-google" onClick={handleGoogle} disabled={googleLoading}>
                  <GoogleIcon /> {googleLoading ? "Redirecting to Google..." : "Sign up with Google"}
                </button>
                {googleErr && <div className="auth-form-error visible" style={{ marginTop: ".5rem" }}>{googleErr}</div>}
                <div className="auth-divider"><span>or</span></div>
                <form className="auth-form" noValidate onSubmit={handleSignup}>
                  <div className="field-row">
                    <div className="field-group">
                      <label>First name</label>
                      <input
                        type="text"
                        placeholder="Ada"
                        value={signupFirst}
                        onChange={e => { setSignupFirst(e.target.value); setSignupFieldErr(f => ({ ...f, first: "" })); }}
                        className={signupFieldErr.first ? "error" : ""}
                        autoComplete="given-name"
                      />
                      {signupFieldErr.first && <span className="field-error visible">{signupFieldErr.first}</span>}
                    </div>
                    <div className="field-group">
                      <label>Last name</label>
                      <input
                        type="text"
                        placeholder="Okafor"
                        value={signupLast}
                        onChange={e => { setSignupLast(e.target.value); setSignupFieldErr(f => ({ ...f, last: "" })); }}
                        className={signupFieldErr.last ? "error" : ""}
                        autoComplete="family-name"
                      />
                      {signupFieldErr.last && <span className="field-error visible">{signupFieldErr.last}</span>}
                    </div>
                  </div>
                  <div className="field-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={e => { setSignupEmail(e.target.value); setSignupFieldErr(f => ({ ...f, email: "" })); }}
                      className={signupFieldErr.email ? "error" : ""}
                      autoComplete="email"
                    />
                    {signupFieldErr.email && <span className="field-error visible">{signupFieldErr.email}</span>}
                  </div>
                  <div className="field-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={signupPass}
                      onChange={e => { setSignupPass(e.target.value); setSignupFieldErr(f => ({ ...f, pass: "" })); }}
                      className={signupFieldErr.pass ? "error" : ""}
                      autoComplete="new-password"
                    />
                    <div className="password-strength">
                      <div className="password-strength-bar" style={{ width: strength.width, background: strength.bg }}></div>
                    </div>
                    {strength.label && <div className="password-strength-label" style={{ color: strength.bg }}>{strength.label}</div>}
                    {signupFieldErr.pass && <span className="field-error visible">{signupFieldErr.pass}</span>}
                  </div>
                  <div className="field-group">
                    <label>Confirm password</label>
                    <input
                      type="password"
                      placeholder="Repeat your password"
                      value={signupConfirm}
                      onChange={e => { setSignupConfirm(e.target.value); setSignupFieldErr(f => ({ ...f, confirm: "" })); }}
                      className={signupFieldErr.confirm ? "error" : ""}
                      autoComplete="new-password"
                    />
                    {signupFieldErr.confirm && <span className="field-error visible">{signupFieldErr.confirm}</span>}
                  </div>
                  <button type="submit" className="btn-auth-submit lime" disabled={signupLoading}>
                    {signupLoading ? "Creating account..." : "Create account →"}
                  </button>
                  {signupErr && <div className="auth-form-error visible">{signupErr}</div>}
                  <p className="auth-terms">By signing up you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
                </form>
                <p className="auth-switch">Already have an account? <a onClick={() => switchTab("login")}>Log in</a></p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}