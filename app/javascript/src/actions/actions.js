import { defaultCell, LEVEL } from "../store/defaultStore";

function putBombs() {
  const locations = [];
  while (locations.length < LEVEL.mines) {
    const x = Math.floor(Math.random() * LEVEL.size);
    const y = Math.floor(Math.random() * LEVEL.size);
    const coordinate = `${x},${y}`;
    if (!locations.includes(coordinate)) {
      locations.push(coordinate);
    }
  }
  return locations;
}

function parseCellsToArray(board) {
  var cells = [];
  let coordinateX = 0;
  while (coordinateX != 16) {
    let coordinateY = 0;
    while (coordinateY != 16) {
      cells.push(board[`${coordinateX},${coordinateY}`]);
      coordinateY += 1;
    }
    coordinateX += 1;
  }
  return cells
}

function saveOne(board) {
  fetch(`api/cells/${board.position}`, {
    method: "PUT",
    body: JSON.stringify(board),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function parseCoordinates(position) {
  const coords = position.split(",");
  const row = Number(coords[0]);
  const col = Number(coords[1]);
  return { row, col };
}

function saveAll(cell) {
  fetch(`api/save/board`, {
    method: "PUT",
    body: JSON.stringify({ cell }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function loadGame() {
  let url = "api/load/board";
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);
  return JSON.parse(request.responseText);
}

function coordinateForBoard(boardSize, callback) {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const coordinate = [row, col].join(",");
      callback(coordinate, row, col);
    }
  }
}

function aroundCells(coordinate, callback) {
  const p = parseCoordinates(coordinate);
  for (let x = p.row - 1; x <= p.row + 1; x++) {
    for (let y = p.col - 1; y <= p.col + 1; y++) {
      if (x >= 0 || y >= 0) {
        const surroundCoord = [x, y].join(",");
        callback(surroundCoord, x, y);
      }
    }
  }
}

function openCell(board, position) {
  let newBoard;
  if (board[position].isOpen || board[position].hasFlag) {
    return board;
  }

  if (board[position].hasMine) {
    alert("bomba!!!");
    newBoard = resetGame();
    return newBoard;
  }

  const cell = { ...board[position], isOpen: true };
  if (cell.count === 0) {
    newBoard = { ...board, [position]: cell };
    newBoard = openAround(newBoard, position);
  } else {
    newBoard = { ...board, [position]: cell };
  }
  saveOne(newBoard[position]);
  return newBoard;
}

function swapFlag(board, position) {
  if (board[position].isOpen) {
    return board;
  }
  const cell = { ...board[position], hasFlag: !board[position].hasFlag };
  const newBoard = { ...board, [position]: cell };
  saveOne(newBoard[position]);
  return newBoard;
}

function openAround(board, position) {
  let newBoard = { ...board };

  aroundCells(position, coordinate => {
    if (
      newBoard[coordinate] &&
      !newBoard[coordinate].hasMine &&
      !newBoard[coordinate].isOpen
    ) {
      newBoard = openCell(newBoard, coordinate);
    }
  });
  return newBoard;
}

function defaultBoard(boardSize) {
  const board = {};
  coordinateForBoard(boardSize, coordinate => {
    board[coordinate] = { ...defaultCell, position: coordinate };
  });
  return board;
}

function resetGame() {
  const board = defaultBoard(LEVEL.size);
  putBombs().forEach(coordinate => {
    board[coordinate].hasMine = true;
  });
  coordinateForBoard(LEVEL.size, coordinate => {
    if (!board[coordinate].hasMine) {
      aroundCells(coordinate, mineCheckCoord => {
        if (board[mineCheckCoord] && board[mineCheckCoord].hasMine) {
          board[coordinate].count += 1;
        }
      });
    }
  });
  let cells = parseCellsToArray(board)
  saveAll(cells);
  return board;
}

export {
  defaultBoard,
  coordinateForBoard,
  aroundCells,
  openCell,
  resetGame,
  swapFlag,
  loadGame
};
