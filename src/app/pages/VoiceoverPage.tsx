import { useNavigate } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function VoiceoverPage() {
  const navigate = useNavigate();

  return (
    <>
      <Nav />

      <section className="detail-hero">
        <svg className="detail-hero-wave" viewBox="0 0 300 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0 C100 70,40 110,60 190 C80 270,180 300,160 390 C140 480,60 510,80 550 L300 550 L300 0 Z" fill="#96D74C"/>
          <path d="M168 0 C118 70,58 110,78 190 C98 270,198 300,178 390 C158 480,78 510,98 550 L300 550 L300 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.6"/>
        </svg>
        <div className="detail-hero-inner">
          <button className="detail-back" onClick={() => { navigate("/courses"); window.scrollTo({ top: 0 }); }}>← Back to Courses</button>
          <div className="eyebrow">Professional Voiceover</div>
          <h1>Turn your voice into<br />an <em>income stream.</em></h1>
          <p className="detail-hero-sub">Know the industry, do the recordings, become the talent, have the clients. Built for creatives ready to monetise what they already have.</p>
        </div>
      </section>

      <div className="coming-detail">
        <div className="coming-detail-icon">🎙️</div>
        <h2>This course is coming soon.</h2>
        <p>We are building something great. Drop your email below and be the first to know when Professional Voiceover launches — including early bird pricing.</p>
        <button className="btn-start">Join the Waitlist →</button>
      </div>

      <Footer />
    </>
  );
}
