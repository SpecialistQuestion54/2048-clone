const new_game_btn = document.querySelector(".new-game-btn");
const score_text = document.querySelector(".score-value");
new_game_btn.addEventListener('click', function () {
    location.reload();
});
let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let grid = document.querySelector(".grid");
let score = 0;
let selected_tile = null;
console.log(board);

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
    console.log(board);
}
function moveWholeBoardDown() {
    let f = false;
    for (let j = 0; j < 4; j++) {
        let col = board.map(x => x[j]);
        col = col.filter(x => x != 0);
        for (let i = col.length - 1; i > 0; i--) { 
            if (col[i] === col[i - 1]) {
                col[i] *= 2;
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

    if (f) random_Spawn();
    updateDisplay();
}
function random_Spawn() {
    let sp = Math.floor(Math.random() * 16);
    if (board[Math.floor(sp / 4)][Math.floor(sp % 4)] == 0) {
        const start = document.getElementById(sp.toString());
        start.className = "tile-2";
        start.innerText = start.className.split("-")[1];
        board[Math.floor(sp / 4)][sp % 4] = 2;
    } else random_Spawn();

}
random_Spawn();
random_Spawn();


grid.addEventListener("click", function (event) {
    const target = event.target;
    if (selected_tile) {
        selected_tile.style.border = "none";
        const s = Number(selected_tile.id);
        const t = Number(target.id);
        if (Math.floor(s / 4) < Math.floor(t / 4)) {
            moveWholeBoardDown();
        }
        selected_tile = null;
    } else {
        selected_tile = target;
        selected_tile.style.border = "3px solid black";
    }
});

grid.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (selected_tile) selected_tile.style.border = "none";
    selected_tile = null;
})
