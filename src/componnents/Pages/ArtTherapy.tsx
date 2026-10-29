import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* =========================================================
   MEDIA: files live in public/arttherapy/ (same folder names as the preview HTML).
   Or swap any value for a Cloudinary link. An empty "" is skipped automatically.
   ========================================================= */
const IMG = {
  retreatPoster: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918418/01_event-poster_p1aipt.jpg",       // 01_event-poster.jpg
  natureMandala: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918417/02_nature-mandala_v5rsbk.jpg",       // 02_nature-mandala.jpg
  shells: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918417/03_shells-for-grounding_pjowra.jpg",              // 03_shells-for-grounding.jpg
  workshopPoster: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918864/01_workshop-poster_wjzwpb.jpg",      // Colors of Inner Peace poster
  studioSetup: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918946/01_studio-setup_g8k6ab.jpg",         // 01_studio-setup.jpg
  artMaterials: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918947/02_art-materials_tbxa2z.jpg",        // 02_art-materials.jpg
  roomReady: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918945/03_room-ready_cqjsxd.jpg",           // 03_room-ready.jpg
  shellDrawing: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918890/04_shell-grounding-drawing_gwu8wn.jpg",        // 04_shell-grounding-drawing.jpg
  scribbleRelease: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918892/05_scribble-release_wudgcf.jpg",     // 05_scribble-release.jpg
  participants: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918949/06_participants-at-work_faces-blurred_tovddp.jpg",        // 06_participants-at-work_faces-blurred.jpg
  closingMoment: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792918948/07_closing-moment_participant-blurred_bm9ymf.jpg",       // 07_closing-moment_participant-blurred.jpg
  familyTree: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919157/01_family-hands-on-tree_faces-blurred_evvbck.jpg",          // 01_family-hands-on-tree_faces-blurred.jpg
  treeDetail: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919158/02_tree-detail_gff8no.jpg",          // 02_tree-detail.jpg
  childrenRoksana: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919204/01_roksana-with-children_faces-blurred_bqtxo7.jpg",     // 01_roksana-with-children_faces-blurred.jpg
  clayHands: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919203/02_clay-tree-hands_yk6s9v.jpg",           // 02_clay-tree-hands.jpg
  clayTogether: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919205/03_working-together_faces-blurred_akutkd.jpg",        // 03_working-together_faces-blurred.jpg
  clayFinish: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919202/04_finishing-the-tree_faces-blurred_yajueb.jpg",          // 04_finishing-the-tree_faces-blurred.jpg
  onlineBodyMap: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919616/01_body-emotion-map-example_a5bt0z.jpg",       // 01_body-emotion-map-example.jpg
  neurographic: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919771/01_neurographic-lines_lny4e6.jpg",        // 01_neurographic-lines.jpg
  scribbleCircles: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919772/02_neurographic-in-progress_hr9hie.jpg",     // 04_scribble-with-circles.jpg
  mandalaPen: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919773/03_neurographic-on-the-floor_tofbwb.jpg",          // 05_mandala-pen.jpg
  heartMap: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919766/06_heart-map_og7ang.jpg",            // 06_heart-map.jpg
  bodyMap: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792919768/07_body-emotion-map_hqsvu6.jpg",             // 07_body-emotion-map.jpg
  portraitBlack: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792920006/01_portrait-black-saree_nnfmuw.jpg",       // 01_portrait-black-saree.jpg
  portraitWhite: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792920003/04_portrait-monochrome_oooypz.jpg",       // 02_portrait-white-saree.jpg
  portraitBlue: "",        // 03_portrait-blue-saree.jpg
  artistAtWork: "https://res.cloudinary.com/kpuio2i4/image/upload/v1792920004/05_artist-at-work_rcdf25.jpg",        // 05_artist-at-work.jpg
};

const VIDEO = {
  mandala: "https://res.cloudinary.com/kpuio2i4/video/upload/v1792920967/mandala-drawing-process_ttj1hk.mp4",             // mandala-drawing-process.mp4 (1 min 46 s)
  neurographic: "https://res.cloudinary.com/kpuio2i4/video/upload/v1792920966/neurographic-colouring-process_y8ihrc.mp4",        // neurographic-colouring-process.mp4 (28 s)
};

const WHATSAPP_LINK = "https://wa.me/8801355470255";

const roksanaFacts = [
  { label: "Current role", value: "Psychologist and Art Therapist, Dept. of Public Health and Informatics, BRAC University" },
  { label: "Education", value: "BSc and MSc in Psychology, University of Dhaka; PhD researcher, University of Dhaka" },
  { label: "Exhibitions", value: "Nepal, India, Dubai and Bangladesh, 2023 to 2025" },
  { label: "Languages", value: "Bangla and English" },
  { label: "Contact", value: "+880 1777 403838 · roksana.sultana@gmail.com" },
];

