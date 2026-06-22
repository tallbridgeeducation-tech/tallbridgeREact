import { useState } from "react";
import { useNavigate } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
<img src="/logo.png" />

export default function CoursesPage() {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggle = (id: string) => setOpenCard(openCard === id ? null : id);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Nav />

      <section className="courses-hero">
        <svg className="courses-hero-wave" viewBox="0 0 300 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0 C100 70,40 110,60 190 C80 270,180 300,160 390 C140 480,60 510,80 550 L300 550 L300 0 Z" fill="#96D74C"/>
          <path d="M168 0 C118 70,58 110,78 190 C98 270,198 300,178 390 C158 480,78 510,98 550 L300 550 L300 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.6"/>
        </svg>
        <div className="courses-hero-inner">
          <div className="eyebrow">Our Courses</div>
          <h1>Every course built<br />around <em>one outcome</em>.</h1>
          <p>Pick the change you want to make. We will build the bridge to get you there.</p>
        </div>
      </section>

      <section className="courses-main">
        <div className="courses-list">

          {/* ESL */}
          <div className={`clist-card${openCard === "esl" ? " open" : ""}`} id="card-esl">
            <div className="clist-top" onClick={() => toggle("esl")}>
              <div className="clist-left">
                <div className="clist-icon">🎓</div>
                <div className="clist-title-block">
                  <h3>ESL Online Teaching</h3>
                  <p>You will go from speaking English to earning from it.</p>
                </div>
              </div>
              <div className="clist-right">
                <span className="price">From $70</span>
                <span className="badge badge-live">Enrolling Now</span>
                <span className="clist-chevron">⌄</span>
              </div>
            </div>
            <div className="clist-body">
              <div className="clist-body-inner">
                <p className="clist-desc">A complete professional training programme that takes you from knowing English to teaching it online with the credentials, confidence, and platform knowledge to get hired by employers globally.</p>
                <div className="clist-action">
                  <button className="btn-start" onClick={() => go("/courses/esl")}>Register Now →</button>
                </div>
              </div>
            </div>
          </div>

          {/* VOICEOVER */}
          <div className={`clist-card${openCard === "voiceover" ? " open" : ""}`} id="card-voiceover">
            <div className="clist-top" onClick={() => toggle("voiceover")}>
              <div className="clist-left">
                <div className="clist-icon">🎙️</div>
                <div className="clist-title-block">
                  <h3>Professional Voiceover</h3>
                  <p>You will turn your voice into a scalable income stream.</p>
                </div>
              </div>
              <div className="clist-right">
                <span className="price">TBA</span>
                <span className="badge badge-soon">Coming Soon</span>
                <span className="clist-chevron">⌄</span>
              </div>
            </div>
            <div className="clist-body">
              <div className="clist-body-inner">
                <p className="clist-desc">Know the industry, do the recordings, become the talent, have the clients. Built for creatives ready to monetise what they already have. Details coming soon.</p>
                <div className="clist-action">
                  <button className="btn-waitlist" onClick={() => go("/courses/voiceover")}>Join Waitlist</button>
                </div>
              </div>
            </div>
          </div>

          {/* PM */}
          <div className={`clist-card${openCard === "pm" ? " open" : ""}`} id="card-pm">
            <div className="clist-top" onClick={() => toggle("pm")}>
              <div className="clist-left">
                <div className="clist-icon">📋</div>
                <div className="clist-title-block">
                  <h3>Project Management for Beginners</h3>
                  <p>You will manage projects with clarity, not chaos.</p>
                </div>
              </div>
              <div className="clist-right">
                <span className="price">TBA</span>
                <span className="badge badge-soon">Coming Soon</span>
                <span className="clist-chevron">⌄</span>
              </div>
            </div>
            <div className="clist-body">
              <div className="clist-body-inner">
                <p className="clist-desc">Know the frameworks, do the planning, become the person teams rely on, have the career that reflects it. No jargon. No confusion. Details coming soon.</p>
                <div className="clist-action">
                  <button className="btn-waitlist" onClick={() => go("/courses/pm")}>Join Waitlist</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
