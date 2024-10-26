const new_game_btn = document.querySelector(".new-game-btn");
new_game_btn.addEventListener('click', function () {
    location.reload();
});

function initSpawn() {
    const sp = Math.floor(Math.random() * 16) + 1;
    const start = document.getElementById(sp.toString());
    start.className = "tile-2";
    start.innerText = start.className.split("-")[1];
}
function spawn(tile_type, id) {
    const start = document.getElementById(id);
    start.className = "tile-" + tile_type;
    start.innerText = start.className.split("-")[1];
}
initSpawn();
initSpawn();
let selected_tile = null;

document.querySelector(".grid").addEventListener("click", function (event) {
    const target = event.target;
    if (target.className.startsWith("tile-")) {
        // Tile is selected
        if (selected_tile) {
            sid = Number(selected_tile.id);
            selected_tile.style.border = "none";
            if (Math.abs(tid - sid) < 4 || tid % 4 === sid % 4 && target.className === selected_tile.className && target.id != selected_tile.id) {
                selected_tile.className = "cell";
                selected_tile.innerText = "";
                selected_tile.style.border = "none"; // Remove selection border
                selected_tile = null; // Clear the selection
                spawn(Number(target.className.split("-")[1] * 2).toString(), target.id);
                target.style.border = "none";
                initSpawn();
            }

        } // Remove border from previously selected tile
        selected_tile = target;
        selected_tile.style.border = "2px solid black"; // Add border to current selection
    }
    else if (target.className === "cell" && selected_tile) {
        // Move the selected tile to the empty cell
        sid = Number(selected_tile.id);
        if (movementCondition(tid, sid)) {
            target.className = selected_tile.className;
            target.innerText = selected_tile.innerText;

            // Reset the original tile back to a cell
            selected_tile.className = "cell";
            selected_tile.innerText = "";
            selected_tile.style.border = "none"; // Remove selection border
            selected_tile = null; // Clear the selection
        }
    }
});
