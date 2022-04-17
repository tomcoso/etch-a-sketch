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

var hold = false;
function attachMouseListener() {

    //to prevent dragging and fucking the feature below
    document.addEventListener('dragstart', (event) => {
        event.preventDefault()
    })

    // so it draws only when clicking
    document.addEventListener('mousedown', () => {
        hold = true;
    })
    document.addEventListener('mouseup', () => {
        hold = false;
    })

    let paintWrap = (event) => paint(feature, event); //not really relevant anymore, but looks better

    let gridElements = document.querySelectorAll('.grid-element');
    gridElements.forEach(gridElement => gridElement.addEventListener('mouseover', paintWrap ));
}

function paint(feature, event) {
    console.log(event);
    if (hold === true) {

        switch (feature) {
            case 'black' :
                (event.currentTarget).style.backgroundColor = 'black';
                break;
            case 'white' :
                (event.currentTarget).style.backgroundColor = 'white';
                break;
            case 'rainbow' :
                let rainbowColor = Math.floor(Math.random()*16777215).toString(16);
                (event.currentTarget).style.backgroundColor = `#${rainbowColor}`;
                break;
            case 'color' :
                (event.currentTarget).classList.add('mark-color');
                break;
        }
    }
}

generateGrid();
attachMouseListener();

const eraserBtn = document.querySelector('#eraserbtn');
eraserBtn.addEventListener('click', () => setFeature('white'));

const blackBtn = document.querySelector('#blackbtn');
blackBtn.addEventListener('click', () => setFeature('black'));

const clearBtn = document.querySelector('#clearbtn');
clearBtn.addEventListener('click', () => {
    let allElements = document.querySelectorAll('.grid-row');
    allElements.forEach((eachElement) => eachElement.remove());
    generateGrid();
    attachMouseListener();
});

const rainbowBtn = document.querySelector('#rainbowbtn');
rainbowBtn.addEventListener('click', () => setFeature('rainbow'));