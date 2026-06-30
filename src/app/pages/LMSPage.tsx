import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../lib/supabase";
<img src="/logo.png" />
/* ── Course content ───────────────────────────────────────── */
const COURSE = {
  esl: {
    name: "ESL Online Teaching",
    modules: [
      {
        num: 1, free: true,
        title: "Your teaching identity & confidence",
        description: "Understand who you are as an ESL teacher and build the confidence to show up globally.",
        lessons: [
          {
            id: "1-1", title: "The Nigerian teacher narrative", duration: "12 min",
            content: `<h3>The Nigerian Teacher Narrative</h3>
<p>For generations, Nigerian educators have been told a subtle lie: that their accent, their background, or their location makes them less qualified than a native English speaker. This module exists to dismantle that lie permanently.</p>
<p>The global ESL market employs millions of teachers across every continent. Chinese parents hiring on platforms like VIPKid, Gogokid, and iTalki are looking for confident, structured, and caring teachers — not a specific passport. South Korean academies, Latin American learners, and Gulf-state business professionals all want the same thing: someone who can teach them to communicate.</p>
<p>Nigeria produces some of the most articulate English speakers on the planet. Our exposure to both British and American media, our multilingual upbringing, and our deep familiarity with the rules of grammar — because we learned English formally — gives us a genuine edge.</p>
<h4>What employers actually want</h4>
<ul>
  <li>Clear, structured communication</li>
  <li>Patience and adaptability with learners</li>
  <li>Reliability and professionalism</li>
  <li>A quiet, well-lit background</li>
  <li>A TEFL/TESOL certificate (covered in Module 2)</li>
</ul>
<p>None of those requirements say "born in the UK." Your narrative begins today. You are a qualified, capable ESL teacher — the training in this course simply formalises what you already have.</p>`
          },
          {
            id: "1-2", title: "Building your teaching confidence", duration: "15 min",
            content: `<h3>Building Your Teaching Confidence</h3>
<p>Confidence in the classroom — online or offline — is not something you either have or don't have. It is a skill you develop through preparation, repetition, and reflection.</p>
<h4>The three pillars of teaching confidence</h4>
<p><strong>1. Content confidence</strong> — knowing your subject matter so well that questions don't rattle you. For ESL, this means understanding grammar rules, pronunciation patterns, and common learner errors before your first class.</p>
<p><strong>2. Delivery confidence</strong> — how you present yourself on camera. Voice volume, eye contact with the lens, pacing, and using silence well. Most new teachers rush. Experienced teachers breathe.</p>
<p><strong>3. Relationship confidence</strong> — the ability to build trust with a stranger in 60 minutes. ESL learners are often anxious themselves. When you radiate calm and structure, they relax and learn faster.</p>
<h4>Practical exercises this week</h4>
<ul>
  <li>Record yourself speaking for 3 minutes about any topic. Watch it back and note one thing to improve.</li>
  <li>Teach someone at home a simple grammar rule (e.g. the difference between "a" and "an"). Notice where you stumble.</li>
  <li>Read one lesson plan template online and annotate it — what would you add or change?</li>
</ul>
<p>Confidence is not the absence of nerves. It is doing the thing despite the nerves. Every excellent teacher you admire was once nervous on camera. They just kept going.</p>`
          },
          {
            id: "1-3", title: "Why ESL is your opportunity", duration: "10 min",
            content: `<h3>Why ESL Is Your Opportunity</h3>
<p>The global English language teaching market was valued at over $60 billion in 2023 and is projected to exceed $100 billion by 2030. That growth is being driven almost entirely by online delivery.</p>
<h4>The income reality</h4>
<p>ESL teachers on major platforms typically earn between $10–$25 per hour for beginner positions, rising to $30–$60 per hour with certifications, reviews, and niche specialisations (business English, exam preparation, IELTS/TOEFL coaching).</p>
<p>At 20 hours per week at $15/hour, that is $1,200/month — working from your home, setting your own schedule. At 30 hours per week with a more experienced rate, that can exceed $2,500/month.</p>
<h4>The flexibility advantage</h4>
<p>Most platforms allow you to set your own availability. You can teach Nigerian students in the afternoon and Asian students in the early morning (peak demand times align with Asian time zones — typically 6am–9am Nigeria time for Chinese students). You can build a schedule around your existing commitments and scale as you grow.</p>
<h4>The long game</h4>
<p>Many teachers start on platforms and eventually move to private clients, charging higher rates with no platform commission. Others build their own online schools or YouTube channels. The skill you build in this course is a career foundation, not just a job.</p>
<p>This is not a quick-money scheme. It is a legitimate, scalable professional skill — one that grows with you.</p>`
          }
        ]
      },
      {
        num: 2, free: false,
        title: "TEFL certification overview",
        description: "Understand the TEFL landscape, choose the right certification, and complete it efficiently.",
        lessons: [
          {
            id: "2-1", title: "What is TEFL and why it matters", duration: "10 min",
            content: `<h3>What Is TEFL and Why It Matters</h3>
<p>TEFL stands for Teaching English as a Foreign Language. A TEFL certificate is the standard qualification recognised by employers, platforms, and language schools worldwide when hiring online ESL teachers.</p>
<h4>TEFL vs TESOL vs CELTA</h4>
<ul>
  <li><strong>TEFL</strong> — Teaching English as a Foreign Language. Used when teaching students who live outside an English-speaking country.</li>
  <li><strong>TESOL</strong> — Teaching English to Speakers of Other Languages. Functionally equivalent to TEFL for most employers.</li>
  <li><strong>CELTA</strong> — Certificate in English Language Teaching to Adults, issued by Cambridge. The most prestigious qualification — also the most expensive and time-consuming. Required for top-tier language schools.</li>
</ul>
<p>For online ESL teaching as a new entrant, a 120-hour accredited TEFL certificate is the sweet spot. It is recognised by all major platforms, costs between $20–$150 (many providers run sales constantly), and can be completed in 4–8 weeks of part-time study.</p>
<h4>Why platforms require it</h4>
<p>Platforms use the TEFL certificate as a baseline quality filter. It signals that you understand lesson planning, error correction, student motivation, and classroom management — even if you've never taught before. It is not about gatekeeping; it is about preparing you to serve your students well.</p>`
          },
          {
            id: "2-2", title: "Choosing the right certification", duration: "12 min",
            content: `<h3>Choosing the Right Certification</h3>
<p>There are hundreds of TEFL certification providers online. Here is how to choose without wasting money or time.</p>
<h4>What to look for in a provider</h4>
<ul>
  <li><strong>Accreditation</strong> — Look for providers accredited by Ofqual (UK), ACCET (US), or recognised by international bodies. Premier TEFL, ITTT, i-to-i, and Bridge TEFL are all widely accepted.</li>
  <li><strong>120 hours minimum</strong> — Some platforms accept 100 hours, but 120 is the safe standard. Avoid 40-hour "express" certificates — they are rarely accepted by serious employers.</li>
  <li><strong>No practicum required</strong> — For online-only teaching, a course with a practicum (real classroom hours) is unnecessary. Save time and money.</li>
  <li><strong>Affordable</strong> — Do not pay more than $150 for a 120-hour online TEFL. Use discount codes. Most providers offer 90%+ discounts during promotions.</li>
</ul>
<h4>Recommended path</h4>
<p>For most students in this course: <strong>Premier TEFL 120-hour course</strong> (frequently on sale for under $30) or <strong>ITTT 120-hour online</strong>. Both are widely recognised. Complete the coursework consistently over 4–6 weeks, save your certificate as a PDF, and you're platform-ready.</p>
<h4>After certification</h4>
<p>Upload your certificate to your Tall Bridge profile and to each platform you apply to. Store a copy in Google Drive. Some employers will ask for the certificate issuer's verification link — make sure your provider offers this.</p>`
          },
          {
            id: "2-3", title: "Completing your TEFL efficiently", duration: "8 min",
            content: `<h3>Completing Your TEFL Efficiently</h3>
<p>Many people enrol in a TEFL course and never finish. Here is how to be part of the group that does.</p>
<h4>Create a completion schedule</h4>
<p>A 120-hour course at 3 hours/day takes 40 days — roughly six weeks. At 5 hours/day, you finish in 24 days. Set a deadline and work backwards. Block out time on your calendar the same way you would for a paid shift.</p>
<h4>Study strategies that work</h4>
<ul>
  <li><strong>Read actively</strong> — Don't just click through modules. Summarise each section in one sentence in a notebook. This cements understanding and gives you revision material.</li>
  <li><strong>Complete every quiz</strong> — Even if they're not strictly graded, the quiz questions reflect what employers expect you to know.</li>
  <li><strong>Apply as you learn</strong> — After each module, write one short lesson plan. By the time you finish the course, you'll have 8–10 ready-to-use plans.</li>
</ul>
<h4>What to do the day you get your certificate</h4>
<ol>
  <li>Download and save the PDF in multiple locations.</li>
  <li>Screenshot the certificate for your profile photo/banner on teaching platforms.</li>
  <li>Write a one-paragraph bio that mentions your certification and teaching style.</li>
  <li>Begin Module 3 of this course immediately — don't wait.</li>
</ol>`
          }
        ]
      },
      {
        num: 3, free: false,
        title: "Pedagogy, classroom management & delivery",
        description: "The actual craft of teaching: how to plan, manage, and deliver outstanding ESL lessons online.",
        lessons: [
          {
            id: "3-1", title: "Core ESL teaching principles", duration: "14 min",
            content: `<h3>Core ESL Teaching Principles</h3>
<p>Good teaching is not accidental. It follows a set of principles that experienced educators have refined over decades. Understanding these will make you a better teacher from day one.</p>
<h4>Comprehensible input (Krashen's hypothesis)</h4>
<p>Learners acquire language best when they receive input that is slightly above their current level — challenging enough to stretch them, not so difficult it overwhelms them. This is called "i+1." Your job is to pitch your language at the right level and adjust in real time based on student responses.</p>
<h4>Communicative language teaching (CLT)</h4>
<p>Modern ESL instruction emphasises <em>using</em> language to communicate, not just studying it in isolation. Drills have a place, but the goal is always authentic communication. Design activities where students have to use new language to achieve something real.</p>
<h4>The PPP framework</h4>
<ul>
  <li><strong>Present</strong> — Introduce new language in context (a story, a dialogue, a video clip).</li>
  <li><strong>Practice</strong> — Controlled exercises where students use the new language with support.</li>
  <li><strong>Produce</strong> — Free practice where students use the language independently and creatively.</li>
</ul>
<p>Most beginner lesson plans follow PPP. Once you internalise it, planning becomes much faster.</p>
<h4>Error correction strategies</h4>
<p>Over-correcting kills confidence. Under-correcting allows fossilisation (bad habits that become permanent). The balance: correct errors that affect meaning, not every minor grammatical slip. During fluency practice, take notes and address patterns after the activity, not mid-sentence.</p>`
          },
          {
            id: "3-2", title: "Managing online classrooms", duration: "12 min",
            content: `<h3>Managing Online Classrooms</h3>
<p>An online classroom is a different environment from a physical room. The absence of physical presence means you must work harder to maintain engagement, attention, and connection.</p>
<h4>The first 5 minutes are everything</h4>
<p>Students form impressions of a teacher in the first five minutes. Use that time deliberately: greet by name, make eye contact with the camera, have a warm-up activity ready. Never let a class start with you fiddling with your screen share.</p>
<h4>Managing attention online</h4>
<ul>
  <li>Change activity type every 10–15 minutes maximum.</li>
  <li>Use the student's name frequently during instruction.</li>
  <li>Ask comprehension-check questions constantly ("Does that make sense? Can you give me an example?").</li>
  <li>Use the whiteboard/annotation tools on ClassIn and Zoom — visual variety maintains focus.</li>
</ul>
<h4>Handling technical issues</h4>
<p>Technical problems will happen. Prepare: have a backup activity that requires no screen share, know how to reconnect quickly, and keep your email open to message students if the call drops. A teacher who handles disruptions calmly is trusted by students and parents.</p>
<h4>Class management with young learners</h4>
<p>Many ESL students are children. They have shorter attention spans and respond to reward systems, games, and clear routines. Build a class structure that is predictable (same opening, same closing) and use sticker rewards, star points, or verbal praise generously. Keep parents updated — a quick post-class message builds loyalty.</p>`
          },
          {
            id: "3-3", title: "Delivering outstanding lessons", duration: "16 min",
            content: `<h3>Delivering Outstanding Lessons</h3>
<p>An outstanding lesson is not one where the teacher performs brilliantly. It is one where the student leaves having genuinely learned something they could not do before they arrived.</p>
<h4>Lesson planning anatomy</h4>
<p>Every strong lesson has: a clear learning objective, a warm-up, a main activity, a review, and a closing. Write this down before every class for the first six months. You will eventually internalise it.</p>
<h4>Differentiation</h4>
<p>Even in a one-to-one class, students have uneven skill profiles — strong speaking but weak writing, or excellent grammar but poor vocabulary. Identify your student's specific gaps in the first session and adapt your plans accordingly. Generic lessons feel generic. Personalised lessons feel transformative.</p>
<h4>Feedback that teaches</h4>
<p>Instead of simply correcting ("It's 'went,' not 'goed'"), use recasting ("Oh, you went to the market?") — echo the correct form naturally so the student hears it without shame. Recasting is the most effective error-correction technique for conversational settings.</p>
<h4>Ending the lesson well</h4>
<ul>
  <li>Recap what was covered ("Today we practised past simple with irregular verbs").</li>
  <li>Set a small homework challenge (one paragraph, five sentences using today's vocabulary).</li>
  <li>Preview the next class to build anticipation.</li>
  <li>Thank the student sincerely — they chose to spend their time and money with you.</li>
</ul>
<p>The closing of your lesson is the student's last impression. Make it strong, warm, and clear.</p>`
          }
        ]
      },
      {
        num: 4, free: false,
        title: "Platform mastery",
        description: "ClassIn, Zoom, and VoovMeeting — the tools you'll use every day, mastered.",
        lessons: [
          {
            id: "4-1", title: "ClassIn — the ESL teacher's main stage", duration: "15 min",
            content: `<h3>ClassIn — The ESL Teacher's Main Stage</h3>
<p>ClassIn is the dominant platform for Chinese ESL teaching and is increasingly adopted by platforms and institutions across Asia. Understanding it deeply will make you competitive for the highest-paying positions in the market.</p>
<h4>Key features you must master</h4>
<ul>
  <li><strong>Interactive whiteboard</strong> — draw, annotate, and display content in real time. Practice switching between whiteboard and screen share without losing flow.</li>
  <li><strong>Reward system</strong> — ClassIn has a built-in star and trophy system for young learners. Use it consistently. Parents monitor these metrics.</li>
  <li><strong>Breakout rooms</strong> — for group classes, you can separate students for pair work. Know how to create and monitor rooms.</li>
  <li><strong>Recording</strong> — Classes are often recorded automatically. Assume every class is being reviewed. Dress, speak, and prepare accordingly.</li>
  <li><strong>Homework and feedback tools</strong> — use these after every class. Post-class engagement separates top-rated teachers from average ones.</li>
</ul>
<h4>Technical setup for ClassIn</h4>
<p>Download ClassIn on both your teaching device and a backup device. Test your camera, microphone, and internet speed (minimum 10Mbps upload) before every first class with a new student. A wired internet connection is significantly more stable than WiFi for sustained sessions.</p>
<h4>ClassIn etiquette</h4>
<p>Log in 10 minutes early. Have your materials open. Check your lighting (face forward, light source in front of you, not behind). Smile when the student joins — they often take a screenshot for their memory.</p>`
          },
          {
            id: "4-2", title: "Zoom for ESL teaching", duration: "10 min",
            content: `<h3>Zoom for ESL Teaching</h3>
<p>Zoom is the most widely used video platform globally and is the primary tool for many private ESL clients, Western platforms, and corporate English teaching engagements.</p>
<h4>Settings to configure immediately</h4>
<ul>
  <li><strong>Enable original sound for musicians</strong> (Audio settings) — this improves voice clarity significantly for teaching.</li>
  <li><strong>Turn off noise cancellation</strong> to medium or low when doing pronunciation work — you want the student to hear subtleties.</li>
  <li><strong>Virtual backgrounds</strong> — use a clean, professional virtual background if your real environment is distracting. Avoid branded or busy backgrounds.</li>
  <li><strong>Screen sharing settings</strong> — set to "share entire screen" by default, and practice moving between applications smoothly.</li>
</ul>
<h4>Zoom teaching tools</h4>
<p>The whiteboard, annotation, and polling features in Zoom are under-used by most teachers. The whiteboard alone can transform a grammar explanation into an interactive activity. The polling tool is excellent for comprehension checks and vocabulary quizzes.</p>
<h4>Managing a Zoom class</h4>
<p>For group classes: mute all on entry, use "Raise Hand" for questions, enable the waiting room for privacy, and use breakout rooms for pair activities. For 1-to-1: keep both cameras on, use screen share generously, and unmute yourself for natural conversation flow.</p>`
          },
          {
            id: "4-3", title: "VoovMeeting setup and use", duration: "8 min",
            content: `<h3>VoovMeeting Setup and Use</h3>
<p>VoovMeeting (also known as Tencent Meeting) is Tencent's video conferencing platform, widely used in China and increasingly required by Chinese-market ESL platforms. If you plan to teach students based in China, you need to have VoovMeeting configured and tested.</p>
<h4>Why VoovMeeting?</h4>
<p>Zoom is frequently slow or blocked in mainland China due to internet regulations. VoovMeeting is hosted on Tencent's servers, giving it superior performance for Chinese students. Platforms like ClassIn sometimes route their sessions through VoovMeeting's infrastructure.</p>
<h4>Setup steps</h4>
<ol>
  <li>Download VoovMeeting from the official Tencent site (voovmeeting.com).</li>
  <li>Register with your email or phone number.</li>
  <li>Configure your audio and video settings — same principles as Zoom: forward-facing light, clear background, wired connection preferred.</li>
  <li>Test a session with a friend or fellow teacher before your first class.</li>
</ol>
<h4>Key differences from Zoom</h4>
<p>The interface is in Chinese by default — you can switch to English in settings. The whiteboard is more limited than ClassIn but functional for basic diagrams and text. Recording requires host permission and is stored on Tencent's servers.</p>
<p>You do not need to master VoovMeeting before applying to platforms. Set it up, test it once, and treat it as a backup tool you become more comfortable with over time.</p>`
          }
        ]
      },
      {
        num: 5, free: false,
        title: "Your CV, intro video & getting hired",
        description: "Build the documents and presence that get you hired by global ESL employers.",
        lessons: [
          {
            id: "5-1", title: "Building your ESL CV", duration: "14 min",
            content: `<h3>Building Your ESL CV</h3>
<p>Your ESL CV is a one-page professional document that tells a hiring manager or platform reviewer: "This person is qualified, professional, and ready to teach." Here is how to build one that gets interviews.</p>
<h4>CV structure for ESL teachers</h4>
<ol>
  <li><strong>Contact information</strong> — Name, email, WhatsApp/phone, city. No full address needed.</li>
  <li><strong>Professional summary</strong> — 2–3 sentences. Mention your TEFL certification, your teaching style, and what makes you effective. E.g.: "TEFL-certified ESL teacher with a structured, warm approach to one-to-one and small group instruction. Experienced in online delivery via ClassIn and Zoom. Focused on building learner confidence and communication fluency."</li>
  <li><strong>Qualifications</strong> — Your TEFL certificate (provider, hours, date). Any relevant degree.</li>
  <li><strong>Teaching experience</strong> — Even if you're new, include any teaching, tutoring, coaching, or mentoring you've done. Volunteer teaching counts.</li>
  <li><strong>Technical skills</strong> — ClassIn, Zoom, VoovMeeting, Google Classroom, any LMS platforms.</li>
  <li><strong>Languages</strong> — English (proficient/native-level), any others.</li>
</ol>
<h4>What to avoid</h4>
<ul>
  <li>Photos (not expected in international CVs and can introduce bias)</li>
  <li>Objective statements that are generic ("Looking for an opportunity to grow...")</li>
  <li>Long paragraphs — use bullet points everywhere</li>
  <li>Spelling or grammar errors — have someone proofread</li>
</ul>
<p>Keep your CV to one page. Update it every time you complete a course or gain notable experience. Your Tall Bridge certificate of completion should be listed here once you finish this course.</p>`
          },
          {
            id: "5-2", title: "Recording your intro video", duration: "18 min",
            content: `<h3>Recording Your Intro Video</h3>
<p>Most platforms require a 1–3 minute introduction video alongside your application. This video is often the deciding factor between two otherwise equal candidates. A polished intro video signals that you are serious, prepared, and camera-comfortable.</p>
<h4>What to include in 90 seconds</h4>
<ol>
  <li><strong>Greeting and name</strong> — "Hi, my name is [name], and I'm an ESL teacher based in Nigeria."</li>
  <li><strong>Teaching philosophy</strong> — "I believe language learning works best when students feel safe making mistakes. I create a warm, structured environment where confidence and accuracy grow together."</li>
  <li><strong>Qualifications</strong> — Mention your TEFL certificate and any relevant experience.</li>
  <li><strong>What students can expect</strong> — "In my classes, you'll always know what we're working on and why. We'll practise in context, not just memorise rules."</li>
  <li><strong>Closing</strong> — "I'd love the opportunity to help you reach your English goals. Thank you for watching."</li>
</ol>
<h4>Technical setup for filming</h4>
<ul>
  <li><strong>Camera</strong> — Your laptop webcam or phone (propped at eye level) is sufficient.</li>
  <li><strong>Lighting</strong> — Natural light facing you is best. Ring lights work well. Avoid windows behind you.</li>
  <li><strong>Background</strong> — Clean wall, bookshelf, or professional Zoom background. Nothing distracting.</li>
  <li><strong>Audio</strong> — Record in a quiet room. A basic headset microphone is better than your built-in mic.</li>
  <li><strong>Framing</strong> — Head and shoulders in frame. Camera at eye level, not looking up or down at you.</li>
</ul>
<h4>Recording and editing</h4>
<p>Record 3–5 takes. You don't need to be perfect — you need to be clear and warm. Use DaVinci Resolve (free) or Capcut to trim the beginning and end, adjust brightness if needed, and add a brief title card with your name. Export as MP4, under 100MB.</p>
<h4>The one thing that ruins intro videos</h4>
<p>Reading from a script off-camera. Memorise your key points and speak naturally. If you can see your own eyes in the camera lens, your viewer sees engaged, confident eye contact. Practice until you can do it without reading.</p>`
          },
          {
            id: "5-3", title: "Applying to global employers", duration: "12 min",
            content: `<h3>Applying to Global ESL Employers</h3>
<p>You have your TEFL certificate, your CV, and your intro video. Now it is time to apply. Here is a structured approach to maximising your chances of getting hired quickly.</p>
<h4>Platform tiers</h4>
<p><strong>Tier 1 — High volume, lower rate, fastest to hire:</strong> Preply, Cambly, Italki (community tutor). These platforms have minimal requirements and high student volume. Good for building reviews and income quickly.</p>
<p><strong>Tier 2 — Moderate requirements, moderate pay:</strong> Lingoda, Verbling, Open English. Require more documentation but pay $12–$20/hour. Better for structured, scheduled teaching.</p>
<p><strong>Tier 3 — Most selective, highest pay:</strong> VIPKid (currently restructuring), Magic Ears, Gogokid, VIPX. Primarily Chinese market. Pay $18–$26/hour base. Require strong camera presence and structured lesson delivery. The Tall Bridge certificate supports your application here.</p>
<h4>Application strategy</h4>
<ol>
  <li>Apply to 3–5 platforms simultaneously, not one at a time.</li>
  <li>Customise your bio for each platform's target demographic.</li>
  <li>Set your availability for peak hours: 6am–9am Nigeria time (Chinese evening), and 5pm–9pm Nigeria time (European/US afternoon).</li>
  <li>Respond to student booking requests within 2 hours — response time affects your ranking on most platforms.</li>
  <li>After your first 10 sessions, request reviews proactively.</li>
</ol>
<h4>Your first 30 days</h4>
<p>Expect slow bookings at first. Set competitive rates initially (lower than your target) to build your review base. As reviews accumulate, raise your rates incrementally. Most teachers reach their target income within 60–90 days of consistent effort.</p>
<p>You have everything you need. Now it is time to begin. Congratulations on completing the Tall Bridge ESL Online Teaching course.</p>`
          }
        ]
      }
    ]
  }
};

