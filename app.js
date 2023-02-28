const boxContainer = document.querySelector(`.boxContainer`);
const sizeRange = document.querySelector(`#sizeRange`);
const colorPicker = document.querySelector(`#color-picker`);
const clearButton = document.querySelector(`.clear-button`);
const eraser = document.querySelector(`.eraser`);
const modeContainer = document.querySelector(`.mode`);
const modeSelector = document.querySelector(`.mode-selection`);
const rainbowMode = document.querySelector(`.rainbow`);

// Disable dragging in canvas
boxContainer.addEventListener(`dragstart`, (event) => {
  event.preventDefault();
});

// Initialize mousedown is false
let isMousedown = false;
// Initialize grid
let gridSize = 16;
createGrid(gridSize);
// Initialize color
let selectedColor = `black`;
// Initialize mode
let mode = `Draw`;

// Eventlistener for color input
colorPicker.addEventListener("input", () => {
  selectedColor = colorPicker.value;
});

// Eventlistener for color input
rainbowMode.addEventListener(`click`, () => {
  if (mode === `rainbow`) {
    mode = `Draw`;
  } else {
    mode = `Rainbow`;
  }
  modeSelector.textContent = `${mode}`;
});

// Eventlistener for eraser
eraser.addEventListener(`click`, () => {
  if (mode === `Draw` || mode === `Rainbow`) {
    mode = `Eraser`;
  } else {
    mode = `Draw`;
  }
  // Change mode in DOM
  modeSelector.textContent = `${mode}`;
});

// Listen to changes of the slider
sizeRange.addEventListener("input", (event) => {
  // Get new grid size from range input value
  gridSize = parseInt(event.target.value);
  document.querySelector(
    `.grid-size`
  ).textContent = `${gridSize} X ${gridSize}`;
  // Remove existing grid items
  boxContainer.innerHTML = "";
  // Create new grid with updated size
  createGrid(gridSize);
});

// Eventlistener for button to clear grids
clearButton.addEventListener(`click`, () => {
  const box = document.querySelectorAll(`.box`);
  box.forEach((element) => {
    element.style.backgroundColor = ``;
  });
});

// Function to create grids
function createGrid(gridSize) {
  // Set grid-template-columns and grid-template-rows based on size
  boxContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  boxContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  // Create grid items
  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement(`div`);
    div.classList.add(`box`);
    // Add listener for mousedown event and start changiing background
    div.addEventListener(`mousedown`, paint);
    // Add listener when mouse is moving while mousedown
    div.addEventListener(`mouseenter`, (e) => {
      // Check if mousedown
      if (isMousedown) paint(e);
    });
    // Add listener for event mouseup to stop isMousedown
    div.addEventListener(`mouseup`, () => (isMousedown = false));
    // Add listener for mouse over and add hover effect
    div.addEventListener(`mouseover`, trail);
    boxContainer.appendChild(div);
  }
}

// Function to change background
function paint(e) {
  // Draw mode that used color in color picker
  if (mode === `Draw`) {
    isMousedown = true;
    e.target.style.backgroundColor = selectedColor;
  }
  // Eraser mode
  else if (mode === `Eraser`) {
    isMousedown = true;
    e.target.style.backgroundColor = ``;
  }
  // Rainbow mode
  else if (mode === `Rainbow`) {
    const hexChars = "0123456789ABCDEF";
    let hex = `#`;
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    let randomColor = hex;
    isMousedown = true;
    e.target.style.backgroundColor = randomColor;
  }
}

// Function for hover effect of mouse while mouseover
function trail(e) {
  // To not hover while isMousedown
  if (isMousedown) {
    paint(e);
  } else {
    e.target.classList.add(`hover`);
    e.target.addEventListener(`transitionend`, () => {
      e.target.classList.remove(`hover`);
    });
  }
}
