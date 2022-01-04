/* eslint-disable max-classes-per-file */

function createHtml(parent, tag) {
  const element = document.createElement(tag);
  parent.appendChild(element);
  return element;
}

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
    this.BOOK_COLLECTION = document.querySelector('#book_collection');
  }

  addBook(book) {
    this.books.push(book);
    this.displayBooks();
    this.saveBooks();
  }

  removeBook(index) {
    this.books = this.books.filter((book) => book.id !== index);
    this.displayBooks();
    this.saveBooks();
  }

  loadBooks() {
    if (localStorage.getItem('books') != null) {
      this.books = JSON.parse(localStorage.getItem('books'));
      this.displayBooks();
    }
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    this.BOOK_COLLECTION.innerText = '';

    this.books.forEach((book) => {
      const div = createHtml(this.BOOK_COLLECTION, 'div');
      const p = createHtml(div, 'p');

      createHtml(p, 'span').innerText = book.title;
      createHtml(p, 'br');
      createHtml(p, 'span').innerText = book.author;
      const button = createHtml(div, 'button');
      button.innerText = 'Remove';
      button.id = book.id;
      button.addEventListener('click', () => {
        this.removeBook(book.id);
      });
      createHtml(div, 'hr');
    });
  }
}

const FORM = document.querySelector('form');
const manager = new BooksManager([]);
let counter = 0;

document.querySelector('#add_button').addEventListener('click', (event) => {
  event.preventDefault();
  counter += 1;
  manager.addBook(new Book(counter, FORM.title.value, FORM.author.value));
  FORM.reset();
});

manager.loadBooks();