const retreat = {
  kicker: "Retreat · Saturday 24 October 2026",
  title: "A Day of Colour, Calm and Connection at The Spot",
  lead: "Roksana Sultana led a one-day art therapy and mindfulness retreat in the open green of The Spot, Sector 28, Purbachal, from 9:30 am to 4:30 pm.",
  paragraphs: [
    "Most of us carry a week's worth of noise into the weekend. This retreat gives that noise somewhere to go. The day moves between guided art activities, slow time outdoors and quiet reflection, and nobody is expected to leave with a finished painting.",
    "Roksana built the programme around six practices: neuro art, mindful walking, the emotional tree, mandala work, the spider mindful practice, and nature-based expressive art. A neuro art drawing starts as one loose, continuous line that is gradually rounded and coloured until the page feels settled. The emotional tree asks participants to place what holds them up and what weighs on them onto roots, trunk and branches. Mandala work keeps bringing the eye back to a centre, which many people find steadying after a restless week.",
    "Skill is not a condition for benefit. In a study of 39 adults published in the journal Art Therapy, 45 minutes of art-making lowered salivary cortisol in about three quarters of participants, and prior art experience made no difference to the result (Kaimal, Ray and Muniz, 2016).",
    "Time outside is part of the method. Participants walk the grounds slowly, collect leaves, stones and petals, and use them in a closing nature composition. Sharing is invited and never required, and what someone makes or says stays within the group.",
  ],
  facts: [
    { label: "Date", value: "Saturday 24 October 2026, 9:30 am to 4:30 pm" },
    { label: "Venue", value: "The Spot, Sector 28, Purbachal, Dhaka" },
    { label: "Fee", value: "BDT 2,250 per person, meals and materials included" },
  ],
  gallery: [
    { img: IMG.natureMandala, alt: "Circular arrangement of green leaves, yellow flowers and pebbles on cardboard laid on grass", caption: "A nature mandala of leaves, petals and stones, built in the closing activity." },
    { img: IMG.shells, alt: "Bowl of assorted sea shells", caption: "Shells and stones sit on the table as objects to hold and notice before drawing begins." },
  ],
};

