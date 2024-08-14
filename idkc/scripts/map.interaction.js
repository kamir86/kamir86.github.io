document.addEventListener('mapInitializedEvent', function(e) {
    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach(el => el.addEventListener('click', popupListener));
});


function popupListener(ev) {
    const element = ev.target;
    if(element.classList.contains('shrine')) {
        const popup = document.querySelector('#info-modal');
        popup.style.top = ev.y + 'px';
        popup.style.left = ev.x + 'px';
        updatePopupInformation(element);
        popup.classList.add("show");
    } else {
        closePopup();
    }
}

function closePopup() {
    const popup = document.querySelector('#info-modal');
    popup.classList.remove("show");
}

function updatePopupInformation(element) {
    const shrines = JSON.parse(sessionStorage.getItem("shrines"));
    const classList = element.className.split(' ');
    const pos = classList.find(cls => cls.startsWith('pos_'))
                        .split('_')
                        .filter(x => x !== 'pos')
                        .map(Number);
    const [x,y,z] = pos;

    const shrine = shrines.find(shrine => {
        return shrine.locations.find(pos => JSON.stringify(pos) === JSON.stringify({x,y,z}));
    });
    document.querySelector('#popupTitle').textContent = capitalize(shrine.type) + ' x' + shrine.multiplier;
    document.querySelector('#popupDetail').textContent = "Cost: "+ shrine.cost;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}