import { LinkedList } from "./linkedList.mjs"

export class HashTable {
    constructor(size = 5) {
        this.size = size
        this.buckets = new Array(size)
        this.countEntry = 0
    }

    _hash(key) {
        const keyString = String(key)
        let codeKey = null

        for (let i = 0; i < keyString.length; i++) {            
            codeKey += keyString.charCodeAt(i)
        }
        
        return codeKey % this.size
    }

    _resize() {
        const currentEntries = this.getAllEntry()

        this.size *= 2
        this.buckets = new Array(this.size)
        this.countEntry = 0
        
        currentEntries.forEach(item => {
            this.set(item)
        })
    }

    set(entry) {
        if (this.countEntry / this.size > 0.7) {
            this._resize()
        }

        const hashKey = this._hash(entry[0])
        let listByhashKey = this.buckets[hashKey]
        
        if (listByhashKey) {
            if (!listByhashKey.updateWithCallback(item => item.value[0] === entry[0] && entry)) {
                listByhashKey.append(entry)
                this.countEntry++
            }
        } else {            
            this.buckets[hashKey] = new LinkedList().append(entry)
            this.countEntry++
        }

        return this
    }

    get(key) {
        const hashKey = this._hash(key)
        const listByhashKey = this.buckets[hashKey]

        if (!listByhashKey) {
            return null 
        }
        if (listByhashKey.head.value[0] === key) {
            return listByhashKey.head.value[1]
        }

        return listByhashKey.find(item => item.value[0] === key)?.value[1]
    }

    toString(){
        let buckets = ''

        for (let i = 0; i < this.size; i++) {
            let list = null
    
            if (this.buckets[i]) {
                list = this.buckets[i].toString(item => `{${item.value[0]}: ${item.value[1]}}, `)
                list ? list = list.slice(0, list.length - 2) : list
            }
    
            buckets += `index = ${i} - entry(ies) = (${list})\n`

        }
        
        return buckets
    }

    getAllEntry(){
        const buckets = []

        for (let i = 0; i < this.size; i++) {    
            if (this.buckets[i]) {
                buckets.push(this.buckets[i].toArray(item => [item.value[0], item.value[1]]))
            }
        }
        
        return buckets.flat()
    }

    delete(key) {
        const hashKey = this._hash(key)

        if (!this.buckets[hashKey]) {
            return false
        }

        const isDelete = this.buckets[hashKey].deleteWithCallback(item => item.value[0] === key)

        if (this.buckets[hashKey].head === null) {
            this.buckets[hashKey] = null
        }
        
        isDelete && this.countEntry--

        return isDelete
    }

    map(callback) {
        return this.buckets.map((item, index) => callback(item, index))
    } 
}
