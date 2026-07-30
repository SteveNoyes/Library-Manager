const library = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    pages: 281,
    genre: "Fiction"
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    year: 1988,
    pages: 256,
    genre: "Science"
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    pages: 328,
    genre: "Fiction"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    pages: 180,
    genre: "Fiction"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: 2011,
    pages: 443,
    genre: "Non-Fiction"
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    year: -500,
    pages: 68,
    genre: "Non-Fiction"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    pages: 412,
    genre: "Science"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    pages: 310,
    genre: "Fantasy"
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    year: 2011,
    pages: 656,
    genre: "Biography"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    pages: 464,
    genre: "Technology"
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    year: 1947,
    pages: 283,
    genre: "Biography"
  }
];

let currentFilter = "all";
let currentSort = null;

function renderLibrary(books) {
  const container = document.getElementById("library");
  const emptyMsg = document.getElementById("empty-message");

  container.innerHTML = "";

  if (books.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML =
      "<h3>" + book.title + "</h3>" +
      "<p class='author'>by " + book.author + "</p>" +
      "<div class='details'>" +
        "<span>" + book.year + "</span>" +
        "<span>" + book.pages + " pages</span>" +
        "<span>" + book.genre + "</span>" +
      "</div>" +
      "<div class='actions'>" +
        "<button class='btn btn-remove' data-title='" + book.title + "'>Remove</button>" +
      "</div>";
    container.appendChild(card);
  }

  const removeButtons = document.querySelectorAll(".btn-remove");
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function () {
      const title = this.getAttribute("data-title");
      removeBook(title);
    });
  }
}

function updateStats() {
  const totalBooks = library.length;
  const totalPages = getTotalPages();
  const avgPages = totalBooks > 0 ? Math.round(totalPages / totalBooks) : 0;

  document.getElementById("total-books").textContent = totalBooks;
  document.getElementById("total-pages").textContent = totalPages;
  document.getElementById("avg-pages").textContent = avgPages;
}

function getFilteredBooks() {
  if (currentFilter === "all") {
    return getSortedBooks(library);
  }
  return getSortedBooks(getBooksByGenre(currentFilter));
}

function getSortedBooks(books) {
  if (currentSort === "title") {
    return books;
  }
  if (currentSort === "year") {
    return books;
  }
  return books;
}

function refreshDisplay() {
  const books = getFilteredBooks();
  renderLibrary(books);
  updateStats();
}

function addBook(title, author, year, pages, genre) {
  refreshDisplay();
}

function removeBook(title) {
  refreshDisplay();
}

function getBooksByGenre(genre) {
  const result = [];
  return result;
}

function getTotalPages() {
  let total = 0;
  return total;
}

function findBookByTitle(title) {
  return null;
}

function setupEventListeners() {
  const form = document.getElementById("book-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value);
    const pages = parseInt(document.getElementById("pages").value);
    const genre = document.getElementById("genre").value;
    addBook(title, author, year, pages, genre);
    form.reset();
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
      const active = document.querySelector(".filter-btn.active");
      if (active) {
        active.classList.remove("active");
      }
      this.classList.add("active");
      currentFilter = this.getAttribute("data-filter");
      refreshDisplay();
    });
  }

  document.getElementById("sort-title").addEventListener("click", function () {
    currentSort = "title";
    refreshDisplay();
  });

  document.getElementById("sort-year").addEventListener("click", function () {
    currentSort = "year";
    refreshDisplay();
  });

  document.getElementById("search-btn").addEventListener("click", function () {
    const query = document.getElementById("search-input").value;
    if (query) {
      const book = findBookByTitle(query);
      if (book) {
        renderLibrary([book]);
      } else {
        renderLibrary([]);
      }
    }
  });
}

setupEventListeners();
refreshDisplay();
