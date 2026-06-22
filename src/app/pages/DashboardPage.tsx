import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../lib/supabase";

const MODULES = [
  { num: 1, title: "Your teaching identity & confidence", sub: "The Nigerian teacher narrative" },
  { num: 2, title: "TEFL certification overview", sub: "What it covers and how to complete it" },
  { num: 3, title: "Pedagogy, classroom management & delivery", sub: "Online teaching techniques" },
  { num: 4, title: "Platform mastery", sub: "ClassIn, Zoom & VoovMeeting" },
  { num: 5, title: "Your CV, intro video & getting hired", sub: "Global employer application" },
];

interface UserInfo {
  firstName: string;
  fullName: string;
  initials: string;
  email: string;
  joined: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const unsub = db.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        navigate("/auth?mode=login");
        return;
      }

      const u = session.user;
      const firstName =
        u.user_metadata?.first_name || u.email?.split("@")[0] || "Learner";
      const fullName = u.user_metadata?.full_name || firstName;
      const lastInitial = u.user_metadata?.last_name?.charAt(0).toUpperCase() || "";
      const initials = firstName.charAt(0).toUpperCase() + lastInitial;
      const joined = new Date(u.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      setUser({ firstName, fullName, initials, email: u.email || "", joined });

      let paid = false;
      try {
        const { data: payment } = await db
          .from("payments")
          .select("id")
          .eq("user_id", u.id)
          .eq("course", "esl")
          .maybeSingle();
        paid = !!payment;
      } catch {
        paid = false;
      }

      setHasPaid(paid);
      setLoading(false);
    });

    return () => { unsub.data.subscription.unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await db.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* Nav */}
      <nav>
        <div className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src="/logo.png" alt="Tall Bridge Institute" />
          <div>
            <div className="nav-logo-text">Tall Bridge<span>.</span></div>
            <span className="nav-logo-sub">Institute</span>
          </div>
        </div>
        <div className="dash-nav-right">
          <span className="dash-nav-name">{user?.fullName}</span>
          <button className="btn-logout" onClick={handleLogout}>Log out</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="dash-hero">
        <svg className="dash-hero-wave" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0 C100 60,40 100,60 180 C80 260,180 290,160 360 C140 430,60 450,80 480 L300 480 L300 0 Z" fill="#96D74C"/>
          <path d="M168 0 C118 60,58 100,78 180 C98 260,198 290,178 360 C158 430,78 450,98 480 L300 480 L300 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.6"/>
        </svg>
        <div className="dash-hero-inner">
          <div className="dash-eyebrow">My Dashboard</div>
          <h1>Welcome back, <em>{user?.firstName}</em>.</h1>
          <p className="dash-hero-sub">
            {hasPaid ? "All modules unlocked. Keep going!" : "Complete your payment to unlock all modules."}
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="dash-main">
        <div>
          {/* Payment banner — ONLY shown when unpaid */}
          {!hasPaid && (
            <div className="dash-pay-banner">
              <div className="dash-pay-banner-text">
                <h3>Unlock your full course</h3>
                <p>All modules are locked. Pay once to get permanent access.</p>
              </div>
              <button className="btn-pay-now" onClick={() => navigate("/payment?course=esl")}>
                Pay $100 to Unlock →
              </button>
            </div>
          )}

          {hasPaid && (
            <div className="dash-paid-banner">
              <div className="dash-paid-banner-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4 4 8-8" stroke="#421869" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4>Full access unlocked</h4>
                <p>All modules are available. Keep learning!</p>
              </div>
            </div>
          )}

          {/* Course card */}
          <div className="dash-section-label">My Course</div>
          <div className="dash-course-card">
            <div className="dash-course-top">
              <svg className="dash-course-top-wave" viewBox="0 0 180 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <path d="M90 0 C50 40,10 70,30 120 C50 170,140 180,120 200 L180 200 L180 0 Z" fill="#96D74C"/>
              </svg>
              <div className="dash-course-top-tag">Enrolled</div>
              <h2>ESL Online Teaching</h2>
              <p>From speaking English to earning from it.</p>
            </div>

            <div className="dash-modules">
              {MODULES.map(m => {
                const unlocked = hasPaid;
                return (
                  <div
                    className={`dash-module-item${unlocked ? " clickable" : ""}`}
                    key={m.num}
                    onClick={() => unlocked && (window.location.href = "https://app.tallbridgeinstitute.com")}
                    style={unlocked ? { cursor: "pointer" } : {}}
                  >
                    <div className="dash-module-num">{m.num}</div>
                    <div className="dash-module-info">
                      <div className={`dash-module-title${unlocked ? "" : " locked"}`}>{m.title}</div>
                      <div className={`dash-module-sub${unlocked ? "" : " locked"}`}>{m.sub}</div>
                    </div>
                    {unlocked ? (
                      <span className="dash-module-status free-tag">🔒 Locked</span>
                    ) : (
                      <span className="dash-module-status locked-tag">🔒 Locked</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="dash-sidebar">
          <div className="dash-account-card">
            <div className="dash-account-top">
              <div className="dash-avatar">{user?.initials || "?"}</div>
              <div className="dash-account-name">{user?.fullName}</div>
              <div className="dash-account-email">{user?.email}</div>
            </div>
            <div className="dash-account-body">
              <div className="dash-account-row">
                <span className="dash-account-row-label">Member since</span>
                <span className="dash-account-row-val">{user?.joined}</span>
              </div>
              <div className="dash-account-row">
                <span className="dash-account-row-label">Course</span>
                <span className="dash-account-row-val">ESL Online Teaching</span>
              </div>
              <div className="dash-account-row">
                <span className="dash-account-row-label">Payment</span>
                <span>
                  {hasPaid
                    ? <span className="badge-paid">Paid ✓</span>
                    : <span className="badge-unpaid">Unpaid</span>
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="dash-help-card">
            <h4>Need help?</h4>
            <p>Reach out and {"we'll"} get back to you as soon as possible.</p>
            <a href="mailto:support@tallbridgeinstitute.com">support@tallbridgeinstitute.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}