const programmes = [
  {
    id: "colors-of-inner-peace",
    kicker: "Signature programme · Day-long workshop",
    title: "Colors of Inner Peace",
    lead: "Roksana's signature workshop: six hours of art therapy, mindfulness and creative expression in a group of ten.",
    image: IMG.workshopPoster,
    imageAlt: "Poster for the Colors of Inner Peace day-long art therapy workshop",
    paragraphs: [
      "Colors of Inner Peace: A Journey through Healing by Art is the programme Roksana returns to most often. The February edition ran from 10 am to 4 pm on Saturday 7 February at the Nutrition Solutions office, with seats capped at ten so that every participant could be seen and heard.",
      "The capacity is a clinical choice. In a group of ten, the facilitator can notice when someone has gone quiet, when a drawing has become heavy, or when a person needs a few minutes away from the table. Larger events trade that attention for reach.",
      "The day combines three strands. Art therapy activities give feelings a shape on paper. Mindfulness practice slows the breath and the hand so that those shapes can be looked at without judgement. Creative expression, in colour, line and texture, lets participants say things they may not yet have words for.",
      "Organisations, clinics and community groups who would like to host the next edition can contact Roksana directly.",
    ],
    facts: [
      { label: "Edition", value: "Saturday 7 February 2026, 10:00 am to 4:00 pm" },
      { label: "Host", value: "Nutrition Solutions" },
      { label: "Group size", value: "10 participants" },
      { label: "Fee", value: "BDT 1,200 per person" },
    ],
    gallery: [],
  },
  {
    id: "small-group-studio",
    kicker: "Workshop in pictures",
    title: "Inside a Small-Group Studio Workshop",
    lead: "How Roksana prepares the room and guides a small group through grounding, scribble work and pattern drawing.",
    image: IMG.studioSetup,
    imageAlt: "Glass dining table laid with art supplies, paint palettes and a bouquet of flowers",
    paragraphs: [
      "Before anyone arrives, the table is already doing some of the work. Colour pencils stand in cups, paint palettes are laid out, fresh flowers sit in the middle and a bowl of shells waits within reach. The care that goes into the setting tells each person that they were expected.",
      "The session opens with grounding. Participants pick up a shell or a smooth stone, feel its weight and edges, and set it on the paper beside them. It becomes an anchor they can return to whenever attention drifts or a feeling rises too fast.",
      "Then comes scribble work. With one colour, participants fill the page with a fast, looping line that is allowed to be messy. In the second step they look for the shapes hidden in the tangle and circle the ones that catch their eye. A page that looked chaotic turns out to hold small, contained spaces.",
      "Later in the day the group moves to slower pattern drawing. Heads go down, conversation falls away, and the room fills with the sound of pens on paper.",
    ],
    facts: [],
    gallery: [
      { img: IMG.artMaterials, alt: "Overhead view of art supplies on a table", caption: "Pastels, watercolours, markers, brushes and drawing pads." },
      { img: IMG.roomReady, alt: "Table with flowers, cups, shells and materials in a living room", caption: "The room set up for a small group." },
      { img: IMG.shellDrawing, alt: "Hand drawing with a white pen next to a shell on white paper", caption: "A shell rests on the page as a grounding object." },
      { img: IMG.scribbleRelease, alt: "Orange looping scribble with small blue circles", caption: "A finished scribble page, with noticed shapes circled in blue." },
      { img: IMG.participants, alt: "Four women drawing at a table; faces blurred", caption: "Participants at work during pattern drawing. Faces blurred for privacy." },
      { img: IMG.closingMoment, alt: "Roksana Sultana handing a wrapped item to a participant whose face is blurred", caption: "Roksana with a participant at the close of the workshop. Face blurred." },
    ],
    privacy: true,
  },
  {
    id: "family-session",
    kicker: "Family session",
    title: "One Tree, Four Pairs of Hands",
    lead: "In a family session, four members of one household painted a single tree together and closed by placing their hands on its trunk.",
    image: IMG.familyTree,
    imageAlt: "Four people with hands joined on a large painting of a tree with red flowers; faces blurred",
    paragraphs: [
      "Families often talk past each other. A shared canvas gives them something to do side by side, and the conversation that happens around a painting is usually gentler than the one that happens across a dinner table.",
      "The family worked on one large sheet: a brown trunk with spreading branches, layers of green, and red blossoms scattered across the canopy. Working on a single image means agreeing, as you go, on where each colour should sit.",
      "In art therapy the tree is a familiar image for growth and belonging. Roots can stand for where a family comes from, the trunk for what keeps it upright, and the branches for the directions each member is growing in. Roksana uses the image loosely and lets the family attach their own meanings to it.",
      "The session ended with a simple ritual. All four placed their hands together on the painted trunk, a moment the family chose to photograph.",
    ],
    facts: [],
    gallery: [
      { img: IMG.treeDetail, alt: "Close-up of green brushstrokes and red flowers in an acrylic painting", caption: "Detail of the canopy: layered greens and red blossoms." },
    ],
    privacy: true,
  },
  {
    id: "children-session",
    kicker: "Children's session",
    title: "Little Hands, Big Feelings",
    lead: "Sessions for children use drawing and clay modelling to give young people a way to show what they find hard to say.",
    image: IMG.childrenRoksana,
    imageAlt: "Roksana Sultana standing beside two children drawing at a table; faces blurred",
    paragraphs: [
      "Children rarely arrive able to describe what is bothering them. They can, however, press clay, choose a colour and decide where a leaf should go. Those choices give an attentive adult a lot to work with.",
      "In one session, a small group built a tree together out of modelling clay on a sheet of cardboard. The branches were rolled first, then each child shaped leaves in blue, green and pink and pressed them into place. Who added leaves where, who waited, and who helped a younger child were all part of what Roksana watched for.",
      "In another, children drew at the table while Roksana moved between them and checked in on each picture. A child asked what is happening in a drawing will usually tell a story about it, and that story gives the therapist a way in.",
    ],
    facts: [],
    gallery: [
      { img: IMG.clayHands, alt: "Hands with henna placing coloured clay leaves on a cardboard tree", caption: "Hands pressing clay leaves onto a shared tree." },
      { img: IMG.clayTogether, alt: "Three children kneeling over a clay artwork on the floor; faces blurred", caption: "Children working together on the clay tree. Faces blurred." },
      { img: IMG.clayFinish, alt: "Children leaning in to finish a clay tree; faces blurred", caption: "Adding the last leaves. Faces blurred." },
    ],
    privacy: true,
    privacyText: "The children in these photographs are minors, and their faces have been blurred with their families' privacy in mind.",
  },
  {
    id: "online-session",
    kicker: "Online session · Thriving Skills",
    title: "Mindful Art from Home",
    lead: "A live Zoom session built around three simple activities and materials most people already have at home.",
    image: IMG.onlineBodyMap,
    imageAlt: "Drawing of a human outline with a glowing heart, flowers, leaves and roots, captioned Protect your energy",
    paragraphs: [
      "Not everyone can travel to a workshop. The Thriving Skills live session brought the same approach to a laptop screen at 7:30 in the evening, asking only for paper, a pen or pencil and a few colours.",
      "The first activity, Emotion in One Color, asks participants to choose a single colour for how they feel right now and fill a page with it. Limiting the palette removes the worry about getting it right and puts the attention on pressure, speed and texture.",
      "The second, Body-Emotion Mapping, starts with an outline of the body. Participants mark where they feel tension, warmth, heaviness or ease, using colour and line. Many people discover that a feeling they had described only in words has a definite place in the body.",
      "The third, Healing Art, turns the map toward care. Participants add whatever the body seems to need: protection, light, roots, room to breathe. Guided breathing and relaxation run between the activities, so the session works as a short practice participants can repeat on their own afterwards.",
    ],
    facts: [
      { label: "Date", value: "Friday 15 May 2026, 7:30 pm (Bangladesh time)" },
      { label: "Format", value: "Live on Zoom" },
      { label: "Organiser", value: "Thriving Skills" },
    ],
    gallery: [],
  },
];

const techniques = [
  {
    name: "Neurographic art",
    img: IMG.neurographic,
    alt: "Blue wavy lines radiating outward with small coloured shapes",
    text: "Developed by the Russian psychologist Pavel Piskarev in 2014. You begin with free, intersecting lines, then round off every sharp corner where lines meet, and finally colour the shapes that emerge. The rounding step is slow and repetitive, and many people notice their breathing settle as they do it.",
  },
  {
    name: "Scribble release",
    img: IMG.scribbleCircles,
    alt: "Black scribble with green and orange coloured circles",
    text: "A fast, looping scribble lets restless energy out through the arm. When the page is full, you look for shapes inside the tangle and circle them. The exercise moves attention from release to noticing.",
  },
  {
    name: "Mandala drawing",
    img: IMG.mandalaPen,
    alt: "Black ink mandala with a dense centre and petal rings",
    text: "Working outward from a centre point in rings and petals keeps returning the eye to one place. In a study of 84 students, Curry and Kasser (2005) found that colouring a mandala reduced anxiety more than free colouring on a blank page.",
  },
  {
    name: "Heart map",
    img: IMG.heartMap,
    alt: "Coloured drawing of a central heart with rays of small hearts, clouds and leaves",
    text: "A large heart in the centre of the page holds what matters most, and the space around it is divided into sections for people, places and feelings. It is a gentle starting point for clients who find direct questions difficult.",
  },
  {
    name: "Body map",
    img: IMG.bodyMap,
    alt: "Human outline with heart, flowers and roots",
    text: "An outline of the body becomes a place to record where feelings live. The one shown here was finished with the words \"Protect your energy\" at its feet.",
  },
];

