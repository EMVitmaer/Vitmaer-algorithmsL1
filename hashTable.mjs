import { LinkedList } from "./linkedList.mjs"

class HashTable {
    constructor(size = 5) {
        this.size = size
        this.bucket = new Array(size)
        this.countEntry = 0
    }

    _hash(key) {
        const keyString = String(key)
        let codeKey = null

        for (let i = 0; i < keyString.length; i++) {
            console.log(keyString[i]);
            console.log(keyString.charCodeAt(i));
            
            codeKey += keyString.charCodeAt(i)
        }
        console.log(codeKey);
        
        return codeKey % this.size
    }

    set(entry) {
        const hashKey = this._hash(entry[0])
        // let listByhashKey = this.bucket[hashKey]
        console.log('>>> hashKey - ', hashKey);
        
        if (this.bucket[hashKey]) {
            this.bucket[hashKey].updateWithCallback(item => item[0] === entry[0] ? entry : null)
        } else {
            console.log(11);
            
            this.bucket[hashKey] = new LinkedList().append(entry)
        }

        this.listByhashKey++

        return this
    }

    get(key) {
        const hashKey = this._hash(key)
        // const listByhashKey = this.bucket[hashKey]

        if (!this.bucket[hashKey]) return null
        console.log(this.bucket[hashKey].head.value)
        
        if (this.bucket[hashKey].head.value[0] === key) {
            return this.bucket[hashKey].head.value[1]
        }

        return this.bucket[hashKey].find(item => item[0] === key)
    }

    a(){
        console.log(this.bucket);
    }
}

const hashTable = new HashTable()

hashTable.set(['a', 5])

console.log(hashTable.get('a'));
hashTable.a()
// console.log(hashTable.get('b'));
