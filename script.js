function generateGrid(x = 16) {
    let grid = document.querySelector('#gridcontainer');
    for (let i = 0 ; i < x ; i++) {
        let gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        grid.appendChild(gridRow);

        for (let i = 0 ; i < x ; i++) {
            let gridElement = document.createElement('div');
            gridElement.classList.add('grid-element');
            gridRow.appendChild(gridElement);
        }
    }
}

// so that we have only one listener at all times, we only modify the parameters of paint()
var feature = 'black';
function setFeature(newFeature) {
    feature = newFeature;
}

function attachHoverListener() {

    let paintWrap = (event) => paint(feature, event); //not really relevant anymore, but looks better

    let gridElements = document.querySelectorAll('.grid-element');
    gridElements.forEach(gridElement => gridElement.addEventListener('mouseover', paintWrap ));
}

function paint(feature, event) {

    // to prevent an element to have all classes, to not rely on the css cascade
    let previousFeature = Array.from((event.currentTarget).classList)[1];
    (event.currentTarget).classList.remove(previousFeature);

    switch (feature) {
        case 'black' :
            (event.currentTarget).classList.add('mark-black');
            break;
        case 'white' :
            (event.currentTarget).classList.add('mark-white');
            break;
        case 'rainbow' :
            (event.currentTarget).classList.add('mark-rainbow');
            break;
        case 'color' :
            (event.currentTarget).classList.add('mark-color');
            break;
    }
}

generateGrid();
attachHoverListener();

let eraserBtn = document.querySelector('#eraserbtn');
eraserBtn.addEventListener('click', () => setFeature('white'));

let blackBtn = document.querySelector('#blackbtn');
blackBtn.addEventListener('click', () => setFeature('black'));

let clearBtn = document.querySelector('#clearbtn');
clearBtn.addEventListener('click', () => {
    let allElements = document.querySelectorAll('.grid-row');
    allElements.forEach((eachElement) => eachElement.remove());
    generateGrid();
    attachHoverListener();
});

let rainbowBtn = document.querySelector('#rainbowbtn');
rainbowBtn.addEventListener('click', () => setFeature('rainbow'));