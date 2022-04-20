function generateGrid(x = 16) {
    let grid = document.querySelector('#gridcontainer');
    for (let i = 0 ; i < x ; i++) {
        let gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        grid.appendChild(gridRow);

        for (let i = 0 ; i < x ; i++) {
            let gridElement = document.createElement('div');
            gridElement.classList.add('grid-element');
            gridElement.style.filter = 'brightness(100%)'; //inline style to make shadow work
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
    let reBrightnessVal = /\d+/ ; //RegEx searches any number 1 or more times
    if (hold === true) {

        switch (feature) {
            case 'black' :
                (event.currentTarget).style.backgroundColor = 'black';
                (event.currentTarget).style.filter = 'brightness(100%)';
                break;
            case 'white' :
                (event.currentTarget).style.backgroundColor = 'white';
                (event.currentTarget).style.filter = 'brightness(100%)';
                break;
            case 'rainbow' :
                let rainbowColor = Math.floor(Math.random()*16777215).toString(16);
                (event.currentTarget).style.backgroundColor = `#${rainbowColor}`;
                (event.currentTarget).style.filter = 'brightness(100%)';
                break;
            case 'shadow' :
                // grabs prev brighness val and decreases it
                let prevBrightnessVal = ((event.currentTarget).style.filter).match(reBrightnessVal);
                (event.currentTarget).style.filter = `brightness(${prevBrightnessVal[0] - 10}%)`;
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
rainbowBtn.addEventListener('mouseenter', () => {
    let randomHexColor = Math.floor(Math.random()*16777215).toString(16);
    rainbowBtn.style.cssText = `box-shadow: 0 0 25px 0px #${randomHexColor}`;
})
rainbowBtn.addEventListener('mouseleave', () => {
    rainbowBtn.style.cssText = '';
})

const shadowBtn = document.querySelector('#shadowbtn');
shadowBtn.addEventListener('click', () => setFeature('shadow'));

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (event) => {

    buttons.forEach(button => button.classList.remove('selected'));
    if (event.currentTarget.id == 'clearbtn') return ;
    event.currentTarget.classList.toggle('selected');
}))