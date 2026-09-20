/**
 * PROJECTS DATA — add a new project by appending ONE entry to the PROJECTS array,
 * and a new filter pill by appending ONE entry to the PROJECT_TAGS array.
 *
 * Entry fields:
 *   title (required) Project name shown on hover overlay.
 *   tags  (required) Array of slugs from PROJECT_TAGS; a project can have several.
 *   cover (required) Image path, e.g. 'assets/img/projects/my-project.png'.
 *   coverWebp (optional) WebP version of the cover, served to supporting
 *              browsers via <picture> (smaller, same image). Generate with
 *              sharp: npx sharp-cli resize 1200 -o out.webp input.png
 *   links (required) Array of { url, title, icon } — icon is a boxicons class
 *                    (e.g. 'bxl-github', 'bx-world', 'bxl-youtube').
 *
 * Add a tag: { slug: 'mobile', label: 'Mobile' } — slug must match the tags array.
 */

const PROJECT_TAGS = [
  { slug: 'fullstack', label: 'Full-Stack' },
  { slug: 'webdev', label: 'Web Dev' },
  { slug: 'ai-ml', label: 'AI & ML' },
  { slug: 'iot', label: 'IoT' },
  { slug: 'opensource', label: 'Open Source' }
];

const PROJECTS = [
  {
    title: "Article Craft",
    tags: ["opensource"],
    cover: "assets/img/projects/article-craft.jpg",
    coverWebp: "assets/img/projects/article-craft.webp",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/article-craft", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "Go Handbook for Software Engineers",
    tags: ["opensource"],
    cover: "assets/img/projects/go-handbook.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Go-Handbook-for-Software-Engineers", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "The AI Handbook",
    tags: ["opensource"],
    cover: "assets/img/projects/ai-handbook.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/The-AI-Handbook", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "LLD Handbook for Coding Interviews",
    tags: ["opensource"],
    cover: "assets/img/projects/lld-handbook.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/LLD-Handbook-for-Coding-Interviews", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "DSA Handbook for Coding Interviews",
    tags: ["opensource"],
    cover: "assets/img/projects/dsa-handbook.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/DSA-Handbook-for-Coding-Interviews", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "HLD Handbook for Coding Interviews",
    tags: ["opensource"],
    cover: "assets/img/projects/hld-handbook.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/HLD-Handbook-for-Coding-Interviews", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "MathQuest - Online Learning Management System(e-LMS)",
    tags: ["fullstack"],
    cover: "assets/img/projects/MathQuest.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/mathquest", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "Graduate Market Place",
    tags: ["fullstack"],
    cover: "assets/img/projects/GMP.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Graduate-Market-Place", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "Librarian Bot",
    tags: ["fullstack"],
    cover: "assets/img/projects/librarian-bot.jpg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Librarian-Bot", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "The Hobby Hub",
    tags: ["webdev"],
    cover: "assets/img/projects/hobby-hub.jpeg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Hobby-Hub", title: "Github Repo", icon: "bxl-github" },
      { url: "https://hobby-hub-tharun.netlify.app/", title: "Website", icon: "bx-world" }
    ]
  },
  {
    title: "Resume GraphQL API",
    tags: ["webdev"],
    cover: "assets/img/projects/resume-graphql.jpg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Resume-GraphQL-API", title: "Github Repo", icon: "bxl-github" },
      { url: "https://tharun-resume-graphql-api.vercel.app/api/graphql", title: "Website", icon: "bx-world" }
    ]
  },
  {
    title: "Phish Detect Pro",
    tags: ["ai-ml"],
    cover: "assets/img/projects/Phish-detect-pro.jpg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/PhishDetectPro", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "Codepath WEB102 Projects(Spring 2024 Cohort)",
    tags: ["webdev"],
    cover: "assets/img/projects/codepath-projects.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Codepath-WEB102-Projects", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "Tweety - Virtual Voice Assistant",
    tags: ["ai-ml"],
    cover: "assets/img/projects/Tweety.jpg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Tweety-Virtual-Voice-Assistant", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "Weather based Trip Planning Application",
    tags: ["webdev"],
    cover: "assets/img/projects/weather-trip-app.jpg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/prep-project-23.MAR.PREP.2", title: "Github Repo", icon: "bxl-github" },
      { url: "https://mlh-prep-23-mar-prep-2-project.netlify.app/", title: "Website", icon: "bx-world" }
    ]
  },
  {
    title: "The Reptilian Game",
    tags: ["webdev"],
    cover: "assets/img/projects/reptilian.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/The-Reptilian-Game", title: "Github Repo", icon: "bxl-github" },
      { url: "https://tharunkumarreddypolu.github.io/The-Reptilian-Game/", title: "Website", icon: "bx-world" }
    ]
  },
  {
    title: "Smart Agriculture System using Iot",
    tags: ["iot"],
    cover: "assets/img/projects/Smart-agri.jpg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Smart-Agriculture-System-using-Iot", title: "Github Repo", icon: "bxl-github" },
      { url: "https://www.youtube.com/watch?v=oo1nPQSroXY", title: "Youtube", icon: "bxl-youtube" }
    ]
  },
  {
    title: "Motion Sensor Home Security System",
    tags: ["iot"],
    cover: "assets/img/projects/motion-sensor.png",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Motion-Sensor-Home-Security-System-", title: "Github Repo", icon: "bxl-github" }
    ]
  },
  {
    title: "Lab Attendance System using Web App and RFID",
    tags: ["iot"],
    cover: "assets/img/projects/smart-attendance.jpg",
    links: [
      { url: "https://github.com/TharunKumarReddyPolu/Lab-Attendance-System-using-Web-App-and-RFID", title: "Github Repo", icon: "bxl-github" }
    ]
  }
];
