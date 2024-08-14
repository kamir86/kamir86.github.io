document.addEventListener('DOMContentLoaded', render);
const MAP_SIZE = 13;
function render() {
    renderTiles(MAP_SIZE - 1);
    function addClickListener(element) {
        element.addEventListener('click', () => {
            // Get the selected land type
            const selectedLandType = document.querySelector('.land_type input:checked').value;

            // Get the selected resource
            const selectedResource = document.querySelector('.resource_type input:checked').value;

            // Remove only the classes that match the radio input values
            landTypes.forEach(className => {
                element.classList.remove(className);
            });
            resources.forEach(className => {
                element.classList.remove(className);
            });

            // Add the selected land type and resource as classes
            element.classList.add(selectedLandType);
            element.classList.add(selectedResource);
        });
    }

    function addExportListener() {
        document.getElementById('exportButton').addEventListener('click', function() {
            // Initialize an object to store the tiles
            const tiles = {};

            // Iterate through each hexagon element
            document.querySelectorAll('.hexagon').forEach(hexagon => {
                const classList = hexagon.className.split(' ');
                const pos = classList.find(cls => cls.startsWith('pos_'))
                    .split('_')
                    .filter(x => x !== 'pos')
                    .map(Number);
                const landType = classList.find(cls => landTypes.includes(cls));
                const resourceType = classList.find(cls => resources.includes(cls));

                const [x, y, z] = pos;

                // Initialize tiles object structure if not already present
                if (!tiles[x]) tiles[x] = {};
                if (!tiles[x][y]) tiles[x][y] = {};

                // Set the land type and resource type for this tile
                tiles[x][y][z] = {
                    land_type: landType,
                    resource_type: resourceType
                };
            });

            // Create the JSON object to be exported
            const jsonObject = { tiles };

            // Convert JSON object to string
            const jsonString = JSON.stringify(jsonObject, null, 2);

            // Create a Blob from the JSON string
            const blob = new Blob([jsonString], { type: 'application/json' });

            // Create an anchor element and trigger a download
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'hexagons.json';
            a.click();
        });
    }

    const landTypes = Array.from(document.querySelectorAll('.land_type input')).map(el => el.value);
    const resources = Array.from(document.querySelectorAll('.resource_type input')).map(el => el.value);
    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach(ex => {
        ex.className = ex.className + " grassland no_resource";
        addClickListener(ex)
    });

    addExportListener();

}
