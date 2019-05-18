const fs = require('fs');

let fetchAll = () => {
  try {
    let booksString = fs.readFileSync("books-data.json");
    return JSON.parse(booksString);
  } catch (e) {
    return [];
  }
};

let save = books => {
  fs.writeFileSync("books-data.json", JSON.stringify(books));
};

let add = (title, author, publisher, isbn, publishDate) => {
  let books = fetchAll();
  let id = books.length + 1;
  let book = {
    id,
    title,
    author,
    publisher,
    isbn,
    publishDate
  };

  let duplicatedBooks = books.filter(book => book.title === title);
  if (duplicatedBooks.length === 0) {
    books.push(book);
    save(books);
    return book;
  }
};

let list = () => {
  return fetchAll();
};

let show = id => {
  let books = fetchAll();
  let filteredBooks= books.filter(book => book.id === parseInt(id));
  return filteredBooks[0];
};

let remove = id => {
  let books = fetchAll();
  let removedBooks= books.filter(book => book.id !== parseInt(id));
  save(removedBooks);
};

let log = book => {
  console.log("--------------");
  console.log(`id: ${book.id}`);
  console.log(`タイトル: ${book.title}`);
  console.log(`著者: ${book.author}`);
  console.log(`出版社: ${book.publisher}`);
  console.log(`ISBN(10桁): ${book.isbn}`);
  console.log(`出版日: ${book.publishDate}`);
};

module.exports = {
  add,
  list,
  show,
  remove,
  log
};