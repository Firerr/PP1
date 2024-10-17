import { nanoid } from "https://esm.sh/nanoid";

// Type
export default class Todo {
  constructor({ title, duration, done = false, _id=nanoid() }={}) {

    if(typeof _id !== 'string') throw new Error(`A passed _id must be a string`);


    if (typeof title !== "string" || !title.length)
      throw new Error(
        `A todo requires an title (of type 'string'); instead received ${title} (of type ${typeof title})`
      );

    if (!title.length)
      throw new Error(
        `A todo requires an 'title' (of type 'string'); instead received ${title} (of type ${typeof title})`
      );


    if (typeof duration !== "string")
      throw new Error(
        `A todo requires an 'duration' (of type 'string'); instead received ${duration} (of type ${typeof duration})`
      );


    if (typeof done !== "boolean")
      throw new Error(
        `A todo requires a 'done' value (of type 'boolean'); instead received ${done} (of type ${typeof done})`
      );

    // Assign
    this._id = _id;
    this.title = title;
    this.duration = duration;
    this.done = done;

    // Freeze to protect
    Object.freeze(this);
  }
}