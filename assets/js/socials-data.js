/**
 * SOCIAL LINKS — single source of truth for the hero and footer social rows.
 * main.js renders BOTH rows from this list (same order, same set), so adding
 * or editing a profile here updates the whole site in one place.
 *
 * Fields per entry:
 *   name       (required) Human-readable name; used for aria-label/title.
 *   url        (required) Profile URL (https).
 *   icon       Icon classes for font-icon profiles, e.g. 'bx bxl-linkedin'
 *              (Boxicons) or 'fa-brands fa-leetcode' (Font Awesome).
 *   img        Image-based profiles (e.g. Topmate has no font icon): path to
 *              the icon image used in the HERO row.
 *   imgFooter  Optional footer-row image variant (the footer uses a dark
 *              variant for Topmate). Falls back to `img` when omitted.
 *   cssClass   Optional anchor class for per-brand styling; defaults to a
 *              slug of `name`. Must match style.css selectors
 *              (e.g. 'stack-over-flow').
 *
 * Exactly one of `icon` or `img` must be present per entry.
 */

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/polu-tharun-kumar-reddy/",
    icon: "bx bxl-linkedin",
    cssClass: "linkedin"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/tharunreddypolu",
    icon: "bx bxl-twitter",
    cssClass: "twitter"
  },
  {
    name: "GitHub",
    url: "https://github.com/TharunKumarReddyPolu",
    icon: "bx bxl-github",
    cssClass: "github"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/tharun_reddy_polu/",
    icon: "bx bxl-instagram",
    cssClass: "instagram"
  },
  {
    name: "Discord",
    url: "https://discord.com/users/763436847296151612",
    icon: "bx bxl-discord",
    cssClass: "discord"
  },
  {
    name: "Topmate",
    url: "https://topmate.io/tharun_polu/",
    img: "assets/img/misc/topmate.png",
    imgFooter: "assets/img/misc/topmate1.png",
    cssClass: "topmate"
  },
  {
    name: "Medium",
    url: "https://medium.com/@TharunKumarReddyPolu",
    icon: "bx bxl-medium",
    cssClass: "medium"
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/TharunKumarReddyPolu/",
    icon: "fa-brands fa-leetcode",
    cssClass: "leetcode"
  },
  {
    name: "Linktree",
    url: "https://linktr.ee/tharunkumarreddypolu",
    icon: "fa-brands fa-linktree",
    cssClass: "linktree"
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/users/20667528/tharun-kumar-reddy-polu",
    icon: "bx bxl-stack-overflow",
    cssClass: "stack-over-flow"
  }
];
