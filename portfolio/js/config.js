/* =====================================================================
   YOUR CONTENT — all text, links, projects and designs live here.
   Edit this file to update the site; you shouldn't need to touch the
   other JS files for content changes. See README.md for examples.
   ===================================================================== */
const CONFIG = {
  name: "Chris Alex",
  initials: "CA",
  role: "Frontend Developer · UI/UX Designer · Graphic Designer",
  terminal: [
    ["whoami", "Frontend developer, UI/UX designer and graphic designer — CS undergrad"],
    ["ls skills", "html/  css/  javascript/  react/  figma/  photoshop "],
    ["cat status.txt", "Open to new opportunities ✦"]
  ],
  github: "Chris42alex",
  // Work folders. Each project in "Projects" opens as a README: "desc" is the overview, "tags" the tech stack,
  // the optional "features" list adds a Highlights section, e.g. features:["Booking flow","Admin dashboard"],
  // and an optional link:"https://..." adds a "View project ↗" button.
  // (For Web/Graphic Design cards, "image" is optional: put a file next to index.html, e.g. image:"poster.png")
  folders: [
    { name:"Projects", color:"#6b9bd1", type:"github", desc:"Selected builds — open a project to read about it.",
      items:[
        { title:"SACK.IT",
          desc:"SACK (Smart Automated Classification & Knowledge) is an AI-driven IT ticketing backend designed to reduce manual overhead in enterprise IT support. It automates the entire ticket lifecycle — from email ingestion to resolution and knowledge retention — using a combination of rule-based logic, machine learning classification, and semantic vector search.",
          tags:["Python","React"] },
        { title:"Cadence",
          desc:"Cadence turns an event's details and a message template into a live, multilingual outbound calling campaign in a few clicks. An AI voice agent phones each guest in English, Hindi or Tamil, records whether they will attend from their speech or their keypad, handles voicemail and non-responders, and shows the results in a dashboard by campaign, language and audience segment.",
          tags:["Python","TypeScript","ElevenLabs API"] }
      ] },
    // Web Design: each folder opens the live website in a new tab
    { name:"Web Design", color:"#e0a85c", type:"sites", desc:"Websites I've designed — open a folder to visit the live site.",
      items:[
        { title:"Well Reach Logistics", link:"https://www.wellreachlogistics.com/" },
        { title:"UNEX Logistics", link:"https://unexworld.com/" }
      ] },
    // Graphic Design: a filterable gallery. "f" is the file name inside assets/graphic/ (without .webp); a small copy goes in assets/graphic/thumbs/.
    // "c" is the filter group. Banners are shown wide; everything else as posters.
    { name:"Graphic Design", color:"#6fbf95", type:"gallery", desc:"Event posters, banners and social media creatives.", more:"https://www.behance.net/chrisalex9",
      items:[
        { f:"build-and-ship", t:"Build and Ship", c:"Banners" },
        { f:"asthra-11",      t:"Asthra 11.0 — National Tech Fest", c:"Banners" },
        { f:"space",          t:"India's Space Journey", c:"Banners" },
        { f:"prayana",        t:"Prayana — The Legacy", c:"Banners" },
        { f:"design-01",      t:"Kalari — Meet the Host", c:"Banners" },
        { f:"call-uiux-designer",    t:"Call for UI/UX Designer", c:"Events" },
        { f:"call-graphic-designer", t:"Call for Graphic Designer", c:"Events" },
        { f:"sih-internal",   t:"Smart India Hackathon — Internal", c:"Events" },
        { f:"design-02",      t:"Insendium 10.0", c:"Events" },
        { f:"thank-you-ceo",  t:"Thank You CEO", c:"People" },
        { f:"design-03",      t:"Asthra 10.0", c:"Events" },
        { f:"tech-meetup",    t:"Invite-only Tech Meetup", c:"Events" },
        { f:"new-year-2026",  t:"New Year 2026", c:"Events" },
        { f:"design-23",      t:"Prayana — Gold Edition", c:"Events" },
        { f:"design-19",      t:"Destroyer of Worlds", c:"People" },
        { f:"design-05",      t:"SJCET Summer Bootcamp", c:"Events" },
        { f:"design-11",      t:"Wednesday Cafe", c:"People" },
        { f:"design-09",      t:"Tech Talkies Magazine", c:"Events" },
        { f:"design-06",      t:"Think Less, Do More", c:"Events" },
        { f:"design-07",      t:"We're Hiring — UI/UX Intern", c:"Events" },
        { f:"design-14",      t:"Creative Lead", c:"People" },
        { f:"design-08",      t:"MSME Idea Hackathon 5.0", c:"Events" },
        { f:"design-12",      t:"Expert Talk — Gen AI & LLMs", c:"People" },
        { f:"design-04",      t:"Kalari", c:"Events" },
        { f:"design-16",      t:"Women Innovation Lead", c:"People" },
        { f:"design-10",      t:"CODM — Call for Lineup", c:"Events" },
        { f:"design-17",      t:"Prayana — Chief Guest", c:"People" },
        { f:"sih",            t:"Smart India Hackathon", c:"Events" },
        { f:"design-21",      t:"Launchpad Kerala Internships", c:"Events" },
        { f:"design-13",      t:"Execom '25", c:"People" },
        { f:"design-15",      t:"Execom Leads", c:"People" },
        { f:"design-24",      t:"Tech Talkies", c:"Events" },
        { f:"design-22",      t:"Tech Talkies — Technical Paper", c:"Events" },
        { f:"BUILD BACK",     t:"Build Back", c:"Events" },
        { f:"BUILD X",        t:"Build X", c:"Events" }
        

      ] }
  ],
  // Social links (Contact buttons) — add more like  LinkedIn:"https://www.linkedin.com/in/your-name"
  links: {
    LinkedIn:"https://www.linkedin.com/in/chris-oommen-alex/",
    GitHub:"https://github.com/Chris42alex",
    Behance:"https://www.behance.net/chrisalex9",
    Email:"mailto:alexchrisalex42@gmail.com"
  },
  // Résumé card: clicking it opens this link; the lines below are the contact details shown on it
  resume: "https://drive.google.com/file/d/1u_nc-cypZjJ0ikMbkRT-gyT-cb_gVWqx/view?usp=sharing",
  card: [
    ["✉", "alexchrisalex42@gmail.com"],
    ["⌂", "India | UAE"],
    ["in", '<a href="https://www.linkedin.com/in/chris-oommen-alex/" target="_blank" onclick="event.stopPropagation()">chris-oommen-alex</a>'],
    ["gh", '<a href="https://github.com/Chris42alex" target="_blank" onclick="event.stopPropagation()">github/Chris42alex</a>']
  ],
  swatches: [["#141414","Ink"],["#a259ff","Violet"],["#1abcfe","Sky"],["#0acf83","Mint"],["#f24e1e","Coral"]],
  tools: ["Figma","Illustrator","Photoshop","React","CSS"]
};
