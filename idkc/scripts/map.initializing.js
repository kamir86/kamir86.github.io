function loadMap(mapFile) {
    // URL of the JSON file
    const url = `../resources/${mapFile}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tiles = data.tiles;
            loadTiles(tiles);

            const shrines = data.shrines;
            loadShrines(shrines);
        })
        .catch(error => console.error('Error loading or processing JSON file:', error));
}

function findHexagon(x,y,z) {
    const hexagonClass = `pos_${x}_${y}_${z}`;
    // Find the hexagon element with the corresponding class
    return document.querySelector(`.hexagon.${hexagonClass}`);
}

function loadTiles(tiles) {
    // Iterate through each tile in the JSON object
    for (const x in tiles) {
        for (const y in tiles[x]) {
            for (const z in tiles[x][y]) {
                const tile = tiles[x][y][z];

                const hexagon = findHexagon(x,y,z);

                if (hexagon) {
                    // Add land type class
                    hexagon.classList.add(`${tile.land_type}`);

                    // Add resource type class
                    hexagon.classList.add(`${tile.resource_type}`);

                    if(tile.village_tile || tile.resource_type === 'village_center') {
                        hexagon.classList.add('red-border');
                    }
                }
            }
        }
    }
}

function loadShrines(shrines) {
    shrines.forEach(shrine => {
        if (shrine) {
            const hexagon = findHexagon(...Object.values(shrine.locations[0]));
            hexagon.classList.add('shrine');
            hexagon.classList.add(shrine.type);
            hexagon.setAttribute('shrine-text', `x${shrine.multiplier} ${shrine.type}`)
        }
    });
    sessionStorage.setItem("shrines", JSON.stringify(shrines));
}