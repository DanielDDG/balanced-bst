import { Tree, prettyPrint, sortedArray } from "./main.js";
let sortedRandomArray = [1, 7, 15, 27, 40, 41, 52, 53, 70, 77, 80, 83, 84];

function randomNumbers() {
  let randomNumberArray = [];
  for (let i = 0; i < 15; i++) {
    randomNumberArray.push(Math.floor(Math.random() * 100));
  }

  let sortedRandomArray = Array.from(new Set(randomNumberArray)).sort(
    (a, b) => a - b
  );

  return sortedRandomArray;
}

let tree = new Tree(sortedRandomArray);

// Unbalancing!
tree.insert(105);
tree.insert(134);
tree.insert(153);

tree = new Tree(tree.rebalance());
console.log(tree.isBalanced());

console.log("Level Order:");
tree.levelOrderRecursive(console.log);

console.log("Pre Order:");
tree.preOrder(tree.root, console.log);

console.log("Post Order:");
tree.postOrder(tree.root, console.log);

console.log("Inorder:");
tree.inOrder(tree.root, console.log);

prettyPrint(tree.root);
