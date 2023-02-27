const boxContainer = document.querySelector(`.boxContainer`);
const sizeRange = document.querySelector(`#sizeRange`);
 
let drawing = false;
// Initialize grid
let gridSize = 16;
createGrid(gridSize)

sizeRange.addEventListener("input", (event) => {
  // Get new grid size from range input value
  gridSize = parseInt(event.target.value);
  console.log(gridSize)
  document.querySelector(`.grid-size`).textContent = `${gridSize} X ${gridSize} `;
  // Remove existing grid items
  boxContainer.innerHTML = "";
  // Create new grid with updated size
  createGrid(gridSize);
});

function createGrid(gridSize){

  boxContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  boxContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

for (let i = 0; i < (gridSize*gridSize); i++) {
  const div = document.createElement(`div`);
  div.classList.add(`box`);
  div.addEventListener(`mousedown`, paint);
  div.addEventListener(`mousemove`, (e) => {if (drawing) paint(e)});
  div.addEventListener(`mouseup`, () => drawing = false);
  div.addEventListener(`mouseover`, trail);
  div.addEventListener(`dragstart`, (event) => {
    event.preventDefault();
  });
  boxContainer.appendChild(div);
}
}

function paint(e) {
  drawing = true;
  e.target.style.backgroundColor = `black`;
}


function trail(e) {
  if (drawing) {
    paint(e);
  } else {
    e.target.classList.add(`hover`);
    e.target.addEventListener(`transitionend`, () => {
      e.target.classList.remove(`hover`);
    });
  }
}
