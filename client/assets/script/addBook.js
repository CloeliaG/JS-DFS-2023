import { Book } from "./book.class.js";
import { BookService } from "./book.service.js";

let btnAdd = document.querySelector('#newBook');
let service = new BookService();

btnAdd.addEventListener('click', () => {
  let title = document.querySelector('#title');
  let author = document.querySelector('#author');
  let language = document.querySelector('#language');
  let date = document.querySelector('#date');
  let description = document.querySelector('#description');

  let addBook = new Book('', title.value, author.value, language.value, date.value, description.value);
  
  let promise = service.add(addBook);
  promise.then(() => {
    title.value = '';
    author.value = '';
    language.value = '';
    date.value = '';
    description.value = '';
  });
});