const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(value) {
    let root = this.root;
    while (root != null) {
      if (root.left == null && root.right == null) {
        if (value < root.value) {
          root.left = new Node(value);
          break;
        } else {
          root.right = new Node(value);
          break;
        }
      }

      if (value < root.value) {
        root = root.left;
      } else {
        root = root.right;
      }
    }
  }

  deleteItem(value) {
    let node = this.root;
    let parent = node;

    while (node != null) {
      if (value === node.value) {
        // Deleting a leaf node.
        if (node.left === null && node.right == null) {
          if (node.value < parent.value) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        }

        // Deleting a single child node.
        if (node.left === null && node.right != null) {
          if (node.value < parent.value) {
            parent.left = node.right;
            node.right = null;
            break;
          } else {
            parent.right = node.right;
            node.right = null;
            break;
          }
        }
        if (node.left != null && node.right === null) {
          if (node.value < parent.value) {
            parent.left = node.left;
            node.left = null;
            break;
          } else {
            parent.right = node.left;
            node.left = null;
            break;
          }
        }

        // Deleting any node.
        if (node.left != null && node.right != null) {
          parent = node;
          node = node.right;
          while (node != null) {
            if (node.left === null) {
              this.deleteItem(node.value);
              parent.value = node.value;
              break;
            } else {
              node = node.left;
            }
          }
        }
      }

      if (value < node.value) {
        parent = node;
        node = node.left;
      } else {
        parent = node;
        node = node.right;
      }
    }
  }

  find(value) {
    let node = this.root;

    while (node != null) {
      if (value < node.value) {
        node = node.left;
      } else if (value > node.value) {
        node = node.right;
      } else {
        return node;
      }
    }
    return "Node does not exist.";
  }

  levelOrderIterative(callback) {
    const queue = [this.root];
    const array = [];

    while (queue.length > 0) {
      array.push(queue[0].value);

      if (callback) {
        callback(queue[0].value);
      }
      if (queue[0].left != null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right != null) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }

    return array;
  }

  levelOrderRecursive(callback, queue = [this.root], array = []) {
    if (queue.length < 1) return array;
    array.push(queue[0].value);

    if (callback != null) {
      callback(queue[0].value);
    }
    if (queue[0].left != null) {
      queue.push(queue[0].left);
    }
    if (queue[0].right != null) {
      queue.push(queue[0].right);
    }
    queue.shift();

    return this.levelOrderRecursive(callback, queue, array);
  }

  preOrder(node, callback, array = []) {
    if (node === null) return array;
    if (callback != undefined) callback(node.value);

    array.push(node.value);

    this.preOrder(node.left, callback, array);
    this.preOrder(node.right, callback, array);

    return array;
  }

  inOrder(node, callback, array = []) {
    if (node === null) return array;

    this.inOrder(node.left, callback, array);
    if (callback != undefined) callback(node.value);
    array.push(node.value);
    this.inOrder(node.right, callback, array);

    return array;
  }

  postOrder(node, callback, array = []) {
    if (node === null) return array;

    this.postOrder(node.left, callback, array);
    this.postOrder(node.right, callback, array);
    if (callback != undefined) callback(node.value);
    array.push(node.value);

    return array;
  }

  // The height of a node is the number of edges present in the longest path connecting that node to a leaf node.
  height(node) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let root = this.root;
    let depth = 0;
    while (root != null) {
      if (node.value < root.value) {
        root = root.left;
        depth++;
      } else if (node.value > root.value) {
        root = root.right;
        depth++;
      } else {
        return depth;
      }
    }
  }

  isBalanced() {
    let leftTreeHeight = this.height(this.root.left);
    let rightTreeHeight = this.height(this.root.right);
    let difference;

    if (leftTreeHeight > rightTreeHeight) {
      difference = leftTreeHeight - rightTreeHeight;
    } else {
      difference = rightTreeHeight - leftTreeHeight;
    }

    if (difference > 1) {
      return "Not balanced.";
    } else {
      return "Balanced!";
    }
  }

  rebalance() {
    let newTree = this.inOrder(this.root);
    return newTree;
  }
}

// Function to visualize binary search tree.
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

/*
let tree = new Tree(sortedArray);
tree.insert(7000);
tree.insert(8000);

console.log(tree.isBalanced());
prettyPrint(tree.root);

let newTree = tree.rebalance();
tree = new Tree(newTree);
console.log(tree.isBalanced());
prettyPrint(tree.root);
*/

export { Tree, prettyPrint, sortedArray };
