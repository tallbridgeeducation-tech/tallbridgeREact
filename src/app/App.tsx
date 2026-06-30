import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import "../styles/fonts.css";
import "./styles/tallbridge.css";
// FIXED: Swapped out the Next.js version for the standard web injection package
import { injectSpeedInsights } from "@vercel/speed-insights";

import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import ESLPage from "./pages/ESLPage";
import VoiceoverPage from "./pages/VoiceoverPage";
import PMPage from "./pages/PMPage";
import AuthPage from "./pages/AuthPage";
import PaymentPage from "./pages/PaymentPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function PlaceholderPage({ title, body }: { title: string; body: string }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "5rem 4rem", textAlign: "center", background: "#fafafa", minHeight: "60vh" }}>
      <h1 style={{ fontFamily: "Lora, serif", color: "#421869", marginBottom: "1rem" }}>{title}</h1>
      <p style={{ color: "#721CB8", maxWidth: 500, margin: "0 auto 2rem" }}>{body}</p>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#421869", color: "#96D74C", border: "none",
          padding: ".9rem 2rem", borderRadius: 4, cursor: "pointer",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        ← Back Home
      </button>
    </div>
  );
}

export default function App() {
  // Automatically initializes production metric tracking on mount safely for Vite
  injectSpeedInsights();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/esl" element={<ESLPage />} />
        <Route path="/courses/voiceover" element={<VoiceoverPage />} />
        <Route path="/courses/pm" element={<PMPage />} />
        <Route
          path="/organisation"
          element={
            <PlaceholderPage
              title="For Organisations"
              body="Contact us at support@tallbridge.com to discuss your bespoke training needs."
            />
          }
        />
        <Route
          path="/about"
          element={
            <PlaceholderPage
              title="About Tall Bridge"
              body="Tall Bridge Institute builds courses that create real, measurable change — in how you think and how you perform."
            />
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}