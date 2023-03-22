import { Book } from "./book.class.js";
import { BookService } from "./book.service.js";



let title = document.querySelector('#title');
let author = document.querySelector('#author');
let language = document.querySelector('#language');
let date = document.querySelector('#date');
let description = document.querySelector('#description');
let headerTitle = document.querySelector('#headerTitle');

let myId = window.location.pathname.split('/')[2];

let service = new BookService();
let book = service.get(myId);

book.then((elt) => {
  title.value = elt.title;
  headerTitle.innerText = elt.title;
  author.value = elt.author;
  language.value = elt.language;
  date.value = elt.date;
  description.value = elt.description;

  /* ------------------------------------------ */
  // le film doit être chargé pour que je le modifie !
  let modif = document.querySelector('#modif');
  modif.addEventListener('click', () => {
    let tmp = new Book(elt._id, title.value, author.value, date.value, language.value, description.value);
    service.modif(tmp);
  });
});

