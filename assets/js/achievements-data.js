/**
 * ACHIEVEMENTS — feeds the "Achievements & Extra Curricular Activities" list
 * in the Resume section. Rendered by main.js; to add an entry, append here
 * (newest first — the list is NOT auto-sorted, render order = array order).
 *
 * Fields per entry:
 *   year  (required) Displayed bold, followed by " | ".
 *   html  (required) The sentence as an HTML string. Inline <a> and <i> tags
 *         are expected here (this file is first-party content, not user
 *         input), e.g.:
 *         'The open-source <a target="_blank" href="https://...">DSA Handbook</a> crossed 500+ stars'
 */

const ACHIEVEMENTS = [
  {
    year: 2026,
    html: 'The open-source <a target="_blank" href="https://github.com/TharunKumarReddyPolu/DSA-Handbook-for-Coding-Interviews">DSA Handbook for Coding Interviews</a> crossed 500+ stars on GitHub'
  },
  {
    year: 2026,
    html: 'Received a trophy and goodies for successfully participating in the inaugural cohort of <a target="_blank" href="https://www.salesforce.com/">Salesforce</a>\'s "Reverse Mentorship Lab"'
  },
  {
    year: 2025,
    html: 'Published <a target="_blank" href="https://topmate.io/tharun_polu/1671931"> LLD Handbook for Coding Interviews</a> and received 750+ downloads'
  },
  {
    year: 2025,
    html: 'Published <a target="_blank" href="https://topmate.io/tharun_polu/1632874"> DSA Handbook for Coding Interviews</a> and received 5500+ downloads'
  },
  {
    year: 2024,
    html: 'Attained 12.6K views, 6.3K reads(average) with 900+ followers and official writer for 8 publications on Medium. <a target="_blank" href="https://medium.com/@TharunKumarReddyPolu">Check out my Medium profile <i class=\'bx bx-link-external\'></i></a>'
  },
  {
    year: 2024,
    html: 'Solved over 500+ coding problems on Leetcode, ranked among top 12% with contest rating of 1700+. <a target="_blank" href="https://leetcode.com/u/TharunKumarReddyPolu/">Check out my Leetcode profile <i class=\'bx bx-link-external\'></i></a>'
  },
  {
    year: 2023,
    html: 'Achieved top 0.1% on Topmate.io, offered peer mentorship for free to over 1000 students with an average rating of 4.8/5. <a target="_blank" href="https://topmate.io/tharun_polu/">Check out my Topmate profile <i class=\'bx bx-link-external\'></i></a>'
  },
  {
    year: 2023,
    html: 'Selected for a pod of 15 remote developers for MLH Prep Fellowship out of 30000+ applicants. <a target="_blank" href="https://mlh-prep-23-mar-prep-2-portfolio.netlify.app/">Check out pod portfolio <i class=\'bx bx-link-external\'></i></a>'
  },
  {
    year: 2022,
    html: 'Ranked top 50 out of 5,500 software developers in Microsoft\'s Power to You Coding Contest.'
  },
  {
    year: 2021,
    html: 'Placed in top 1% nationally(India) in TCS Digital Cadre coding challenge among over 150,000 participants.'
  }
];
