import { LinkedList } from "./linkedList.mjs";

export class Stack {
    constructor() {
        this.stack = new LinkedList()
    }

    add(value) {
        this.stack.appendTop(value)

        return this
    }

    delete() {
        return this.stack.deleteFirst()?.value
    }

    toArray() {
        return this.stack.toArray()
    }
    
    map(callback) {
        return this.stack.map(callback)
    }
}
