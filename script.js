let books = [];

// document.querySelector("#add_button").addEventListener("click", (event) => {
//   event.preventDefault();
//   addBook();
//   FORM.reset();
// });

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class BooksManager {
  constructor(books) {
    this.books = books;
    this.counter = 0;
    this.BOOK_COLLECTION = document.querySelector("#book_collection");
    this.FORM = document.querySelector("form");
  }

  addBook(book) {
    this.books.push(book);
    displayBooks();
  }

  removeBook(index) {
    this.books = this.books.filter((book) => book.id !== index);
    displayBooks();
    this.saveBooks();
  }

  loadBooks() {
    if (localStorage.getItem("books") != null) {
      this.books = JSON.parse(localStorage.getItem("books"));
    }
  }
  saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }
}

let book1 = new Book(0, "hey", "yo");
let book2 = new Book(0, "hey", "yo");
let book3 = new Book(0, "hey", "yo");
let book4 = new Book(0, "hey", "test");
let manager = new BooksManager([]);

function createHtml(parent, tag) {
  const element = document.createElement(tag);
  parent.appendChild(element);
  return element;
}

function displayBooks(books) {
  manager.books.forEach((book) => {
    manager.BOOK_COLLECTION.innerText = "";
    console.log(book);

    const div = createHtml(manager.BOOK_COLLECTION, "div");
    const p = createHtml(div, "p");

    createHtml(p, "span").innerText = book.title;
    createHtml(p, "br");
    createHtml(p, "span").innerText = book.author;
    const button = createHtml(div, "button");
    button.innerText = "Remove";
    button.id = book.id;
    button.addEventListener("click", () => {
      const index = book.id;
      books = books.filter((book) => book.id !== index);
      displayBooks();
      // saveBooks();
    });
    createHtml(div, "hr");
  });
}
