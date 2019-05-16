const readlineSync = require('readline-sync');
const chalk = require('chalk');

const books = require('./books');

console.log("*** 書籍管理ツール ***");
console.log("使い方: help");
console.log("終了: bye");

readlineSync.promptCLLoop({
  add: (title, author, publisher, isbn, publishDate) => {
    let book = books.add(title, author, publisher, isbn, publishDate);

    if (book) {
      console.log(chalk.blue('データを登録しました。'));
      books.log(book);
    } else {
      console.log(chalk.red('タイトルが重複しています。'));
    }
  },
  list: () => {
    let allBooks = books.list();

    console.log(`表示件数: ${allBooks.length}`);
    allBooks.forEach(book => books.log(book));
  },
  show: (title) => {
    books.show(title);
  },
  remove: (title) => {
    console.log('データを削除します。');
  },
  help: () => {
    console.log('登録: add タイトル 著者名 出版社 ISBN(10桁) 出版日(yyyymmdd)');
    console.log('一覧: list');
    console.log('詳細: show タイトル');
    console.log('削除: remove タイトル');
    console.log('終了: bye');
  },
  bye: () => { return true; }
});
console.log('終了します。');