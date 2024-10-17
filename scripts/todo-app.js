import Manager from "./manager.js";
import Todo from "./todo.js";

export default class TodosApp extends Manager {
  constructor({ owner, startingData,}) {
    super({ startingData, itemClass: Todo });
    if (typeof owner !== "string")
      throw new Error(
        `An app requires an owner (of type 'string'); instead received ${owner} (of type ${typeof owner})`
      );

    Object.defineProperty(this, "owner", { value: owner, enumerable: true });

    Object.freeze(this);
  }

  // Convenience Methods
  markAsDone(id){
    super.updateItem(id, {done: true });
  }

  markAsUndone(id){
    super.updateItem(id, {done: false });
  }

  getTodoIdByTitle(title='') {
    return super.findItemIdByField('title', title)
  }

  // Aliases
  createTodo(data){
    super.createItem(data);
  }

  updateTodo(id, updates){
    super.updateItem(id, updates);
  }

  removeTodo(id){
    super.removeItem(id);
  }

  render(){
    console.group(`${this.owner}'s Todos`);
    super.render();
    console.groupEnd();
  }
}