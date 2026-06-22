import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { db } from "../lib/supabase";
import logo from "../../imports/logo.png";

declare global {
  interface Window {
    PaystackPop: {
      setup: (opts: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_KEY || "pk_test_147a77e6a155cd466527d9a3c6e20e4de7853df7";

const PRICE = {
  label: "Regular Registration",
  display: "$100 (~₦150,000)",
  amount: 15000000,
};

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const course = searchParams.get("course") || "esl";

  const [loading, setLoading] = useState(true);
  const [paystackReady, setPaystackReady] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [payError, setPayError] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [payLabel, setPayLabel] = useState("Pay $100 (~₦150,000) Securely");

  useEffect(() => {
    if (window.PaystackPop) {
      setPaystackReady(true);
      return;
    }
    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (existing) {
      existing.addEventListener("load", () => setPaystackReady(true));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackReady(true);
    script.onerror = () => setPayError("Failed to load payment gateway. Please refresh and try again.");
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const unsub = db.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        navigate(`/auth?course=${course}&mode=login`);
        return;
      }

      const uid = session.user.id;
      const email = session.user.email || "";
      setUserId(uid);
      setUserEmail(email);

      try {
        const { data: existing } = await db
          .from("payments")
          .select("id")
          .eq("user_id", uid)
          .eq("course", course)
          .maybeSingle();

        if (existing) {
          navigate("/dashboard");
          return;
        }
      } catch {
        // table may not exist yet — continue
      }

      setLoading(false);
    });

    return () => { unsub.data.subscription.unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initiatePayment = () => {
    setPayError("");

    if (!window.PaystackPop) {
      setPayError("Payment gateway is still loading. Please wait a moment and try again.");
      return;
    }

    const ref = `TB-ESL-${Date.now()}`;

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_KEY,
        email: userEmail,
        amount: PRICE.amount,
        currency: "NGN",
        ref,
        metadata: { user_id: userId, course, tier: "regular" },
        callback: (response) => {
          savePayment(response.reference, PRICE.amount, PRICE.label);
        },
        onClose: () => {
          setPayError("Payment window closed. Click the button to try again.");
        },
      });
      handler.openIframe();
    } catch (err) {
      setPayError("Could not open payment window. Please refresh the page and try again.");
      console.error("Paystack error:", err);
    }
  };

  const savePayment = async (reference: string, amount: number, tier: string) => {
    setConfirming(true);
    setPayError("");

    if (!userId) {
      console.error("savePayment called with empty userId");
      setConfirming(false);
      setPayError("Authentication error: user ID missing. Please log in again.");
      return;
    }
    if (!userEmail) {
      console.error("savePayment called with empty userEmail");
      setConfirming(false);
      setPayError("Authentication error: email missing. Please log in again.");
      return;
    }

    try {
      const { data: existing } = await db
        .from("payments")
        .select("id")
        .eq("paystack_reference", reference)
        .maybeSingle();

      if (existing) {
        setConfirming(false);
        setPaySuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
        return;
      }
    } catch (err) {
      console.log("Idempotency check error (non-critical):", err);
    }

    const payload = {
      user_id: userId,
      email: userEmail,
      course,
      amount,
      paystack_reference: reference,
      tier,
      paid_at: new Date().toISOString(),
    };

    console.log("Inserting payment payload:", payload);

    const { data, error } = await db.from("payments").insert(payload);

    console.log("Supabase insert response:", { data, error });

    setConfirming(false);

    if (error) {
      console.error("INSERT FAILED — Full error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      console.error("Error hint:", error.hint);

      setPayError(
        `Your payment went through! Reference: ${reference} — but we hit a snag saving your access. Error: ${error.message}. Email support@tallbridgeinstitute.com with this reference and we'll sort it immediately.`
      );
      return;
    }

    setPaySuccess(true);
    setTimeout(() => { window.location.href = "https://app.tallbridgeinstitute.com/"; }, 2000);
  };

  if (loading) {
    return (
      <div className="pay-loading">
        <div className="spinner"></div>
        <p>Preparing your checkout...</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", position: "relative" }}>
      {confirming && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(255,255,255,0.92)",
          zIndex: 9999, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "1rem"
        }}>
          <div className="spinner"></div>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#421869", fontWeight: 500 }}>
            Confirming your payment...
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#7a6a8a", fontSize: ".85rem" }}>
            Please don't close this window.
          </p>
        </div>
      )}
      <nav>
        <div className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Tall Bridge Institute" />
          <div>
            <div className="nav-logo-text">Tall Bridge<span>.</span></div>
            <span className="nav-logo-sub">Institute</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <span style={{ fontSize: ".82rem", color: "#995BD5", fontWeight: 300 }}>Secure Checkout</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L2 3.5v4c0 2.6 2 5 5 5.6 3-.6 5-3 5-5.6v-4L7 1z" stroke="#995BD5" strokeWidth="1.2"/>
          </svg>
        </div>
      </nav>

      <div className="pay-main">
        <div className="pay-card">
          <div className="pay-card-top">
            <svg className="pay-card-top-wave" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <path d="M150 0 C100 50,40 90,60 160 C80 230,200 250,180 300 L300 300 L300 0 Z" fill="#96D74C"/>
            </svg>
            <div className="pay-card-top-label">Complete Your Enrollment</div>
            <h2>ESL Online Teaching</h2>
            <p>{userEmail}</p>
          </div>

          <div className="pay-card-body">
            {paySuccess ? (
              <div className="pay-success-wrap visible">
                <div className="pay-success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="#509724" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Payment confirmed!</h3>
                <p>Your enrollment is complete. Redirecting to your dashboard...</p>
              </div>
            ) : (
              <>
                <div className="pay-price-box">
                  <div className="pay-price-label">Registration Fee</div>
                  <div className="pay-price-amount">{PRICE.display}</div>
                  <div className="pay-price-desc">Full access, all support included</div>
                </div>

                <div className="pay-includes">
                  <div className="pay-includes-title">Everything included</div>
                  {[
                    "Full course — all 5 modules",
                    "TEFL certification guidance",
                    "2 live practice teaching sessions",
                    "Employment support + partner network",
                    "Certificate of completion",
                  ].map(item => (
                    <div className="pay-include-row" key={item}>
                      <span className="pay-check">✓</span> {item}
                    </div>
                  ))}
                </div>

                <div className="pay-divider"></div>

                <div className="pay-summary">
                  <span className="pay-summary-label">{PRICE.label} — ESL Online Teaching</span>
                  <span className="pay-summary-amount">{PRICE.display}</span>
                </div>

                <button className="btn-pay" onClick={initiatePayment} disabled={!paystackReady}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1 7.5h14" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                  <span>{paystackReady ? payLabel : "Loading payment gateway..."}</span>
                </button>

                {payError && <div className="pay-error visible">{payError}</div>}

                <div className="pay-secure">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L1.5 3.2v3.5c0 2.3 1.9 4.4 4.5 5 2.6-.6 4.5-2.7 4.5-5V3.2L6 1z" stroke="#bbb" strokeWidth="1"/>
                  </svg>
                  Secured by Paystack · SSL encrypted
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}