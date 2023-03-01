const boxContainer = document.querySelector(`.boxContainer`);
const sizeRange = document.querySelector(`#size-range`);
const colorPicker = document.querySelector(`#color-picker`);
const clearButton = document.querySelector(`#Clear`);
const eraserMode = document.querySelector(`#Eraser`);
const modeSelector = document.querySelector(`.mode-selection`);
const buttons = document.querySelectorAll(".toggle-btn");
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
let selectedColor = `#000000`;
// Initialize mode
let mode = `Draw`;

// Eventlistener for color input
colorPicker.addEventListener("input", () => {
  selectedColor = colorPicker.value;
});

// Code to toggle between buttons, one button at a time
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove "active" class from all buttons
    buttons.forEach(btn => {
      if (btn !== button) {
        btn.classList.remove("active");
      }
    });

    // Brings mode back to Draw if its already toggled
    if(mode === `${button.id}`){
      mode = `Draw`
      button.classList.toggle("active");
    }
    // Sets the mode on base on the selection given that it is untoggled
    else {
    mode = `${button.id}`;
    button.classList.toggle("active");
  }
  // Updates the Mode Selection
  modeSelector.textContent = `${mode}`;
});
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
  // Querryselectorall to select all .box elements and return it as an array
  const box = document.querySelectorAll(`.box`);
  // Handles the array (forEach)
  box.forEach((element) => {
    // change the background of div as null
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
    // Add listener for mousedown event and start changing background
    div.addEventListener(`mousedown`, paint);
    // Add listener for event mouseup to stop changing background
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
  // Rainbow mode
  else if (mode === `Rainbow`) {
    // String that contains all the posible hex codes
    const hexChars = "0123456789ABCDEF";
    let hex = `#`;
    // Choose a random element from hexChars and iterate them 6 times to produce code something like this (#12A45F)
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    isMousedown = true;
    e.target.style.backgroundColor = hex;
  }
    // Lighten mode, calls the lightenColor function to lighten the color 
  else if (mode === `Lighten`) {
    isMousedown = true;
    const currentColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = `${lightenColor(currentColor)}`;
  } 
    // Darken mode, calls the darkenColor function to darken the color
  else if (mode === `Darken`) {
    isMousedown = true;
    const currentColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = `${darkenColor(currentColor)}`;
  }
  // Else choose to erase 
  else {
    isMousedown = true;
    e.target.style.backgroundColor = ``;
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

// Function to lighten color
function lightenColor(color){
  // .match() searches for a match and return it as string in array format [`0`,`0`,`0`]
  // `/ /g` is for global search that searches all posible occurence instead of first occurence
  // \d+ is for searching the digits, the + there is to return all the digits grouped together
  // .map() is to change the number in string to number as digits [0,0,0]
  const rgbValues = color.match(/\d+/g).map(Number);
  // Math.min is to choose for the numbers whose the minimum of the two, if its more than 255 it returns 255
  const newRgbValues = rgbValues.map(value => Math.min(255, value + 25.5));
  // .join() is responsible in joining the items in the array into the string `rgb(0,0,0)`
  let newColor = `rgb(${newRgbValues.join(`,`)})`;
  console.log(rgbValues)
  console.log(newRgbValues)
  return newColor
}

function darkenColor(color){
  // .match() searches for a match and return it as string in array format [`0`,`0`,`0`]
  // `/ /g` is for global search that searches all posible occurence instead of first occurence
  // \d+ is for searching the digits, the + there is to return all the digits grouped together
  // .map() is to change the number in string to number as digits [0,0,0]
  const rgbValues = color.match(/\d+/g).map(Number);
  // Math.max is to choose for the numbers whose the maximum of the two, if its less than 0 it returns 0
  const newRgbValues = rgbValues.map(value => Math.max(0, value - 25.5));
  // .join() is responsible in joining the items in the array into the string `rgb(0,0,0)`
  let newColor = `rgb(${newRgbValues.join(`,`)})`;
  console.log(rgbValues)
  console.log(newRgbValues)
  return newColor
}