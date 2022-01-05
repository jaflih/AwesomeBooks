/* eslint-disable max-classes-per-file */

let counter = 0;

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class BooksManager {
  constructor() {
    this.books = [];
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
    if (this.books.length === 0) {
      this.BOOK_COLLECTION.innerHTML = 'No books found.';
    }
  }

  loadBooks() {
    if (localStorage.getItem('books') != null) {
      this.books = JSON.parse(localStorage.getItem('books'));
      if (this.books.length === 0) {
        this.BOOK_COLLECTION.innerHTML = 'No books found.';
        counter = 0;
      } else {
        this.displayBooks();
        counter = this.books[this.books.length - 1].id;
      }
    } else {
      this.BOOK_COLLECTION.innerHTML = 'No books found.';
    }
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    this.BOOK_COLLECTION.innerText = '';

    this.books.forEach((book) => {
      const li = BooksManager.createHtml(this.BOOK_COLLECTION, 'li');
      const p = BooksManager.createHtml(li, 'p');
      BooksManager.createHtml(p, 'span').innerText = `"${book.title}" by `;
      BooksManager.createHtml(p, 'span').innerText = book.author;
      const button = BooksManager.createHtml(li, 'button');
      button.innerText = 'Remove';
      button.id = book.id;
      button.addEventListener('click', () => {
        this.removeBook(book.id);
      });
    });
  }

  static createHtml(parent, tag) {
    const element = document.createElement(tag);
    parent.appendChild(element);
    return element;
  }
}

const FORM = document.querySelector('form');
const MANAGER = new BooksManager();
const SMALL = document.querySelector('small');

document.querySelector('#add_button').addEventListener('click', (event) => {
  event.preventDefault();
  if (FORM.title.validity.valueMissing) {
    SMALL.innerHTML = 'You need to enter an Title';
    SMALL.classList.remove('collapse');
  } else if (FORM.author.validity.valueMissing) {
    SMALL.innerHTML = 'You need to enter an Author';
    SMALL.classList.remove('collapse');
  } else {
    counter += 1;
    MANAGER.addBook(new Book(counter, FORM.title.value, FORM.author.value));
    FORM.reset();
    SMALL.classList.add('collapse');
  }
});

MANAGER.loadBooks();

//
function navigation(activeTab, activeA) {
  document.querySelector(`#${activeTab}`).classList.remove('collapse');
  document.querySelectorAll(`section:not(#${activeTab})`).forEach((section) => {
    section.classList.add('collapse');
  });

  document.querySelector(`#${activeA}`).classList.add('active');
  document.querySelectorAll(`.navigation-bar a:not(#${activeA})`).forEach((section) => {
    section.classList.remove('active');
  });
}

document.querySelector('#add_new').addEventListener('click', () => {
  navigation('add_books', 'add_new');
});

document.querySelector('#contact').addEventListener('click', () => {
  navigation('contact-information', 'contact');
});

document.querySelector('#list').addEventListener('click', () => {
  navigation('book_list', 'list');
});

document.querySelector('.date').innerHTML = new Date();
