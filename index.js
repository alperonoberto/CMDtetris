const TITLE = `
      ______     __       _     
     /_  __/__  / /______(_)____
      / / / _ \\/ __/ ___/ / ___/
     / / /  __/ /_/ /  / (__  ) 
    /_/  \\___/\\__/_/  /_/____/  
┏┓                ┓                   
┃┃┏┓┏┓┏┏  ┏┏┓┏┓┏┏┓┣┓┏┓┏┓  ╋┏┓  ┏╋┏┓┏┓╋
┣┛┛ ┗ ┛┛  ┛┣┛┗┻┗┗ ┗┛┗┻┛   ┗┗┛  ┛┗┗┻┛ ┗
           ┛                          
______________________________________
        ©alperonoberto, 2023
`;
const UPDATE_TIME = 1000;
let isGameStarted;
let isPlaying = true;
let intervalId;

// let piece = {
//   pixels: [
//     {
//       x: 0,
//       y: 0
//     }
//   ]
// }

let screen = [
  ["⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬛", "⬛", "⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
];

const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (str, key) => {
  if (!isGameStarted) {
    if (key.name.toLowerCase() === "space") {
      isGameStarted = true;
      updateBoard(screen);
    }
  } else if (isPlaying) {
    switch (key.name.toLowerCase()) {
      case "a":
        movePieceLeft();
        break;

      case "d":
        movePieceRight();
        break;

      case "s":
        movePieceDown();
        break;

      case "j":
        rotatePiece();
        break;

      default:
        break;
    }
  }
});

function tetris() {
  greet();
}

function greet() {
  console.log(TITLE);
}

function updateBoard(screen) {
  intervalId = setInterval(() => {
    console.clear();
    setTimeout(() => movePiece(screen), 500);
    isPlaying ? renderBoard(screen) : gameOver();
  }, UPDATE_TIME);
}

function renderBoard(screen) {
  screen.map((row, i) => {
    if (screen.length - 1 === i) {
      isPlaying = row.includes("⬛") ? false : true;
    }
    console.log(row.join(""));
  });
}

function movePiece(screen) {
  for (let i = screen.length - 2; i >= 0; i--) {
    for (let j = screen[i].length - 1; j >= 0; j--) {
      // GO DOWN WITHOUT PRESSING DOWN KEY
      if (screen[i][j] === "⬛") {
        screen[i][j] = "⬜";
        screen[i + 1][j] = "⬛";
      }
    }
  }
}

function movePieceRight() {
  for (let i = screen.length - 2; i >= 0; i--) {
    for (let j = screen[i].length - 1; j >= 0; j--) {
      // GO RIGHT
      if (screen[i][j] === "⬛" && j !== screen[i].length - 1) {
        screen[i][j] = "⬜";
        screen[i][j + 1] = "⬛";
      }
    }
  }
}

function movePieceLeft() {
  console.log("left");
}

function movePieceDown() {
  console.log("down");
}

function rotatePiece() {
  console.log("rotate");
}

function gameOver() {
  clearInterval(intervalId);
  console.log("Game finished.");
  let answer = "";

  while (answer !== "y") {
    if (answer === "n") {
      console.log("See you later!");
      process.exit();
    }
    answer = prompt("Play again? (y/n) ");
  }

  screen = [
    ["⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬛", "⬛", "⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
    ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"],
  ];
  isPlaying = true;
  updateBoard(screen);
}

tetris();
