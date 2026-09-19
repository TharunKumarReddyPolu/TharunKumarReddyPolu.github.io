/**
 * CERTIFICATIONS DATA — add a new certification by appending ONE entry to the
 * CERTIFICATIONS array, and a new filter pill by appending ONE entry to the
 * CERT_TAGS array. Cards and pills are generated automatically; never edit
 * index.html for certifications.
 *
 * Entry fields:
 *   title  (required) Certificate name shown on hover overlay.
 *   issuer (required) Issuing org shown under the title.
 *   tags   (required) Array of slugs from CERT_TAGS; several allowed.
 *   img    (required) Certificate image (also used as the zoom-in lightbox src).
 *   url    (optional) Credential link (Credly etc.) rendered as a second icon;
 *                     omit the field for no link.
 *
 * Note: the previously disabled Google Digital Garage card was not migrated;
 * re-add it here as a normal entry if you ever want it back.
 */
const CERT_TAGS = [
  { slug: 'salesforce', label: 'Salesforce' },
  { slug: 'mcsft', label: 'Microsoft' },
  { slug: 'anthropic', label: 'Anthropic' },
  { slug: 'aws', label: 'AWS' },
  { slug: 'univ', label: 'University' },
  { slug: 'tcs', label: 'TCS' },
  { slug: 'codepath', label: 'CodePath' },
  { slug: 'udemy', label: 'Udemy' },
  { slug: 'coursera', label: 'Coursera' },
  { slug: 'misc', label: 'Misc.' }
];

const CERTIFICATIONS = [
  {
    title: "CMU Agentic AI",
    issuer: "Carnegie Mellon University",
    tags: ["univ"],
    img: "assets/img/certifications/CMU_Agentic_AI.jpg",
    url: "https://certificates.emeritus.org/8495d738-0b33-4318-81d6-4f2ca308ebd4#acc.s2W1IPpN"
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    tags: ["anthropic"],
    img: "assets/img/certifications/anthropic-cc-101.jpg"
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    tags: ["anthropic"],
    img: "assets/img/certifications/anthropic-CCIA.jpg"
  },
  {
    title: "Introduction to Subagents",
    issuer: "Anthropic",
    tags: ["anthropic"],
    img: "assets/img/certifications/anthropic-subagents.jpg"
  },
  {
    title: "Salesforce Certified Agentforce Specialist",
    issuer: "Salesforce",
    tags: ["salesforce"],
    img: "assets/img/certifications/Salesforce-Agentforce-Specialist.jpg"
  },
  {
    title: "AWS Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    tags: ["aws"],
    img: "assets/img/certifications/AWS-SAA-C03.jpg",
    url: "https://www.credly.com/badges/e3e5b7cd-6453-4572-8716-33b91ae66ecc"
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    tags: ["aws"],
    img: "assets/img/certifications/AWS-CLF-C02.jpg",
    url: "https://www.credly.com/badges/ee9482cd-2f0e-4811-b1e2-ad8a4f8517f8"
  },
  {
    title: "AZ 204",
    issuer: "Microsoft",
    tags: ["mcsft"],
    img: "assets/img/certifications/AZ204.jpg",
    url: "https://www.credly.com/badges/eab35436-8a9d-4437-8db3-8f2a392833a8/accept"
  },
  {
    title: "AZ900",
    issuer: "Microsoft",
    tags: ["mcsft"],
    img: "assets/img/certifications/AZ900.jpg",
    url: "https://www.credly.com/badges/0e4cecbe-a93c-4199-937d-644aff5c29c7"
  },
  {
    title: "PL 900",
    issuer: "Microsoft",
    tags: ["mcsft"],
    img: "assets/img/certifications/PL900.jpg",
    url: "https://www.credly.com/badges/fb884648-aded-4b5b-ad47-2e7c73c34238"
  },
  {
    title: "Codepath WEB102",
    issuer: "Codepath",
    tags: ["codepath"],
    img: "assets/img/certifications/Codepath-web102.jpg"
  },
  {
    title: "Codepath TIP103",
    issuer: "Codepath",
    tags: ["codepath"],
    img: "assets/img/certifications/Codepath-TIP03.jpg"
  },
  {
    title: "Harvard CS50X",
    issuer: "Harvard",
    tags: ["univ"],
    img: "assets/img/certifications/Harvard-CS50x.png",
    url: "https://certificates.cs50.io/15ce231d-1323-48f2-b2ca-f33a3d46081d.png?size=letter"
  },
  {
    title: "Matlab",
    issuer: "Coursera",
    tags: ["coursera"],
    img: "assets/img/certifications/Coursera-Matlab.jpg"
  },
  {
    title: "ION",
    issuer: "TCS",
    tags: ["tcs"],
    img: "assets/img/certifications/TCS-ION.jpg"
  },
  {
    title: "Guvi Python",
    issuer: "Guvi",
    tags: ["misc"],
    img: "assets/img/certifications/Guvi.png",
    url: "https://www.guvi.in/verify-certificate?id=O23Dl11Z7196T9v79b"
  },
  {
    title: "MySQL",
    issuer: "Udemy",
    tags: ["udemy"],
    img: "assets/img/certifications/Udemy-MySQL.jpg"
  },
  {
    title: "HTML CSS",
    issuer: "Udemy",
    tags: ["udemy"],
    img: "assets/img/certifications/Udemy-HTML-CSS.jpg"
  },
  {
    title: "JS",
    issuer: "Udemy",
    tags: ["udemy"],
    img: "assets/img/certifications/Udemy-JS.jpg"
  },
  {
    title: "Microsoft",
    issuer: "Coursera",
    tags: ["coursera"],
    img: "assets/img/certifications/Coursera-mcsft.jpg"
  },
  {
    title: "University of Michigan",
    issuer: "Coursera",
    tags: ["coursera"],
    img: "assets/img/certifications/Coursera-UMich.jpg"
  },
  {
    title: "IoT",
    issuer: "Misc.",
    tags: ["misc"],
    img: "assets/img/certifications/cisco-iot.jpg"
  },
  {
    title: "PCAP",
    issuer: "Misc.",
    tags: ["misc"],
    img: "assets/img/certifications/PCAP.jpg"
  },
  {
    title: "Applause Award",
    issuer: "TCS",
    tags: ["tcs"],
    img: "assets/img/certifications/TCS_Applause_Award.jpg"
  },
  {
    title: "Fresco Play Miles Award",
    issuer: "TCS",
    tags: ["tcs"],
    img: "assets/img/certifications/TCS_Fresco_Play_Miles_Award.jpg"
  },
  {
    title: "On the Spot Team Award",
    issuer: "TCS",
    tags: ["tcs"],
    img: "assets/img/certifications/TCS_OTS_(Team)_Award1.jpg"
  },
  {
    title: "On the Spot Team Award",
    issuer: "TCS",
    tags: ["tcs"],
    img: "assets/img/certifications/TCS_OTS_(Team)_Award2.jpg"
  },
  {
    title: "On the Spot Award",
    issuer: "TCS",
    tags: ["tcs"],
    img: "assets/img/certifications/TCS_OTS_Award1.jpg"
  },
  {
    title: "On the Spot Award",
    issuer: "TCS",
    tags: ["tcs"],
    img: "assets/img/certifications/TCS_OTS_Award2.jpg"
  }
];
