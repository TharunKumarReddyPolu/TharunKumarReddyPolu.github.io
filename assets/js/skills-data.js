/**
 * SKILLS DATA — add a new skill by appending ONE entry to the SKILLS array,
 * and a new filter pill by appending ONE entry to the SKILL_TAGS array.
 * Card and filter HTML are generated automatically; never edit index.html.
 *
 * SKILLS entry fields:
 *   name (required) Label shown under the icon; also used as the image alt.
 *   img  (required) Icon path, e.g. 'assets/img/skills/docker.png'.
 *   tags (required) Array of slugs from SKILL_TAGS; a skill can belong to
 *                   several categories (e.g. Git is devops + tools).
 *
 * SKILL_TAGS entry fields:
 *   slug  (required) lowercase id used as a CSS class, e.g. 'backend'.
 *   label (required) Pill text shown to visitors, e.g. 'Backend'.
 */
const SKILL_TAGS = [
  { slug: 'languages', label: 'Languages' },
  { slug: 'frontend', label: 'Frontend' },
  { slug: 'backend', label: 'Backend' },
  { slug: 'databases', label: 'Databases' },
  { slug: 'cloud', label: 'Cloud' },
  { slug: 'devops', label: 'DevOps' },
  { slug: 'coding', label: 'Coding' },
  { slug: 'tools', label: 'Tools' }
];

const SKILLS = [
  { name: "HTML", img: "assets/img/skills/html.jpg", tags: ["frontend"] },
  { name: "CSS", img: "assets/img/skills/CSS.png", tags: ["frontend"] },
  { name: "JavaScript", img: "assets/img/skills/JS.jpg", tags: ["languages", "frontend"] },
  { name: "Python", img: "assets/img/skills/python.jpg", tags: ["languages"] },
  { name: "Go", img: "assets/img/skills/golang.png", tags: ["languages", "backend"] },
  { name: "Java", img: "assets/img/skills/java.png", tags: ["languages"] },
  { name: "C++", img: "assets/img/skills/cpp.png", tags: ["languages"] },
  { name: "Rest APIs", img: "assets/img/skills/rest-apis.jpg", tags: ["backend"] },
  { name: "GraphQL", img: "assets/img/skills/graph-ql.png", tags: ["backend"] },
  { name: "Mulesoft", img: "assets/img/skills/mulesoft.png", tags: ["backend"] },
  { name: "MySQL", img: "assets/img/skills/mysql.png", tags: ["databases"] },
  { name: "PostgreSQL", img: "assets/img/skills/postgreSQL.png", tags: ["databases"] },
  { name: "MongoDB", img: "assets/img/skills/mongoDB.jpg", tags: ["databases"] },
  { name: "Supabase", img: "assets/img/skills/supabase.jpg", tags: ["databases"] },
  { name: "Spring MVC", img: "assets/img/skills/springMVC.png", tags: ["backend"] },
  { name: "NodeJS", img: "assets/img/skills/nodeJS.png", tags: ["backend"] },
  { name: "Django", img: "assets/img/skills/django.jpg", tags: ["backend"] },
  { name: "ReactJS", img: "assets/img/skills/reactJS.png", tags: ["frontend"] },
  { name: "Angular", img: "assets/img/skills/angularJS.png", tags: ["frontend"] },
  { name: "ELK Stack", img: "assets/img/skills/elkstack.jpg", tags: ["devops"] },
  { name: "Claude Code", img: "assets/img/skills/claude-code.png", tags: ["coding"] },
  { name: "Cursor", img: "assets/img/skills/cursor.png", tags: ["coding"] },
  { name: "IntelliJ", img: "assets/img/skills/intelliJ.png", tags: ["coding"] },
  { name: "VS Code", img: "assets/img/skills/vscode.png", tags: ["coding"] },
  { name: "Postman", img: "assets/img/skills/postman.png", tags: ["tools"] },
  { name: "Salesforce", img: "assets/img/skills/salesforce.png", tags: ["tools"] },
  { name: "AWS", img: "assets/img/skills/aws.jpg", tags: ["cloud"] },
  { name: "Azure", img: "assets/img/skills/azure.png", tags: ["cloud"] },
  { name: "Google Cloud", img: "assets/img/skills/Google-cloud.jpg", tags: ["cloud"] },
  { name: "Kafka", img: "assets/img/skills/kafka.png", tags: ["backend"] },
  { name: "Redis", img: "assets/img/skills/redis.jpeg", tags: ["databases"] },
  { name: "Git", img: "assets/img/skills/git.png", tags: ["devops", "tools"] },
  { name: "Jenkins", img: "assets/img/skills/jenkins.jpg", tags: ["devops"] },
  { name: "GitHub Actions", img: "assets/img/skills/github-actions.png", tags: ["devops"] },
  { name: "Terraform", img: "assets/img/skills/terraform.png", tags: ["devops"] },
  { name: "Docker", img: "assets/img/skills/docker.png", tags: ["devops"] },
  { name: "Linux", img: "assets/img/skills/Linux.jpg", tags: ["devops", "tools"] },
  { name: "SonarQube", img: "assets/img/skills/sonarQube.png", tags: ["devops"] },
  { name: "Jira", img: "assets/img/skills/jira.png", tags: ["tools"] }
];
