/**
 * BOOKSHELF DATA — add a new book by running:
 *
 *   node scripts/add-book.js <goodreads-url> --tags=tech,career
 *
 * It finds the Open Library cover, downloads it into assets/img/books/,
 * and appends the entry below (English editions preferred). Or append ONE
 * entry to the BOOKS array by hand, and a new filter pill by appending ONE
 * entry to the BOOK_TAGS array. Card and filter HTML are generated
 * automatically; never edit index.html.
 *
 * BOOKS entry fields:
 *   title     (required) Book title shown on the card caption + hover overlay.
 *   author    (required) Author name shown under the title.
 *   tags      (required) Array of tag slugs from BOOK_TAGS below, e.g.
 *               ['tech'] or ['tech', 'mindset']. A book can have several;
 *               it appears under every matching pill.
 *   cover         (required) Primary cover file — always a LOCAL image so the
 *                   shelf renders instantly and never blurs:
 *                   'assets/img/books/my-cover.jpg'
 *                   (grab a new one from Open Library via the ISBN's cover
 *                   URL when adding a book)
 *   coverFallback (optional) Remote cover URL used automatically if the local
 *                   file is missing, e.g. Open Library:
 *                   'https://covers.openlibrary.org/b/isbn/<ISBN13>-L.jpg?default=false'
 *   goodreads     (required) Link for the card's Goodreads button — the book's
 *                        Goodreads page, or a search URL like:
 *                   'https://www.goodreads.com/search?q=Title+Author+Name'
 *
 * BOOK_TAGS entry fields:
 *   slug (required) lowercase id used in the URL/class, e.g. 'tech'.
 *                   Must match what you use in each book's tags array.
 *   label (required) Pill text shown to visitors, e.g. 'Tech'.
 *
 * Covers load from the local file first (fast, sharp, no network dependency);
 * if a local file is ever missing, the retry ladder in main.js swaps in the
 * remote coverFallback automatically.
 */
const BOOK_TAGS = [
  { slug: 'tech', label: 'Tech' },
  { slug: 'mindset', label: 'Mindset' },
  { slug: 'money', label: 'Money' },
  { slug: 'speaking', label: 'Speaking' },
  { slug: 'career', label: 'Career' }
];

const BOOKS = [
  {
    title: "System Design Interview - An Insider's Guide (Vol. 1)",
    author: "Alex Xu",
    tags: ["tech"],
    cover: "assets/img/books/sdi-vol1.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9798664653403-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/54109255-system-design-interview-an-insider-s-guide"
  },
  {
    title: "System Design Interview – An Insider's Guide (Vol. 2)",
    author: "Alex Xu & Sahn Lam",
    tags: ["tech"],
    cover: "assets/img/books/sdi-vol2.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781736049112-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/60631342-system-design-interview-an-insider-s-guide"
  },
  {
    title: "Designing Data-Intensive Applications, 2nd Edition",
    author: "Martin Kleppmann & Chris Riccomini",
    tags: ["tech"],
    cover: "assets/img/books/ddia-2e.jpg",
    coverFallback: "https://www.oreilly.com/library/cover/9781098119058/250w/",
    goodreads: "https://www.goodreads.com/search?q=Designing+Data-Intensive+Applications+2nd+Edition+Kleppmann"
  },
  {
    title: "Fundamentals of Software Architecture",
    author: "Mark Richards & Neal Ford",
    tags: ["tech", "career"],
    cover: "assets/img/books/fundamentals-software-architecture.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781492043454-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/search?q=Fundamentals+of+Software+Architecture+Mark+Richards+Neal+Ford"
  },
  {
    title: "The Software Engineer's Guidebook",
    author: "Gergely Orosz",
    tags: ["tech", "career"],
    cover: "assets/img/books/software-engineers-guidebook.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9789083381824-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/201545491-the-software-engineer-s-guidebook"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    tags: ["mindset"],
    cover: "assets/img/books/atomic-habits.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/33154385-atomic-habits"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    tags: ["money"],
    cover: "assets/img/books/rich-dad-poor-dad.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/10144145-rich-dad-poor-dad"
  },
  {
    title: "TED Talks",
    author: "Chris Anderson",
    tags: ["speaking"],
    cover: "assets/img/books/ted-talks.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781472228048-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/29847148-ted-talks"
  },
  {
    title: "Head First Design Patterns",
    author: "Eric Freeman & Elisabeth Robson",
    tags: ["tech"],
    cover: "assets/img/books/head-first-design-patterns.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781492078005-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/58128.Head_First_Design_Patterns"
  },
  {
    title: "Building a Second Brain",
    author: "Tiago Forte",
    tags: ["mindset"],
    cover: "assets/img/books/building-a-second-brain.jpg",
    coverFallback: "https://covers.openlibrary.org/b/id/12372866-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/59616977-building-a-second-brain"
  },
  {
    title: "The Staff Engineer's Path",
    author: "Tanya Reilly",
    tags: ["tech", "career"],
    cover: "assets/img/books/staff-engineers-path.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781098118730-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/61058107-the-staff-engineer-s-path"
  },
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    tags: ["tech"],
    cover: "assets/img/books/clean-code.jpg",
    coverFallback: "https://covers.openlibrary.org/b/id/8065615-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/3735293-clean-code"
  },
  {
    title: "Software Engineering at Google: Lessons Learned from Programming Over Time",
    author: "Titus Winters, Tom Manshreck & Hyrum Wright",
    tags: ["tech", "career"],
    cover: "assets/img/books/software-engineering-at-google.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781492082798-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/48816586-software-engineering-at-google"
  },
  {
    title: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness",
    author: "Morgan Housel",
    tags: ["money"],
    cover: "assets/img/books/psychology-of-money.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/41881472-the-psychology-of-money"
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    tags: ["mindset"],
    cover: "assets/img/books/subtle-art.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/39288400-the-subtle-art-of-not-giving-a-f-ck"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    tags: ["mindset"],
    cover: "assets/img/books/deep-work.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/25744928-deep-work"
  },
  {
    title: "Kafka: The Definitive Guide",
    author: "Neha Narkhede, Gwen Shapira & Todd Palino",
    tags: ["tech"],
    cover: "assets/img/books/kafka.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9781492043089-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/28321010-kafka"
  },
  {
    title: "The Pragmatic Programmer, 20th Anniversary Edition",
    author: "David Thomas & Andrew Hunt",
    tags: ["tech", "career"],
    cover: "assets/img/books/the-pragmatic-programmer-20th-anniversary-edition.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer"
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson & John Vlissides",
    tags: ["tech"],
    cover: "assets/img/books/design-patterns.jpg",
    coverFallback: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/85009.Design_Patterns"
  }
];
