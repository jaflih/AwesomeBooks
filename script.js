const BOOKS = [];

const BOOK_COLLECTION = document.querySelector('#book_collection');
const FORM = document.querySelector('form');
const ADD_BUTTON = document.querySelector('#add_button');

function addBook () {
  const book = {
    title: FORM.title.value,
    author: FORM.author.value,
  }
  BOOKS.push(book);
}

ADD_BUTTON.addEventListener('click', (event) => {
  event.preventDefault();
  addBook();
  FORM.title.value = "";
  FORM.author.value = "";
})