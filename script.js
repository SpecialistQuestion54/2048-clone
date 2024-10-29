const new_game_btn = document.querySelector(".new-game-btn");
const score_text = document.querySelector(".score-value");
const high_score_text = document.querySelector(".best");
new_game_btn.addEventListener('click', function () {
    location.reload();
});
let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

let grid = document.querySelector(".grid");
let score = 0;
let highScore = sessionStorage.getItem("highScore") ? sessionStorage.getItem("highScore") : 0;
high_score_text.innerText = highScore.toString();
let selected_tile = null;
console.log(board);

function updateBoard(board){
    sessionStorage.setItem("board", JSON.stringify(board));
}

function random_Spawn() {

    let sp = Math.floor(Math.random() * 16);
    if (board[Math.floor(sp / 4)][Math.floor(sp % 4)] === 0) {
        const start = document.getElementById(sp.toString());
        start.className = "tile-2";
        start.innerText = start.className.split("-")[1];
        board[Math.floor(sp / 4)][sp % 4] = 2;
        updateBoard();
    }else random_Spawn();
}

function updateDisplay() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const target_tile_id = (i * 4 + j).toString();
            const target_tile = document.getElementById(target_tile_id);
            const tti_className = board[i][j] == 0 ? "cell" : "tile-" + board[i][j].toString();
            target_tile.className = tti_className.indexOf("-") == -1 ? "cell" : tti_className;
            target_tile.innerText = tti_className.indexOf("-") == -1 ? "" : tti_className.split("-")[1];
        }
    }
    
}

function isGameOver(board) {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false; // Game can continue if an empty cell is found
            }
            
            // Check horizontally for possible merge
            if (j < 3 && board[i][j] === board[i][j + 1]) {
                return false;
            }
            
            // Check vertically for possible merge
            if (i < 3 && board[i][j] === board[i + 1][j]) {
                return false;
            }
        }
    }
    
    return true; // Game is over if no empty cells or possible merges are found
}

function equal(a, b) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function moveWholeBoardDown() {
    const copy = board.map(x => x.slice());
    for (let j = 0; j < 4; j++) {
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
        let k = 4 - col.length;
        while (k--) {
            f = true;
            col.unshift(0);
        }
        for (i = 0; i < 4; i++)
            board[i][j] = col[i];

    }
    if (!equal(board,copy)) {
        random_Spawn();
        updateDisplay();
        updateBoard(copy);
    }
    else if(isGameOver(board)) {
        document.querySelector(".game-over").style.display = "flex";
    }

}

function moveWholeBoardUp() {
    const copy = board.map(x => x.slice());
    for (let j = 0; j < 4; j++) {
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
        let k = 4 - col.length;
        while (k--) {
            col.push(0);
        }
        for (i = 0; i < 4; i++)
            board[i][j] = col[i];

    }

    if (!equal(board, copy)) {
        random_Spawn();
        updateDisplay();
        updateBoard(copy);
    }
    else if(isGameOver(board)) {
        document.querySelector(".game-over").style.display = "flex";
    }
}

function moveWholeBoardRight() {
    const copy = board.map(x => x.slice());
    for (let i = 0; i < 4; i++) {
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
        let k = 4 - row.length;
        while (k--) {
            f = true;
            row.unshift(0);
        }
        board[i] = row;
    }

    if (!equal(board, copy)) {
        random_Spawn();
        updateDisplay();
        updateBoard(copy);
    }
    else if(isGameOver(board)) {
        document.querySelector(".game-over").style.display = "flex";
    }
}

function moveWholeBoardLeft() {
    const copy = board.map(x => x.slice());
    for (let i = 0; i < 4; i++) {
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
        let k = 4 - row.length;
        while (k--) {
            f = true;
            row.push(0);
        }
        board[i] = row;
    }

    if (!equal(board, copy)) {
        random_Spawn();
        updateDisplay();
        updateBoard(copy);
    }
    else if(isGameOver(board)) {
        document.querySelector(".game-over").style.display = "flex";
    }
}

function updateScore() {
    score_text.innerText = score;
    highScore = score > highScore ? score : highScore;
    high_score_text.innerText = highScore.toString();
    sessionStorage.setItem("highScore", highScore);
}

random_Spawn();
random_Spawn();
updateBoard();

grid.addEventListener("click", function (event) {
    const target = event.target;
    if (selected_tile) {
        selected_tile.style.border = "none";
        const str = Math.floor(Number(selected_tile.id) / 4);
        const ttr = Math.floor(Number(target.id) / 4);
        const stc = Math.floor(Number(selected_tile.id) % 4);
        const ttc = Math.floor(Number(target.id) % 4);
        if (ttr > str && ttc === stc) {
            moveWholeBoardDown();
        }
        else if (ttr < str && ttc === stc)
            moveWholeBoardUp();
        else if (ttr === str && ttc > stc)
            moveWholeBoardRight();
        else moveWholeBoardLeft();
        selected_tile = null;
    } else {
        selected_tile = target;
        selected_tile.style.border = "3px solid black";
    }
    updateScore();
    
});

grid.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (selected_tile) selected_tile.style.border = "none";
    selected_tile = null;
})


document.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (selected_tile) {
        selected_tile.style.border = "none";
        selected_tile = null;
    }
    const delay = 65;
    if (event.key === "ArrowLeft") {
        setTimeout(() => { moveWholeBoardLeft(); }, delay);

    } else if (event.key === "ArrowRight") {
        setTimeout(() => { moveWholeBoardRight(); }, delay);

    } else if (event.key === "ArrowUp") {
        setTimeout(() => { moveWholeBoardUp(); }, delay);

    } else if (event.key === "ArrowDown") {
        setTimeout(() => { moveWholeBoardDown(); }, delay);

    }
    updateScore();
})

document.querySelector(".undo").addEventListener('click', function () {
    board = JSON.parse(sessionStorage.getItem("board"));
    updateDisplay();
})