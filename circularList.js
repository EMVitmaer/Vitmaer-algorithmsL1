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
            this.head.prev = this.tail
            this.tail.next = this.head
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

        for (let i = 0; i < this.length; i++) {
            allEntries += `${currentEntry.value} `
            currentEntry = currentEntry.next            
        }
        
        return allEntries
    }

    deleteOne(value) {
        if (!this.head) return false
        if (this.head.value === value) {
            if (this.length > 1) {
                this.head = this.head.next
                this.head.prev = this.tail
                this.tail.next = this.head
            } else {
                this.head = null
                this.tail = null
            }
            this.length--
            
            return true
        }

        let currentEntry = this.head
        let index = this.length - 1

        while (index) {
            if (currentEntry.next.value === value) {
                this.length--
                index--
                if (index > 0) {
                    currentEntry.next = currentEntry.next.next
                    currentEntry.next.prev = currentEntry

                    return true
                } else {
                    this.tail = currentEntry
                    this.tail.next = this.head
                    this.head.prev = this.tail

                    return true
                }
            }
            currentEntry = currentEntry.next
            index--
        }

        return false
    }

    deleteAll(value) {
        if (!this.head) return false
        
        let deletedEntry = null

        while (this.length > 0 && this.head.value === value) {
            deletedEntry = this.head.value

            if (this.length > 1) {
                this.head = this.head.next
                this.head.prev = this.tail
                this.tail.next = this.head
            } else {
                this.head = null
                this.tail = null
            }

            this.length--            
        }

        let currentEntry = this.head
        let index = this.length - 1

        while (index >= 0) {
            if (currentEntry.next.value === value) {
                deletedEntry = currentEntry.next.value
                this.length--
                index--

                if (index > 0) {
                    currentEntry.next = currentEntry.next.next
                    currentEntry.next.prev = currentEntry

                    continue
                } else {
                    this.tail = currentEntry
                    this.tail.next = this.head
                    this.head.prev = this.tail
                }
            }

            currentEntry = currentEntry.next
            index--
        }

        return !!deletedEntry
    }

    updateOne(oldValue, newValue) {
        if (!this.head) return this
        
        let currentEntry = this.head
        let lengthList = this.length

        for (let i = 0; i < lengthList; i++) {
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
        let lengthList = this.length

        for (let i = 0; i < lengthList; i++) {
            if (currentEntry.value === oldValue) {
                currentEntry.value = newValue
            }

            currentEntry = currentEntry.next
        }

        return this
    }

    map(callback) {
        const newCircularList = new CircularList()

        if (!this.head) return newCircularList

        let currentEntry = this.head
        let lengthList = this.length

        for (let i = 0; i < lengthList; i++) {
            newCircularList.append(callback(currentEntry))
            currentEntry = currentEntry.next
        }

        return newCircularList
    }
}

const list = new CircularList()
