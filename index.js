
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
const UPDATE_TIME = 700;
let isGameStarted;
let isPlaying = true;
let intervalId;

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

const DIRECTIONS = {
  RIGHT: 0,
  LEFT: 1,
  DOWN: 2,
  ROTATE: 3,
};

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
        movePiece(screen, DIRECTIONS.LEFT);
        break;

      case "d":
        movePiece(screen, DIRECTIONS.RIGHT);
        break;

      case "s":
        movePiece(screen, DIRECTIONS.DOWN);
        break;

      case "j":
        movePiece(screen, DIRECTIONS.ROTATE);
        break;
      case "escape":
        process.exit();
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
  console.clear();
  console.log(TITLE);
}

function updateBoard(screen) {
  intervalId = setInterval(() => {
    console.clear();
    setTimeout(() => {
      screen = movePiece(screen, DIRECTIONS.DOWN);
    }, 500);
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

// function movePiece(screen) {
//   for (let i = screen.length - 2; i >= 0; i--) {
//     for (let j = screen[i].length - 1; j >= 0; j--) {
//       // GO DOWN WITHOUT PRESSING DOWN KEY
//       if (screen[i][j] === "⬛") {
//         screen[i][j] = "⬜";
//         screen[i + 1][j] = "⬛";
//       }
//     }
//   }
// }

// function movePieceRight() {
//   for (let i = screen.length - 2; i >= 0; i--) {
//     for (let j = screen[i].length - 1; j >= 0; j--) {
//       // GO RIGHT
//       if (screen[i][j] < 1 || screen[i][j] > screen[i].length - 2) {
//         console.log("movimiento invalido");
//         break;
//       } else if (screen[i][j] === "⬛") {
//         screen[i][j] = "⬜";
//         screen[i][j + 1] = "⬛";
//       }
//     }
//   }
// }

// function movePieceLeft() {
//   console.log("left");
// }

// function movePieceDown() {
//   console.log("down");
// }

// function rotatePiece() {
//   console.log("rotate");
// }

function movePiece(screen, direction) {
  for (let i = screen.length - 2; i >= 0; i--) {
    for (let j = screen[i].length - 1; j >= 0; j--) {
      if (screen[i][j] === "⬛") {
        switch (direction) {
          //RIGHT
          case 0:
            if (j < screen[i].length - 1 && screen[i][j + 1] === "⬜") {
              screen[i][j] = "⬜";
              screen[i][j + 1] = "⬛";
            }
            break;
          //LEFT
          case 1:
            if (j > 0 && screen[i][j - 1] === "⬜") {
              screen[i][j] = "⬜";
              screen[i][j - 1] = "⬛";
            }
            break;
          //DOWN
          case 2:
            if (i < screen.length - 1 && screen[i + 1][j] === "⬜") {
              screen[i][j] = "⬜";
              screen[i + 1][j] = "⬛";
            }
            break;
          //ROTATE
          case 3:
            console.log("rotate");
            break;
        }
      }
    }
  }

  return screen;
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

  screen = resetScreen();
  isPlaying = true;
  updateBoard(screen);
}

tetris();

function resetScreen() {
  return [
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
}
