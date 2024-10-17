import { nanoid } from "https://esm.sh/nanoid";
import rfdc from "https://esm.sh/rfdc";
import deepmerge from "https://esm.sh/deepmerge";

const clone = rfdc({ proto: true });


export default class Manager {
  #items = [];
  constructor({ startingData = [], itemClass }) {

    if (!Array.isArray(startingData))
      throw new Error(
        `startingData must be an array; instead received ${startingData} (of type ${typeof startingData})`
      );

    if (typeof itemClass !== 'function')
      throw new Error(
        `itemClass must be a constructor function or class; instead received ${itemClass} (of type ${typeof itemClass})`
      );

    Object.defineProperty(this, "_id", { value: nanoid(), enumerable: true });

    Object.defineProperty(this, "itemClass", { value: itemClass });

    for (const item of startingData) {
      this.createItem(item);
    }

    // Object.freeze(this); // frozen on level above
  }

  // * Create
  createItem(data) {
    const newItem = new this.itemClass(data); // {}
    // this.#items.push(newItem);
    // this.#items = [...this.#items, newItem];
    this.#items = this.#items.toSpliced(- 1, 0, newItem);
    return newItem._id;
  }

  // * Read
  findItemIdByField(field='', value='') {
    return this.#items.find((item) => {
      return item[field] === value;
    })?._id ?? null; // wait for es6
  }

  // * Update
  updateItem(id, updates) {
    console.log(`updating item with id: ${id} with`, updates);
    // find where it is
    const idx = this.#items.findIndex((item) => {
      return item._id === id;
    });

    // console.log("idx", idx);

    // check that it exists
    if (idx === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    const item = this.#items[idx]; // actual item
    // console.log('actual item', item);

    // Object.assign(item, updates);
    // const updatedItem = { ...item, ...updates }; // both are shallow

    const updatedItem = new this.itemClass(deepmerge(item, updates)); // NOTE defensive pass through the constructor to prevent extension and bad values in the updates.

    // console.log('updated item', updatedItem);

    // this.#items[idx] = updatedItem;
    this.#items = this.#items.toSpliced(idx, 1, updatedItem);

    // We can pass back whatever we want here, as long as the object is protected
    return clone(updatedItem);
  }

  // * Delete
  removeItem(id) {
    // console.log("removing id", id);
    // find where it is
    const idx = this.#items.findIndex(({ _id }) => {
      return _id === id;
    });

    console.log("idx", idx);

    // check that it exists
    if (idx === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    // save the old Item to return it
    const removedItem = this.#items[idx];

    // recreate the array without it
    this.#items = this.#items.toSpliced(idx, 1);

    // release it from our system
    return removedItem;
  }

  render(fn = Manager.consoleRender) {
    // To protect against mutating code in the pased function
    const clonedItems = clone(this.#items);

    // Give them a glimpse at a copy. (N.B. If they reference this and do so in a loop they risk creating a memory leak by creating too many objects)
    fn(clonedItems);
  }

  static consoleRender(items)  {
    if(!items.length) return console.log('No items to display');
    console.table(items);
  };
}