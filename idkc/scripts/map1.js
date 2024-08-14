document.addEventListener('DOMContentLoaded', () => renderTiles(12));
document.addEventListener('mapInitializedEvent', function(e) {
    loadMap('map1')
});