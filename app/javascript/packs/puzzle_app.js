// HINT BUTTON TOGGLE (opacity 0 -> 1)
const hint_btn = document.getElementById("show-hint");
const hint = document.querySelector(".hint");

hint_btn.addEventListener("click", () => {
    hint.classList.toggle("active");
});

// 1. Select all tiles
const tiles = document.querySelectorAll("td");

// 2. For each tile
tiles.forEach((tile) => {
  // 3. Listen to the click event
  tile.addEventListener("click", (event) => {
    // 4. If it has an empty neighbor
    if (canMove(tile)) { // Better practice to replace "tile" with "event.currentTarget"
    // => return true or false
    // 5. Swap the tile and the empty space
    moveTile(tile); // Better practice to replace "tile" with "event.currentTarget"
    // 6. Check if player wins
    checkIfPlayerWins();
    };
  });
});



const canMove = (tile) => {
  const tileColumn = tile.cellIndex; // column index
  const tileRow = tile.parentElement.rowIndex; // row index (need to go up one lvl -> tr tag)
  const emptyTile = document.querySelector(".empty");
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentElement.rowIndex;

  // console.log("Clicked tile: ")
  // console.log(tileColumn);
  // console.log(tileRow);
  // console.log(tile.parentElement);
  // console.log("Empty tile: ")
  // console.log(emptyTileColumn);
  // console.log(emptyTileRow );

  // One way to check if it can move
  return (tileColumn === emptyTileColumn && tileRow === emptyTileRow + 1) ||
         (tileColumn === emptyTileColumn && tileRow === emptyTileRow - 1) ||
         (tileRow === emptyTileRow && tileColumn === emptyTileColumn + 1) ||
         (tileRow === emptyTileRow && tileColumn === emptyTileColumn - 1);

  // // Below method got bug (can move tile @(3,0) when empty tile @(2,2)):
  // const result = tileRow + tileColumn - emptyTileRow - emptyTileColumn
  // return (result == 1 || result == -1);
};

const moveTile = (element) => {
  // 1. Select empty tile
  const emptyTile = document.querySelector(".empty");
  // 2. Replace its content with the `element`'s content
  emptyTile.innerText = element.innerText;
  // 2. Remove its `empty` class
  emptyTile.classList.remove("empty");
  // 4. Empty `element`'s content
  element.innerText = "";
  // 5. Add empty class to `element`
  element.classList.add("empty");
};

const checkIfPlayerWins = () => {
  // tiles => NodeList: [td,td,td...]
  // result => Array: [1,2,3...]
  // result.join => String: "1,2,3..."

  // Transforms the NodeList into an array
  const result = []
  tiles.forEach((tile) => {
    result.push(tile.innerText);
  })
  console.log(result);

  // Compare it to the correct output
  if (result.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,") {
    alert("You won!")
  }
};


export { canMove, moveTile, checkIfPlayerWins };
