const new_game_btn = document.querySelector(".new-game-btn");
const score_text = document.querySelector(".score-value");
new_game_btn.addEventListener('click', function () {
    location.reload();
});
let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let grid = document.querySelector(".grid");
let score = 0;
let selected_tile = null;
console.log(board);
function moveWholeBoardDown(){
    for(let i=0; i<4; i++){
        
    }
}
function random_Spawn() {
    let sp = Math.floor(Math.random() * 16);
    if (board[Math.floor(sp/4)][Math.floor(sp%4)] == 0) {
        const start = document.getElementById(sp.toString());
        start.className = "tile-2";
        start.innerText = start.className.split("-")[1];
        board[Math.floor(sp/4)][sp%4] = 2;
    }else random_Spawn();

}
function deterministic_spawn(tile_type, id) {
    const start = document.getElementById(id);
    start.className = "tile-" + tile_type;
    start.innerText = start.className.split("-")[1];
    board[id] = Number(tile_type);
}
random_Spawn();
random_Spawn();


grid.addEventListener("click", function (event) {
    const target = event.target;
    if (target.className.startsWith("tile-")) {
        // Tile is selected
        if (selected_tile) {
            selected_tile.style.border = "none";

            const tid = Number(target.id);
            const sid = Number(selected_tile.id);

            if ((tid % 4 == sid % 4 || Math.floor(tid / 4) == Math.floor(sid / 4)) && target.className === selected_tile.className && target.id != selected_tile.id) {
                selected_tile.className = "cell";
                selected_tile.innerText = "";
                selected_tile.style.border = "none"; // Remove selection border
                board[Math.floor(sid/4)][sid%4] = 0;
                selected_tile = null; 

                const type = (Number(target.className.split("-")[1]) * 2).toString();
                target.className = "tile-" + type;
                target.innerText = target.className.split("-")[1];

                board[Math.floor(tid / 4)][tid%4] = Number(target.className.split("-")[1]);
                target.style.border = "none";
                score += Number(type);
                score_text.innerText = score;
                random_Spawn();
                console.log(board);
            }

        } // Remove border from previously selected tile
        selected_tile = target;
        selected_tile.style.border = "2px solid black"; // Add border to current selection
    }
    else if (target.className === "cell" && selected_tile) {
        // Move the selected tile to the empty cell
        const tid = Number(target.id);
        const sid = Number(selected_tile.id);
        if (tid % 4 == sid % 4 || Math.floor(tid / 4) == Math.floor(sid / 4)) {
            target.className = selected_tile.className;
            target.innerText = selected_tile.innerText;

            // Reset the original tile back to a cell
            selected_tile.className = "cell";
            selected_tile.innerText = "";
            selected_tile.style.border = "none"; // Remove selection border
            board[Math.floor(sid/4)][sid%4] = 0;
            board[Math.floor(tid / 4)][tid%4] = Number(selected_tile.id);
            selected_tile = null; // Clear the selection
            random_Spawn();
            console.log(board);
        } else selected_tile.style.border = "none";
    }
});

grid.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    selected_tile.style.border = "none";
    selected_tile = null;
})