type CourseKey = keyof typeof COURSE;

/* ── Progress helpers ────────────────────────────────────────── */
const STORAGE_KEY = (uid: string, course: string) => `tb_progress_${uid}_${course}`;

async function loadProgress(uid: string, course: string): Promise<Set<string>> {
  try {
    const { data } = await db.from("user_progress").select("lesson_id").eq("user_id", uid).eq("course", course);
    if (data) return new Set(data.map((r: { lesson_id: string }) => r.lesson_id));
  } catch { /* table may not exist */ }
  const raw = localStorage.getItem(STORAGE_KEY(uid, course));
  return raw ? new Set(JSON.parse(raw)) : new Set();
}

async function markComplete(uid: string, course: string, lessonId: string, completed: Set<string>): Promise<Set<string>> {
  const next = new Set(completed);
  next.add(lessonId);
  try {
    await db.from("user_progress").upsert({ user_id: uid, course, lesson_id: lessonId }, { onConflict: "user_id,course,lesson_id" });
  } catch { /* graceful fallback */ }
  localStorage.setItem(STORAGE_KEY(uid, course), JSON.stringify([...next]));
  return next;
}

async function markIncomplete(uid: string, course: string, lessonId: string, completed: Set<string>): Promise<Set<string>> {
  const next = new Set(completed);
  next.delete(lessonId);
  try {
    await db.from("user_progress").delete().eq("user_id", uid).eq("course", course).eq("lesson_id", lessonId);
  } catch { /* graceful fallback */ }
  localStorage.setItem(STORAGE_KEY(uid, course), JSON.stringify([...next]));
  return next;
}

