let BOOKS = [];
let counter = 0;

const BOOK_COLLECTION = document.querySelector('#book_collection');
const FORM = document.querySelector('form');
const ADD_BUTTON = document.querySelector('#add_button');

function createHtml(parent, tag) {
  const element = document.createElement(tag);
  parent.appendChild(element);
  return element;
}

function displayBook() {
  BOOK_COLLECTION.innerText = '';

  function removeBook(index) {
    BOOKS = BOOKS.filter((book) => book.id !== index);
    displayBook();
  }

  BOOKS.forEach((book) => {
    const div = createHtml(BOOK_COLLECTION, 'div');
    const p = createHtml(div, 'p');

    createHtml(p, 'span').innerText = book.title;
    createHtml(p, 'br');
    createHtml(p, 'span').innerText = book.author;
    const button = createHtml(div, 'button');
    button.innerText = 'Remove';
    button.id = book.id;
    button.addEventListener('click', () => {
      removeBook(book.id);
    });
    createHtml(div, 'hr');
  });
}
displayBook();

function addBook() {
  const book = {
    id: counter,
    title: FORM.title.value,
    author: FORM.author.value,
  };
  BOOKS.push(book);
  displayBook();
  counter += 1;
}

ADD_BUTTON.addEventListener('click', (event) => {
  event.preventDefault();
  addBook();
  FORM.title.value = '';
  FORM.author.value = '';
});
