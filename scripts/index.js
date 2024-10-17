import TodoApp from './classes/todo-app.js';

// Running order
const robinTodosApp = new TodoApp({ owner: 'Robin' });
robinTodosApp.render();

const bookList1Id = robinTodosApp.createItem({
  title: 'Akira',
  author: 'Katsuhiro Otomo',
  printVersion: 'Paperback',
  firstPrint: 1984,
  price: 17.93,
});

const bookList2Id = robinTodosApp.createItem({
  title: 'Watchmen',
  author: 'Alan Moore',
  printVersion: 'Paperback',
  firstPrint: 1986,
  price: 18.9,
});

const bookList3Id = robinTodosApp.createItem({
  title: 'Guards! Guards!',
  author: 'Terry Pratchett',
  printVersion: 'Paperback',
  firstPrint: 1989,
  price: 13.94,
});

const bookList4Id = robinTodosApp.createItem({
  title: 'Snuff',
  author: 'Terry Pratchett',
  printVersion: 'Paperback',
  firstPrint: 2011,
  price: 13.28,
});

const bookList5Id = robinTodosApp.createItem({
  title: 'Thud',
  author: 'Terry Pratchett',
  printVersion: 'Paperback',
  firstPrint: 2005,
  price: 9.19,
});

const bookList6Id = robinTodosApp.createItem({
  title: 'Feet of Clay',
  author: 'Terry Pratchett',
  printVersion: 'Hardcover',
  firstPrintYear: 1996,
  price: 12.89,
});

console.log('bookList2Id', bookList2Id);
robinTodosApp.render();

console.log('bookList3Id', bookList3Id);
robinTodosApp.render();

console.log('bookList4Id', bookList4Id);
robinTodosApp.render();

console.log('bookList5Id', bookList5Id);
robinTodosApp.render();

console.log('bookList6Id', bookList6Id);
robinTodosApp.render();

const removedTodo = robinTodosApp.removeItem(bookList1Id);
console.log('removedTodo', removedTodo);

robinTodosApp.render();

// So we can search for it later
const updatedBookList1Id = 'Re-read Akira';

// Update
const updated = robinTodosApp.updateItem(bookList1Id, {
  title: updatedBookList1Id,
});

console.log('updated', updated);
robinTodosApp.render();

const lookedUpId = robinTodosApp.getTodoIdByTitle(updatedBookList1Id);

console.assert(lookedUpId === book1Id);

robinTodosApp.markAsDone(book1Id);
robinTodosApp.render();

function getByDateRange(startYear, endYear) {
  const books = data.filter(function (book) {
    return book.printYear > startYear && book.printYear < endYear;
  });
  return books;
}

console.log(getByDateRange);
