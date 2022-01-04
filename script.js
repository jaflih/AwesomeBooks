/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BooksManager {
  constructor() {
    this.BOOK_COLLECTION = document.querySelector('#book_collection');
    this.books = [];
  }

  loadBooks() {
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
      this.BOOK_COLLECTION.innerHTML = this.books.length === 0 ? 'No books found.' : '';
      this.books.forEach((book) => {
        this.displayBook(book);
      });
    } else {
      this.BOOK_COLLECTION.innerHTML = 'No books found.';
    }
  }

  addBook(book) {
    if (this.books.length === 0) {
      this.BOOK_COLLECTION.innerHTML = '';
    }
    this.books.push(book);
    this.displayBook(book);
    this.saveBooks();
  }

  removeBook(book) {
    let index = Array.from(book.parentNode.children).indexOf(book);
    this.books.splice(index, 1);
    this.saveBooks();

    if (this.books.length === 0) {
      this.BOOK_COLLECTION.innerHTML = 'No books found.';
    } else {
      this.BOOK_COLLECTION.removeChild(book);
    }
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBook(book) {
    const li = this.createHtml(this.BOOK_COLLECTION, 'li');
    const p = this.createHtml(li, 'p');
    this.createHtml(p, 'span').innerText = `"${book.title}" by ${book.author}`;
    const button = this.createHtml(li, 'button');
    button.innerText = 'Remove';
    button.addEventListener('click', () => {
      this.removeBook(li);
    });
  }

  createHtml(parent, tag) {
    const element = document.createElement(tag);
    parent.appendChild(element);
    return element;
  }
}

const FORM = document.querySelector('form');
const MANAGER = new BooksManager();
const SMALL = document.querySelector('small');

const showError = (input) => {
  SMALL.innerHTML = 'You need to enter an ' + input;
  SMALL.classList.remove('collapse');
};

document.querySelector('#add_button').addEventListener('click', (event) => {
  event.preventDefault();
  if (FORM.title.validity.valueMissing) {
    showError('Title');
  } else if (FORM.author.validity.valueMissing) {
    showError('Author');
  } else {
    MANAGER.addBook(new Book(FORM.title.value, FORM.author.value));
    FORM.reset();
    SMALL.classList.add('collapse');
  }
});

MANAGER.loadBooks();
