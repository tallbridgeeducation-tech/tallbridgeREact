import { useNavigate } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
<img src="/logo.png" alt="Tall Bridge Institute" style={{ height: '40px' }} />
export default function HomePage() {
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <svg className="hero-wave" viewBox="0 0 340 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M180 0 C120 80,60 120,80 200 C100 280,200 320,180 420 C160 520,80 560,100 600 L340 600 L340 0 Z" fill="#96D74C"/>
          <path d="M200 0 C140 80,80 120,100 200 C120 280,220 320,200 420 C180 520,100 560,120 600 L340 600 L340 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.6"/>
          <path d="M215 0 C155 80,95 120,115 200 C135 280,235 320,215 420 C195 520,115 560,135 600 L340 600 L340 0 Z" fill="none" stroke="#721CB8" strokeWidth="1" opacity="0.4"/>
        </svg>
        <div className="hero-inner">
          <h1>The bridge between<br />where you are and<br />where you <em>need to be.</em></h1>
          <p className="hero-sub">Tall Bridge Institute builds courses that create real, measurable change — in how you think and how you perform. Whether you are an individual building a new income stream, or an organisation closing a performance gap, we build the learning that moves the needle.</p>
          <div className="hero-btns">
            <button className="btn-lime" onClick={() => go("/courses")}>Browse Courses →</button>
            <button className="btn-outline-lime" onClick={() => go("/organisation")}>For Organisations</button>
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="courses-preview">
        <div className="section-label">Our Courses</div>
        <h2 className="section-h2">Every course built around <em>one outcome</em>.</h2>
        <div className="course-grid">
          <div className="course-card">
            <div className="course-top">
              <svg className="course-top-wave" viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M60 0 C30 30,10 60,20 90 C30 120,80 130,70 160 L120 160 L120 0 Z" fill="#96D74C"/><path d="M75 0 C45 30,25 60,35 90 C45 120,95 130,85 160 L120 160 L120 0 Z" fill="none" stroke="#721CB8" strokeWidth="1" opacity="0.6"/></svg>
              <div className="course-tag"></div>
              <h3>ESL Online Teaching</h3>
              <div className="course-tagline">You will go from speaking English to earning from it.</div>
            </div>
            <div className="course-body">
              <p>A complete professional training programme that takes you from knowing English to teaching it online with the credentials, confidence, and platform knowledge to get hired globally.</p>
              <div className="course-meta"><span className="price">$70</span><span className="badge badge-live">Enrolling Now</span></div>
              <button className="btn-start" onClick={() => go("/courses/esl")} style={{ width: "100%" }}>Enroll Now →</button>
            </div>
          </div>

          <div className="course-card">
            <div className="course-top">
              <svg className="course-top-wave" viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M60 0 C30 30,10 60,20 90 C30 120,80 130,70 160 L120 160 L120 0 Z" fill="#96D74C"/><path d="M75 0 C45 30,25 60,35 90 C45 120,95 130,85 160 L120 160 L120 0 Z" fill="none" stroke="#721CB8" strokeWidth="1" opacity="0.6"/></svg>
              <div className="course-tag"></div>
              <h3>Professional Voiceover</h3>
              <div className="course-tagline">You will turn your voice into a scalable income stream.</div>
            </div>
            <div className="course-body">
              <p>Know the industry, do the recordings, become the talent, have the clients. Built for creatives ready to monetise what they already have.</p>
              <div className="course-meta"><span className="price">TBA</span><span className="badge badge-soon">Coming Soon</span></div>
              <button className="btn-waitlist" onClick={() => go("/courses/voiceover")} style={{ width: "100%", marginTop: ".5rem" }}>Join Waitlist</button>
            </div>
          </div>

          <div className="course-card">
            <div className="course-top">
              <svg className="course-top-wave" viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M60 0 C30 30,10 60,20 90 C30 120,80 130,70 160 L120 160 L120 0 Z" fill="#96D74C"/><path d="M75 0 C45 30,25 60,35 90 C45 120,95 130,85 160 L120 160 L120 0 Z" fill="none" stroke="#721CB8" strokeWidth="1" opacity="0.6"/></svg>
              <div className="course-tag"></div>
              <h3>Project Management for Beginners</h3>
              <div className="course-tagline">You will manage projects with clarity, not chaos.</div>
            </div>
            <div className="course-body">
              <p>Know the frameworks, do the planning, become the person teams rely on, have the career that reflects it. No jargon. No confusion.</p>
              <div className="course-meta"><span className="price">TBA</span><span className="badge badge-soon">Coming Soon</span></div>
              <button className="btn-waitlist" onClick={() => go("/courses/pm")} style={{ width: "100%", marginTop: ".5rem" }}>Join Waitlist</button>
            </div>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section className="b2b">
        <svg className="b2b-wave-left" viewBox="0 0 220 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M110 0 C60 80,20 140,50 220 C80 300,180 340,160 440 C140 540,60 580,80 650 L220 650 L220 0 Z" fill="#96D74C"/><path d="M128 0 C78 80,38 140,68 220 C98 300,198 340,178 440 C158 540,78 580,98 650 L220 650 L220 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.7"/></svg>
        <svg className="b2b-wave-right" viewBox="0 0 180 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M90 0 C50 60,10 100,30 170 C50 240,140 270,120 340 C100 410,40 440,60 480 L180 480 L180 0 Z" fill="#96D74C"/><path d="M106 0 C66 60,26 100,46 170 C66 240,156 270,136 340 C116 410,56 440,76 480 L180 480 L180 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.2" opacity="0.6"/></svg>
        <div className="b2b-inner">
          <div className="section-label">For Organisations</div>
          <h2 className="section-h2">Your team knows more.<br /><em>Your numbers move.</em></h2>
          <div className="b2b-grid">
            <div className="b2b-text">
              <p>Every performance gap in your organisation is a knowledge gap in disguise. <strong>Tall Bridge builds the curriculum that closes it.</strong></p>
              <p>We partner with companies to design and produce bespoke eLearning — custom to your industry, your people, and the specific behavioural change you need to see.</p>
              <p>You tell us what needs to change in your team. We build the course that changes it.</p>
              <button className="btn-outline-lime" style={{ marginTop: ".5rem" }}>Start a Conversation →</button>
            </div>
            <div>
              <div className="outcomes">
                <div className="outcome">
                  <div className="outcome-label">Skill gap</div>
                  <p>Your team lacks a specific capability. <strong>We build the course that installs it.</strong></p>
                </div>
                <div className="outcome">
                  <div className="outcome-label">Onboarding</div>
                  <p>New hires take too long to ramp up. <strong>We build the programme that accelerates them.</strong></p>
                </div>
                <div className="outcome">
                  <div className="outcome-label">Compliance &amp; standards</div>
                  <p>You need your people to follow a process. <strong>We build the training that makes it stick.</strong></p>
                </div>
              </div>
              <div className="process">
                <div className="step"><div className="step-num">1</div><div><h4>Discovery</h4><p>We define the gap and the desired change.</p></div></div>
                <div className="step"><div className="step-num">2</div><div><h4>Curriculum Design</h4><p>Modules, outcomes, assessments mapped to your goals.</p></div></div>
                <div className="step"><div className="step-num">3</div><div><h4>Production</h4><p>Videos, voiceovers, quizzes built in your brand.</p></div></div>
                <div className="step"><div className="step-num">4</div><div><h4>Delivery</h4><p>Hosted and launched. We support you through go live.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <svg className="cta-wave" viewBox="0 0 220 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M110 0 C60 70,20 120,40 200 C60 280,160 310,140 400 C120 480,50 510,70 560 L220 560 L220 0 Z" fill="#721CB8"/><path d="M126 0 C76 70,36 120,56 200 C76 280,176 310,156 400 C136 480,66 510,86 560 L220 560 L220 0 Z" fill="none" stroke="#421869" strokeWidth="1.2" opacity="0.6"/></svg>
        <svg className="cta-wave2" viewBox="0 0 200 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M100 0 C55 70,15 120,35 200 C55 280,150 310,130 400 C110 480,45 510,65 560 L200 560 L200 0 Z" fill="#721CB8"/></svg>
        <h2>Ready to cross the bridge?</h2>
        <p>Individual learner or growing organisation the bridge is built. Come cross it.</p>
        <div className="cta-btns">
          <button className="btn-cta-main" onClick={() => go("/courses")}>Browse Courses →</button>
          <button className="btn-cta-ghost">Build Training for My Organisation</button>
        </div>
      </section>

      <Footer />
    </>
  );
}
