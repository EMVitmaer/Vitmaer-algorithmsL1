class EntryList {
    constructor(value, next = null){
        this.value = value
        this.next = next
    }

    toString() {
        return `${this.value}`
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    append(value) {
        const entry = new EntryList(value)

        if (!this.head) {
            this.head = entry
            this.tail = entry
            return this
        }

        this.tail.next = entry
        this.tail = entry
        return this
    }

    toString() {
        if (!this.head) return null

        let currentEntry = this.head
        let allEntries = ''

        while (currentEntry) {
            allEntries += `${currentEntry.toString()} `
            currentEntry = currentEntry.next
        }

        return allEntries
    }

    toArray() {
        if (!this.head) return null

        let currentEntry = this.head
        let allEntries = []

        while (currentEntry) {
            allEntries.push(currentEntry)
            currentEntry = currentEntry.next
        }

        return allEntries
    }

    deleteOne(value) {
        if (!this.head) return false
        if (this.head === this.tail && this.head.value === value) {
            this.head = null
            this.tail = null

            return true
        }
        if (this.head.value === value) {
            this.head = this.head.next

            return true
        }

        let currentEntry = this.head

        while (currentEntry.next) {
            if (currentEntry.next.value === value) {
                if (currentEntry.next.next) {
                    currentEntry.next = currentEntry.next.next

                    return true
                } else {
                    currentEntry.next = null
                    this.tail = currentEntry

                    return true
                }
            }
            currentEntry = currentEntry.next
        }

        return false
    }

    deleteAll(value) {
        if (!this.head) return false

        let currentEntry = this.head
        let deleteEntry = null

        while (currentEntry.value === value) {
            deleteEntry = currentEntry.value

            if (currentEntry.next) {
                this.head = currentEntry.next
                currentEntry = currentEntry.next
            } else {
                this.head = null
                this.tail = null

                return true
            }
        }
        while (currentEntry?.next) {
            if (currentEntry.next.value === value) {
                deleteEntry = currentEntry.next

                if (currentEntry.next.next) {
                    currentEntry.next = currentEntry.next.next

                    continue
                } else {
                    currentEntry.next = null
                    this.tail = currentEntry
                }
            }
            currentEntry = currentEntry.next
        }

        return !!deleteEntry
    }

    updateOne(oldValue, newValue) {
        if (!this.head) return this
        
        let currentEntry = this.head
        
        while (currentEntry) {
            if (currentEntry.value === oldValue) {
                currentEntry.value = newValue

                break
            }
            currentEntry = currentEntry.next
        }

        return this
    }

    updateAll(oldValue, newValue) {
        if (!this.head) return this
        
        let currentEntry = this.head

        while (currentEntry) {
            if (currentEntry.value === oldValue) {
                currentEntry.value = newValue
            }
            currentEntry = currentEntry.next
        }

        return this
    }

    map(callback) {
        const newList = new LinkedList()

        if (!this.head) return newList

        let currentEntry = this.head
        
        while (currentEntry) {
            newList.append(callback(currentEntry))
            currentEntry = currentEntry.next
        }

        return newList
    }
}

const list = new LinkedList()
