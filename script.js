const BOOKS = [];

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

  BOOKS.forEach((book) => {
    const div = createHtml(BOOK_COLLECTION, 'div');
    const p = createHtml(div, 'p');

    createHtml(p, 'span').innerText = book.title;
    createHtml(p, 'br');
    createHtml(p, 'span').innerText = book.author;
    createHtml(div, 'button').innerText = 'Remove';
    createHtml(div, 'hr');
  });
}
displayBook();

function addBook() {
  const book = {
    title: FORM.title.value,
    author: FORM.author.value,
  };
  BOOKS.push(book);
  displayBook();
}

ADD_BUTTON.addEventListener('click', (event) => {
  event.preventDefault();
  addBook();
  FORM.title.value = '';
  FORM.author.value = '';
});
