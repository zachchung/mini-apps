const gridSize = { width: 10, height: 10 };
const bombProbability = 0.2;

const grid = document.querySelector("tbody");

// Functions ==================================================
// Build a 10x10 grid (instead of build in HTML)
const gridBuilder = (options) => { // <-options = {width: 10, height: 10}
  grid.innerHTML = "";
  // Add rows <tr>:
  for (let i = 1; i <= options.height; i++) {
    grid.insertAdjacentHTML('beforeend', '<tr></tr>');
  }
  // Select all rows:
  const rows = grid.querySelectorAll("tr");
  // Add cells <td> in each row:
  rows.forEach((row) => {
    for (let i = 0; i < options.width; i++) {
      // Assign bomb class to random tiles (20% probability):
      const hasBomb = Math.random() < bombProbability;
      if (hasBomb) {
        row.insertAdjacentHTML('beforeend', '<td class="unopened bomb"></td>');
      } else {
        row.insertAdjacentHTML('beforeend', '<td class="unopened"></td>');
      }
    }
  });
};

// Note: tbody(grid) > tr(row) > td(cell)
const findTile = (position) => { // <-position = {x: 1, y: 1}
  const row = grid.children[position.x]; // eg. grid.children[1] -> tr[1]
  if (row == null) return undefined; // ?????????????
  return row.children[position.y]; // eg. row.children[1] -> td[1]
};

// get all neighbor tiles (remove null):
const findTiles = (positions) => { // <-positions = [{x:1,y:2}, {x:1,y:0}, {}...]
  return positions.map(findTile).filter((tile) => { // ?????????????
  // filter() creates a new array with all elements that pass the test implemented by this function
    return tile;
  });
};

// get all 8 neighbor positions:
const neighborPositions = (position) => { // <-position = {x: 1, y: 1}
  return [
    { x: position.x - 1, y: position.y - 1 },
    { x: position.x, y: position.y - 1 },
    { x: position.x + 1, y: position.y - 1 },
    { x: position.x - 1, y: position.y },
    { x: position.x + 1, y: position.y },
    { x: position.x - 1, y: position.y + 1 },
    { x: position.x, y: position.y + 1 },
    { x: position.x + 1, y: position.y + 1 },
  ];
};
// console.log(neighborPositions({ x: 1, y: 1 }));
// [0,0] ,[1,0], [2,0], [0,1], [2,1], [0,2] ,[1,2], [2,2]


// Clicked empty/ no bomb:
const handleEmpty = (event) => {
  const currentTile = event.currentTarget;
  const tileColumn = currentTile.cellIndex;
  const tileRow = currentTile.parentElement.rowIndex;
  // Current tile posn:
  const position = { x: tileRow, y: tileColumn };
  // console.log(position); // -> position = {x: 1, y: 1}
  // Get all 8 neighbor positions:
  const positions = neighborPositions(position);
  // console.log(positions); // -> positions = [{x:1,y:1},{..},{..}...]
  // Get all neighbor tiles (remove null):
  const neighborTiles = findTiles(positions);
  // console.log(neighborTiles); // -> neighboTiles = [td,td,td...]
  // Count bomb in neighbors:
  let count = 0;
  neighborTiles.forEach((tile) => {
    if (tile.classList.contains("bomb")) {
      count += 1;
    }
    // return count;
  });
  // Add bomb-count class:
  currentTile.classList.add(`mine-neighbour-${count}`);
};

// Clicked bomb:
const handleBomb = (event) => {
  alert("You lost!");
  // Show all bombs after lost:
  const bombs = grid.querySelectorAll(".bomb");
  bombs.forEach((bomb) => {
    bomb.classList.add("mine");
  });
};

// Right click -> add flag:
const handleFlag = (event) => {
  event.preventDefault(); // prevent popup of right click menu
  event.currentTarget.classList.add("flagged");
};


// Calls ==================================================
gridBuilder(gridSize);


// Events ==================================================
const tiles = document.querySelectorAll("td"); // this need to be after gridBuilder call

tiles.forEach((tile) => {
  // Right click -> add flag
  tile.addEventListener("contextmenu", handleFlag); // contextmenu = right click!!!!!!!
  // Check whether bomb is selected:
  if (tile.classList.contains("bomb")) {
    tile.addEventListener("click", handleBomb);
  } else {
    tile.addEventListener("click", handleEmpty);
  }
});
