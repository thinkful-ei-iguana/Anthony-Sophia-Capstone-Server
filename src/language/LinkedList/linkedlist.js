class _Node {
    constructor(value, next) {
        (this.value = value), (this.next = next);
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        } else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }

    insertAfter(key, itemToInsert) {
        let tempNode = this.head;
        while (tempNode !== null && tempNode.value !== key) {
            tempNode = tempNode.next;
        }
        if (tempNode !== null) {
            tempNode.next = new _Node(itemToInsert, tempNode.next);
        }
    }

    insertBefore(key, itemToInsert) {
        if (this.head == null) {
            return;
        }
        if (this.head.value == key) {
            this.insertFirst(itemToInsert);
            return;
        }
        let prevNode = null;
        let currNode = this.head;
        while (currNode !== null && currNode.value !== key) {
            prevNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Node not found to insert');
            return;
        }

        prevNode.next = new _Node(itemToInsert, currNode);
    }
    insertAt(nthPosition, itemToInsert) {
        if (nthPosition < 0) {
            throw new Error('Position error');
        }
        if (nthPosition === 0) {
            this.insertFirst(itemToInsert);
        } else {
            let node = this._findNthElement(nthPosition - 1);
            const newNode = new _Node(itemToInsert, null);
            if (!node) {
                // we are at the next value of the last element in the linked list
                node = newNode;
            } else {
                newNode.next = node.next;
                node.next = newNode;
            }
        }
    }
    _findNthElement(position) {
        let node = this.head;
        for (let i = 0; i < position; i++) {
            node = node.next;
        }
        return node;
    }
    remove(item) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        let currNode = this.head;
        let previousNode = this.head;
        while (currNode !== null && currNode.value !== item) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }
    find(item) { //find a node
        let currNode = this.head;
        if (!this.head) {
            return null;
        }
        while (currNode.value !== item) {
            if (currNode.next === null) {
                return null;
            } else {
                currNode = currNode.next;
            }
        }
        return currNode;
    }
    size() { //returns the size of the linked list
        let counter = 0;
        let currNode = this.head;
        if (!currNode) {
            return counter;
        } else counter++;
        while (!(currNode.next == null)) {
            counter++;
            currNode = currNode.next;
        }
        return counter;
    }
    displayList() { //displays the linked list
        const arr = [];
        let currNode = this.head;
        while (currNode !== null) {
            arr.push(currNode.value);
            currNode = currNode.next;
        }
        return arr;
    }
}

module.exports = LinkedList;