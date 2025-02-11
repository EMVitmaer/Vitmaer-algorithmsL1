import { LinkedList } from "./linkedList.mjs";

export class Queue {
    constructor() {
        this.queue = new LinkedList()
    }

    add(value) {
        this.queue.append(value)

        return this
    }

    delete() {
        return this.queue.deleteFirst()?.value
    }

    toArray() {
        return this.queue.toArray()
    }
    
    map(callback) {
        return this.queue.map(callback)
    }
}