function Img({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  if (!src) return null;
  return <img src={src} alt={alt} loading="lazy" className={className} />;
}

function FactGrid({ facts, dark = false }: { facts: { label: string; value: string }[]; dark?: boolean }) {
  if (!facts.length) return null;
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {facts.map((f) => (
        <div
          key={f.label}
          className={`p-5 rounded-sm border ${dark ? "bg-white/5 border-[#F9F6F0]/15" : "bg-[#F9F6F0] border-[#EFECE5]"}`}
        >
          <dt className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-1">{f.label}</dt>
          <dd className={`text-sm leading-relaxed ${dark ? "text-[#F9F6F0]/90" : "text-[#222222]"}`}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProgrammeCard({ p }: { p: (typeof programmes)[number] }) {
  const [open, setOpen] = useState(false);
  const gallery = p.gallery.filter((g) => g.img);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-[#A38771]/20 shadow-sm rounded-sm overflow-hidden flex flex-col"
    >
      {p.image && (
        <div className="bg-[#EFECE5]">
          <Img src={p.image} alt={p.imageAlt} className="w-full h-auto block" />
        </div>
      )}
      <div className="p-6 sm:p-10 md:p-12 flex flex-col break-words">
        <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 block leading-relaxed">{p.kicker}</span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#222222] mb-4 leading-tight break-words">{p.title}</h3>
        <p className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed mb-2 text-justify sm:text-left hyphens-auto">{p.lead}</p>

        <FactGrid facts={p.facts} />

        {open && (
          <div className="space-y-5 text-[#4A4A4A] leading-relaxed text-base sm:text-lg mt-4 text-justify sm:text-left hyphens-auto">
            {p.paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            {gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-6">
                {gallery.map((g, i) => (
                  <figure key={i} className={gallery.length % 2 === 1 && i === 0 ? "md:col-span-2" : ""}>
                    <Img src={g.img} alt={g.alt} className="w-full h-auto block rounded-sm bg-[#EFECE5]" />
                    <figcaption className="text-sm text-[#4A4A4A]/80 mt-2 leading-snug">{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            {p.privacy && (
              <p className="text-sm italic text-[#4A4A4A]/80 border-l-2 border-[#A38771] pl-4">
                {p.privacyText ||
                  "Many people who come to these sessions are carrying difficult experiences, and they joined on the understanding that they would not be identified. Faces of participants have been blurred in every photograph."}
              </p>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-8 self-start border border-[#C05C44] text-[#C05C44] hover:bg-[#C05C44] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-sm"
        >
          {open ? "Show less −" : "Read the full story +"}
        </button>
      </div>
    </motion.article>
  );
}

export default function ArtTherapy() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialist: "",
    concern: "",
    days: [] as string[],
    times: [] as string[],
    language: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Toggle helpers for multi-select arrays
  const toggleArrayItem = (key: "days" | "times" | "language", value: string) => {
    setFormData((prev) => {
      const current = prev[key];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", phone: "", specialist: "", concern: "", days: [], times: [], language: [] });
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  const scrollToForm = () => {
    document.getElementById("art-therapy-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const experts = [
    { initials: "RS", name: "Roksana Sultana, PhD" },
    { initials: "FZ", name: "Farzana Ferdous Zaman" },
    { initials: "NC", name: "Nowsaba Chowdhury" },
    { initials: "SM", name: "Sania Mahima" }
  ];

  return (
    <div lang="en" className="w-full min-h-screen font-sans bg-[#F9F6F0]">
      
      {/* =========================================
          SECTION 1: HERO (Light Ivory)
          ========================================= */}
      <section className="pt-40 pb-20 px-6 sm:px-12 md:px-20 lg:pl-[90px] max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1"
        >
          <h1 className="text-4xl sm:text-3xl md:text-5xl font-serif text-[#222222] leading-[1.1] mb-4">
            Healing Beyond Words
          </h1>
          <p className="text-[#A38771] italic text-lg sm:text-xl font-serif mb-8">
            Art therapy is a blend of psychology & art.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 max-w-lg border-l-2 border-[#A38771]/30 pl-6 md:pl-10"
        >
          <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8 text-justify sm:text-left hyphens-auto">
            For when talking isn't enough, we use art to understand what's happening inside. A specialized therapeutic approach blending psychological theory with the creative process to improve mental, emotional, and physical well-being.
          </p>
          <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8 text-justify sm:text-left hyphens-auto">
            This is not about making "good" art. It is about expressing what words cannot capture.
          </p>
          <button 
            onClick={scrollToForm}
            className="bg-[#C05C44] hover:bg-[#a84d37] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm transition-colors duration-300 rounded-sm shadow-sm"
          >
            Book a Session
          </button>
        </motion.div>
      </section>

      {/* =========================================
          SECTION 2: WHAT IS ART THERAPY? (Deep Green)
          ========================================= */}
      <section className="bg-[#1E3A34] text-[#F9F6F0] py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-3xl sm:text-4xl font-serif mb-6 text-white">What is Art Therapy?</h2>
            <p className="text-[#F9F6F0]/80 leading-relaxed text-lg mb-6 text-justify sm:text-left hyphens-auto">
              Art therapy is an integrative mental health and human services profession that enriches the lives of individuals, families, and communities through active art-making, creative process, applied psychological theory, and human experience within a psychotherapeutic relationship.
            </p>
            <p className="text-[#A38771] font-bold tracking-widest uppercase text-sm mb-4">The Core Methodology</p>
            <p className="text-[#F9F6F0]/80 leading-relaxed text-justify sm:text-left hyphens-auto">
              By engaging the mind and body simultaneously, it bypasses the traditional verbal defenses we build up, allowing true feelings and subconscious patterns to emerge onto the canvas or paper.
            </p>
          </motion.div>

          <div className="flex-1 flex flex-col gap-10">
            {[
              {
                title: "It's Not an Art Class",
                desc: "No artistic talent is required. The focus is entirely on the process of creation and the feelings it evokes, not on creating a masterpiece."
              },
              {
                title: "It's a Safe Space",
                desc: "You choose what to share and what to keep private. Your artwork serves as a container for intense emotions, making them safer to observe."
              },
              {
                title: "It's for Everyone",
                desc: "Children processing developmental changes, teens navigating identity, and adults recovering from trauma or burnout can all deeply benefit."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="border-l border-[#A38771]/50 pl-6"
              >
                <h3 className="text-xl font-serif text-white mb-2">{item.title}</h3>
                <p className="text-[#F9F6F0]/60 leading-relaxed text-sm text-justify sm:text-left hyphens-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: WHY IT WORKS (Light Ivory)
          ========================================= */}
      <section className="py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px] max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-[#222222] mb-6">Why Art Therapy Works</h2>
          <p className="text-[#4A4A4A] text-lg leading-relaxed mb-6 text-justify sm:text-left hyphens-auto">
            Research shows that creating art engages different parts of the brain than talking does. It bypasses the language centers (which are often blocked during trauma or extreme stress), allowing us to access memories, emotions, and thoughts that might be too difficult or painful to put into words.
          </p>
          <p className="text-[#4A4A4A] text-lg leading-relaxed text-justify sm:text-left hyphens-auto">
            By externalizing a problem—putting it on paper—it becomes something you can look at objectively, manipulate, and eventually understand and resolve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-serif text-[#222222] mb-6">How Art Therapy Shapes Personality</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-[#C05C44] font-bold mt-1">01</span>
                <div>
                  <h4 className="font-bold text-[#222222] mb-1">Boosts Self-Esteem</h4>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed text-justify sm:text-left hyphens-auto">The act of creating something tangible provides an immediate sense of accomplishment and agency.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-[#C05C44] font-bold mt-1">02</span>
                <div>
                  <h4 className="font-bold text-[#222222] mb-1">Enhances Emotional Resilience</h4>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed text-justify sm:text-left hyphens-auto">Provides a safe sandbox to experience and tolerate frustration, imperfection, and problem-solving.</p>
                </div>
              </li>
            </ul>
          </motion.div>

         <motion.div 
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="bg-[#EFECE5] rounded-sm overflow-hidden min-h-[250px] sm:min-h-[350px] h-full relative"
>
  <img 
    src="https://images.unsplash.com/photo-1589460626671-5f033018f87a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Art Therapy Session" 
    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
  />
</motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: EFFECTIVENESS STATS (Warm Beige)
          ========================================= */}
      <section className="bg-[#EFECE5] py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center sm:text-left"
          >
            <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Data Driven</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#222222]">How Effective is Art Therapy?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: "73%", title: "Reduction in Symptoms", text: "of patients experienced a significant reduction in depression and anxiety symptoms after 10-12 consistent sessions." },
              { stat: "1,000+", title: "Clinical Studies", text: "have rigorously shown the effectiveness of art therapy in treating a wide range of psychological and psychosomatic conditions." },
              { stat: "80%", title: "Improved Regulation", text: "of individuals report highly improved emotional regulation, self-awareness, and self-esteem through art interventions." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white border border-[#A38771]/20 p-8 shadow-sm rounded-sm"
              >
                <div className="text-5xl font-serif text-[#C05C44] mb-4">{item.stat}</div>
                <h4 className="font-bold text-[#222222] mb-3">{item.title}</h4>
                <p className="text-sm text-[#4A4A4A] leading-relaxed text-justify sm:text-left hyphens-auto">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#1E3A34] text-white p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-serif text-lg">Backed by the American Art Therapy Association (AATA)</p>
            <p className="text-sm text-[#F9F6F0]/70 max-w-md border-l border-[#F9F6F0]/20 pl-4">
              "Art therapy is an effective treatment for persons experiencing developmental, medical, educational, and social or psychological impairment."
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: EXPERT PROFILE (Light Ivory)
          ========================================= */}
      <section className="py-24 px-6 sm:px-12 md:px-20 lg:pl-22.5 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-2/5 aspect-[3/4] bg-[#EFECE5] overflow-hidden border border-[#A38771]/30 rounded-sm"
        >
          <img 
            src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752894/roksana_2_peisij.jpg" 
            alt="Roksana Sultana" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/5"
        >
          <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Lead Specialist</span>
          <h2 className="text-4xl font-serif text-[#222222] mb-2">Roksana Sultana, PhD Researcher</h2>
          <p className="text-sm text-[#C05C44] uppercase tracking-widest font-bold mb-8">Psychologist · Art Therapist</p>
          
          <p className="text-[#4A4A4A] leading-relaxed mb-6 text-justify sm:text-left hyphens-auto">
            With over 15 years of clinical and assessment practice, Dr. Sultana pioneers the integration of art-based methods in Bangladesh. She specializes in working with adults and adolescents dealing with profound stress, trauma, and life transitions.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-10 text-justify sm:text-left hyphens-auto">
            Her approach is rooted in the belief that when cognitive and verbal channels are overwhelmed by trauma or anxiety, the creative process offers a dignified, non-threatening pathway back to the self.
          </p>

          <blockquote className="border-l-2 border-[#C05C44] pl-6 py-2">
            <p className="font-serif italic text-2xl text-[#A38771] leading-snug">
              "Art is a safe place to put your feelings when they don't have anywhere else to go."
            </p>
          </blockquote>
        </motion.div>
      </section>

      {/* =========================================
          SECTION 5B: MORE ABOUT ROKSANA (Warm Beige)
          ========================================= */}
      <section className="bg-[#EFECE5] py-16 sm:py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Meet the Therapist</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#222222] mb-6">Psychologist, Painter, Art Therapist</h2>
            <div className="space-y-5 text-[#4A4A4A] leading-relaxed text-justify sm:text-left hyphens-auto">
              <p>
                Roksana studied psychology at the University of Dhaka, completing her BSc in 2000 and her MSc in 2002. She is now a PhD researcher at the same university, studying emotional intelligence and organisational leadership in Bangladesh.
              </p>
              <p>
                Since May 2026 she has worked as Psychologist and Art Therapist with the Department of Public Health and Informatics at BRAC University. From 2023 to 2024 she was Psychologist and Master Trainer in the Department of Public Health and Informatics at Bangladesh Medical University, formerly BSMMU. Before that she co-founded Career Stride Bangladesh, taught organisational behaviour at Jahangirnagar University, and ran training programmes for organisations including Grameenphone, Robi, BRAC Bank, BBC Media Action, State Bank of India and the Bangladesh Air Force.
              </p>
              <p>
                Her painting practice runs alongside the clinical work. Between 2023 and 2025 she showed in ten group exhibitions, including Dreamscape Nepal at the Nepal Art Council in Kathmandu, One at the Nandalal Bose Gallery of the Indian Council for Cultural Relations, Red Horse at Dubai Warehouse, and shows at Drik Gallery, Bangla Academy and Shilpakala Academy in Bangladesh. Her canvases explore inner peace, identity and resilience.
              </p>
              <p>
                She works with individuals on stress, trauma and emotional regulation, runs themed group workshops, and designs art-based wellbeing programmes for corporate teams. She also holds certifications in art therapy, mindfulness, the Quantum Method and the Silva Method. Sessions are available in Bangla and English, in person in Dhaka or online.
              </p>
            </div>
            <blockquote className="border-l-2 border-[#C05C44] pl-6 py-2 mt-8">
              <p className="font-serif italic text-xl sm:text-2xl text-[#A38771] leading-snug">
                "Art allows the subconscious mind to speak in colors, shapes, and symbols."
              </p>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="grid grid-cols-1 gap-4">
              {roksanaFacts.map((f) => (
                <div key={f.label} className="bg-white border border-[#A38771]/20 p-5 rounded-sm shadow-sm">
                  <div className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-1">{f.label}</div>
                  <div className="text-[#222222] text-sm leading-relaxed break-words">{f.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {(() => {
          const portraits = [
            { src: IMG.portraitBlack, alt: "Portrait of Roksana Sultana in a black saree" },
            { src: IMG.portraitWhite, alt: "Portrait of Roksana Sultana" },
            { src: IMG.portraitBlue, alt: "Portrait of Roksana Sultana in a blue saree" },
            { src: IMG.artistAtWork, alt: "Roksana Sultana painting in the studio" },
          ].filter((im) => im.src);
          if (!portraits.length) return null;
          const cols = portraits.length >= 4 ? "lg:grid-cols-4" : portraits.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
          return (
            <div className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 ${cols} gap-5 mt-16 items-start`}>
              {portraits.map((im, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="overflow-hidden rounded-sm border border-[#A38771]/30 bg-white"
                >
                  <Img src={im.src} alt={im.alt} className="w-full h-auto block hover:scale-105 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* =========================================
          SECTION 5C: RETREAT (Deep Green)
          ========================================= */}
      <section className="relative bg-[#1E3A34] text-[#F9F6F0] py-16 sm:py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px] overflow-hidden">
        {/* soft decorative glow */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#A38771]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#C05C44]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          {/* ---- Poster, large and first ---- */}
          {IMG.retreatPoster && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-6xl mx-auto mb-10 sm:mb-16"
            >
              <div className="p-2 sm:p-3 bg-white/5 border border-[#A38771]/40 rounded-sm shadow-2xl">
                <Img
                  src={IMG.retreatPoster}
                  alt="Event poster for the Mindful Art Therapy retreat at The Spot, Purbachal"
                  className="w-full h-auto block rounded-sm"
                />
              </div>
            </motion.div>
          )}

          {/* ---- Heading ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-10 sm:mb-16"
          >
            <span className="inline-block text-[#A38771] text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.25em] leading-relaxed mb-5 border border-[#A38771]/40 px-4 py-2 rounded-2xl sm:rounded-full">
              {retreat.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-[1.15] mb-5 sm:mb-6 break-words">{retreat.title}</h2>
            <p className="text-[#A38771] italic font-serif text-lg sm:text-xl md:text-2xl leading-snug max-w-3xl mx-auto">{retreat.lead}</p>
            <div className="w-16 h-px bg-[#A38771] mx-auto mt-8 sm:mt-10" />
          </motion.div>

          {/* ---- Story + details ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-6"
            >
              {retreat.paragraphs.map((t, i) =>
                i === 2 ? (
                  <blockquote key={i} className="border-l-2 border-[#C05C44] bg-white/5 pl-4 pr-4 sm:pl-6 sm:pr-6 py-4 sm:py-5 rounded-r-sm">
                    <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#F9F6F0]/90 leading-relaxed">{t}</p>
                  </blockquote>
                ) : (
                  <p
                    key={i}
                    className={`leading-relaxed text-justify sm:text-left hyphens-auto ${i === 0 ? "text-lg sm:text-xl text-[#F9F6F0]" : "text-base sm:text-lg text-[#F9F6F0]/75"}`}
                  >
                    {t}
                  </p>
                )
              )}
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 lg:sticky lg:top-28"
            >
              <div className="bg-white/5 border border-[#A38771]/30 rounded-sm p-6 sm:p-8 backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#A38771] mb-6">Retreat Details</h3>
                <dl className="space-y-6">
                  {retreat.facts.map((f) => (
                    <div key={f.label} className="border-b border-[#F9F6F0]/10 pb-5 last:border-0 last:pb-0">
                      <dt className="text-xs uppercase tracking-widest text-[#F9F6F0]/50 mb-1">{f.label}</dt>
                      <dd className="font-serif text-base sm:text-lg text-white leading-snug break-words">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  onClick={scrollToForm}
                  className="mt-8 w-full bg-[#C05C44] hover:bg-[#a84d37] text-white px-4 sm:px-8 py-4 font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm transition-colors duration-300 rounded-sm shadow-sm"
                >
                  Ask About the Next Retreat
                </button>
              </div>
            </motion.aside>
          </div>

          {/* ---- Gallery ---- */}
          {retreat.gallery.some((g) => g.img) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-6xl mx-auto items-start">
              {retreat.gallery.filter((g) => g.img).map((g, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div className="overflow-hidden rounded-sm border border-[#A38771]/30">
                    <Img
                      src={g.img}
                      alt={g.alt}
                      className="w-full h-auto block hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <figcaption className="text-sm sm:text-base text-[#F9F6F0]/60 mt-3 leading-snug italic font-serif">{g.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          SECTION 5D: WORKSHOPS & SESSIONS (Light Ivory)
          ========================================= */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10 sm:mb-16"
        >
          <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Programmes</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#222222] mb-6">Workshops and Sessions with Roksana</h2>
          <p className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed text-justify sm:text-left hyphens-auto">
            From a day-long group workshop to a family painting or a live session on Zoom, here is what working with Roksana looks like in practice.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16 items-start">
          {programmes.map((p) => (
            <ProgrammeCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* =========================================
          SECTION 5E: TECHNIQUES (Warm Beige)
          ========================================= */}
      <section className="bg-[#EFECE5] py-16 sm:py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12 max-w-3xl"
          >
            <span className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Techniques Gallery</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#222222] mb-4">What Happens on the Page</h2>
            <p className="text-[#4A4A4A] text-base sm:text-lg leading-relaxed text-justify sm:text-left hyphens-auto">
              Five techniques Roksana uses, what each one asks of you, and why.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {techniques.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-[#A38771]/20 shadow-sm rounded-sm overflow-hidden"
              >
                <Img src={t.img} alt={t.alt} className="w-full h-auto block bg-[#EFECE5]" />
                <div className="p-6 sm:p-10 flex flex-col sm:flex-row gap-2 sm:gap-5">
                  <span className="text-[#C05C44] font-serif text-2xl sm:text-3xl leading-none">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-serif text-[#222222] mb-3">{t.name}</h3>
                    <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed text-justify sm:text-left hyphens-auto">{t.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {(VIDEO.mandala || VIDEO.neurographic) && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mt-12">
              {VIDEO.mandala && (
                <figure>
                  <video src={VIDEO.mandala} controls preload="metadata" className="w-full max-h-[320px] object-contain block rounded-sm bg-black" />
                  <figcaption className="text-xs text-[#4A4A4A] mt-2">Mandala drawing process (1 min 46 s)</figcaption>
                </figure>
              )}
              {VIDEO.neurographic && (
                <figure>
                  <video src={VIDEO.neurographic} controls preload="metadata" className="w-full max-h-[320px] object-contain block rounded-sm bg-black" />
                  <figcaption className="text-xs text-[#4A4A4A] mt-2">Neurographic colouring process (28 s)</figcaption>
                </figure>
              )}
            </div>
          )}

          <p className="text-xs italic text-[#4A4A4A]/80 mt-8">All artwork shown is reproduced without names.</p>
        </div>
      </section>

      {/* =========================================
          SECTION 5F: RESERVE (Light Ivory)
          ========================================= */}
      <section className="py-16 px-6 sm:px-12 md:px-20 lg:pl-[90px] max-w-4xl mx-auto text-center">
        <p className="border-l-[3px] border-[#C05C44] pl-5 text-left text-[#222222] font-medium leading-relaxed">
          To reserve an individual or group session with Roksana Sultana, use the form below or message her on WhatsApp at{" "}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#C05C44] underline">
            +880 1355-470255
          </a>
          .
        </p>
      </section>

      {/* =========================================
          SECTION 6: EXACT PREVIOUS BOOKING FORM
          ========================================= */}
      <section id="art-therapy-form" className="bg-[#1E3A34] text-[#F9F6F0] py-24 px-6 sm:px-12 md:px-20 lg:pl-[90px]">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-white">Begin Your Healing Journey</h2>
            <p className="text-[#F9F6F0]/70 leading-relaxed max-w-2xl mx-auto">
              Art therapy sessions are available for individuals, couples, and specialized groups. No prior art experience is needed—only a willingness to explore.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#EFECE5] shadow-2xl p-8 sm:p-12 md:p-14 w-full rounded-sm text-[#222222]"
          >
            <div className="mb-10">
              <div className="text-[#A38771] text-xs font-bold uppercase tracking-[0.2em] mb-2">Book a session</div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#222222] border-b border-[#EFECE5] pb-4">
                 +880 1355-470255 · whynotyou.psy@gmail.com
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Your name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Phone we should call</label>
                  <input
                    required
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
                  />
                </div>
              </div>

              {/* Specialist Dropdown */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Specialist</label>
                <div className="relative">
                  <select
                    value={formData.specialist}
                    onChange={(e) => setFormData({...formData, specialist: e.target.value})}
                    className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-4 outline-none focus:border-[#A38771] transition-colors appearance-none cursor-pointer rounded-sm"
                  >
                    <option value="" className="text-[#4A4A4A]">Select a specialist (Optional)</option>
                    {experts.map(exp => (
                      <option key={exp.initials} value={exp.name}>{exp.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#222222]">▼</div>
                </div>
              </div>

              {/* Concern Textarea */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">
                  Briefly, what is going on? What would you like help with?
                </label>
                <textarea
                  rows={4}
                  value={formData.concern}
                  onChange={(e) => setFormData({...formData, concern: e.target.value})}
                  className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-5 py-4 outline-none focus:border-[#A38771] transition-colors resize-none rounded-sm"
                ></textarea>
              </div>

              {/* Preferred Days */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Preferred days</label>
                <div className="flex flex-wrap gap-3">
                  {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"].map((day) => {
                    const isSelected = formData.days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleArrayItem("days", day)}
                        className={`px-5 py-2 text-sm transition-all duration-300 border rounded-sm ${
                          isSelected
                            ? "bg-[#EFECE5] text-[#222222] border-[#A38771] font-bold"
                            : "bg-[#F9F6F0] border-[#EFECE5] text-[#4A4A4A] hover:border-[#A38771] hover:text-[#222222]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Preferred time</label>
                <div className="flex flex-wrap gap-3">
                  {["Morning", "Afternoon", "Evening after 6pm"].map((time) => {
                    const isSelected = formData.times.includes(time);
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleArrayItem("times", time)}
                        className={`px-5 py-2 text-sm transition-all duration-300 border rounded-sm ${
                          isSelected
                            ? "bg-[#EFECE5] text-[#222222] border-[#A38771] font-bold"
                            : "bg-[#F9F6F0] border-[#EFECE5] text-[#4A4A4A] hover:border-[#A38771] hover:text-[#222222]"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#222222] mb-3 uppercase">Language</label>
                <div className="flex flex-wrap gap-3">
                  {["English", "বাংলা"].map((lang) => {
                    const isSelected = formData.language.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleArrayItem("language", lang)}
                        className={`px-6 py-2 text-sm transition-all duration-300 border rounded-sm ${
                          isSelected
                            ? "bg-[#EFECE5] text-[#222222] border-[#A38771] font-bold"
                            : "bg-[#F9F6F0] border-[#EFECE5] text-[#4A4A4A] hover:border-[#A38771] hover:text-[#222222]"
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Success Message */}
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 p-4 text-sm font-bold text-center flex items-center justify-center gap-2 rounded-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Request sent successfully! We will contact you soon.
                </motion.div>
              )}

              {/* Submit Button & Disclaimer */}
              <div className="pt-6 border-t border-[#EFECE5] text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto relative overflow-hidden bg-[#222222] disabled:bg-[#EFECE5] disabled:text-[#4A4A4A] disabled:cursor-not-allowed text-[#F9F6F0] hover:bg-[#4A4A4A] border border-transparent font-bold text-sm uppercase tracking-widest px-12 py-4 transition-all duration-300 flex justify-center items-center gap-3 mx-auto rounded-sm shadow-sm"
                >
                  <span className="relative z-10">{isSubmitting ? "Sending..." : "Request this session"}</span>
                </button>
                
                <p className="text-[#4A4A4A] text-xs mt-4 tracking-wide">
                  You will get a call from WNY within one working day. Nothing is charged until the time is agreed.
                </p>
              </div>

            </form>
          </motion.div>

        </div>
      </section>

    </div>
  );
}