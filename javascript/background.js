document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('game-grid');

    // Create 289 tiles (17 x 17)
    for (let i = 0; i < 289; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
    }
});