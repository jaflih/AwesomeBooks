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
      const li = createHtml(this.BOOK_COLLECTION, 'li');
      const p = createHtml(li, 'p');
      createHtml(p, 'span').innerText = `"${book.title}" by `;
      createHtml(p, 'span').innerText = book.author;
      const button = createHtml(li, 'button');
      button.innerText = 'Remove';
      button.id = book.id;
      button.addEventListener('click', () => {
        this.removeBook(book.id);
      });
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

//
document.querySelector('#add_new').addEventListener('click', () => {
  document.querySelector('#add_new').style.color = 'rgb(58, 169, 206)';
  document.querySelector('#list').style.color = 'black';
  document.querySelector('#contact').style.color = 'black';
  document.querySelector('#book_list').classList.add('collapse');
  document.querySelector('#add_books').classList.remove('collapse');
  document.querySelector('#contact-information').classList.add('collapse');
});

document.querySelector('#contact').addEventListener('click', () => {
  document.querySelector('#add_new').style.color = 'black';
  document.querySelector('#list').style.color = 'black';
  document.querySelector('#contact').style.color = 'rgb(58, 169, 206)';
  document.querySelector('#book_list').classList.add('collapse');
  document.querySelector('#add_books').classList.add('collapse');
  document.querySelector('#contact-information').classList.remove('collapse');
});

document.querySelector('#list').addEventListener('click', () => {
  document.querySelector('#contact').style.color = 'black';
  document.querySelector('#add_new').style.color = 'black';
  document.querySelector('#list').style.color = 'rgb(58, 169, 206)';
  document.querySelector('#book_list').classList.remove('collapse');
  document.querySelector('#add_books').classList.add('collapse');
  document.querySelector('#contact-information').classList.add('collapse');
});

document.querySelector('.date').innerHTML = new Date();
