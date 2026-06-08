import { useState } from "react";
import { useNavigate } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const faqs = [
  {
    q: "Do I need a teaching degree?",
    a: "No. You need to speak English fluently and be willing to learn. The course is designed for people with zero teaching experience — it builds your confidence, credentials, and skills from the ground up.",
  },
  {
    q: "How long does the course take?",
    a: "The ESL course runs over 4 weeks. It is self-paced through the modules, with two live practice sessions scheduled within the cycle — where you practise teaching in a real virtual classroom before you go out and get hired.",
  },
  {
    q: "What is the difference between early bird and regular pricing?",
    a: "Early bird pricing of $70 is available for a limited number of spots. Once those are filled, the price moves to $100. Both get the exact same course, employment support, and certificate.",
  },
  {
    q: "Can I pay in instalments?",
    a: "We are working on payment plan options. Reach out to us at support@tallbridge.com and we will find something that works for you.",
  },
];

export default function ESLPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Nav />

      <section className="detail-hero">
        <svg className="detail-hero-wave" viewBox="0 0 300 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0 C100 70,40 110,60 190 C80 270,180 300,160 390 C140 480,60 510,80 550 L300 550 L300 0 Z" fill="#96D74C"/>
          <path d="M168 0 C118 70,58 110,78 190 C98 270,198 300,178 390 C158 480,78 510,98 550 L300 550 L300 0 Z" fill="none" stroke="#721CB8" strokeWidth="1.5" opacity="0.6"/>
        </svg>
        <div className="detail-hero-inner">
          <button className="detail-back" onClick={() => go("/courses")}>← Back to Courses</button>
          <div className="eyebrow">ESL Online Teaching</div>
          <h1>From speaking English<br />to <em>earning from it.</em></h1>
          <p className="detail-hero-sub">A complete professional training programme that takes you from knowing English to teaching it online with the credentials, confidence, and platform knowledge to get hired by employers globally.</p>
          <div className="detail-meta-strip">
            <div className="detail-meta-item"><strong>Duration</strong><span>4 weeks</span></div>
            <div className="detail-meta-item"><strong>Format</strong><span>Self-paced + 2 live sessions</span></div>
            <div className="detail-meta-item"><strong>Certificate</strong><span>Yes</span></div>
            <div className="detail-meta-item"><strong>Status</strong><span>Enrolling Now</span></div>
          </div>
        </div>
      </section>

      <div className="detail-body">
        <div className="detail-main">
          <div className="detail-section">
            <h2>What you will learn</h2>
            <div className="module-list">
              <div className="module-item"><span className="module-num">1</span>Your teaching identity, confidence &amp; the Nigerian teacher narrative</div>
              <div className="module-item"><span className="module-num">2</span>TEFL certification — what it covers and how to complete it without falling behind</div>
              <div className="module-item"><span className="module-num">3</span>Pedagogy, classroom management &amp; vocal delivery for online teaching</div>
              <div className="module-item"><span className="module-num">4</span>Platform mastery — ClassIn, Zoom &amp; VoovMeeting</div>
              <div className="module-item"><span className="module-num">5</span>Your introductory video, teaching CV &amp; how to get hired by global employers</div>
            </div>
          </div>
          <div className="detail-section">
            <h2>Employment support included</h2>
            <div className="employ-list">
              <div className="employ-item"><span className="employ-check">✓</span>Access to Tall Bridge employer partner network</div>
              <div className="employ-item"><span className="employ-check">✓</span>CV and teaching profile review before you apply</div>
              <div className="employ-item"><span className="employ-check">✓</span>Introductory video coaching and personalised feedback</div>
              <div className="employ-item"><span className="employ-check">✓</span>Two live practice teaching sessions included in the programme</div>
              <div className="employ-item"><span className="employ-check">✓</span>Graduate community and ongoing post-course support</div>
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="pricing-card">
            <div className="pricing-card-top">
              <svg className="pricing-card-top-wave" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 C25 25,5 45,15 75 C25 105,75 110,65 130 L100 130 L100 0 Z" fill="#96D74C" opacity="0.5"/></svg>
              <h3>ESL Online Teaching</h3>
              <p>Choose your registration type</p>
            </div>
            <div className="pricing-card-body">
              <div className="pricing-row early">
                <span className="pricing-row-label early-col">Early Bird <span className="pr-badge">Limited</span></span>
                <span className="pricing-row-amt">$70</span>
              </div>
              <div className="pricing-row regular">
                <span className="pricing-row-label">Regular Registration</span>
                <span className="pricing-row-amt">$100</span>
              </div>
            </div>
            <div className="pricing-card-footer">
              <button className="btn-start-full" onClick={() => go("/auth?mode=signup&course=esl")}>Register Now →</button>
              <p className="pricing-note">Early bird pricing is available for a limited number of spots. Both options include the full course, employment support, and certificate.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="testimonials">
        <div className="section-label">What Our Students Say</div>
        <h2 className="section-h2">The bridge <em>works</em>.</h2>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="testi-text">"I did not think I had what it takes to teach online. Three months after completing the ESL course, I have three regular students and I am earning in dollars every week."</div>
            <div className="testi-name">Chisom A.</div>
            <div className="testi-role">ESL Teacher Lagos</div>
          </div>
          <div className="testi-card">
            <div className="testi-text">"The way the course is structured — module by module, with real practice — made everything click. I went from zero to hired in six weeks."</div>
            <div className="testi-name">Emmanuel G.</div>
            <div className="testi-role">ESL Teacher Abuja</div>
          </div>
          <div className="testi-card">
            <div className="testi-text">"I have taken a lot of online courses. This one was different. The content was simple, but it changed how I think about myself as a professional."</div>
            <div className="testi-name">Aderonke P.</div>
            <div className="testi-role">ESL Teacher Port Harcourt</div>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="section-label">Common Questions</div>
        <h2 className="section-h2">Before you <em>start</em>.</h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openFaq === i ? " active" : ""}`}>
              <button className="faq-q" onClick={() => toggleFaq(i)}>
                {faq.q} <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                <div><p>{faq.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
