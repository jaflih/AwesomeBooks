/* eslint-disable max-classes-per-file */

let counter = 0;

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
      counter = this.books[this.books.length - 1].id;
    }
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    this.BOOK_COLLECTION.innerText = '';

    this.books.forEach((book) => {
      const li = createHtml(this.BOOK_COLLECTION, 'li');
      const p = createHtml(li, 'p');

      createHtml(p, 'span').innerText = book.title;
      createHtml(p, 'br');
      createHtml(p, 'span').innerText = book.author;
      const button = createHtml(li, 'button');
      button.innerText = 'Remove';
      button.id = book.id;
      button.addEventListener('click', () => {
        this.removeBook(book.id);
      });
      createHtml(li, 'hr');
    });
  }
}

const FORM = document.querySelector('form');
const MANAGER = new BooksManager([]);

document.querySelector('#add_button').addEventListener('click', (event) => {
  event.preventDefault();
  const small = document.querySelector('small');
  if (FORM.title.validity.valueMissing) {
    small.innerHTML = 'You need to enter an Title';
    small.classList.remove('collapse');
  } else if (FORM.author.validity.valueMissing) {
    small.innerHTML = 'You need to enter an Author';
    small.classList.remove('collapse');
  } else {
    counter += 1;
    MANAGER.addBook(new Book(counter, FORM.title.value, FORM.author.value));
    FORM.reset();
    small.classList.add('collapse');
  }
});

MANAGER.loadBooks();
