export class Book {
    _id;
    title;
    author;
    date;
    language;
    description;

    constructor(id,title,author,date,language,description){
        this._id = id;
        this.author = author;
        this.title = title;
        this.date = date;
        this.language = language;
        this.description = description;
    }

    set _id(temp){
        this.__id = temp;
    }

    get _id(){
        return this.__id;
    }

    set title(temp){
        this._title = temp;
    }

    get title(){
        return this._title;
    }

    set author(temp){
        this._author = temp;
    }

    get author(){
        return this._author;
    }

    set date(temp){
        this._date = temp;
    }

    get date(){
        return this._date;
    }

    set language(temp){
        this._language = temp;
    }

    get language(){
        return this._language;
    }

    set description(temp){
        this.__id = _description;
    }

    get description(){
        return this._description;
    }

}