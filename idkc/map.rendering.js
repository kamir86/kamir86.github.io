document.addEventListener('DOMContentLoaded', renderTiles);

function renderTiles() {
    const mapContainer = document.querySelector('.hexagon-map');
    const sideLength = 20; // Side length of the hexagon
    const numLayers = 18; // Number of layers in the hexagonal map
    const spacing = 1;
    document.documentElement.style.setProperty('--side-length', `${sideLength}px`);

    for (let q = -numLayers; q <= numLayers; q++) {
        for (let r = -numLayers; r <= numLayers; r++) {
            for (let s = -numLayers; s <= numLayers; s++) {
                if (q + r + s === 0) {
                    const hex = document.createElement('div');
                    hex.className = 'hexagon '+q+','+r+','+s;
                    const x = (sideLength * Math.sqrt(3) + spacing) * (q + r/2);
                    const y = (sideLength * 3/2 + spacing) * r;
                    hex.style.transform = `translate(${x}px, ${y}px)`;
                    mapContainer.appendChild(hex);
                }
            }
        }
    }
}