/**
 * BOOKSHELF DATA — add a new book by appending ONE entry to the BOOKS array,
 * and add a new filter pill by appending ONE entry to the BOOK_TAGS array.
 * Card and filter HTML are generated automatically; never edit index.html.
 *
 * BOOKS entry fields:
 *   title     (required) Book title shown on the card caption + hover overlay.
 *   author    (required) Author name shown under the title.
 *   tags      (required) Array of tag slugs from BOOK_TAGS below, e.g.
 *               ['tech'] or ['tech', 'mindset']. A book can have several;
 *               it appears under every matching pill.
 *   cover     (required) Cover image URL. Two options:
 *               - Local file (recommended, always loads):
 *                   'assets/img/books/my-cover.jpg'
 *               - Open Library, built from the ISBN-13:
 *                   'https://covers.openlibrary.org/b/isbn/<ISBN13>-L.jpg?default=false'
 *                 Check the ISBN exists first:
 *                   https://openlibrary.org/search.json?q=isbn:<ISBN13>
 *   goodreads (required) Link for the card's Goodreads button — the book's
 *                        Goodreads page, or a search URL like:
 *                   'https://www.goodreads.com/search?q=Title+Author+Name'
 *
 * BOOK_TAGS entry fields:
 *   slug (required) lowercase id used in the URL/class, e.g. 'tech'.
 *                   Must match what you use in each book's tags array.
 *   label (required) Pill text shown to visitors, e.g. 'Tech'.
 *
 * Failed/slow remote covers retry automatically (see main.js); for a fully
 * reliable shelf, prefer local cover files.
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
    cover: "https://covers.openlibrary.org/b/isbn/9798664653403-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/54109255-system-design-interview-an-insider-s-guide"
  },
  {
    title: "System Design Interview – An Insider's Guide (Vol. 2)",
    author: "Alex Xu & Sahn Lam",
    tags: ["tech"],
    cover: "https://covers.openlibrary.org/b/isbn/9781736049112-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/60631342-system-design-interview-an-insider-s-guide"
  },
  {
    title: "Designing Data-Intensive Applications, 2nd Edition",
    author: "Martin Kleppmann & Chris Riccomini",
    tags: ["tech"],
    cover: "https://www.oreilly.com/library/cover/9781098119058/250w/",
    goodreads: "https://www.goodreads.com/search?q=Designing+Data-Intensive+Applications+2nd+Edition+Kleppmann"
  },
  {
    title: "Fundamentals of Software Architecture",
    author: "Mark Richards & Neal Ford",
    tags: ["tech", "career"],
    cover: "https://covers.openlibrary.org/b/isbn/9781492043454-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/search?q=Fundamentals+of+Software+Architecture+Mark+Richards+Neal+Ford"
  },
  {
    title: "The Software Engineer's Guidebook",
    author: "Gergely Orosz",
    tags: ["tech", "career"],
    cover: "https://covers.openlibrary.org/b/isbn/9789083381824-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/201545491-the-software-engineer-s-guidebook"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    tags: ["mindset"],
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/33154385-atomic-habits"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    tags: ["money"],
    cover: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/10144145-rich-dad-poor-dad"
  },
  {
    title: "TED Talks",
    author: "Chris Anderson",
    tags: ["speaking"],
    cover: "https://covers.openlibrary.org/b/isbn/9781472228048-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/29847148-ted-talks"
  },
  {
    title: "Head First Design Patterns",
    author: "Eric Freeman & Elisabeth Robson",
    tags: ["tech"],
    cover: "https://covers.openlibrary.org/b/isbn/9781492078005-L.jpg?default=false",
    goodreads: "https://www.goodreads.com/book/show/58128.Head_First_Design_Patterns"
  }
];
