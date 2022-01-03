let books = [];
let counter = 0;

const BOOK_COLLECTION = document.querySelector('#book_collection');
const FORM = document.querySelector('form');

function createHtml(parent, tag) {
  const element = document.createElement(tag);
  parent.appendChild(element);
  return element;
}

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
  if (localStorage.getItem('books') != null) {
    books = JSON.parse(localStorage.getItem('books'));
  }
}
loadBooks();

function displayBooks() {
  BOOK_COLLECTION.innerText = '';

  books.forEach((book) => {
    const div = createHtml(BOOK_COLLECTION, 'div');
    const p = createHtml(div, 'p');

    createHtml(p, 'span').innerText = book.title;
    createHtml(p, 'br');
    createHtml(p, 'span').innerText = book.author;
    const button = createHtml(div, 'button');
    button.innerText = 'Remove';
    button.id = book.id;
    button.addEventListener('click', () => {
      const index = book.id;
      books = books.filter((book) => book.id !== index);
      displayBooks();
      saveBooks();
    });
    createHtml(div, 'hr');
  });
}
displayBooks();

function addBook() {
  const book = {
    id: counter,
    title: FORM.title.value,
    author: FORM.author.value,
  };
  books.push(book);
  displayBooks();
  saveBooks();
  counter += 1;
}

document.querySelector('#add_button').addEventListener('click', (event) => {
  event.preventDefault();
  addBook();
  FORM.reset();
});
