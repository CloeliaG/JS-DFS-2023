import { Book } from "./book.class.js";
window.bootstrap = 'bootstrap/dist/js/bootstrap.bundle.js';


export class BookService {
    constructor() {
    }

    /**
     * Display the list of books in the desired target
     * @param {String} target 
     */
    displayList(target){
        let headersDisplay = new Headers();
        let url = '/books';
        let options = {
            method: 'GET',
            headers: headersDisplay
        };
    
        fetch(url, options)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
            })
            .then((response) => {
                response.forEach(elt => {
                    let book = document.createElement('tr');
                    let bookDesc = document.createElement('tr');
    
                    bookDesc.setAttribute("id",('desc-' + elt._id))
                    bookDesc.style.backgroundColor = "#fff8e0";
                    bookDesc.classList.add("collapse");
                    book.classList.add('bookLine');
    
                    book.setAttribute('data-toggle','collapse');
                    book.setAttribute('data-target',("#desc-" + elt._id));
    
                    book.addEventListener('click', () => {
                        bookDesc.classList.toggle('collapse');
                    })
    
                    let bookTitle = document.createElement('td');
                    bookTitle.innerText = elt.title;

                    let expandMore = document.createElement('td');
                    let iconExpand = document.createElement('i');
                    iconExpand.classList.add('fas','fa-regular', 'fa-chevron-down');
                    iconExpand.style.color = "#000000"
                    expandMore.appendChild(iconExpand);
    
                    let bookAuthor = document.createElement('td');
                    bookAuthor.innerText = elt.author;
    
                    let gap = document.createElement('td');

                    let descInfo = document.createElement('td');
                    descInfo.innerHTML = elt.date + "</br>In : " + elt.language;
    
                    let descSummary = document.createElement('td');
                    descSummary.innerText = elt.description;
                    descSummary.setAttribute("colspan",('3'))
    


                    let editBook = document.createElement('td');
                    let editLink = document.createElement('a');
                    editLink.setAttribute('href','editBook/' + elt._id)
                    let buttonEdit = document.createElement('button');
                    let iconEdit = document.createElement('i');
                    iconEdit.classList.add('fas','fa-duotone', 'fa-pen-to-square');

                    buttonEdit.classList.add('btn', 'btn-outline-info');
                    editLink.appendChild(buttonEdit)
                    editBook.style.textAlign = 'center';
                    editBook.appendChild(editLink);
                    buttonEdit.appendChild(iconEdit);
    
                    let deleteBook = document.createElement('td');
                    let buttonDelete = document.createElement('button');
                    let myIcone2 = document.createElement('i');
    
                    myIcone2.classList.add('fas', 'fa-light', 'fa-trash')
                    buttonDelete.classList.add('btn', 'btn-outline-danger');
                    deleteBook.style.textAlign = 'center';
                    deleteBook.appendChild(buttonDelete);
                    buttonDelete.appendChild(myIcone2);
    
                    buttonDelete.addEventListener('click', () => {
                        this.remove(elt._id);
                    });
    
                    target.appendChild(book);
                    target.appendChild(bookDesc);
                    book.appendChild(expandMore);
                    book.appendChild(bookTitle);
                    book.appendChild(bookAuthor);
                    bookDesc.appendChild(gap);
                    bookDesc.appendChild(descInfo);
                    bookDesc.appendChild(descSummary);
                    book.appendChild(editBook);
                    book.appendChild(deleteBook);
                });
                return response;
            })
            .catch((error) => {
                console.log(`%c/!\\ Error : ${error}`, 'color : #ff0000');
            });
    }

    /**
     * Add a new book to the list
     * @param {Book} book 
    */
    add(book) {
        let url = '/books';
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(book)
        };

        return fetch(url, options)
            .then((res) => {
                if(res.ok) {
                    let toastSuccess = document.querySelector("#toast-success");
                    toastSuccess.style.display = "block";
                    setTimeout( ()=>{toastSuccess.style.display = "none"; window.location.href="/book"}, 3000);
                } else {
                    let toastError = document.querySelector("#toast-error");
                    toastError.style.display = "block";
                    setTimeout( ()=>{toastError.style.display = "none";}, 3000);
                }
            })
            .catch((error) => {
                console.log(`Error : ${error}`);
            });
    }


    /**
     * Delete a book by his ID
     * @param {String} id - book ID
     */
    remove(id) {
        console.log(id);
        let url = '/books/' + id;
        let myHeaders = new Headers();
        let options = {
        method : 'DELETE', 
        headers: myHeaders
        };

        return fetch(url, options)
        .then((res) => {
            if(res.ok) {
                let toastSuccess = document.querySelector("#toast-success");
                toastSuccess.style.display = "block";
                setTimeout( ()=>{toastSuccess.style.display = "none"; location.reload()}, 3000);
            } else {
                let toastError = document.querySelector("#toast-error");
                toastError.style.display = "block";
                setTimeout( ()=>{toastError.style.display = "none";}, 3000);
            }
        })
        .catch((error) => {
            console.log(`Error : ${error}`);
        });
    }

    /**
     * Give the book corresponding to the id
     * @param {String} id - _id of the book
     * @return {Book}
    */
    get(id) {
        let myHeaders = new Headers();
        let url = '/books/' + id;
        let options = {
        method: 'GET',
        headers: myHeaders
        };
        
        return fetch(url, options)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
            })
            .then((resource) => {
                let tmp = new Book(resource._id, resource.title, resource.author, resource.date, resource.language, resource.description);
                return tmp;
            })
            .catch((error) => {
                console.log(`Error : ${error}`);
            });
    }

    /**
     * Edit given book
     * @param {String} book 
     */
    modif(book) {
        let url = '/books/' + book._id;
        let options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(book)
        };

        return fetch(url, options)
        .then((res) => {
            if(res.ok) {
                let toastSuccess = document.querySelector("#toast-success");
                toastSuccess.style.display = "block";
                setTimeout( ()=>{toastSuccess.style.display = "none"; window.location.href="/book"}, 3000);
            } else {
                let toastError = document.querySelector("#toast-error");
                toastError.style.display = "block";
                setTimeout( ()=>{toastError.style.display = "none";}, 3000);
            }
        })
        .catch((error) => {
            console.log(`Error : ${error}`);
        });
    }
}

