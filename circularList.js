class EntryCircularList {
    constructor(value, next = null, prev = null) {
        this.value = value
        this.next = next
        this.prev = prev
    }
}

class CircularList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    append(value) {
        const entry = new EntryCircularList(value)

        this.length++
        
        if (!this.head) {
            this.head = entry
            this.tail = entry
        } else {
            this.tail.next = entry
            entry.prev = this.tail
            this.tail = entry
            this.tail.next = this.head
            this.head.prev = this.tail
        }

        return this
    }

    toString() {
        let currentEntry = this.head
        let allEntries = ''

        do {
            allEntries += `${currentEntry.value} `
            currentEntry = currentEntry.next
        } while(currentEntry !== this.head)
        
        return allEntries
    }
}

const list = new CircularList()

list.append('a').append('b').append('c')
console.log('>>> list.head - ', list.head);
console.log('>>> list.tail - ', list.tail);
console.log('>>> list - ', list.toString());

