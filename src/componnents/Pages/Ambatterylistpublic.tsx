import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchAmBatteryList } from "../api/amBatteryPublic";

interface BatteryCard {
  _id: string;
  slug: string;
  name: { bn: string; en?: string };
  coverImage?: string;
  price: number;
}

export default function AmBatteryListPublic() {
  const [batteries, setBatteries] = useState<BatteryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAmBatteryList()
      .then(setBatteries)
      .catch((err) => setError(err.message || "Failed to load the assessment catalogue."))
      .finally(() => setLoading(false));
  }, []);

  // ==========================================
  // Premium Leaf Loading Spinner (Light Theme)
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-12.5">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          {/* Leaf kept in original green color */}
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-[#D4BCA6] font-bold tracking-[0.2em] uppercase text-sm">
          Loading...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State (Light Theme)
  // ==========================================
  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-12.5">
        <div className="bg-white border border-[#C8D0C0] px-8 py-6 flex flex-col items-center gap-4 shadow-sm">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[#596573] font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] overflow-hidden">
      
      {/* SVG Definitions for Global Blue-Green Gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================
          BACKGROUND IMAGE & LIGHT OVERLAY
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752895/WhatsApp_Image_2026_r9hj3g.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Light Overlay for clear text visibility */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-[#FAF7F2]/60 to-[#FAF7F2]/95" />

      {/* =========================================
          MAIN CONTENT WRAPPER (Sidebar Spacing)
          ========================================= */}
      <div className="relative z-10 flex-1 lg:pl-12.5 flex flex-col">
        
        <div className="w-full pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto flex-1">
          
          {/* Header Section */}
          <div className="mb-14 text-center lg:text-left border-b border-[#C8D0C0]/50 pb-8 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white/50 p-8 backdrop-blur-md border-t border-x">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                </svg>
                <span className="text-[#D4BCA6] font-bold text-xs uppercase tracking-widest playfair-semibold">
                  Assessment Catalogue
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#2C3338] font-serif tracking-tight drop-shadow-sm">
                Selection & Recruitment
              </h1>
            </div>
            
            <div className="max-w-md text-center lg:text-left">
              <p className="text-[#596573] text-sm sm:text-base lato-regular leading-relaxed border-l-2 border-[#D4BCA6] pl-4">
                Our specialized psychometric assessment batteries designed for precision in hiring and promotion.
              </p>
            </div>
          </div>

          {/* =========================================
              BATTERY GRID OR EMPTY STATE
              ========================================= */}
          {batteries.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md border border-[#EAEFF0] p-16 flex flex-col items-center justify-center text-center shadow-sm">
              <svg className="w-12 h-12 text-[#C8D0C0] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
              </svg>
              <p className="text-[#596573] text-lg font-serif tracking-wide">No assessment batteries have been published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {batteries.map((b, index) => {
                const serialNum = String(index + 1).padStart(2, '0');

                return (
                  <Link
                    to={`/selection/${b.slug}`}
                    key={b._id}
                    className="group flex flex-col bg-white/80 backdrop-blur-md border border-[#EAEFF0] overflow-hidden hover:border-[#D4BCA6] hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300 relative"
                  >
                    {/* Index Badge */}
                    <div className="absolute top-0 right-0 z-20 bg-[#C8D0C0] text-[#2C3338] font-bold font-serif text-sm px-4 py-2 shadow-sm">
                      {serialNum}
                    </div>

                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-[#EDE5DA]">
                      <img
                        src={b.coverImage || "/placeholder.png"}
                        alt={b.name?.en || b.name?.bn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#FAF7F2] via-[#FAF7F2]/20 to-transparent" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col relative z-10 -mt-10">
                      <h3 className="text-lg sm:text-xl font-bold text-[#2C3338] mb-4 line-clamp-2 leading-snug drop-shadow-sm font-serif group-hover:text-[#D4BCA6] transition-colors">
                        {b.name?.en || b.name?.bn}
                      </h3>
                      
                      {/* Price & Hover Action */}
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#EAEFF0]">
                        <span 
                          className={`px-5 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase border ${
                            b.price > 0 
                              ? 'bg-[#EAEFF0] text-[#596573] border-[#C8D0C0]/50' 
                              : 'bg-[#D4BCA6] text-white border-transparent'
                          }`}
                        >
                          {b.price > 0 ? `৳ ${b.price}` : "Free"}
                        </span>
                        
                        {/* Leaf Hover Button (Original Green Highlight Preserved) */}
                        <span className="w-10 h-10 border border-[#C8D0C0] bg-white flex items-center justify-center group-hover:border-[#5DBB4D] group-hover:bg-[#5DBB4D]/10 transition-all duration-300">
                          <svg 
                            className="w-5 h-5 text-[#A0AAB2] group-hover:text-[#5DBB4D] group-hover:rotate-12 transition-all duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>

        {/* Static information about selection & recruitment */}
        <SelectionInfo />
      </div>
    </div>
  );
}

/* =====================================================================
   STATIC INFORMATION (shown below the dynamic assessment catalogue)
   ===================================================================== */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const whyAssess = [
  { title: "Look Beyond Credentials", text: "Qualifications demonstrate what candidates have studied and experience documents what they have done. Personality assessment adds information about selected work-related tendencies that may be relevant to how they approach their responsibilities." },
  { title: "Understand Teamwork Tendencies", text: "Many positions require collaboration, communication, cooperation and constructive working relationships. Assessment findings may help interviewers explore these areas more systematically." },
  { title: "Explore Leadership Characteristics", text: "Leadership positions may require initiative, sound judgement, accountability, adaptability and the ability to work with others. Assessment can contribute relevant information without replacing evidence of leadership performance." },
  { title: "Structure Candidate Comparisons", text: "Standardized assessments can provide a consistent framework for reviewing selected personality characteristics, provided the same appropriate procedures and interpretation standards are used." },
  { title: "Strengthen Interviews", text: "Assessment findings can help recruiters identify areas for further exploration during structured interviews, reference checks or job-related exercises." },
  { title: "Support Better-Informed Decisions", text: "Combine personality findings with qualifications, experience, interviews and other relevant evidence. No single test should determine a hiring decision on its own." },
];

const validityBars = [
  { label: "Work sample", value: 0.54, width: 90 },
  { label: "Structured interview", value: 0.51, width: 85 },
  { label: "Job knowledge", value: 0.48, width: 80 },
  { label: "Assessment centre", value: 0.37, width: 62 },
  { label: "Biodata", value: 0.35, width: 58 },
  { label: "Conscientiousness", value: 0.31, width: 52 },
];

const orgLevels = [
  { title: "General Manager", tag: "Strategic leadership and organizational responsibility", text: "Assessment may explore role-relevant leadership style, accountability, decision-making tendencies, interpersonal effectiveness and approaches to organizational challenges." },
  { title: "Manager", tag: "Team leadership and operational management", text: "Explore relevant working styles, collaboration, responsibility, adaptability and approaches to supervising people and coordinating work." },
  { title: "Assistant Manager", tag: "Coordination and supervisory readiness", text: "Assessment may contribute insight into communication, organization, initiative, teamwork and balancing assigned tasks with emerging leadership responsibilities." },
  { title: "Senior Executive", tag: "Independent work and professional accountability", text: "Relevant areas may include responsibility, collaboration, initiative, work organization and adaptability to changing priorities." },
  { title: "Executive", tag: "Professional effectiveness and team contribution", text: "Explore selected work-related tendencies relevant to communication, cooperation, dependability, initiative and completing assigned responsibilities." },
  { title: "Staff", tag: "Role-specific working style and workplace interaction", text: "Assessment may help explore relevant work habits, cooperation, responsibility and interpersonal tendencies in relation to the actual duties of the position." },
];

const processSteps = [
  { title: "Organizational Registration", text: "The organization contacts Why Not You Psychology to discuss recruitment requirements, available assessment options, pricing and access arrangements." },
  { title: "Select the Relevant Assessment", text: "The organization chooses the appropriate available test for the vacancy and level of responsibility, with guidance on intended use and interpretation." },
  { title: "Candidates Complete the Test Online", text: "Candidates receive the relevant instructions and complete the assessment through the online system, subject to the platform's available administration and security features." },
  { title: "Receive the Assessment Report", text: "The organization receives the report provided by the service, explaining the measured dimensions and their interpretation within the test's intended scope." },
  { title: "Integrate Findings into Recruitment", text: "HR professionals and authorized decision-makers review results alongside qualifications, interviews, relevant experience, work samples and other appropriate evidence before making a selection decision." },
];

const receives = [
  { title: "Individual Personality Profile", text: "A structured presentation of the personality dimensions actually measured by the selected assessment." },
  { title: "Graphical Presentation of Results", text: "Charts or profile graphs that make reported scores easier to review, subject to the scoring model and appropriate interpretation guidelines." },
  { title: "Workplace-Oriented Interpretation", text: "Explanations of what measured characteristics may mean in a professional context, without claiming that a personality profile fully describes a candidate." },
  { title: "Support for Further Assessment", text: "Findings that can help HR professionals prepare relevant follow-up interview questions or identify areas where additional evidence may be useful." },
  { title: "A Documented Assessment Record", text: "A report for authorized organizational use, subject to actual service features, confidentiality arrangements and the agreed retention policy." },
];

const whyChoose = [
  { title: "Online Accessibility", text: "Enable candidates to complete eligible assessments online, reducing the need for every assessment to be conducted in person." },
  { title: "Six Job-Level Categories", text: "Explore assessment categories for General Managers, Managers, Assistant Managers, Senior Executives, Executives and Staff." },
  { title: "Structured Information for HR", text: "Add a standardized source of information about selected personality characteristics to the existing recruitment process." },
  { title: "Responsible Assessment", text: "Promote job relevance, appropriate interpretation, confidentiality and the use of multiple sources of evidence in recruitment." },
];

const faqs = [
  { q: "Can personality assessment replace our existing recruitment process?", a: "No. It is intended to complement appropriate recruitment methods such as CV screening, interviews, technical tests, reference checks and work samples. Final decisions should consider the complete evidence available." },
  { q: "Can a personality test tell us with certainty whether a candidate will succeed?", a: "No. Personality assessments measure selected characteristics and may contribute to predicting some aspects of workplace behaviour when properly validated. They cannot guarantee performance or predict every aspect of an individual's future behaviour." },
  { q: "Which assessment should our organization choose?", a: "The appropriate assessment depends on the duties, responsibilities and relevant competencies of the position. A job analysis and review of the test's technical evidence should inform the choice." },
  { q: "Can we assess candidates for different levels of our organization?", a: "The service is designed around six proposed job-level categories: General Manager, Manager, Assistant Manager, Senior Executive, Executive and Staff. Contact the service to confirm which assessments and reports are currently available." },
  { q: "How do we receive the results?", a: "The delivery method should be confirmed with Why Not You Psychology. Reports should be shared only through the available, authorized delivery process and handled according to the agreed confidentiality arrangements." },
  { q: "Is the assessment suitable for every type of job?", a: "Not necessarily. The usefulness of personality assessment depends on the role and the characteristics measured. The assessment should be relevant to the job and should not be used as a general-purpose measure of a candidate's worth or suitability for every occupation." },
];

const references = [
  { title: "U.S. Office of Personnel Management (OPM) — Personality Tests.", note: "An overview of personality assessment, common work-related personality dimensions, applications and limitations.", href: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/other-assessment-methods/personality-tests/", cta: "Read OPM guidance" },
  { title: "Society for Industrial and Organizational Psychology (SIOP), 2018.", note: "Principles for the Validation and Use of Personnel Selection Procedures, fifth edition. Industrial and Organizational Psychology, 11(S1), 1–97.", href: "https://doi.org/10.1017/iop.2018.195", cta: "Publication record" },
  { title: "Schmidt, F. L., & Hunter, J. E. (1998).", note: "“The Validity and Utility of Selection Methods in Personnel Psychology: Practical and Theoretical Implications of 85 Years of Research Findings.” Psychological Bulletin, 124(2), 262–274.", href: "https://doi.org/10.1037/0033-2909.124.2.262", cta: "Read the research paper" },
  { title: "International Test Commission (ITC) and Association of Test Publishers (ATP), 2025.", note: "Guidelines for Technology-Based Assessment.", href: "https://www.intestcom.org/page/16", cta: "Read ITC guidance" },
  { title: "U.S. Office of Personnel Management — Designing an Assessment Strategy.", note: "Practical guidance on reliability, validity, combining assessment methods and designing a job-relevant selection process.", href: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/assessment-strategy/", cta: "Read the assessment strategy guidance" },
];

const INK = "text-[#0F1214]";
const BODY = "text-[#14181B]";
const RULE = "border-[#0F1214]/15";

function Para({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`${BODY} text-base sm:text-lg leading-[1.8] break-words ${className}`}>{children}</p>
  );
}

function Pull({ children, tone = "sand" }: { children: React.ReactNode; tone?: "sand" | "green" }) {
  return (
    <blockquote
      className={`my-10 sm:my-12 border-l-2 ${tone === "green" ? "border-[#5DBB4D]" : "border-[#D4BCA6]"} pl-5 sm:pl-8 font-serif text-xl sm:text-2xl lg:text-[1.65rem] leading-snug ${INK} break-words`}
    >
      {children}
    </blockquote>
  );
}

/* Editorial section: big numeral + title on the left, content on the right. No boxes. */
function Section({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      {...reveal}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t ${RULE} pt-10 sm:pt-14`}
    >
      <div className="lg:col-span-4 min-w-0">
        <div className="lg:sticky lg:top-28">
          <span className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-none text-[#D4BCA6] block mb-5">{no}</span>
          <span className="block w-14 h-0.5 bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] mb-5" />
          <h2 className={`font-serif font-medium ${INK} text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.12] tracking-tight break-words`}>
            {title}
          </h2>
        </div>
      </div>
      <div className="lg:col-span-8 min-w-0">{children}</div>
    </motion.section>
  );
}

/* Ruled list: replaces card grids. */
function RuledList({
  items,
  numbered = true,
}: {
  items: { title: string; text: string; tag?: string }[];
  numbered?: boolean;
}) {
  return (
    <ul className={`border-t ${RULE}`}>
      {items.map((it, i) => (
        <li
          key={it.title}
          className={`grid ${numbered ? "grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr]" : "grid-cols-1"} gap-x-3 sm:gap-x-6 py-7 sm:py-9 border-b ${RULE}`}
        >
          {numbered && (
            <span className="font-serif text-xl sm:text-3xl text-[#D4BCA6] leading-none pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <div className="min-w-0">
            <h3 className={`font-serif font-medium ${INK} text-xl sm:text-2xl lg:text-[1.7rem] leading-snug mb-2 break-words`}>
              {it.title}
            </h3>
            {it.tag && (
              <p className="text-[#8A6F55] text-xs sm:text-sm font-bold uppercase tracking-wider leading-relaxed mb-3 break-words">
                {it.tag}
              </p>
            )}
            <p className={`${BODY} text-base sm:text-lg leading-[1.8] break-words`}>{it.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SelectionInfo() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto pb-20 sm:pb-28 space-y-16 sm:space-y-24">
      {/* ---------- Intro ---------- */}
      <motion.div {...reveal} className="max-w-4xl">
        <span className="block w-14 h-0.5 bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] mb-6" />
        <h2 className={`font-serif font-medium ${INK} text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight mb-6 sm:mb-8 break-words`}>
          Look Beyond the CV. Understand the Person.
        </h2>
        <p className={`${BODY} text-lg sm:text-xl lg:text-2xl leading-[1.7] break-words`}>
          Hire with greater insight. Strengthen your selection process with online psychological personality assessments designed to help organizations understand the people behind the qualifications.
        </p>
      </motion.div>

      {/* ---------- 01 ---------- */}
      <Section no="01" title="The Missing Dimension in Recruitment">
        <div className="space-y-6">
          <p className={`font-serif ${INK} text-2xl sm:text-3xl leading-snug`}>Every recruitment decision is an investment in people.</p>
          <Para>
            Organizations carefully review academic qualifications, professional experience, technical knowledge and interview performance before selecting a candidate. These are essential elements of recruitment. Yet they may not provide a complete picture of how an individual approaches responsibility, manages workplace demands, interacts with colleagues, responds to challenges or exercises leadership.
          </Para>
          <Para>
            Two candidates may possess similar qualifications and comparable experience but differ considerably in their working styles, interpersonal approaches, emotional responses and preferred ways of handling responsibility.
          </Para>
        </div>
        <Pull>The question is not simply who is qualified for the job. It is also who is better aligned with the psychological demands of the role.</Pull>
        <div className="space-y-6">
          <Para>This is where psychological personality assessment can make a meaningful contribution.</Para>
          <Para>
            Why Not You Psychology offers organizations an opportunity to incorporate online personality testing into their recruitment and selection systems. The objective is to provide an additional source of structured information about candidates' work-related personality characteristics, helping recruitment teams make more informed, evidence-conscious decisions.
          </Para>
          <Para>Rather than replacing established recruitment methods, our approach is designed to complement them.</Para>
        </div>
      </Section>

      {/* ---------- 02 ---------- */}
      <Section no="02" title="The Iceberg Principle: What Lies Beneath the Surface?">
        <Para className="mb-10">An iceberg is a powerful metaphor for understanding people in recruitment.</Para>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12">
          <div className="border-t-2 border-[#1A6BBA] pt-6">
            <p className="text-[#8A6F55] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">What you can see</p>
            <h3 className={`font-serif font-medium ${INK} text-2xl sm:text-[1.7rem] leading-snug mb-3`}>Above the Waterline</h3>
            <Para>Academic qualifications, professional experience, technical knowledge, CV, interview presentation and past achievements.</Para>
          </div>
          <div className="border-t-2 border-[#5DBB4D] pt-6">
            <p className="text-[#8A6F55] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">What assessment may help explore</p>
            <h3 className={`font-serif font-medium ${INK} text-2xl sm:text-[1.7rem] leading-snug mb-3`}>Below the Waterline</h3>
            <Para>Work-related personality traits, interpersonal style, approach to responsibility, emotional tendencies, teamwork preferences and leadership-related characteristics.</Para>
          </div>
        </div>
        <div className="space-y-6 mt-10">
          <Para>
            Below the waterline lie less immediately observable characteristics: habitual work styles, interpersonal tendencies, responses to pressure, preferences for collaboration, approaches to responsibility and other personality-related factors that may influence workplace behaviour.
          </Para>
          <Para>
            These characteristics cannot all be reliably inferred from a CV or a brief conversation. Nor can an online personality test reveal every hidden aspect of a person. However, an appropriately designed and job-relevant assessment can provide additional information about selected psychological characteristics that matter in the workplace.
          </Para>
        </div>
        <Pull tone="green">
          Do not make recruitment decisions using only the information that is easiest to see. Use relevant psychological assessment to gain another perspective on the candidate.
        </Pull>
        <p className="text-sm sm:text-base text-[#2C3338]/70 leading-relaxed">
          The iceberg is a metaphor. No test reveals a person's entire personality or guarantees job performance.
        </p>
      </Section>

      {/* ---------- 03 ---------- */}
      <Section no="03" title="Why Organizations Should Add Personality Assessment to Recruitment">
        <Para className="mb-8">
          A well-designed recruitment process should evaluate candidates against the actual requirements of the position. Personality assessment can contribute useful information when the traits being measured are relevant to the job.
        </Para>
        <RuledList items={whyAssess} />
        <p className="text-sm sm:text-base text-[#2C3338]/70 leading-relaxed mt-6">
          These are potential benefits, not guarantees of hiring success. Results depend on job relevance, test quality and appropriate use.
        </p>
      </Section>

      {/* ---------- 04 ---------- */}
      <Section no="04" title="Research-Backed Recruitment: The Evidence">
        <div className="space-y-6 mb-12">
          <Para>
            Psychological assessment should not be promoted merely because it sounds scientific. Its value must be considered in the context of established personnel-selection research.
          </Para>
          <Para>
            The U.S. Office of Personnel Management publishes guidance on reliability, validity and the practical application of different selection methods. Its assessment-strategy resource presents historical estimates of how different methods relate to job performance, based on Schmidt and Hunter (1998).
          </Para>
        </div>

        <h3 className={`font-serif font-medium ${INK} text-xl sm:text-2xl leading-snug mb-2`}>
          Illustrative Validity Estimates for Personnel-Selection Methods
        </h3>
        <p className="text-sm sm:text-base text-[#2C3338]/70 leading-relaxed mb-8">
          Historical meta-analytic estimates of correlation with job performance. These are research benchmarks, not results from Why Not You Psychology's tests.
        </p>
        <div className={`border-t ${RULE}`}>
          {validityBars.map((b) => (
            <div key={b.label} className={`grid grid-cols-[105px_1fr_44px] sm:grid-cols-[210px_1fr_60px] items-center gap-3 sm:gap-5 py-4 sm:py-5 border-b ${RULE}`}>
              <span className={`text-sm sm:text-lg ${INK} leading-snug break-words`}>{b.label}</span>
              <div className="h-2.5 sm:h-3 bg-[#0F1214]/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D]"
                />
              </div>
              <strong className={`font-serif text-base sm:text-xl ${INK} text-right`}>{b.value.toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#2C3338]/70 leading-relaxed mt-5">
          Source: U.S. Office of Personnel Management, “Designing an Assessment Strategy”; estimates adapted from Schmidt &amp; Hunter (1998). A correlation coefficient is not a percentage success rate. These figures do not establish the validity of any specific personality instrument or predict an individual candidate's outcome.
        </p>

        <h3 className={`font-serif font-medium ${INK} text-2xl sm:text-3xl leading-snug mt-14 mb-8`}>
          From Conventional Screening to Multidimensional Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            { t: "Qualifications", s: "Education and experience" },
            { t: "Interview", s: "Communication and evidence" },
            { t: "Psychological Personality Assessment", s: "Additional insight into selected work-related characteristics" },
          ].map((x, i) => (
            <div key={x.t} className="border-t-2 border-[#D4BCA6] pt-5 min-w-0">
              <p className={`font-serif ${INK} text-xl sm:text-2xl leading-snug mb-2 break-words`}>
                {i > 0 && <span className="text-[#D4BCA6] mr-2">+</span>}
                {x.t}
              </p>
              <p className={`${BODY} text-base leading-relaxed`}>{x.s}</p>
            </div>
          ))}
        </div>
        <p className={`mt-10 font-serif ${INK} text-2xl sm:text-3xl leading-snug`}>
          <span className="text-[#5DBB4D] mr-2">=</span>
          A more comprehensive evidence base for informed human decision-making.
        </p>
        <Para className="mt-8">
          The aim is not to create a single test that decides who gets hired. It is to help organizations consider more relevant information before making an important decision.
        </Para>
      </Section>

      {/* ---------- 05 ---------- */}
      <Section no="05" title="One Assessment Platform. Six Organizational Levels.">
        <Para className="mb-8">
          Different positions carry different responsibilities. The characteristics relevant to a General Manager may not be identical to those required of a Staff member.
        </Para>
        <RuledList items={orgLevels} />
      </Section>

      {/* ---------- 06 ---------- */}
      <Section no="06" title="How the Online Recruitment Assessment Works">
        <Para className="mb-8">
          The goal is to make psychological assessment accessible to organizations without requiring them to develop and administer every test internally.
        </Para>
        <RuledList items={processSteps} />
      </Section>

      {/* ---------- 07 ---------- */}
      <Section no="07" title="What Will the Organization Receive?">
        <Para className="mb-8">
          The value of an assessment lies not simply in completing a questionnaire, but in obtaining information that can be understood and used appropriately.
        </Para>
        <RuledList items={receives} />
      </Section>

      {/* ---------- 08 ---------- */}
      <Section no="08" title="Why Choose Why Not You Psychology?">
        <Para className="mb-8">
          Organizations need assessment solutions that are relevant, practical and responsible. Why Not You Psychology aims to make psychological assessment an accessible additional component of organizational recruitment in Bangladesh.
        </Para>
        <RuledList items={whyChoose} />
        <div className="space-y-6 mt-10">
          <Para>
            The International Test Commission's technology-based assessment guidelines, developed in collaboration with the Association of Test Publishers and updated in July 2025, address good practice in digital test delivery, scoring, fairness, accessibility, security and privacy.
          </Para>
          <Para>
            Our vision is to help organizations make personality assessment a more accessible and meaningful part of their recruitment systems.
          </Para>
        </div>
      </Section>

      {/* ---------- 09 ---------- */}
      <Section no="09" title="The Opportunity for Organizations in Bangladesh">
        <div className="space-y-6">
          <Para>
            Bangladesh's organizations need people who can do more than meet the formal requirements of a position. They need employees who can contribute to their teams, fulfil their responsibilities and develop with the organization.
          </Para>
          <Para>
            A recruitment system that considers only visible qualifications may leave some relevant questions unanswered. Psychological assessment offers a way to explore selected individual differences in a more systematic manner.
          </Para>
          <Para>
            For organizations that have not previously incorporated personality assessment into recruitment, Why Not You Psychology offers an opportunity to explore this additional dimension without having to build an entire psychological testing service from the ground up. For organizations already using assessments, the platform may offer another option to evaluate as part of their broader selection strategy.
          </Para>
        </div>
        <Pull>
          Whether you are recruiting one executive or building a team across multiple organizational levels, consider what additional insight a relevant personality assessment could bring to your selection process.
        </Pull>
        <p className={`font-serif ${INK} text-xl sm:text-2xl leading-snug`}>
          Move beyond conventional screening. Explore the person behind the application.
        </p>
      </Section>

      {/* ---------- 10 FAQ ---------- */}
      <Section no="10" title="Frequently Asked Questions">
        <div className={`border-t ${RULE}`}>
          {faqs.map((f) => (
            <details key={f.q} className={`group border-b ${RULE}`}>
              <summary className="flex items-start justify-between gap-5 cursor-pointer list-none py-6 sm:py-7 [&::-webkit-details-marker]:hidden">
                <span className={`font-serif ${INK} text-lg sm:text-2xl leading-snug break-words`}>{f.q}</span>
                <span className="shrink-0 text-3xl leading-none text-[#D4BCA6] group-open:rotate-45 group-open:text-[#5DBB4D] transition-all duration-300">
                  +
                </span>
              </summary>
              <p className={`${BODY} text-base sm:text-lg leading-[1.8] pb-7 sm:pb-8 sm:pr-12 break-words`}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ---------- CTA ---------- */}
      <motion.section {...reveal}>
        <div className="bg-[#14181B] text-[#FAF7F2] px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <span className="block w-14 h-0.5 bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] mb-6" />
          <h2 className="font-serif font-medium text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6 sm:mb-8 max-w-4xl break-words">
            Your Next Recruitment Decision Deserves a Deeper Look.
          </h2>
          <p className="text-[#FAF7F2]/90 text-lg sm:text-xl leading-[1.7] max-w-3xl mb-5">
            Give your organization the opportunity to explore work-related personality assessment as an additional dimension of candidate screening.
          </p>
          <p className="font-serif text-[#D4BCA6] text-xl sm:text-2xl mb-5">Partner with Why Not You Psychology.</p>
          <p className="text-[#FAF7F2]/90 text-base sm:text-lg leading-[1.8] max-w-3xl mb-10">
            Discover the available assessments, discuss your recruitment requirements and identify an appropriate way to integrate personality assessment into your selection process.
          </p>
          <a
            href="mailto:info@whynotyoupsy.com?subject=Organizational%20Assessment%20Enquiry"
            className="inline-block w-full sm:w-auto text-center bg-[#D4BCA6] hover:bg-[#e2cdb9] text-[#14181B] font-bold text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest px-6 sm:px-12 py-5 transition-colors duration-300"
          >
            Enquire About Organizational Assessment
          </a>
          <p className="mt-8 text-base">
            <a href="https://whynotyoupsy.com" className="text-[#FAF7F2]/80 hover:text-[#D4BCA6] underline underline-offset-4 transition-colors">
              whynotyoupsy.com
            </a>
          </p>
        </div>
      </motion.section>

      {/* ---------- 11 References ---------- */}
      <Section no="11" title="References and Further Reading">
        <p className="text-sm sm:text-base text-[#2C3338]/70 leading-relaxed mb-8">
          These sources support the general principles discussed on this page. They do not, by themselves, validate the specific tests offered by Why Not You Psychology.
        </p>
        <ol className={`border-t ${RULE}`}>
          {references.map((r, i) => (
            <li key={r.href} className={`grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-3 py-6 border-b ${RULE}`}>
              <span className="font-serif text-lg sm:text-xl text-[#D4BCA6] leading-none pt-1">{i + 1}</span>
              <p className={`${BODY} text-base sm:text-lg leading-[1.75] break-words min-w-0`}>
                <strong className={`font-serif ${INK}`}>{r.title}</strong> {r.note}{" "}
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-[#1A6BBA] underline underline-offset-4 hover:text-[#2E8B3A] transition-colors">
                  {r.cta}
                </a>
                .
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}