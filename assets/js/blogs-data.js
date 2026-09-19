/**
 * BLOGS DATA — add a new post by appending ONE entry to the BLOGS array,
 * and a new filter pill by appending ONE entry to the BLOG_TAGS array.
 *
 * Entry fields:
 *   title (required) Post title on the card.
 *   blurb (required) Short description shown under the title.
 *   tags  (required) Array of slugs from BLOG_TAGS; a post can have several.
 *   cover (required) Image path, e.g. 'assets/img/blogs/my-post.png'.
 *   url   (required) Link the card image and Read More button point to.
 *
 * Add a tag: { slug: 'career', label: 'Career' } — slug must match the tags array.
 */

const BLOG_TAGS = [
  { slug: 'interview', label: 'Interview Experiences' },
  { slug: 'system-design', label: 'System Design' },
  { slug: 'ai', label: 'Artificial Intelligence' },
  { slug: 'assistantship', label: 'Graduate Assistantships' },
  { slug: 'job-search', label: 'Job Search Tips' },
  { slug: 'mlh-codepath', label: 'MLH & Codepath' },
  { slug: 'tech', label: 'Tech Articles' }
];

const BLOGS = [
  {
    title: "My Salesforce AMTS New Grad Interview Experience: From Application to Offer",
    blurb: "A step-by-step breakdown of my journey landing a software engineering role at Salesforce - with tips, insights, and lessons learned along the way",
    tags: ["interview"],
    cover: "assets/img/blogs/salesforce-interview-experience.png",
    url: "https://medium.com/interviewnoodle/my-salesforce-amts-new-grad-interview-experience-from-application-to-offer-5ef0edb348f8"
  },
  {
    title: "Top 10 Open-Source Claude Code Plugins & Skills Every Developer Should Try",
    blurb: "From debugging and context management to token optimization and developer productivity, here are the open-source AI coding extensions that have significantly improved my development workflow.",
    tags: ["ai"],
    cover: "assets/img/blogs/open-source-claude-plugins.png",
    url: "https://medium.com/ai-in-plain-english/top-10-open-source-claude-code-plugins-skills-every-developer-should-try-c4ce71997ec7"
  },
  {
    title: "100+ YouTube Channels I Follow as a Software Engineer, Organized by Use Case",
    blurb: "My personal collection of YouTube channels for learning software engineering, AI, system design, career growth, finance, productivity, and staying updated with the world around technology.",
    tags: ["tech"],
    cover: "assets/img/blogs/youtube-channels.png",
    url: "https://medium.com/stackademic/100-youtube-channels-i-follow-as-a-software-engineer-organized-by-use-case-ff47cd379204"
  },
  {
    title: "Paid vs. Open-Source AI Coding Tools: Here’s what I’ve Learned After Using Both",
    blurb: "My journey exploring paid AI assistants and open-source alternatives, and what every developer should know before choosing their AI coding stack.",
    tags: ["ai"],
    cover: "assets/img/blogs/ai-coding-tools.png",
    url: "https://medium.com/stackademic/paid-vs-open-source-ai-coding-tools-heres-what-i-ve-learned-after-using-both-c665f3d15780"
  },
  {
    title: "Top 50 Must-Know Terminologies to Master Agentic AI",
    blurb: "Understand the building blocks of autonomous AI systems — from protocols to skills, tools, and multi-agent dynamics",
    tags: ["ai"],
    cover: "assets/img/blogs/top50-agentic-ai.png",
    url: "https://medium.com/ai-in-plain-english/top-50-must-know-terminologies-to-master-agentic-ai-83a1f4ca83a0"
  },
  {
    title: "Type Less, Connect More: Level Up Your Job Hunt Strategy",
    blurb: "Save hours on repetitive writing with these Chrome extensions so you can focus on building real connections and growing your professional network.",
    tags: ["job-search"],
    cover: "assets/img/blogs/save-typing-spend-networking.png",
    url: "https://medium.com/@TharunKumarReddyPolu/type-less-connect-more-level-up-your-job-hunt-strategy-3c7c67930a1b"
  },
  {
    title: "My CodePath 2X Student Experience: Part 2 | Summer 2024",
    blurb: "Ten weeks. Countless coding challenges. One intensive journey that pushed my problem-solving skills to the next level",
    tags: ["mlh-codepath"],
    cover: "assets/img/blogs/codepath-part2-summer-2024.png",
    url: "https://medium.com/@TharunKumarReddyPolu/my-codepath-2x-student-experience-part-2-summer-2024-33ae3a57d2ed"
  },
  {
    title: "My CodePath 2X Student Experience: Part 1 | Spring 2024",
    blurb: "Ten weeks. Countless bugs. One GitHub repo that tells the story of my spring 2024 hustle",
    tags: ["mlh-codepath"],
    cover: "assets/img/blogs/codepath-part1-spring-2024.png",
    url: "https://medium.com/@TharunKumarReddyPolu/my-codepath-2x-student-experience-part-1-spring-2024-34220928373f"
  },
  {
    title: "Top 20 Tools That Supercharged My Job Search Journey",
    blurb: "Navigating the job hunt felt overwhelming — until I found these tools that brought clarity, confidence, and momentum to my job hunt journey",
    tags: ["job-search"],
    cover: "assets/img/blogs/ultimate-job-hunt-toolkit.png",
    url: "https://medium.com/stackademic/top-20-tools-that-supercharged-my-job-search-journey-a27cc81f7dff"
  },
  {
    title: "My Amazon Software Development Engineer New Grad Interview Experience",
    blurb: "A journey that tested my skills and confidence - I performed well, but still faced rejection. Grateful for the experience, which made me more determined.",
    tags: ["interview"],
    cover: "assets/img/blogs/amazon-interview-experience.png",
    url: "https://medium.com/stackademic/my-amazon-software-development-engineer-new-grad-interview-experience-f16d4ccba896"
  },
  {
    title: "My Uber Software Engineer New Grad Interview Experience",
    blurb: "A challenging yet enriching interview journey at Uber. This experience tested my skills, strengthened my mindset, and shaped me into a more resilient candidate",
    tags: ["interview"],
    cover: "assets/img/blogs/uber-interview-experience.png",
    url: "https://medium.com/stackademic/my-uber-software-engineer-new-grad-interview-experience-ac7d265683b2"
  },
  {
    title: "Top 25 Generative AI Terminologies You Must Know",
    blurb: "Master the Key Concepts to Excel in Generative AI with Clear Explanations, Real-World Applications, and In-Depth Resources",
    tags: ["ai"],
    cover: "assets/img/blogs/top25-generative-ai.png",
    url: "https://medium.com/ai-in-plain-english/top-25-generative-ai-terminologies-you-must-know-6a3bb0300988"
  },
  {
    title: "Optimizing Data Flow: Inside the OCS Tech Team's System Design (HLD)",
    blurb: "Discover how the Python team at Robert H. Smith School of Business efficiently syncs student, employer, and contact data across platforms through batch processing and database management.",
    tags: ["system-design"],
    cover: "assets/img/blogs/OCS Tech System.png",
    url: "https://medium.com/@TharunKumarReddyPolu/optimizing-data-flow-inside-the-ocs-tech-teams-high-level-system-design-hld-3c0eadbc5a3c"
  },
  {
    title: "Essential Load Balancing Algorithms to Master for System Design Success",
    blurb: "Unlock the Key Load Balancing Techniques with Explanations, Real-World Applications, and In-Depth Learning Resources",
    tags: ["system-design"],
    cover: "assets/img/blogs/load-balancer-algo.png",
    url: "https://medium.com/stackademic/essential-load-balancing-algorithms-to-master-for-system-design-success-b2d3613437b2"
  },
  {
    title: "What is the Off-By-One Error (OBOE)?",
    blurb: "Uncovering the Common Bug That Trips Up Programmers and the Best Practices You Can Use to Avoid the Error.",
    tags: ["tech"],
    cover: "assets/img/blogs/OBOE1.png",
    url: "https://medium.com/stackademic/what-is-the-off-by-one-error-oboe-07d30f426f15"
  },
  {
    title: "What is Vitess? Role, Features and Advantages",
    blurb: "Explore the Technology Behind YouTube's Ability to Handle 2.49 Billion Users",
    tags: ["system-design"],
    cover: "assets/img/blogs/vitess-youtube.png",
    url: "https://medium.com/@TharunKumarReddyPolu/vitess-the-secret-sauce-behind-youtubes-massive-scalability-c6448c8088f1"
  },
  {
    title: "Top 20 Network Protocols You Must Know in System Design",
    blurb: "Master Key Network Protocols to Excel in System Design Interviews with Explanations, Practical Examples, and Resources",
    tags: ["system-design"],
    cover: "assets/img/blogs/top-network-protocols.png",
    url: "https://links.tharunpolu.com/top20-network-protocols"
  },
  {
    title: "MLH Fellowship - My Journey from Selection to Graduation",
    blurb: "Achieving Excellence through Dedication and Learning - A Detailed Chronicle, Lessons Learned, and Advice for Future Fellows",
    tags: ["mlh-codepath"],
    cover: "assets/img/blogs/mlh-select-to-grad.png",
    url: "https://links.tharunpolu.com/mlh-fellowship-part-2"
  },
  {
    title: "MLH Fellowship — My Journey from Application to Selection",
    blurb: "Unlocking Success with Strategic Preparation — Insights, Tips, and a Personal Guide for Aspiring Fellows",
    tags: ["mlh-codepath"],
    cover: "assets/img/blogs/mlh-apply-to-select.png",
    url: "https://links.tharunpolu.com/mlh-fellowship-part-1"
  },
  {
    title: "Understanding Cache Eviction Policies",
    blurb: "A Comprehensive Guide to Cache Eviction Strategies with Algorithms, Pseudocode, and Use cases in Real-world systems",
    tags: ["system-design"],
    cover: "assets/img/blogs/cache-eviction-mechanism.png",
    url: "https://medium.com/@TharunKumarReddyPolu/understanding-cache-eviction-policies-d9b8f06fb039"
  },
  {
    title: "How I Secured Multiple Graduate Assistantships in My First Semester: Part 3",
    blurb: "Crack cold emailing: strategies, effective techniques, best practices, and a template for Aspiring Graduate Assistants",
    tags: ["assistantship"],
    cover: "assets/img/blogs/become-the-GA-part-3.png",
    url: "https://medium.com/@TharunKumarReddyPolu/how-i-secured-multiple-graduate-assistantships-in-my-first-semester-part-3-156baa12827d"
  },
  {
    title: "How I Secured Multiple Graduate Assistantships in My First Semester: Part 2",
    blurb: "Crafting an Impressive Cover Letter — Tips, Tricks, and a Free Editable Template for Aspiring Graduate Assistants",
    tags: ["assistantship"],
    cover: "assets/img/blogs/become-the-GA-part-2.png",
    url: "https://medium.com/@TharunKumarReddyPolu/how-i-secured-multiple-graduate-assistantships-in-my-first-semester-part-2-a392221eda06"
  },
  {
    title: "How I Secured Multiple Graduate Assistantships in My First Semester: Part 1",
    blurb: "Unlocking Opportunities with a Powerful Resume — Tips, Tricks, and a Free Editable Template for Aspiring Graduate Assistants",
    tags: ["assistantship"],
    cover: "assets/img/blogs/become-the-GA-part-1.png",
    url: "https://medium.com/@TharunKumarReddyPolu/how-i-secured-multiple-graduate-assistantships-in-my-first-semester-part-1-987aa817048a"
  },
  {
    title: "Top 50 System Design Terminologies You Must Know",
    blurb: "Master the Essential Terms to Ace Your System Design Interviews with Explanations, Examples, and Comprehensive Resources.",
    tags: ["system-design"],
    cover: "assets/img/blogs/top50-system-design.png",
    url: "https://medium.com/@TharunKumarReddyPolu/top-50-system-design-terminologies-you-must-know-3c78f5fb99c1"
  },
  {
    title: "Introducing Tharun's Blog Book",
    blurb: "Exploring the Intricacies and Innovations of Software Engineering and Large-scale Distributed Systems.",
    tags: ["tech"],
    cover: "assets/img/blogs/tharun-blog-intro.jpg",
    url: "https://medium.com/@TharunKumarReddyPolu/introducing-tharuns-blog-book-042c1da11feb"
  }
];
