class EntryList {
    constructor(value, next = null){
        this.value = value
        this.next = next
    }

    toString() {
        return `${this.value}`
    }
}

export class LinkedList {
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
        this.tail = this.tail.next
        return this
    }

    appendTop(value) {
        const entry = new EntryList(value)

        entry.next = this.head
        this.head = entry
        
        return this
    }

    toString(callback = null) {
        
        if (!this.head) {
            return null
        }
        
        let currentEntry = this.head
        let allEntries = ''

        while (currentEntry) {
            if (callback) {
                allEntries += `${callback(currentEntry)}`
            } else {
                allEntries += `${currentEntry.toString()} `
            }

            currentEntry = currentEntry.next
        }

        return allEntries
    }

    toArray(callback = null) {        
        if (!this.head) {
            return null
        }

        let currentEntry = this.head
        let allEntries = []

        while (currentEntry) {
            if (callback) {
                allEntries.push(callback(currentEntry))
            } else {
                allEntries.push(currentEntry)
            }

            currentEntry = currentEntry.next
        }

        return allEntries
    }

    deleteFirst() {
        if (!this.head) {
            return null
        }

        const deletedEntry = this.head
        this.head = this.head.next

        return deletedEntry
    }

    deleteOne(value) {
        if (!this.head) {
            return false
        }
        if (this.head.value === value) {
            if (this.head !== this.tail) {
                this.head = this.head.next
            } else {
                this.head = null
                this.tail = null
            }

            return true
        }

        let currentEntry = this.head

        while (currentEntry.next) {
            if (currentEntry.next.value === value) {
                if (currentEntry.next.next) {
                    currentEntry.next = currentEntry.next.next
                } else {
                    currentEntry.next = null
                    this.tail = currentEntry
                }

                return true
            }

            currentEntry = currentEntry.next
        }

        return false
    }

    deleteAll(value) {
        if (!this.head) {
            return false
        }

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

    deleteWithCallback(callback) {
        if (!this.head) {
            return false
        }

        let currentEntry = this.head
        let previousEntry = null

        while (currentEntry) {
            if (callback(currentEntry)) {
                if (!previousEntry) {
                    if (this.head !== this.tail) {
                        this.head = currentEntry.next
                    } else {
                        this.head = null
                        this.tail = null
                    }
                } else {
                    previousEntry.next = previousEntry.next.next
                }

                return true
            }
            previousEntry = currentEntry
            currentEntry = currentEntry.next
        }

        return false
    }

    updateOne(oldValue, newValue) {
        if (!this.head) {
            return this
        }
        
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
        if (!this.head) {
            return this
        }
        
        let currentEntry = this.head

        while (currentEntry) {
            if (currentEntry.value === oldValue) {
                currentEntry.value = newValue
            }
            currentEntry = currentEntry.next
        }

        return this
    }

    updateWithCallback(callback) {
        if (!this.head) {
            return false
        }
        
        let currentEntry = this.head
        let hasUpdate = false

        while (currentEntry) {
            const updatedEntry = callback(currentEntry)

            if (updatedEntry) {
                currentEntry.value = updatedEntry
                hasUpdate = true
            }

            currentEntry = currentEntry.next
        }

        return hasUpdate
    }

    map(callback) {
        const newList = new LinkedList()

        if (!this.head) {
            return newList
        }

        let currentEntry = this.head
        
        while (currentEntry) {
            newList.append(callback(currentEntry))
            currentEntry = currentEntry.next
        }

        return newList
    }

    find(callback) {
        if (!this.head) {
            return null
        }

        let currentEntry = this.head

        while (currentEntry) {
            if (callback(currentEntry)) {
                return currentEntry
            }
            currentEntry = currentEntry.next
        }

        return null
    }
}