/* ── Component ───────────────────────────────────────────────── */
export default function LMSPage() {
  const navigate = useNavigate();
  const params = useParams();
  const courseKey = (params.course || "esl") as CourseKey;
  const course = COURSE[courseKey];

  const [authLoading, setAuthLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [userId, setUserId] = useState("");
  const [userInitials, setUserInitials] = useState("?");
  const [userName, setUserName] = useState("");

  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [activeModuleNum, setActiveModuleNum] = useState(1);
  const [activeLessonId, setActiveLessonId] = useState("1-1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = db.auth.onAuthStateChange(async (_event, session) => {
      if (!session) { navigate("/auth?mode=login"); return; }
      const u = session.user;
      const firstName = u.user_metadata?.first_name || u.email?.split("@")[0] || "Learner";
      const lastInitial = u.user_metadata?.last_name?.charAt(0).toUpperCase() || "";
      setUserInitials(firstName.charAt(0).toUpperCase() + lastInitial);
      setUserName(firstName);
      setUserId(u.id);

      let paid = false;
      try {
        const { data } = await db.from("payments").select("id").eq("user_id", u.id).eq("course", courseKey).maybeSingle();
        paid = !!data;
      } catch { paid = false; }
      setHasPaid(paid);

      const prog = await loadProgress(u.id, courseKey);
      setCompleted(prog);
      setAuthLoading(false);
    });
    return () => { unsub.data.subscription.unsubscribe(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeModule = course.modules.find(m => m.num === activeModuleNum)!;
  const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId) || activeModule?.lessons[0];
  const unlocked = (m: typeof course.modules[0]) => hasPaid || m.free;

  const openLesson = (modNum: number, lessonId: string) => {
    setActiveModuleNum(modNum);
    setActiveLessonId(lessonId);
    setSidebarOpen(false);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedCount = course.modules.reduce(
    (s, m) => s + m.lessons.filter(l => completed.has(l.id)).length, 0
  );
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  const toggleComplete = async () => {
    if (!userId) return;
    if (completed.has(activeLesson.id)) {
      const next = await markIncomplete(userId, courseKey, activeLesson.id, completed);
      setCompleted(next);
    } else {
      const next = await markComplete(userId, courseKey, activeLesson.id, completed);
      setCompleted(next);
      // Auto-advance to next lesson
      const lessons = activeModule.lessons;
      const idx = lessons.findIndex(l => l.id === activeLesson.id);
      if (idx < lessons.length - 1) {
        setTimeout(() => openLesson(activeModuleNum, lessons[idx + 1].id), 400);
      } else {
        const nextMod = course.modules.find(m => m.num === activeModuleNum + 1);
        if (nextMod && unlocked(nextMod)) {
          setTimeout(() => openLesson(nextMod.num, nextMod.lessons[0].id), 400);
        }
      }
    }
  };

  if (authLoading) {
    return (
      <div className="dash-loading">
        <div className="spinner"></div>
        <p>Loading your course...</p>
      </div>
    );
  }

  return (
    <div className="lms-page">
      {/* Top bar */}
      <div className="lms-topbar">
        <div className="lms-topbar-left">
          <button className="lms-menu-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="lms-topbar-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src="/logo.png" alt="Tall Bridge" />
            <span>Tall Bridge<span className="lms-dot">.</span></span>
          </div>
          <div className="lms-topbar-course">{course.name}</div>
        </div>
        <div className="lms-topbar-right">
          <div className="lms-progress-pill">
            <div className="lms-progress-fill" style={{ width: `${progressPct}%` }}></div>
            <span>{progressPct}%</span>
          </div>
          <div className="lms-avatar" title={userName}>{userInitials}</div>
          <button className="lms-back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
        </div>
      </div>

      <div className="lms-body">
        {/* Sidebar */}
        <aside className={`lms-sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="lms-sidebar-header">
            <div className="lms-sidebar-title">Course content</div>
            <div className="lms-sidebar-progress">{completedCount}/{totalLessons} lessons</div>
          </div>
          {course.modules.map(mod => {
            const modUnlocked = unlocked(mod);
            const modCompleted = mod.lessons.filter(l => completed.has(l.id)).length;
            const isActiveModule = mod.num === activeModuleNum;
            return (
              <div className="lms-mod-group" key={mod.num}>
                <div
                  className={`lms-mod-header${isActiveModule ? " active" : ""}${!modUnlocked ? " locked" : ""}`}
                  onClick={() => modUnlocked && openLesson(mod.num, mod.lessons[0].id)}
                >
                  <div className="lms-mod-header-left">
                    <div className="lms-mod-num">{mod.num}</div>
                    <div className="lms-mod-name">{mod.title}</div>
                  </div>
                  <div className="lms-mod-meta">
                    {!modUnlocked
                      ? <span className="lms-lock-icon">🔒</span>
                      : <span className="lms-mod-count">{modCompleted}/{mod.lessons.length}</span>
                    }
                  </div>
                </div>
                {modUnlocked && isActiveModule && (
                  <div className="lms-lesson-list">
                    {mod.lessons.map(lesson => {
                      const done = completed.has(lesson.id);
                      const isActive = lesson.id === activeLessonId;
                      return (
                        <div
                          key={lesson.id}
                          className={`lms-lesson-item${isActive ? " active" : ""}${done ? " done" : ""}`}
                          onClick={() => openLesson(mod.num, lesson.id)}
                        >
                          <div className={`lms-lesson-check${done ? " checked" : ""}`}>
                            {done && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className="lms-lesson-info">
                            <div className="lms-lesson-title">{lesson.title}</div>
                            <div className="lms-lesson-duration">{lesson.duration}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && <div className="lms-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Main content */}
        <main className="lms-main" ref={contentRef}>
          {!hasPaid && !activeModule.free && (
            <div className="lms-locked-banner">
              <div>
                <strong>This module is locked.</strong> Complete your payment to access all 5 modules.
              </div>
              <button onClick={() => navigate("/payment?course=esl")} className="lms-unlock-btn">
                Unlock for $70 →
              </button>
            </div>
          )}

          <div className="lms-content-area">
            <div className="lms-breadcrumb">
              Module {activeModule.num} · {activeModule.title}
            </div>
            <h1 className="lms-lesson-heading">{activeLesson.title}</h1>
            <div className="lms-lesson-meta">
              <span className="lms-duration-badge">{activeLesson.duration}</span>
              {activeModule.free && <span className="lms-free-badge">Free preview</span>}
            </div>

            {(!hasPaid && !activeModule.free) ? (
              <div className="lms-locked-content">
                <div className="lms-locked-icon">🔒</div>
                <h3>Module locked</h3>
                <p>Pay once to unlock all 5 modules, including this lesson and everything in Modules 2–5.</p>
                <button onClick={() => navigate("/payment?course=esl")} className="btn-auth-submit lime" style={{ maxWidth: 240, margin: "1.5rem auto 0" }}>
                  Unlock now →
                </button>
              </div>
            ) : (
              <>
                <div
                  className="lms-lesson-content"
                  dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                />

                <div className="lms-lesson-footer">
                  <button
                    className={`lms-complete-btn${completed.has(activeLesson.id) ? " done" : ""}`}
                    onClick={toggleComplete}
                  >
                    {completed.has(activeLesson.id) ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Completed — mark incomplete
                      </>
                    ) : (
                      "Mark as complete →"
                    )}
                  </button>

                  <div className="lms-nav-btns">
                    {(() => {
                      const lessons = activeModule.lessons;
                      const idx = lessons.findIndex(l => l.id === activeLesson.id);
                      const prevLesson = idx > 0 ? lessons[idx - 1] : null;
                      const nextLesson = idx < lessons.length - 1 ? lessons[idx + 1] : null;
                      const nextMod = course.modules.find(m => m.num === activeModuleNum + 1);
                      return (
                        <>
                          {prevLesson && (
                            <button className="lms-nav-btn" onClick={() => openLesson(activeModuleNum, prevLesson.id)}>
                              ← Previous
                            </button>
                          )}
                          {nextLesson && (
                            <button className="lms-nav-btn primary" onClick={() => openLesson(activeModuleNum, nextLesson.id)}>
                              Next lesson →
                            </button>
                          )}
                          {!nextLesson && nextMod && unlocked(nextMod) && (
                            <button className="lms-nav-btn primary" onClick={() => openLesson(nextMod.num, nextMod.lessons[0].id)}>
                              Next module →
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
