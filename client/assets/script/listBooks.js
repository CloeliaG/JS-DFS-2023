import { BookService } from "./book.service.js";

const target = document.querySelector('#listBooks');
const bookService = new BookService();

bookService.displayList(target)