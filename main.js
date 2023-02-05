import './style.css';

const app = document.querySelector('#app');
const randomArrayOf = n => new Array(n).fill().map(a => Math.random() > 0.5);
const cellHTML = (x, y, val) => `<div class="cell${val ? ' active' : ''}" id="x${x}y${y}"></div>`;
const columnHTML = (arr, x) =>
    `<div class="col">${arr.map((el, y) => cellHTML(x, y, el)).join('')}</div>`;
let fps = 10;

let data = [[]];
const divReferences = [[]];

function sizeGridToWindow() {
    const prevW = data.length;
    const prevH = data[0].length;

    const newW = Math.floor(window.innerWidth / 10);
    const newH = Math.floor(window.innerHeight / 10);

    const dW = newW - prevW;
    const dH = newH - prevH;

    const addTop = Math.floor(dH / 2);
    const addBott = addTop; // ensures they're deleted from top/bott at once

    const addLeft = Math.floor(dW / 2);
    const addRight = addLeft; // ensures they're deleted from left/right at once

    if (addLeft < 0) data.splice(0, 0 - addLeft);
    if (addRight < 0) data.splice(addRight);

    const newArray = new Array(Math.max(0, addLeft)).fill().map(a => randomArrayOf(newH));

    while (data.length) {
        const oldColumn = data.shift();
        if (addTop < 0) oldColumn.splice(0, 0 - addTop);
        if (addBott < 0) oldColumn.splice(addBott);

        const newTopVals = randomArrayOf(Math.max(0, addTop));
        const newBottVals = randomArrayOf(Math.max(0, addBott));
        const newColumn = [...newTopVals, ...oldColumn, ...newBottVals];

        newArray.push(newColumn);
    }

    newArray.push(...new Array(Math.max(0, addRight)).fill().map(a => randomArrayOf(newH)));

    data = newArray;
}

function generateDivReferences() {
    app.innerHTML = data.map(columnHTML).join('');
    divReferences.length = 0;
    for (let x = 0; x < data.length; x++) {
        const col = [];
        for (let y = 0; y < data[x].length; y++) col.push(document.getElementById(`x${x}y${y}`));
        divReferences.push(col);
    }
}

function processCells() {
    const newData = [];
    const w = data.length;
    for (let x = 0; x < w; x++) {
        const h = data[x].length;
        const col = [];
        for (let y = 0; y < h; y++) {
            let c = 0;

            //prettier-ignore
            {
                if (x > 0   && y > 0   && data[x - 1][y - 1]) c++;
                if (y > 0 && data[x][y - 1]) c++;
                if (x < w - 1 && y > 0 && data[x + 1][y - 1]) c++;

                if (x > 0 && data[x - 1][y]) c++;
                if (x < w - 1 && data[x + 1][y]) c++;

                if (x > 0 && y < h - 1 && data[x - 1][y + 1]) c++;
                if (y < h - 1 && data[x][y + 1]) c++;
                if (x < w - 1 && y < h - 1 && data[x + 1][y + 1]) c++;
            }

            if (c < 2 || c > 3) col.push(false);
            else if (c === 3) col.push(true);
            else col.push(data[x][y]);
        }
        newData.push(col);
    }
    data = newData;
}

function paintCellsToDivs() {
    for (let x = 0; x < data.length; x++)
        for (let y = 0; y < data[x].length; y++) {
            const div = divReferences[x][y];

            if (data[x][y]) div.classList.add('active');
            else div.classList.remove('active');
        }
}

function animate() {
    processCells();
    paintCellsToDivs();
}

let p;
const startAnimation = () => (p = setInterval(animate, 1000 / fps));
const stopAnimation = () => clearInterval(p);

window.addEventListener('resize', () => {
    stopAnimation();
    sizeGridToWindow();
    generateDivReferences();
    startAnimation();
});

sizeGridToWindow();
generateDivReferences();

startAnimation();
