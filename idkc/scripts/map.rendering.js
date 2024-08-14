document.addEventListener('DOMContentLoaded', renderTiles);

function renderTiles(size) {
    const mapContainer = document.querySelector('.hexagon-map');
    const sideLength = 25; // Side length of the hexagon
    const numLayers = size || 18; // Number of layers in the hexagonal map
    const spacing = 1;
    document.documentElement.style.setProperty('--side-length', `${sideLength}px`);

    // Calculate the offset based on the maximum translation values
    const maxTranslationX = (sideLength * Math.sqrt(3) + spacing) * (numLayers + numLayers / 2);
    const maxTranslationY = (sideLength * 3 / 2 + spacing) * numLayers;

    // Positive offset to make all translations positive
    const offsetX = maxTranslationX;
    const offsetY = maxTranslationY;

    for (let q = -numLayers; q <= numLayers; q++) {
        for (let r = -numLayers; r <= numLayers; r++) {
            for (let s = -numLayers; s <= numLayers; s++) {
                if (q + r + s === 0) {
                    const hex = document.createElement('div');
                    hex.className = 'hexagon pos_' + q + '_' + r + '_' + s;

                    // Calculate the translation with the applied offset
                    const x = (sideLength * Math.sqrt(3) + spacing) * (q + r / 2) + offsetX;
                    const y = (sideLength * 3 / 2 + spacing) * r + offsetY;

                    hex.style.transform = `translate(${x}px, ${y}px)`;
                    mapContainer.appendChild(hex);
                }
            }
        }
    }

    // Dynamically set the height and width of the map container
    mapContainer.style.width = `${2 * offsetX + sideLength * Math.sqrt(3)}px`;
    mapContainer.style.height = `${2 * offsetY + sideLength * 1.5}px`;

    // Create and dispatch a custom event
    const event = new CustomEvent('mapInitializedEvent', {
        detail: { message: 'Map has been initialized with data.' } // Optional data
    });

    document.dispatchEvent(event);
}

