export const mhsTranslations = {
  en: {
    brandName: "Why Not You - Psychological Services",
    brandTagline: "Evidence-Based Psychometric Screening & Clinical Diagnostics",
    confidentialBadge: "CONFIDENTIAL CLINICAL REPORT",
    mainTitle: "Mansik Shasthya Scannar - Bangladesh (MHS-BD)",
    subtitle: "Comprehensive Personal Mental Health Screening & Actionable Clinical Roadmap",
    edition: "Standard Edition 2.4 - Validated Clinical Framework",

    // Toolbar
    printPdf: "Print / Save as PDF",
    langBn: "বাংলা",
    langEn: "English",

    // Metadata labels
    lblReportNo: "Report Number",
    lblName: "Participant Name",
    lblAgeGender: "Age / Gender",
    lblOccupation: "Occupation",
    lblDate: "Assessment Date",
    lblRef: "Clinical Referral",
    lblScale: "Screening Framework",

    // Page 1: At a glance
    secAtAGlance: "At-A-Glance Assessment Summary",
    mentalHealthIndex: "Overall Mental Health Strain Index",
    indexScoreUnit: "out of 100",
    indexLevels: {
      minimal: "Balanced & Resilient (0-25)",
      mild: "Mild Strain (26-45)",
      moderate: "Under Moderate Strain (46-70)",
      severe: "High Clinical Stress (71-100)",
    },
    indexInterpretationTitle: "Clinical Impression & Guidance",
    summaryConcernsTitle: "Primary Psychological Focus Areas",
    summaryStrengthsTitle: "Identified Protective Strengths",
    tocTitle: "Report Navigation & Contents",
    tocItems: [
      { page: "Page 02", title: "Assessment Framework & Validation Context in Bangladesh" },
      { page: "Page 03", title: "Five-Domain Score Dashboard & Daily Functional Impact" },
      { page: "Page 04", title: "Symptom Mapping Matrix & Severity Frequency Grid" },
      { page: "Page 05", title: "Profile Interpretation & Life Context Interconnections" },
      { page: "Pages 06-09", title: "In-Depth Clinical Domain Analysis (Anxiety, Stress, Mood, Sleep, Somatic)" },
      { page: "Page 10", title: "Action Roadmap, Professional Triage & Family Support Guidelines" },
      { page: "Page 11", title: "Comparative Future Trajectories & Cognitive Science Models" },
      { page: "Page 12", title: "Verified Crisis Helplines, Video Library & Author Accreditations" },
    ],

    // Page 2: Introduction & Framework
    secFrameworkTitle: "1. Assessment Framework & Bangladesh Context",
    bdContextTitle: "The Mental Health Landscape in Bangladesh",
    bdContextText:
      "According to the National Mental Health Survey of Bangladesh (conducted in collaboration with WHO and NIMH), approximately 18.7% of adult individuals in Bangladesh experience varying degrees of mental health conditions. Alarmingly, more than 92% of affected individuals do not receive timely evidence-based interventions due to lack of accessible screening, cultural stigma, and delayed recognition. MHS-BD was designed specifically to bridge this gap—providing a validated, non-stigmatizing, and scientifically rigorous screening tool calibrated for Bangladeshi sociocultural realities.",
    screeningToolsTitle: "Validated Global Screening Inventories Integrated in MHS-BD",
    screeningToolsText:
      "The MHS-BD assessment synthesizes items from gold-standard, peer-reviewed psychological instruments:",
    toolsList: [
      { name: "PHQ-9 (Patient Health Questionnaire-9)", desc: "Depressive symptoms, anhedonia, and emotional blunting." },
      { name: "GAD-7 (Generalized Anxiety Disorder-7)", desc: "Anticipatory worry, restlessness, and tension." },
      { name: "DASS-21 (Depression, Anxiety & Stress Scale)", desc: "Tripartite symptom categorization and distress differentiation." },
      { name: "PSS-10 (Perceived Stress Scale)", desc: "Subjective perception of unpredictability, overload, and life pressure." },
      { name: "ISI & PSQI (Insomnia Severity Index / Pittsburgh)", desc: "Sleep onset latency, maintenance, and restorative sleep quality." },
      { name: "SSS-8 & PHQ-15 (Somatic Symptom Scales)", desc: "Physical manifestations of emotional distress (headaches, gastrointestinal)." },
      { name: "C-SSRS (Columbia-Suicide Severity Rating Scale)", desc: "Safety screening and risk boundary surveillance." },
    ],
    colorGuideTitle: "Four-Tier Severity Classification Guide",
    colorGuide: [
      { tier: "Minimal (0–25)", label: "Healthy / Optimal Balance", desc: "Within normal emotional variance. Continue self-care.", color: "#16A34A" },
      { tier: "Mild (26–45)", label: "Early Warning Sign", desc: "Slight stress elevation. Early lifestyle adjustments recommended.", color: "#EAB308" },
      { tier: "Moderate (46–70)", label: "Counseling Recommended", desc: "Functional impairment noticeable. Professional guidance advised.", color: "#EA580C" },
      { tier: "Severe (71–100)", label: "High Priority Clinical Care", desc: "Significant distress. Immediate clinical evaluation strongly advised.", color: "#DC2626" },
    ],
    disclaimerTitle: "Confidentiality & Diagnostic Boundary Notice",
    disclaimerText:
      "This document serves as an evidence-based clinical screening and educational report. It does not constitute a formal psychiatric diagnosis (DSM-5/ICD-11). Scores reflect self-reported experiences over the preceding two weeks. For definitive diagnostic evaluations and therapeutic interventions, please consult a licensed clinical psychologist or psychiatrist.",

    // Page 3: 5 Domains
    secDomainScoresTitle: "2. Five-Area Scores & Daily Impact Dashboard",
    domainScoresSubtitle: "Quantitative breakdown across five fundamental pillars of psychological equilibrium",
    colDomain: "Clinical Domain",
    colScore: "Standard Score",
    colSeverity: "Severity Band",
    colDeviation: "Deviation from Healthy Limit",
    colTools: "Underlying Validated Scale",
    proportionalShareTitle: "Proportional Distribution of Mental Distress",
    proportionalShareDesc: "Which specific areas are contributing most heavily to your total psychological burden?",
    dailyImpactTitle: "Daily Life Functional Impact Assessment",
    dailyImpactDesc: "How these psychological symptoms affect everyday performance, professional output, and relationships",
    impactWorkLabel: "Impact on Work, Studies & Cognitive Productivity",
    impactSocialLabel: "Impact on Family, Interpersonal & Social Relationships",

    // Page 4: Symptom Matrix
    secSymptomMatrixTitle: "3. Symptom Mapping & Frequency Matrix",
    symptomMatrixSubtitle: "Detailed mapping of symptom frequency experienced over the preceding 14 days",
    freq0: "0 = Not at all",
    freq1: "1 = Several days",
    freq2: "2 = More than half the days",
    freq3: "3 = Nearly every day",
    frequentSymptomsTitle: "High-Frequency Symptoms Requiring Targeted Attention",
    colSymptomName: "Reported Symptom / Presentation",
    colFrequencyTag: "Recorded Frequency",
    colDomainTag: "Origin Domain",

    // Page 5: Profile Interpretation
    secProfileTitle: "4. Profile Interpretation & Contextual Interconnections",
    combinedPatternsTitle: "Primary Co-Occurring Psychological Dynamics",
    patterns: [
      {
        title: "Anxiety & Mood Dip Intertwined (Uddeg o Mon Kharap)",
        desc: "Persistent anticipatory anxiety depletes serotonin and dopamine reserves, leading to emotional exhaustion and low mood. When anxiety remains unchecked, depressive lethargy frequently develops as a defensive burnout response.",
      },
      {
        title: "Stress & Sleep Deprivation Vicious Cycle (Chap o Ghumer Chokro)",
        desc: "High daytime cortisol delays melatonin secretion, causing prolonged sleep latency. Poor sleep then sensitizes the amygdala, making everyday workplace stressors feel twice as overwhelming the next day.",
      },
      {
        title: "Avoidance & Social Withdrawal (Manush Theke Dure Jawa)",
        desc: "When social interactions require more energy than you currently possess, instinctive isolation provides temporary relief. However, extended withdrawal eliminates vital social buffers and reinforces feelings of loneliness.",
      },
      {
        title: "Late-Night Screen Escape Habit (Rat Jege Screen Dekha)",
        desc: "Revenge bedtime procrastination: seeking personal autonomy through late-night scrolling. Blue light suppresses melatonin, worsening sleep architecture and perpetuating morning exhaustion.",
      },
    ],
    lifeContextTitle: "Life Context & Environmental Modifiers",
    contextItems: [
      { factor: "Workplace & Academic Stress", status: "Elevated", note: "High workload, looming deadlines, and perfectionistic tendencies accelerate cognitive fatigue." },
      { factor: "Family & Living Dynamics", status: "Supportive Baseline", note: "Family provides foundational care, though communicating internal psychological strain remains challenging." },
      { factor: "Digital & Screen Habits", status: "Habitual Strain", note: "Over 4 hours of non-work screen time, particularly in bed, disrupting circadian rhythms." },
      { factor: "Duration of Strain", status: "3 to 6 Months", note: "Subacute phase; timely intervention now will yield rapid and lasting stabilization." },
    ],

    // Pages 6-9: Domain Analysis Deep Dives
    secDomainAnalysisTitle: "5. Detailed Clinical Domain Analysis",
    domains: {
      anxiety: {
        title: "Domain 1: Anxiety & Restlessness (Uddeg)",
        clinicalDesc:
          "Anxiety is the brain's anticipatory threat response. When overactive, the nervous system remains in a perpetual state of 'fight-or-flight', generating relentless 'what-if' scenarios, muscle tension, and shallow breathing.",
        feedback:
          "Your anxiety score (68/100) indicates significant autonomic arousal and excessive anticipatory worry. You may frequently feel tense, agitated, and mentally restless even during quiet periods.",
        keySymptoms: [
          "Persistent fear of making mistakes or facing catastrophic future outcomes",
          "Difficulty staying still; frequent nervous fidgeting and internal unease",
          "Episodic rapid heart rate, throat tightness, or shortness of breath under mild pressure",
        ],
        mechanism:
          "The amygdala misinterprets routine workplace or social deadlines as life-threatening emergencies, flooding the bloodstream with adrenaline and norepinephrine.",
        impact:
          "Impairs clear decision-making, leads to excessive double-checking, and drains emotional availability for loved ones.",
        neglectRisk:
          "Unaddressed chronic anxiety often escalates into spontaneous panic attacks, generalized social phobia, and secondary clinical depression.",
        actionSteps:
          "Adopt Cognitive Behavioral Restructuring to challenge automatic catastrophic predictions; practice physiological regulation through vagal nerve stimulation.",
        exerciseTitle: "Evidence-Based Exercise: Box Breathing & 5-4-3-2-1 Sensory Grounding",
        exerciseSteps: [
          "Sit upright with feet flat on the floor. Inhale for 4 seconds, hold for 4 seconds, exhale slowly for 4 seconds, hold for 4 seconds.",
          "Grounding: Identify 5 things you can see, 4 things you can physically touch, 3 sounds you can hear, 2 scents you can smell, and 1 taste.",
        ],
        referralTrigger:
          "Consult a clinical psychologist immediately if panic symptoms become debilitating or if anticipatory worry prevents attending work.",
      },
      stress: {
        title: "Domain 2: Mental Stress & Burnout (Mansik Chap)",
        clinicalDesc:
          "Burnout occurs when cognitive, emotional, and physical demands continuously outstrip an individual's coping capacity and recovery opportunities, leading to systemic exhaustion.",
        feedback:
          "Your score of 64/100 indicates moderate-to-high chronic stress. You are functioning close to your cognitive capacity ceiling, with early signs of emotional detachment and reduced resilience.",
        keySymptoms: [
          "Feeling that responsibilities are overwhelming and unmanageable",
          "Irritability and quick anger triggered by minor disruptions",
          "Mental fog, slower problem-solving speed, and chronic fatigue",
        ],
        mechanism:
          "Sustained high cortisol impairs the prefrontal cortex's executive control while shrinking dendritic connections in the hippocampus, reducing memory retrieval.",
        impact:
          "Strained interpersonal communication, reduced professional efficiency, and feeling emotionally spent by evening.",
        neglectRisk:
          "Progression to total clinical burnout, physical immune suppression, and severe loss of professional confidence.",
        actionSteps:
          "Implement strict boundary management, schedule non-negotiable micro-breaks every 90 minutes, and delegate low-value commitments.",
        exerciseTitle: "Evidence-Based Exercise: Eisenhower Priority Matrix & Boundary Scripting",
        exerciseSteps: [
          "Classify tasks into Urgent/Important. Limit daily 'High Priority' items to 3 maximum.",
          "Practice saying: 'I want to deliver high quality on this, but my current capacity requires scheduling it for next Tuesday.'",
        ],
        referralTrigger:
          "Seek professional therapy if feeling completely hopeless, emotionally numb, or unable to get out of bed to face the workday.",
      },
      depression: {
        title: "Domain 3: Low Mood & Loss of Interest (Bishonnota)",
        clinicalDesc:
          "Depression is characterized by a persistent feeling of sadness, emotional emptiness, and anhedonia (the inability to experience pleasure from previously rewarding activities).",
        feedback:
          "Your score of 50/100 places you in the mild-to-moderate category. While you continue to meet basic responsibilities, your intrinsic motivation, joy, and emotional vitality are noticeably diminished.",
        keySymptoms: [
          "Loss of excitement for hobbies, sports, or creative pursuits",
          "Lethargy and heavy physical sensations, especially during morning hours",
          "Negative self-talk, self-blame, and feelings of inadequacy",
        ],
        mechanism:
          "Dysregulation of neurochemical pathways (serotonin, dopamine) and overactivity in the default mode network (DMN), reinforcing repetitive rumination.",
        impact:
          "Emotional detachment from family, procrastination on creative endeavors, and a tendency to self-isolate.",
        neglectRisk:
          "Deeper depressive episodes, total behavioral paralysis, and the emergence of passive existential hopelessness.",
        actionSteps:
          "Implement Behavioral Activation (engaging in structured activities before feeling motivated) and challenge cognitive distortions.",
        exerciseTitle: "Evidence-Based Exercise: Daily Behavioral Activation & Mastery/Pleasure Log",
        exerciseSteps: [
          "Schedule 2 small rewarding activities daily (e.g., 15-minute nature walk, listening to favorite acoustic music).",
          "Rate each activity from 0-10 on 'Sense of Mastery' and 'Sense of Pleasure'. Action precedes motivation.",
        ],
        referralTrigger:
          "Seek immediate emergency professional psychiatric evaluation if you experience persistent passive or active thoughts of self-harm.",
      },
      sleep: {
        title: "Domain 4: Sleep Quality & Insomnia (Ghumer Somoshya)",
        clinicalDesc:
          "Sleep is the biological foundation of neural repair and emotional equilibrium. Disrupted sleep impairs emotional regulation, memory consolidation, and metabolic balance.",
        feedback:
          "Your score of 56/100 indicates moderate insomnia and disrupted sleep architecture. Difficulty falling asleep and waking up feeling groggy are directly undermining your daytime coping reserves.",
        keySymptoms: [
          "Taking longer than 45–60 minutes to fall asleep due to racing thoughts",
          "Frequent night-time awakenings with difficulty falling back asleep",
          "Daytime grogginess, brain fog, and reliance on caffeine to function",
        ],
        mechanism:
          "Elevated sympathetic nervous tone suppresses natural adenosine buildup and delays pineal melatonin release.",
        impact:
          "Diminished impulse control, heightened irritability, and reduced emotional distress tolerance throughout the day.",
        neglectRisk:
          "Chronic sleep deprivation severely increases the incidence of cardiovascular strain, anxiety disorders, and metabolic dysfunction.",
        actionSteps:
          "Implement non-negotiable Stimulus Control Therapy (bed is strictly for sleep), circadian sunlight anchoring, and evening digital wind-downs.",
        exerciseTitle: "Evidence-Based Protocol: Stimulus Control & 4-7-8 Parasympathetic Wind-down",
        exerciseSteps: [
          "If not asleep within 25 minutes, get out of bed. Go to a dim room and read a physical book until sleepy. Never stay in bed tossing.",
          "Wind-down: Turn off screens 60 minutes before bed. Practice 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s) for 4 cycles in bed.",
        ],
        referralTrigger:
          "Consult a sleep specialist or psychiatrist if severe insomnia persists beyond 4 weeks despite practicing proper sleep hygiene.",
      },
      somatic: {
        title: "Domain 5: Somatic Symptoms & Physical Distress (Sharirik Upasorgo)",
        clinicalDesc:
          "Somatic symptoms occur when psychological stress and unexpressed emotional tension manifest through involuntary physical sensations via the brain-gut and neuromuscular axes.",
        feedback:
          "Your score of 28/100 falls into the healthy/minimal range. Your physical body is currently demonstrating resilience, with only occasional stress-induced headaches or mild gastrointestinal sensitivity.",
        keySymptoms: [
          "Mild tension in neck, shoulders, or jaw during high-stress working hours",
          "Occasional stress-related indigestion or stomach acidity",
          "Absence of chronic, debilitating physical pain syndromes",
        ],
        mechanism:
          "The autonomic nervous system tightens skeletal muscle groups and alters gut motility in response to psychological threat cues.",
        impact:
          "Minor physical discomfort during peak deadlines, but not currently causing functional disability.",
        neglectRisk:
          "If psychological stress escalates unchecked, somatic manifestations can worsen into tension migraines, IBS, or fibromyalgia.",
        actionSteps:
          "Maintain daily hydration, introduce gentle postural stretches at your desk, and practice body scan mindfulness.",
        exerciseTitle: "Evidence-Based Exercise: Progressive Muscle Relaxation (PMR)",
        exerciseSteps: [
          "Tense muscle groups (feet, calves, abdomen, shoulders, face) sequentially for 5 seconds, then deliberately release for 15 seconds.",
          "Notice the sensation of warmth and vascular release flooding the muscles. Repeat from toes to scalp.",
        ],
        referralTrigger:
          "Always undergo a standard medical examination to rule out underlying physiological causes if any new physical symptoms develop.",
      },
    },

    // Page 10: Strengths & Roadmap
    secStrengthsRoadmapTitle: "6 & 7. Strengths, Strategic Roadmap & Family Role",
    protectiveFactorsTitle: "Identified Psychological Protective Factors",
    actionPlanTitle: "Step-by-Step Structured Action Plan",
    planStages: [
      { stage: "Today (Day 1)", focus: "Awareness & Stabilization", action: "Review this report, normalize emotional experience, commit to 10:30 PM digital device curfew." },
      { stage: "Days 2–7 (Week 1)", focus: "Nervous System Regulation", action: "Practice 4-7-8 breathing twice daily, initiate morning sunlight exposure (15 mins), establish sleep hygiene." },
      { stage: "Weeks 2–4", focus: "Cognitive Restructuring", action: "Begin 4–6 sessions of professional counseling, challenge catastrophizing thoughts, enforce workday micro-breaks." },
      { stage: "Month 2 (Weeks 5–8)", focus: "Relapse Prevention & Habit Consolidation", action: "Evaluate progress, re-administer MHS-BD screening, calibrate work-life balance boundaries." },
      { stage: "Month 3+", focus: "Long-Term Flourishing", action: "Maintain routine physical exercise, sustain positive social connections, celebrate psychological growth." },
    ],
    triageTitle: "Professional Suitability & Referral Matrix",
    triageDesc: "Understanding which mental health professional best matches your current screening profile",
    triageList: [
      { role: "Psychological Counselor / Psychotherapist", fit: "Highest Match (Recommended)", focus: "Cognitive Behavioral Therapy (CBT), stress management, anxiety reduction, sleep protocols, and lifestyle restructuring." },
      { role: "Consultant Psychiatrist (Medical Doctor)", fit: "Conditional / Referral", focus: "Required if symptoms escalate to severe impairment, persistent panic attacks, or if pharmacological evaluation is indicated." },
      { role: "General Physician / Medical Specialist", fit: "Rule-out Baseline", focus: "Routine blood tests (Thyroid TSH, Vitamin D, B12, CBC) to confirm no physical causes mimic fatigue or palpitations." },
    ],
    familyRoleTitle: "Family & Loved Ones' Role: Constructive Support",
    familyDoTitle: "What Family Members SHOULD Do",
    familyDoList: [
      "Listen patiently without immediately offering unsolicited advice or criticism.",
      "Acknowledge that psychological distress is a genuine biological reality, not a lack of willpower.",
      "Encourage professional counseling support and accompany them to appointments if requested.",
      "Help create a peaceful evening home environment conducive to healthy sleep.",
    ],
    familyDontTitle: "What Family Members Should NEVER Say",
    familyDontList: [
      "❌ 'Stop overthinking; you just have too much free time.' (অতিরিক্ত ভাবা বন্ধ করো)",
      "❌ 'Others have it so much worse than you; why are you sad?' (অন্যদের কষ্ট তোমার চেয়ে অনেক বেশি)",
      "❌ 'Just cheer up and be strong; it’s all in your head.' (একটু শক্ত হও, মন ভালো রাখো)",
      "❌ 'Mental health is just a Western trend.' (এসব মানসিক রোগ কোনো আসল রোগ না)",
    ],

    // Page 11: Forward Paths & Science
    secForwardPathsTitle: "9 & 10. Forward Paths & The Science of Mind",
    pathsTitle: "Comparative Future Trajectories Over the Next 6 Months",
    pathA: {
      title: "Path A: The Cost of Inaction (যদি কোনো পদক্ষেপ না নেওয়া হয়)",
      desc: "Allowing elevated anxiety and chronic stress to persist without intervention",
      outcomes: [
        "Escalation of anxiety into frequent panic episodes or chronic generalized anxiety",
        "Worsening insomnia leading to chronic daytime fatigue and cognitive deceleration",
        "Increased risk of clinical depressive episodes and emotional detachment from work and family",
        "Higher likelihood of stress manifesting as physical illness (gastric ulcers, hypertension, migraines)",
      ],
    },
    pathB: {
      title: "Path B: Following the Structured Plan (পরিকল্পনা অনুযায়ী অগ্রসর হলে)",
      desc: "Engaging in professional counseling, CBT exercises, and lifestyle boundary adjustments",
      outcomes: [
        "Restoration of restful sleep patterns and noticeable increase in daily mental clarity",
        "Mastery over anxiety triggers using proven cognitive restructuring and breathwork techniques",
        "Renewed enthusiasm, emotional resilience, and improved interpersonal relationships",
        "Long-term self-regulation skills that protect against future burnout episodes",
      ],
    },
    scienceTitle: "Understanding the Mind: Accessible Psychological Science",
    stressBucketTitle: "The Stress Vulnerability Model (The 'Stress Bucket' - চাপের বালতি)",
    stressBucketText:
      "Imagine your psychological capacity as a bucket. Stressful life events, work pressures, and daily worries act as water pouring in. If your coping valves (sleep, exercise, therapy, social support) are closed or clogged, the bucket will inevitably overflow—resulting in burnout, anxiety, or breakdown. Opening healthy release valves keeps the water level safe regardless of the inflow.",
    cbtCycleTitle: "The Cognitive Behavioral Therapy (CBT) Interconnection Cycle",
    cbtCycleText:
      "Our thoughts, physical sensations, emotions, and behaviors constantly influence one another in a circular loop. Changing just one element (such as reframing a catastrophic thought or practicing deep breathing) interrupts the negative loop and restores balance.",

    // Page 12: Help, Helplines & Resources
    secHelpTitle: "11 & 12. Support Directories, Curated Video Library & Reassessment",
    crisisHotlineTitle: "Emergency 24/7 Mental Health Hotlines in Bangladesh",
    hotlineList: [
      { name: "National Emergency Helpline", number: "999", desc: "Toll-free emergency assistance for acute crisis and medical emergencies." },
      { name: "Kaan Pete Roi (কান পেতে রই)", number: "09612-119911 / 01779-554391", desc: "First emotional support and suicide prevention helpline in Bangladesh." },
      { name: "National Institute of Mental Health (NIMH)", number: "+880-2-9118171", desc: "Government psychiatric hospital and specialized outpatient services (Sher-e-Bangla Nagar, Dhaka)." },
      { name: "Government Women & Children Helpline", number: "109 / 1098", desc: "Toll-free national legal and emotional support services." },
    ],
    professionalServicesTitle: "Verified Psychological Care Platforms",
    serviceList: [
      { name: "Why Not You - Psychological Services", contact: "whynotyoupsy.com | info@whynotyoupsy.com", desc: "Specialized clinical psychology, psychometric diagnostics, and evidence-based CBT interventions." },
      { name: "Moner Bondhu (মনের বন্ধু)", contact: "monerbondhu.com | 01776-632344", desc: "Professional counseling and corporate mental health wellness programs." },
    ],
    videoLibraryTitle: "Curated Video Library by Renowned Bangladeshi Experts",
    videoList: [
      { title: "Understanding and Overcoming Anxiety & Panic Attacks", presenter: "Dr. Mekhla Sarkar", role: "Associate Professor of Psychiatry, NIMH", topic: "Cognitive reframing, biological mechanisms of anxiety, and self-soothing techniques." },
      { title: "The Sleep & Stress Connection: Restoring Your Circadian Rhythm", presenter: "Dr. Mahin Rahman", role: "Clinical Psychologist & Mental Health Researcher", topic: "Sleep hygiene protocols, stimulus control therapy, and managing late-night screen habits." },
      { title: "Depression is Treatable: Breaking the Silence and Seeking Help", presenter: "Prof. Dr. Md. Golam Rabbani", role: "Former Director, NIMH & Renowned Psychiatrist", topic: "De-stigmatizing depressive disorders, medical vs therapeutic treatments, and family support." },
    ],
    recommendedReadingTitle: "Recommended Reading & Self-Help Books",
    readingList: [
      "Feeling Good: The New Mood Therapy — Dr. David D. Burns (Classic guide to Cognitive Behavioral Therapy)",
      "Why We Sleep: Unlocking the Power of Sleep and Dreams — Dr. Matthew Walker (Comprehensive science of sleep)",
      "The Stress Solution: 4 Steps to Reset Your Body, Mind, Relationships & Purpose — Dr. Rangan Chatterjee",
    ],
    reassessmentScheduleTitle: "Report Tracking & Recommended Re-Evaluation Schedule",
    reassessmentScheduleText:
      "Mental health is dynamic. We recommend re-administering the MHS-BD screening after 6 to 8 weeks of consistent therapeutic intervention and lifestyle adjustments to objectively measure progress and recalibrate coping strategies.",
    authorTitle: "Lead Psychometrician & Clinical Report Authorship",
    authorName: "Kazi Fardous Iqbal",
    authorCreds: "Consultant Psychometrician & Behavioral Researcher | Why Not You Psychological Services",
    copyright: "© 2026 Why Not You - Psychological Services. All rights reserved. MHS-BD Framework.",
  },
  bn: {
    brandName: "হোয়াই নট ইউ - সাইকোলজিক্যাল সার্ভিসেস",
    brandTagline: "প্রমাণ-ভিত্তিক সাইকোমেট্রিক স্ক্রিনিং ও ক্লিনিক্যাল মানসিক স্বাস্থ্য মূল্যায়ন",
    confidentialBadge: "গোপনীয় ক্লিনিক্যাল রিপোর্ট (CONFIDENTIAL)",
    mainTitle: "মানসিক স্বাস্থ্য স্ক্যানার – বাংলাদেশ (MHS-BD)",
    subtitle: "ব্যক্তিগত মানসিক স্বাস্থ্য রিপোর্ট ও বাস্তবমুখী পদক্ষেপের নির্দেশিকা",
    edition: "স্ট্যান্ডার্ড সংস্করণ ২.৪ – ভ্যালিডেটেড ক্লিনিক্যাল ফ্রেমওয়ার্ক",

    // Toolbar
    printPdf: "প্রিন্ট / পিডিএফ ডাউনলোড",
    langBn: "বাংলা",
    langEn: "English",

    // Metadata labels
    lblReportNo: "রিপোর্ট নম্বর",
    lblName: "অংশগ্রহণকারীর নাম",
    lblAgeGender: "বয়স / লিঙ্গ",
    lblOccupation: "পেশা",
    lblDate: "মূল্যায়নের তারিখ",
    lblRef: "রেফারেন্স / উৎস",
    lblScale: "মূল্যায়ন পদ্ধতি",

    // Page 1: At a glance
    secAtAGlance: "এক নজরে আপনার ফলাফল ও বিশ্লেষণ",
    mentalHealthIndex: "সামগ্রিক মানসিক স্বাস্থ্য সূচক (Mental Health Index)",
    indexScoreUnit: "১০০ এর মধ্যে",
    indexLevels: {
      minimal: "ভারসাম্যপূর্ণ ও সুস্থ (০-২৫)",
      mild: "মৃদু চাপ বা সতর্কবার্তা (২৬-৪৫)",
      moderate: "চাপের মধ্যে (মাঝারি চাপ) (৪৬-৭০)",
      severe: "তীব্র ক্লিনিক্যাল চাপ (৭১-১০০)",
    },
    indexInterpretationTitle: "সামগ্রিক অবস্থা ও পেশাদার পরামর্শ",
    summaryConcernsTitle: "মূল সমস্যা বা উদ্বেগের দিকগুলো",
    summaryStrengthsTitle: "আপনার মানসিক শক্তি ও ইতিবাচক দিকগুলো",
    tocTitle: "এই রিপোর্টে যা যা রয়েছে (সূচিপত্র)",
    tocItems: [
      { page: "পৃষ্ঠা ০২", title: "১. এই মূল্যায়ন সম্পর্কে ও বাংলাদেশের প্রেক্ষাপট" },
      { page: "পৃষ্ঠা ০৩", title: "২. পাঁচটি ক্ষেত্রে আপনার স্কোর ও দৈনন্দিন জীবনে প্রভাব" },
      { page: "পৃষ্ঠা ০৪", title: "৩. আপনার মুখ্য লক্ষণগুলোর মানচিত্র ও পুনরাবৃত্তি" },
      { page: "পৃষ্ঠা ০৫", title: "৪. আপনার ফলাফলের ধরন ও বাস্তব জীবনের প্রেক্ষাপট" },
      { page: "পৃষ্ঠা ০৬-০৯", title: "৫. প্রতিটি ক্ষেত্রের বিস্তারিত বিশ্লেষণ (উদ্বেগ, চাপ, বিষণ্ণতা, ঘুম, শারীরিক উপসর্গ)" },
      { page: "পৃষ্ঠা ১০", title: "৬ ও ৭. শক্তি, ধাপে ধাপে পরিকল্পনা ও পরিবারের ভূমিকা" },
      { page: "পৃষ্ঠা ১১", title: "৯ ও ১০. দুটি ভিন্ন পথ ও মনকে বুঝুন (বিজ্ঞানসম্মত মডেল)" },
      { page: "পৃষ্ঠা ১২", title: "১১ ও ১২. জরুরি হটলাইন, ভিডিও রিসোর্স ও মূল্যায়ন সূচি" },
    ],

    // Page 2: Introduction & Framework
    secFrameworkTitle: "১. এই মূল্যায়ন সম্পর্কে ও পদ্ধতিগত কাঠামো",
    bdContextTitle: "বাংলাদেশে মানসিক স্বাস্থ্যের বর্তমান প্রেক্ষাপট",
    bdContextText:
      "বিশ্ব স্বাস্থ্য সংস্থা (WHO) ও জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট (NIMH)-এর সর্বশেষ জাতীয় জরিপ অনুযায়ী, বাংলাদেশে প্রাপ্তবয়স্কদের প্রায় ১৮.৭% কোনো না কোনো মানসিক স্বাস্থ্য সমস্যায় ভুগে থাকেন। উদ্বেগের বিষয় হলো, এদের মধ্যে ৯২ শতাংশেরও বেশি মানুষ অজ্ঞতা, সামাজিক সংকোচ বা কুসংস্কারের কারণে সময়মতো কোনো সঠিক বৈজ্ঞানিক পরামর্শ বা থেরাপিউটিক সেবা গ্রহণ করেন না। MHS-BD ফ্রেমওয়ার্কটি তৈরি করা হয়েছে যাতে কোনো সামাজিক ভীতি ছাড়াই যেকোনো ব্যক্তি সহজে নিজের মানসিক অবস্থা বৈজ্ঞানিকভাবে পর্যবেক্ষণ করতে পারেন এবং কার্যকর পদক্ষেপ নিতে পারেন।",
    screeningToolsTitle: "আন্তর্জাতিকভাবে স্বীকৃত যেসব ক্লিনিক্যাল স্কেল ব্যবহৃত হয়েছে",
    screeningToolsText:
      "MHS-BD রিপোর্টে তথ্য বিশ্লেষণের জন্য মনোবিজ্ঞান জগতের শীর্ষস্থানীয় ভ্যালিডেটেড স্কেলগুলো সমন্বয় করা হয়েছে:",
    toolsList: [
      { name: "PHQ-9 (পেশেন্ট হেলথ কোয়েশ্চনেয়ার-৯)", desc: "বিষণ্ণতার মাত্রা, ভালো লাগা কমে যাওয়া ও মানসিক ক্লান্তি পরিমাপ।" },
      { name: "GAD-7 (জেনারেলাইজড অ্যানজাইটি ডিজঅর্ডার-৭)", desc: "অতিরিক্ত দুশ্চিন্তা, অস্থিরতা ও উদ্বেগের তীব্রতা পরিমাপ।" },
      { name: "DASS-21 (ডিপ্রেশন অ্যানজাইটি স্ট্রেস স্কেল)", desc: "বিষণ্ণতা, উদ্বেগ ও মানসিক চাপের মধ্যকার তুলনামূলক বিভাজন।" },
      { name: "PSS-10 (পারসিভড স্ট্রেস স্কেল)", desc: "দৈনন্দিন পরিস্থিতির উপর নিয়ন্ত্রণহীনতা ও অতিরিক্ত কাজের চাপ।" },
      { name: "ISI ও PSQI (ঘুম ও অনিদ্রা বিষয়ক স্কেল)", desc: "ঘুম সহজে না আসা, মাঝরাতে ঘুম ভেঙে যাওয়া ও আরামদায়ক ঘুমের অভাব।" },
      { name: "SSS-8 ও PHQ-15 (শারীরিক উপসর্গের স্কেল)", desc: "মানসিক চাপের কারণে শারীরিক লক্ষণ (মাথাব্যথা, পেটের সমস্যা ইত্যাদি)।" },
      { name: "C-SSRS (কলম্বিয়া সুইসাইড সিভিয়ারিটি রেটিং স্কেল)", desc: "মানসিক নিরাপত্তা ও সম্ভাব্য ঝুঁকির পূর্বসতর্কতা।" },
    ],
    colorGuideTitle: "ফলাফলের রঙের নির্দেশিকা ও অর্থ",
    colorGuide: [
      { tier: "ন্যূনতম (০–২৫)", label: "সুস্থ ও স্বাভাবিক সীমায়", desc: "মানসিক অবস্থা সন্তোষজনক। বর্তমান ইতিবাচক অভ্যাসগুলো বজায় রাখুন।", color: "#16A34A" },
      { tier: "মৃদু (২৬–৪৫)", label: "প্রথম সতর্ক সংকেত", desc: "হালকা চাপ বা ক্লান্তি দেখা দিচ্ছে। জীবনযাত্রায় কিছুটা পরিবর্তন দরকার।", color: "#EAB308" },
      { tier: "মাঝারি (৪৬–৭০)", label: "কাউন্সেলিং নেওয়ার পরামর্শ", desc: "দৈনন্দিন জীবনে প্রভাব ফেলছে। একজন পেশাদার কাউন্সেলরের সাহায্য নেওয়া উচিত।", color: "#EA580C" },
      { tier: "তীব্র (৭১–১০০)", label: "জরুরি বিশেষজ্ঞ পরামর্শ প্রয়োজন", desc: "উচ্চমাত্রার মানসিক কষ্ট। অবিলম্বে অভিজ্ঞ ক্লিনিক্যাল সাইকোলজিস্টের সাথে যোগাযোগ করুন।", color: "#DC2626" },
    ],
    disclaimerTitle: "গোপনীয়তা ও নন-ডায়াগনস্টিক সতর্কতা",
    disclaimerText:
      "এই মূল্যায়নটি কোনো চূড়ান্ত ক্লিনিক্যাল বা মেডিকেল রোগ নির্ণয় (Medical Diagnosis) নয়; এটি একটি প্রমাণ-ভিত্তিক সাইকোমেট্রিক স্ক্রিনিং রিপোর্ট। এটি আপনার গত দুই সপ্তাহের অনুভূতির ওপর ভিত্তি করে তৈরি। চূড়ান্ত রোগ নির্ণয় ও চিকিৎসার জন্য সর্বদা সনদপ্রাপ্ত ক্লিনিক্যাল সাইকোলজিস্ট অথবা সাইকিয়াট্রিস্টের সরাসরি পরামর্শ নিন।",

    // Page 3: 5 Domains
    secDomainScoresTitle: "২. পাঁচটি ক্ষেত্রে আপনার স্কোর ও প্রভাব",
    domainScoresSubtitle: "মানসিক সুস্থতার পাঁচটি প্রধান স্তম্ভে আপনার প্রাপ্ত স্কোর ও তীব্রতার বিশ্লেষণ",
    colDomain: "মূল্যায়ন ক্ষেত্র",
    colScore: "প্রাপ্ত স্কোর",
    colSeverity: "তীব্রতার মাত্রা",
    colDeviation: "সুস্থ সীমার চেয়ে বেশি",
    colTools: "ব্যবহৃত ভ্যালিডেটেড স্কেল",
    proportionalShareTitle: "আপনার মানসিক কষ্ট কোন ক্ষেত্র থেকে বেশি আসছে?",
    proportionalShareDesc: "আপনার সামগ্রিক মানসিক চাপের আনুপাতিক বিস্তার বিশ্লেষণ (Proportional Distribution)",
    dailyImpactTitle: "দৈনন্দিন জীবনে এই সমস্যাগুলোর প্রভাব",
    dailyImpactDesc: "আপনার কাজ, পড়াশোনা এবং পারিবারিক ও সামাজিক সম্পর্কের ওপর মানসিক অবস্থার প্রভাব",
    impactWorkLabel: "কাজের পরিবেশ, পড়াশোনা ও উৎপাদনশীলতায় প্রভাব",
    impactSocialLabel: "পারিবারিক, ব্যক্তিগত সম্পর্ক ও সামাজিক মেলামেশায় প্রভাব",

    // Page 4: Symptom Matrix
    secSymptomMatrixTitle: "৩. আপনার মুখ্য লক্ষণগুলোর মানচিত্র ও পুনরাবৃত্তি",
    symptomMatrixSubtitle: "গত দুই সপ্তাহে কোন লক্ষণগুলো কতো ঘন ঘন অনুভূত হয়েছে তার পূর্ণাঙ্গ ম্যাট্রিক্স",
    freq0: "০ = একদমই না",
    freq1: "১ = কয়েকদিন",
    freq2: "২ = অর্ধেকের বেশি দিন",
    freq3: "৩ = প্রায় প্রতিদিনই",
    frequentSymptomsTitle: "ঘন ঘন দেখা দেওয়া লক্ষণসমূহ (বিশেষ নজর দেওয়া দরকার)",
    colSymptomName: "অনুভূত উপসর্গের বিবরণ",
    colFrequencyTag: "পুনরাবৃত্তির মাত্রা",
    colDomainTag: "সম্পর্কিত ক্ষেত্র",

    // Page 5: Profile Interpretation
    secProfileTitle: "৪. আপনার ফলাফলের ধরন ও বাস্তব জীবনের প্রেক্ষাপট",
    combinedPatternsTitle: "একাধিক লক্ষণের সমন্বিত মানসিক প্যাটার্ন",
    patterns: [
      {
        title: "উদ্বেগ ও মন খারাপ একসাথে (Anxiety & Low Mood)",
        desc: "ভবিষ্যতের দুশ্চিন্তা ও মানসিক অস্থিরতা যখন দীর্ঘদিন স্থায়ী হয়, তখন মস্তিষ্কের শক্তি নিঃশেষ হয়ে বিষণ্ণতা ও উদ্যমহীনতা তৈরি হয়। এটি একটি অতি পরিচিত প্যাটার্ন।",
      },
      {
        title: "চাপ আর ঘুমের দুষ্টচক্র (Stress-Sleep Vicious Loop)",
        desc: "কাজের চাপ বা মানসিক অস্থিরতার কারণে রাতে কর্টিসল হরমোন বেড়ে যায় ও মেলাটোনিন বাধাগ্রস্ত হয়। ফলে ঘুম ভালো হয় না, আর ঘুম অপূর্ণ থাকলে পরদিন ছোট সমস্যাও দ্বিগুণ কঠিন মনে হয়।",
      },
      {
        title: "মানুষের কাছ থেকে দূরে সরে যাওয়া (Social Withdrawal)",
        desc: "মানসিকভাবে ক্লান্ত থাকলে বন্ধুদের আড্ডা বা পরিবারে কথা বলতে বাড়তি পরিশ্রম মনে হয়। তাই নিজেকে গুটিয়ে নিলে সাময়িক আরাম লাগলেও দীর্ঘমেয়াদে তা একাকীত্ব বাড়িয়ে দেয়।",
      },
      {
        title: "রাত জেগে স্ক্রিন ব্যবহারের অভ্যাস (Late-Night Screen Escape)",
        desc: "সারা দিনের ব্যস্ততার পর নিজের জন্য একটু সময় পাওয়ার আশায় রাতে মোবাইল ঘাটার অভ্যাস (Revenge Bedtime Procrastination)। কিন্তু স্ক্রিনের নীল আলো ঘুমকে আরও দূরে ঠেলে দেয়।",
      },
    ],
    lifeContextTitle: "বাস্তব জীবনের প্রেক্ষাপট ও পরিবেশগত চাপ",
    contextItems: [
      { factor: "কর্মক্ষেত্র ও পড়াশোনার চাপ", status: "উচ্চ চাপ বিদ্যমান", note: "কাজের অতিরিক্ত বোঝা ও নিখুঁত করার প্রবণতার কারণে মানসিক ক্লান্তি দ্রুত বাড়ছে।" },
      { factor: "পারিবারিক ও ব্যক্তিগত পরিবেশ", status: "সহায়ক পরিবেশ", note: "পরিবারে নিরাপত্তা ও ভালোবাসা রয়েছে, তবে মনের ভেতরের জটিল চাপ খুলে বলতে দ্বিধা কাজ করে।" },
      { factor: "ডিজিটাল ও মোবাইল ব্যবহারের অভ্যাস", status: "ঘুমের বিঘ্নকারী", note: "ঘুমানোর পূর্বে বিছানায় অতিরিক্ত মোবাইল ব্যবহারের ফলে মস্তিষ্কের রেস্ট মেকানিজম বাধাগ্রস্ত হচ্ছে।" },
      { factor: "সমস্যার আনুমানিক মেয়াদকাল", status: "৩ থেকে ৬ মাস", note: "সমস্যাটি এখনও প্রাথমিক-মাঝারি পর্যায়ে রয়েছে, এখনই সঠিক পদক্ষেপ নিলে দ্রুত নিরাময় সম্ভব।" },
    ],

    // Pages 6-9: Domain Analysis Deep Dives
    secDomainAnalysisTitle: "৫. প্রতিটি ক্ষেত্রের বিস্তারিত বিশ্লেষণ ও নির্দেশিকা",
    domains: {
      anxiety: {
        title: "ক্ষেত্র ১: উদ্বেগ ও অস্থিরতা (Uddeg / Anxiety)",
        clinicalDesc:
          "উদ্বেগ হলো ভবিষ্যতের অনিশ্চয়তা নিয়ে আমাদের মস্তিষ্কের অতিরিক্ত সতর্ক প্রতিক্রিয়া। যখন এটি অনিয়ন্ত্রিত হয়ে পড়ে, তখন স্নায়ুতন্ত্র সার্বক্ষণিক 'ফাইট-অর-ফ্লাইট' মোডে থাকে।",
        feedback:
          "আপনার উদ্বেগ স্কোর (৬৮/১০০) নির্দেশ করে যে আপনি প্রায়শই ভবিষ্যৎ নিয়ে তীব্র অনিশ্চয়তা ও মানসিক অস্থিরতায় ভোগেন। বিশ্রামের সময়েও আপনার মন সহজে শান্ত হতে পারে না।",
        keySymptoms: [
          "সবসময় কোনো খারাপ কিছু ঘটার অমূলক ভয় বা অতিরিক্ত দুশ্চিন্তা",
          "এক জায়গায় স্থির হয়ে বসতে না পারা, ভেতর থেকে তীব্র অস্থিরতা লাগা",
          "চাপের সময় বুক ধড়ফড় করা, দ্রুত শ্বাস চলা বা গলা শুকিয়ে আসা",
        ],
        mechanism:
          "মস্তিষ্কের অ্যালার্ম সেন্টার (Amygdala) সাধারণ পরিস্থিতিকেও বড় বিপদ হিসেবে দেখে কর্টিসল ও অ্যাড্রেনালিন হরমোন নিঃসরণ বাড়িয়ে দেয়।",
        impact:
          "সঠিক সময়ে সিদ্ধান্ত নেওয়ার আত্মবিশ্বাস কমে যায়, কাজের গতি মন্থর হয় এবং কাছের মানুষদের সাথে সহজে স্বাভাবিক থাকা যায় না।",
        neglectRisk:
          "দীর্ঘদিন অবহেলা করলে এটি প্যানিক অ্যাটাক (Panic Attack), সোশ্যাল ফোবিয়া ও দীর্ঘস্থায়ী গ্যাস্ট্রিক-মাইগ্রেনের কারণ হয়ে দাঁড়ায়।",
        actionSteps:
          "কগনিটিভ রিস্ট্রাকচারিংয়ের মাধ্যমে অমূলক দুশ্চিন্তাগুলোকে চ্যালেঞ্জ করুন; ডায়াফ্র্যাগমেটিক ব্রিদিংয়ের মাধ্যমে স্নায়ুতন্ত্রকে শান্ত করার অভ্যাস করুন।",
        exerciseTitle: "বিজ্ঞানসম্মত কার্যকর ব্যায়াম: ৪-৭-৮ ব্রিদিং ও গ্রাউন্ডিং টেকনিক (5-4-3-2-1)",
        exerciseSteps: [
          "সোজা হয়ে বসুন। ৪ সেকেন্ড ধরে নাক দিয়ে শ্বাস নিন, ৭ সেকেন্ড ধরে রাখুন, এবং মুখ দিয়ে ৮ সেকেন্ডে ধীরে ধীরে শ্বাস ছাড়ুন।",
          "গ্রাউন্ডিং: আপনার চারপাশে ৫টি দেখার মতো জিনিস, ৪টি স্পর্শের অনুভূতি, ৩টি শোনার শব্দ, ২টি গন্ধ এবং ১টি স্বাদের দিকে মনোযোগ দিন।",
        ],
        referralTrigger:
          "যদি হঠাৎ দম বন্ধ হয়ে আসা, তীব্র বুক ধড়ফড় করা বা ঘর থেকে বের হতে ভয় পাওয়ার মতো অবস্থা তৈরি হয়, তবে অবিলম্বে সাইকোলজিস্টের শরণাপন্ন হন।",
      },
      stress: {
        title: "ক্ষেত্র ২: মানসিক চাপ ও ক্লান্তি (Mansik Chap / Stress)",
        clinicalDesc:
          "মানসিক চাপ বা স্ট্রেস হলো এমন এক অবস্থা যখন জীবনের দায়িত্ব ও প্রত্যাশা ব্যক্তির সামলানোর ক্ষমতার চেয়ে অনেক বেশি মনে হয়।",
        feedback:
          "আপনার স্কোর (৬৪/১০০) মাঝারি থেকে উচ্চ মানসিক চাপের সংকেত দিচ্ছে। আপনি নিজের সহনশীলতার সর্বোচ্চ সীমায় কাজ করছেন, যা শরীর ও মনকে দ্রুত অবসাদগ্রস্ত করে তুলছে।",
        keySymptoms: [
          "মনে হওয়া যে দায়িত্বগুলো এতো বেশি যে কোনোভাবেই ঠিকমতো শেষ করা সম্ভব নয়",
          "ছোটখাটো বিষয়ে দ্রুত অধৈর্য হয়ে ওঠা ও মেজাজ খিটখিটে হওয়া",
          "কাজের প্রতি আগের মতো উৎসাহ না পাওয়া এবং সবসময় অবসাদগ্রস্ত লাগা",
        ],
        mechanism:
          "দীর্ঘমেয়াদী কর্টিসল হরমোন মস্তিষ্কের প্রিফ্রন্টাল কর্টেক্সের কার্যক্ষমতা দুর্বল করে, যার ফলে স্মৃতিশক্তি ও যুক্তি দিয়ে চিন্তা করার ক্ষমতা কমে যায়।",
        impact:
          "সহকর্মী ও পরিবারের সাথে ভুল বোঝাবুঝি বৃদ্ধি পায়, কাজে ভুলের পরিমাণ বাড়ে এবং দিনশেষে প্রচণ্ড ক্লান্তি অনুভূত হয়।",
        neglectRisk:
          "চিকিৎসা না করালে পূর্ণাঙ্গ বার্নআউট (Burnout), রোগ প্রতিরোধ ক্ষমতা হ্রাস এবং দীর্ঘমেয়াদী শারীরিক অসুস্থতা তৈরি হতে পারে।",
        actionSteps:
          "প্রতি ৯০ মিনিট কাজের পর ৫ মিনিটের বিরতি নিন, কাজের সীমারেখা (Boundary) নির্ধারণ করতে শিখুন এবং অপ্রয়োজনীয় দায়িত্ব অন্যদের মাঝে ভাগ করুন।",
        exerciseTitle: "কার্যকর অনুশীলন: আইজেনহাওয়ার ম্যাট্রিক্স ও সুস্থ বাউন্ডারি নির্ধারণ",
        exerciseSteps: [
          "কাজগুলোকে 'জরুরি' ও 'গুরুত্বপূর্ণ' তালিকায় ভাগ করুন। প্রতিদিন সর্বোচ্চ ৩টি মূল কাজে পূর্ণ মনোযোগ দিন।",
          "না বলার চর্চা করুন: 'আমি কাজটি নিখুঁতভাবে করতে চাই, কিন্তু এই মুহূর্তে আমার সময় সংকুলান না হওয়ায় আমি এটি আগামী সপ্তাহে দেখতে পারবো।'",
        ],
        referralTrigger:
          "যদি কাজ করার শক্তি পুরোপুরি হারিয়ে যায় এবং জীবনের প্রতিটি দিন অসহ্য মনে হতে থাকে, তবে কাউন্সেলিং থেরাপির সহায়তা নিন।",
      },
      depression: {
        title: "ক্ষেত্র ৩: বিষণ্ণতা ও আগ্রহহীনতা (Bishonnota / Low Mood)",
        clinicalDesc:
          "বিষণ্ণতা কেবল মন খারাপ নয়; এটি মস্তিষ্কের এমন এক অবস্থা যেখানে আনন্দ পাওয়ার অনুভূতি এবং জীবনের প্রতি স্বাভাবিক উদ্যম হারিয়ে যায়।",
        feedback:
          "আপনার স্কোর ৫০/১০০, যা মৃদু থেকে মাঝারি বিষণ্ণতার লক্ষণ প্রকাশ করে। আপনি দৈনন্দিন দায়িত্ব পালন করলেও মনের ভেতর এক ধরণের শুন্যতা ও ক্লান্তি বিরাজ করছে।",
        keySymptoms: [
          "আগে যেসব কাজে আনন্দ পেতেন, সেগুলোতে কোনো আগ্রহ বা উদ্দীপনা না পাওয়া",
          "সকালে ঘুম ভাঙার পর বিছানা থেকে ওঠার শক্তি বা ইচ্ছা না থাকা",
          "নিজের প্রতি আত্মবিশ্বাস কমে যাওয়া ও অতিরিক্ত আত্মগ্লানিতে ভোগা",
        ],
        mechanism:
          "মস্তিষ্কের সেরোটোনিন ও ডোপামিন হরমোনের ঘাটতি এবং নেতিবাচক চিন্তার চর্বিতচর্বণ (Rumination) বিষণ্ণতাকে দীর্ঘস্থায়ী করে।",
        impact:
          "বন্ধু ও পরিবারের সাথে সামাজিক যোগাযোগ কমে যায়, নিজেকে ব্যর্থ মনে হতে পারে এবং কাজে দীর্ঘসূত্রিতা তৈরি হয়।",
        neglectRisk:
          "এটি গভীর বিষণ্ণতায় রূপ নিতে পারে এবং কর্মক্ষমতা পুরোপুরি ব্যাহত করতে পারে।",
        actionSteps:
          "বিহেভিওরাল অ্যাক্টিভেশন: মনের ইচ্ছার জন্য অপেক্ষা না করে ছোট ছোট ভালো লাগার কাজগুলো রুটিন মেনে নিয়ম করে শুরু করুন।",
        exerciseTitle: "বিজ্ঞানসম্মত অনুশীলন: বিহেভিওরাল অ্যাক্টিভেশন ও মাস্টারি-প্লেজার লগ",
        exerciseSteps: [
          "প্রতিদিন অন্তত ২টি কাজের পরিকল্পনা করুন যা আপনাকে সামান্য আনন্দ বা তৃপ্তি দেয় (যেমন: ১৫ মিনিট হাঁটাহাঁটি, পছন্দের গান শোনা)।",
          "কাজের পর ০ থেকে ১০ স্কেলে আনন্দ ও সাফল্যের অনুভূতি লিখে রাখুন। কাজ শুরু করলে তবেই ভালো লাগা ফিরে আসে।",
        ],
        referralTrigger:
          "যদি নিজের ক্ষতি করার কোনো অনিচ্ছাকৃত চিন্তা মাথায় আসে, তবে এক মুহূর্তও দেরি না করে অবিলম্বে মানসিক স্বাস্থ্য হটলাইন বা মনোরোগ বিশেষজ্ঞের সাথে যোগাযোগ করুন।",
      },
      sleep: {
        title: "ক্ষেত্র ৪: ঘুমের সমস্যা ও অনিদ্রা (Ghumer Somoshya / Insomnia)",
        clinicalDesc:
          "ঘুম হলো আমাদের মস্তিষ্ক ও স্নায়ুতন্ত্রের স্বয়ংক্রিয় মেরামত প্রক্রিয়া। সঠিক ঘুমের অভাব মানসিক ভারসাম্য ও আবেগ নিয়ন্ত্রণের ক্ষমতা ভেঙে দেয়।",
        feedback:
          "আপনার স্কোর ৫৬/১০০, যা নির্দেশ করে যে অনিদ্রা এবং অপূর্ণ ঘুম আপনার মানসিক স্বাস্থ্যের ওপর সরাসরি ক্ষতিকর প্রভাব ফেলছে।",
        keySymptoms: [
          "বিছানায় যাওয়ার পর ঘুমাতে ৪৫ থেকে ৯০ মিনিটেরও বেশি সময় লেগে যাওয়া",
          "মাঝরাতে হঠাৎ ঘুম ভেঙে যাওয়া এবং পুনরায় ঘুমাতে কষ্ট হওয়া",
          "পর্যাপ্ত সময় শুয়ে থাকার পরেও সকালে উঠলে ক্লান্ত ও ভারী বোধ হওয়া",
        ],
        mechanism:
          "উচ্চ কর্টিসল মেলাটোনিন হরমোনের স্বাভাবিক নিঃসরণ বাধাগ্রস্ত করে, যার ফলে শরীরের সার্কাডিয়ান রিদম (জৈব ঘড়ি) বিঘ্নিত হয়।",
        impact:
          "পরের দিন মনোযোগে ঘাটতি, সামান্যতেই মেজাজ চড়া হওয়া এবং বারবার চা বা কফির ওপর নির্ভরশীলতা তৈরি হওয়া।",
        neglectRisk:
          "ক্রনিক ইনসোমনিয়া ভবিষ্যতে উচ্চ রক্তচাপ, হার্টের সমস্যা এবং গভীর বিষণ্ণতার ঝুঁকি বহুগুণ বাড়িয়ে দেয়।",
        actionSteps:
          "স্টিমুলাস কন্ট্রোল পদ্ধতি প্রয়োগ করুন—বিছানা কেবল ঘুমের জন্য রাখুন; ঘুমানোর অন্তত ১ ঘণ্টা আগে সকল ধরণের নীল আলো (ফোন/ল্যাপটপ) বন্ধ রাখুন।",
        exerciseTitle: "কার্যকর স্লিপ হাইজিন ও স্টিমুলাস কন্ট্রোল প্রটোকল",
        exerciseSteps: [
          "বিছানায় শোয়ার পর ২০-২৫ মিনিটে ঘুম না আসলে উঠে অন্য ঘরে যান। অনুজ্জ্বল আলোয় কোনো বই পড়ুন। ঘুম আসলে তবেই আবার বিছানায় আসুন।",
          "প্রতিদিন ছুটির দিনেও নির্দিষ্ট একই সময়ে ঘুমাতে যাওয়া এবং সকালে ওঠার নিয়ম মেনে চলুন।",
        ],
        referralTrigger:
          "যদি ৪ সপ্তাহের বেশি সময় ধরে ঘুমের ব্যাঘাত চলতে থাকে এবং দিনের স্বাভাবিক কাজকর্ম বাধাগ্রস্ত হয়, তবে স্লিপ স্পেশালিস্টের পরামর্শ নিন।",
      },
      somatic: {
        title: "ক্ষেত্র ৫: শারীরিক উপসর্গ (Sharirik Upasorgo / Somatics)",
        clinicalDesc:
          "সোমাটাইজেশন হলো এমন প্রক্রিয়া যেখানে মানসিক উদ্বেগ ও মনের না-বলা কষ্ট অবচেতনভাবে শারীরিক বিভিন্ন লক্ষণ হিসেবে প্রকাশ পায়।",
        feedback:
          "আপনার স্কোর ২৮/১০০, যা স্বাভাবিক ও নিরাপদ সীমার মধ্যে রয়েছে। আপনার শরীর এখনো মানসিক চাপকে ভালোভাবেই সহ্য করছে, বড় কোনো শারীরিক জটিলতা নেই।",
        keySymptoms: [
          "কাজের চাপে মাঝে মাঝে ঘাড় বা কাঁধের মাংশপেশি শক্ত হয়ে থাকা",
          "মানসিক উত্তেজনার সময় হালকা গ্যাস্ট্রিক বা পেটের অস্বস্তি",
          "কোনো স্থায়ী দীর্ঘমেয়াদী শারীরিক যন্ত্রণাদায়ক লক্ষণের অনুপস্থিতি",
        ],
        mechanism:
          "মন ও অন্ত্রের সংযোগকারী ভেগাস স্নায়ুর মাধ্যমে অতিরিক্ত মানসিক চাপ পরিপাকতন্ত্র ও পেশির উত্তেজনায় প্রভাব ফেলে।",
        impact:
          "মাঝে মাঝে কাজের সময় হালকা অস্বস্তি তৈরি করলেও তা স্থায়ীভাবে কর্মক্ষমতা নষ্ট করছে না।",
        neglectRisk:
          "মানসিক চাপ আরও বাড়লে এটি দীর্ঘমেয়াদী আইবিএস (IBS), মাইগ্রেন ও ক্রনিক ব্যথায় রূপ নিতে পারে।",
        actionSteps:
          "প্রচুর পানি পান করুন, কাজের ফাঁকে হালকা স্ট্রেচিং করুন এবং নিয়মিত প্রগ্রেসিভ মাসল রিলাক্সেশন (PMR) অনুশীলন করুন।",
        exerciseTitle: "কার্যকর ব্যায়াম: প্রগ্রেসিভ মাসল রিলাক্সেশন (PMR)",
        exerciseSteps: [
          "পা থেকে শুরু করে মুখমণ্ডল পর্যন্ত প্রতিটি পেশি ৫ সেকেন্ড শক্ত করে টানটান করুন, তারপর ধীরে ধীরে ১৫ সেকেন্ড ধরে ঢিলে করে দিন।",
          "পেশি শিথিল হওয়ার উষ্ণ অনুভূতি অনুভব করুন। দিনে একবার এই চর্চা শরীর ও মনের দূরত্ব কমায়।",
        ],
        referralTrigger:
          "নতুন কোনো তীব্র শারীরিক উপসর্গ দেখা দিলে মানসিক কারণ ভাবার আগে সর্বদা একজন চিকিৎসকের কাছে গিয়ে শারীরিক চেকআপ করিয়ে নেওয়া জরুরি।",
      },
    },

    // Page 10: Strengths & Roadmap
    secStrengthsRoadmapTitle: "৬ ও ৭. শক্তি, বাস্তবমুখী পরিকল্পনা ও পরিবারের ভূমিকা",
    protectiveFactorsTitle: "আপনার মানসিক শক্তি ও সুরক্ষার দিকগুলো",
    actionPlanTitle: "ধাপে ধাপে আপনার করণীয় পরিকল্পনা (Structured Action Plan)",
    planStages: [
      { stage: "আজ থেকেই (Day 1)", focus: "সচেতনতা ও ডিজিটাল কারফিউ", action: "রিপোর্টের তথ্য মেনে নেওয়া, রাত ১০:৩০ টার পর মোবাইল বন্ধের নিয়ম করা এবং নিজের প্রতি সদয় হওয়া।" },
      { stage: "২য় থেকে ৭ম দিন (Week 1)", focus: "স্নায়ুতন্ত্র শান্ত রাখা", action: "প্রতিদিন সকালে ১০-১৫ মিনিট রোদে থাকা, ৪-৭-৮ শ্বাসের ব্যায়াম দিনে দুবার করা এবং ঘুমের নিয়ম কঠোর করা।" },
      { stage: "২য় থেকে ৪র্থ সপ্তাহ", focus: "কাউন্সেলিং ও চিন্তার পরিবর্তন", action: "একজন পেশাদার কাউন্সেলরের সাথে ৪-৬টি সেশন শুরু করা এবং অবাস্তব ভীতিগুলো যুক্তির মাধ্যমে দূর করা।" },
      { stage: "২য় মাস (Weeks 5–8)", focus: "অগ্রগতি পরিমাপ ও বাউন্ডারি", action: "কাজের স্বাস্থ্যকর সীমা বজায় রাখা, নতুন অভ্যাসের অগ্রগতি দেখা এবং পুনরায় MHS-BD মূল্যায়ন সম্পন্ন করা।" },
      { stage: "৩য় মাস পরবর্তী", focus: "স্থায়ী সুস্থতা ও বিকাশ", action: "নিয়মিত শারীরিক ব্যায়াম, সামাজিক সুস্থ সম্পর্ক বজায় রাখা এবং মানসিক সুস্থতাকে অগ্রাধিকার দেওয়া।" },
    ],
    triageTitle: "পেশাদার সহায়তা নির্বাচন নির্দেশিকা (Professional Triage)",
    triageDesc: "আপনার জন্য কোন ধরণের মানসিক স্বাস্থ্য বিশেষজ্ঞ সবচেয়ে বেশি কার্যকর হবেন তা জানুন",
    triageList: [
      { role: "সাইকোলজিক্যাল কাউন্সেলর / সাইকোথেরাপিস্ট", fit: "সবচেয়ে উপযুক্ত (সুপারিশকৃত)", focus: "সিবিটি (CBT) থেরাপির মাধ্যমে উদ্বেগ কমানো, কাজের চাপ ব্যবস্থাপনা, ঘুমের ব্যাঘাত দূর করা ও জীবনযাত্রা পুনর্বিন্যাস।" },
      { role: "মনোরোগ বিশেষজ্ঞ / সাইকিয়াট্রিস্ট (মেডিকেল ডাক্তার)", fit: "প্রয়োজন সাপেক্ষে", focus: "যদি লক্ষণ তীব্র আকার ধারণ করে, প্যানিক অ্যাটাক নিয়মিত হয় বা ওষুধের প্রয়োজন বিবেচনা করতে হয়।" },
      { role: "জেনারেল ফিজিশিয়ান / এমবিবিএস ডাক্তার", fit: "প্রাথমিক চেকআপ", focus: "শারীরিক কোনো কারণ (যেমন: থাইরয়েড হরমোন, ভিটামিন ডি বা বি১২ এর অভাব) মানসিক ক্লান্তির জন্য দায়ী কিনা তা নিশ্চিত হওয়া।" },
    ],
    familyRoleTitle: "পরিবার ও শুভাকাঙ্ক্ষীদের ভূমিকা: কী করবেন এবং কী বলবেন না",
    familyDoTitle: "পরিবারের সদস্যদের যা করা উচিত",
    familyDoList: [
      "উপদেশ দেওয়ার চেয়ে মনোযোগ দিয়ে তার মনের কথা শুনুন এবং তার অনুভূতিকে গুরুত্ব দিন।",
      "মনে রাখুন মানসিক কষ্ট কোনো দুর্বলতা বা ইচ্ছাকৃত বিষয় নয়, এটি একটি বাস্তব স্বাস্থ্যগত সংকট।",
      "তাকে প্রফেশনাল কাউন্সেলিং বা থেরাপি নিতে উৎসাহ দিন এবং প্রয়োজনে পাশে থাকুন।",
      "ঘরের পরিবেশ শান্ত রাখুন এবং রাতে ঘুমানোর অনুকূল পরিবেশ তৈরি করুন।",
    ],
    familyDontTitle: "পরিবারের সদস্যদের যা কখনো বলা উচিত নয়",
    familyDontList: [
      "❌ 'তুমি অতিরিক্ত ভাবো, তোমার কোনো কামকাজ নাই।' (অহেতুক দোষারোপ করবেন না)",
      "❌ 'অন্যদের কতো বড় বড় সমস্যা আছে, তোমার তো অনেক ভালো অবস্থা!' (তুলনা করবেন না)",
      "❌ 'একটু শক্ত হও, মন ভালো রাখো, সব ঠিক হয়ে যাবে।' (অবাস্তব চাপ দেবেন না)",
      "❌ 'মানসিক সমস্যা বলে কিছু নাই, এসব হলো দুর্বল মনের লক্ষণ।' (অস্বীকার করবেন না)",
    ],

    // Page 11: Forward Paths & Science
    secForwardPathsTitle: "৯ ও ১০. দুটি ভিন্ন পথ ও মনকে বুঝুন (বিজ্ঞানসম্মত মডেল)",
    pathsTitle: "পরবর্তী ৬ মাসে আপনার সামনে থাকা দুটি সম্ভাব্য ভবিষ্যৎ পথ",
    pathA: {
      title: "পথ ক: কিছু পরিবর্তন না করলে (The Cost of Inaction)",
      desc: "বর্তমান উদ্বেগ ও অনিদ্রাকে অবহেলা করে আগের মতোই জীবন চলতে দেওয়া",
      outcomes: [
        "উদ্বেগ আরও বৃদ্ধি পেয়ে ঘন ঘন প্যানিক অ্যাটাক বা প্যানিক ডিজঅর্ডারে রূপ নিতে পারে",
        "ঘুমের সমস্যা দীর্ঘস্থায়ী হয়ে কাজের উৎপাদনশীলতা ও মনোযোগ মারাত্মক হ্রাস পেতে পারে",
        "বিষণ্ণতার মাত্রা বেড়ে গিয়ে সম্পর্কগুলোতে দূরত্ব ও একাকীত্ব স্থায়ী হতে পারে",
        "উচ্চ রক্তচাপ, ক্রনিক মাইগ্রেন ও গ্যাস্ট্রিক আলসারের মতো শারীরিক ব্যাধি সৃষ্টি হতে পারে",
      ],
    },
    pathB: {
      title: "পথ খ: এই পরিকল্পনা মেনে চললে (Following the Recovery Plan)",
      desc: "পেশাদার কাউন্সেলিং গ্রহণ ও প্রতিদিনের আচরণিক পরিবর্তন কার্যকর করা",
      outcomes: [
        "গভীর ও আরামদায়ক ঘুমের প্রত্যাবর্তন এবং সারাদিন মানসিকভাবে সতেজ ও কর্মচঞ্চল থাকা",
        "উদ্বেগের সময় নিজেকে শান্ত করার ক্ষমতা অর্জন এবং কাজের চাপ দক্ষভাবে সামলানো",
        "সম্পর্কগুলোতে নতুন প্রাণ ফিরে পাওয়া এবং আত্মবিশ্বাসের সাথে লক্ষ্য অর্জন করা",
        "ভবিষ্যতে মানসিক চাপ মোকাবিলায় দীর্ঘমেয়াদী লাইফ-স্কিল তৈরি হওয়া",
      ],
    },
    scienceTitle: "মনকে বুঝুন — সহজ ভাষায় মনস্তাত্ত্বিক বিজ্ঞান",
    stressBucketTitle: "চাপ ও সহনশীলতার বিজ্ঞান: 'চাপের বালতি' মডেল (Stress Vulnerability Model)",
    stressBucketText:
      "কল্পনা করুন আপনার মানসিক সহনশীলতা একটি বালতির মতো। দৈনন্দিন কাজের চাপ, দুশ্চিন্তা ও অপ্রাপ্তিগুলো হলো পানি যা প্রতিনিয়ত বালতিতে জমা হচ্ছে। যদি আপনার পানি বের করার কলগুলো (ভালো ঘুম, মানসিক বিশ্রাম, থেরাপি, শরীরচর্চা) বন্ধ থাকে, তবে বালতি উপচে পড়বেই—যাকে আমরা বলি মানসিক ব্রেকডাউন বা তীব্র উদ্বেগ। স্বাস্থ্যকর অভ্যাসের মাধ্যমে এই কলগুলো খোলা রাখলে বালতি কখনোই উপচে পড়ে না।",
    cbtCycleTitle: "কগনিটিভ বিহেভিওরাল থেরাপি (CBT) চক্র: চিন্তা, আবেগ, শরীর ও আচরণ",
    cbtCycleText:
      "আমাদের চিন্তা (Thought), আবেগ (Emotion), শারীরিক অনুভূতি (Physical Sensations) এবং আচরণ (Behavior)—সবগুলো একটি চক্রে জড়িত। একটি নেতিবাচক চিন্তা পুরো শরীরের ওপর প্রতিক্রিয়া সৃষ্টি করে। CBT থেরাপির মাধ্যমে এই চক্রের যেকোনো একটি স্থান ভেঙে দিলে পুরো নেতিবাচক চক্রটি বন্ধ হয়ে মন পুনরায় শান্ত হয়ে যায়।",

    // Page 12: Help, Helplines & Resources
    secHelpTitle: "১১ ও ১২. সহায়তা ডিরেক্টরি, ভিডিও লাইব্রেরি ও ফলো-আপ সূচি",
    crisisHotlineTitle: "জরুরি ২৪ ঘণ্টা মানসিক স্বাস্থ্য হটলাইন ডিরেক্টরি (বাংলাদেশ)",
    hotlineList: [
      { name: "জাতীয় জরুরি সেবা", number: "৯৯৯ (999)", desc: "যেকোনো তাৎক্ষণিক পুলিশ, অ্যাম্বুলেন্স ও জরুরি জীবন সংকটে টোল-ফ্রি সেবা।" },
      { name: "কান পেতে রই (Kaan Pete Roi)", number: "০৯৬১২-১১৯৯১১ / ০১৭৭৯-৫৫৪৩৯১", desc: "বাংলাদেশের প্রথম মানসিক স্বাস্থ্য ও আত্মহত্যা প্রতিরোধ হটলাইন।" },
      { name: "জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট ও হাসপাতাল", number: "+৮৮০-২-৯১১৮১৭১", desc: "সরকারি বিশেষায়িত মানসিক হাসপাতাল ও আউটডোর সেবা (শেরেবাংলা নগর, ঢাকা)।" },
      { name: "নারী ও শিশু সুরক্ষা জাতীয় হেল্পলাইন", number: "১০৯ / ১০৯৮ (109 / 1098)", desc: "পারিবারিক সহিংসতা ও মানসিক সহায়তায় টোল-ফ্রি জাতীয় সেবা।" },
    ],
    professionalServicesTitle: "প্রমাণ-ভিত্তিক মানসিক স্বাস্থ্য সেবা প্ল্যাটফর্ম",
    serviceList: [
      { name: "হোয়াই নট ইউ - সাইকোলজিক্যাল সার্ভিসেস", contact: "whynotyoupsy.com | info@whynotyoupsy.com", desc: "বিশেষায়িত সাইকোমেট্রিক স্ক্রিনিং, সিবিটি থেরাপি ও বৈজ্ঞানিক কাউন্সেলিং সহায়তা।" },
      { name: "মনের বন্ধু (Moner Bondhu)", contact: "monerbondhu.com | ০১৭৭৬-৬৩২৩৪৪", desc: "অভিজ্ঞ কাউন্সেলরদের মাধ্যমে মানসিক স্বাস্থ্য কাউন্সেলিং ও সহায়তা কেন্দ্র।" },
    ],
    videoLibraryTitle: "বাংলাদেশের শীর্ষস্থানীয় বিশেষজ্ঞদের সহায়ক ইউটিউব ভিডিও রিসোর্স",
    videoList: [
      { title: "উদ্বেগ ও অস্থিরতা থেকে মুক্তির উপায় এবং প্যানিক অ্যাটাক নিয়ন্ত্রণ", presenter: "ডাঃ মেখলা সরকার", role: "সহযোগী অধ্যাপক (সাইকিয়াট্রি), জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট", topic: "উদ্বেগের স্নায়বিক কারণ, অস্থিরতায় তাৎক্ষণিক করণীয় এবং শ্বাসের অনুশীলন।" },
      { title: "অনিদ্রা ও মানসিক চাপের সংযোগ: কীভাবে গভীর ঘুম ফিরিয়ে আনবেন", presenter: "ডাঃ মাহিন রহমান", role: "ক্লিনিক্যাল সাইকোলজিস্ট ও গবেষক", topic: "স্লিপ হাইজিন, কর্টিসল নিয়ন্ত্রণ এবং ডিজিটাল স্ক্রিনের ক্ষতিকর প্রভাব হ্রাস।" },
      { title: "বিষণ্ণতা কোনো দুর্বলতা নয়: লক্ষণ চেনা ও চিকিৎসায় করণীয়", presenter: "অধ্যাপক ডাঃ মোঃ গোলাম রব্বানী", role: "সাবেক পরিচালক, NIMH ও প্রখ্যাত মনোরোগ বিশেষজ্ঞ", topic: "বিষণ্ণতার বৈজ্ঞানিক চিকিৎসা, পরিবারের সহযোগিতা এবং দীর্ঘমেয়াদী নিরাময়।" },
    ],
    recommendedReadingTitle: "পড়ার জন্য সুপারিশকৃত সহায়ক বই ও নির্দেশিকা",
    readingList: [
      "ফিলিং গুড: দ্য নিউ মুড থেরাপি — ডাঃ ডেভিড ডি বার্নস (সিবিটি থেরাপির ক্লাসিক গাইড)",
      "হোয়াই উই স্লিপ (ঘুমের মহিমা ও বিজ্ঞান) — ডাঃ ম্যাথিউ ওয়াকার (ঘুমের পূর্ণাঙ্গ বিজ্ঞান)",
      "দ্য স্ট্রেস সলিউশন — ডাঃ রঙ্গন চ্যাটার্জি (জীবনযাত্রার চারটি স্তম্ভের মাধ্যমে মানসিক চাপ নিয়ন্ত্রণ)",
    ],
    reassessmentScheduleTitle: "রিপোর্ট ট্র্যাকিং ও পরবর্তী পুনঃমূল্যায়নের সময়সূচি",
    reassessmentScheduleText:
      "মানসিক স্বাস্থ্য পরিবর্তনশীল। এই রিপোর্ট ও নির্দেশিকা মেনে চলার পর ৬ থেকে ৮ সপ্তাহ পর পুনরায় MHS-BD মূল্যায়নে অংশ নেওয়া উচিত, যাতে উন্নতির পরিমাপ করা যায় এবং থেরাপিউটিক কৌশলগুলো হালনাগাদ করা সম্ভব হয়।",
    authorTitle: "প্রধান সাইকোমেট্রিশিয়ান ও প্রতিবেদন প্রণয়নকারী",
    authorName: "কাজী ফেরদৌস ইকবাল",
    authorCreds: "কনসালট্যান্ট সাইকোমেট্রিশিয়ান ও আচরণিক গবেষক | হোয়াই নট ইউ সাইকোলজিক্যাল সার্ভিসেস",
    copyright: "© ২০২৬ হোয়াই নট ইউ - সাইকোলজিক্যাল সার্ভিসেস। সর্বস্বত্ব সংরক্ষিত। MHS-BD ফ্রেমওয়ার্ক।",
  },
};
