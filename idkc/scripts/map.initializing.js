function loadMap(mapFile) {
    // URL of the JSON file
    const url = `../resources/${mapFile}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tiles = data.tiles;

            // Iterate through each tile in the JSON object
            for (const x in tiles) {
                for (const y in tiles[x]) {
                    for (const z in tiles[x][y]) {
                        const tile = tiles[x][y][z];
                        const hexagonClass = `pos_${x}_${y}_${z}`;

                        // Find the hexagon element with the corresponding class
                        const hexagon = document.querySelector(`.hexagon.${hexagonClass}`);

                        if (hexagon) {
                            // Add land type class
                            hexagon.classList.add(`${tile.land_type}`);

                            // Add resource type class
                            hexagon.classList.add(`${tile.resource_type}`);

                            if(tile.village_tile || tile.resource_type === 'village_center') {
                                hexagon.classList.add('red-border');
                            }

                            const shrine = tile.shrine;
                            if (shrine) {
                                hexagon.classList.add('shrine');
                                hexagon.classList.add(shrine.type);
                                hexagon.setAttribute('shrine-text', `x${shrine.multiplier} ${shrine.type}`)
                            }
                        }
                    }
                }
            }
        })
        .catch(error => console.error('Error loading or processing JSON file:', error));
}

