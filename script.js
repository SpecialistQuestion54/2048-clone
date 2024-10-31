const new_game_btn = document.querySelector(".new-game-btn");
const score_text = document.querySelector(".score-value");
const high_score_text = document.querySelector(".best");
new_game_btn.addEventListener('click', function () {
    location.reload();
});
let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const ROW = 4;
const CELLS = ROW * ROW;
const WINNING_SCORE = 2048;

let grid = document.querySelector(".grid");
let score = 0;
let highScore = sessionStorage.getItem("highScore") ? sessionStorage.getItem("highScore") : 0;
high_score_text.innerText = highScore.toString();
let selected_tile = null;
console.log(board);

function updateBoard(board) {
    sessionStorage.setItem("board", JSON.stringify(board));
}

function random_Spawn() {

    let sp = Math.floor(Math.random() * CELLS);
    if (board[Math.floor(sp / ROW)][Math.floor(sp % ROW)] === 0) {
        const start = document.getElementById(sp.toString());
        start.className = "tile-2";
        start.innerText = start.className.split("-")[1];
        board[Math.floor(sp / ROW)][sp % ROW] = 2;
        updateBoard();
    } else random_Spawn();
}

function updateDisplay() {
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < ROW; j++) {
            const target_tile_id = (i * ROW + j).toString();
            const target_tile = document.getElementById(target_tile_id);
            const tti_className = board[i][j] == 0 ? "cell" : "tile-" + board[i][j].toString();
            target_tile.className = tti_className.indexOf("-") == -1 ? "cell" : tti_className;
            target_tile.innerText = tti_className.indexOf("-") == -1 ? "" : tti_className.split("-")[1];
        }
    }

}

function isGameOver(board) {
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < ROW; j++) {
            if (board[i][j] === 0) {
                return false;
            }

            if (j < 3 && board[i][j] === board[i][j + 1]) {
                return false;
            }

            if (i < 3 && board[i][j] === board[i + 1][j]) {
                return false;
            }
        }
    }

    return true;
}

function equal(a, b) {
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < ROW; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function moveBoard(dir) {
    sessionStorage.setItem("board", JSON.stringify(board));
    const copy = JSON.parse(sessionStorage.getItem("board"));
    switch (dir) {
        case "ArrowLeft":
            for (let i = 0; i < ROW; i++) {
                let row = board[i];
                row = row.filter(x => x != 0);
                for (let j = 0; j < row.length - 1; j++) {
                    if (row[j] === row[j + 1]) {
                        row[j] *= 2;
                        score += row[j];
                        row[j + 1] = 0;
                        f = true;
                    }
                }
                row = row.filter(value => value != 0);
                let k = ROW - row.length;
                while (k--) {
                    f = true;
                    row.push(0);
                }
                board[i] = row;
            }
            break;

        case "ArrowRight":
            for (let i = 0; i < ROW; i++) {
                let row = board[i];
                row = row.filter(x => x != 0);
                for (let j = row.length - 1; j > 0; j--) {
                    if (row[j] === row[j - 1]) {
                        row[j] *= 2;
                        score += row[j];
                        row[j - 1] = 0;
                        f = true;
                    }
                }
                row = row.filter(value => value != 0);
                let k = ROW - row.length;
                while (k--) {
                    f = true;
                    row.unshift(0);
                }
                board[i] = row;
            }
            break;

        case "ArrowUp":
            for (let j = 0; j < ROW; j++) {
                let col = board.map(x => x[j]);
                col = col.filter(x => x != 0);
                for (let i = 0; i < col.length - 1; i++) {
                    if (col[i] === col[i + 1]) {
                        col[i] *= 2;
                        score += col[i];
                        col[i + 1] = 0;
                    }
                }
                col = col.filter(value => value != 0);
                let k = ROW - col.length;
                while (k--) {
                    col.push(0);
                }
                for (i = 0; i < ROW; i++)
                    board[i][j] = col[i];

            }
            break;

        case "ArrowDown":
            for (let j = 0; j < ROW; j++) {
                let col = board.map(x => x[j]);
                col = col.filter(x => x != 0);
                for (let i = col.length - 1; i > 0; i--) {
                    if (col[i] === col[i - 1]) {
                        col[i] *= 2;
                        score += col[i];
                        col[i - 1] = 0;
                        f = true;
                    }
                }
                col = col.filter(value => value != 0);
                let k = ROW - col.length;
                while (k--) {
                    f = true;
                    col.unshift(0);
                }
                for (i = 0; i < ROW; i++)
                    board[i][j] = col[i];

            }
            break;
    }

    if (!equal(board, copy)) {
        random_Spawn();
        updateDisplay();
        updateBoard(copy);
        if(board.map(x => x.includes(WINNING_SCORE)).includes(true)) {
            document.querySelector(".game-over-text").innerText = "You Won!";
            document.querySelector(".game-over").style.display = "flex";
        }
    }
    else if (isGameOver(board)) {
        document.querySelector(".game-over").style.display = "flex";
    }
}

function updateScore() {
    score_text.innerText = score;
    highScore = score > highScore ? score : highScore;
    high_score_text.innerText = highScore.toString();
    sessionStorage.setItem("highScore", highScore);
}


document.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (selected_tile) {
        selected_tile.style.border = "none";
        selected_tile = null;
    }
    const delay = 65;
    setTimeout(() => {
        moveBoard(event.key);
    }, delay);
    updateScore();
})

document.querySelector(".undo").addEventListener('click', function () {
    board = JSON.parse(sessionStorage.getItem("board"));
    updateDisplay();
})

random_Spawn();
random_Spawn();
updateBoard(board);