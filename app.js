const divContainer = document.querySelector(`.divContainer`);

let drawing = false;


for (let i = 0; i < 256; i++) {
  const div = document.createElement(`div`);
  div.classList.add(`box`);
  div.addEventListener(`mousedown`, paint);
  div.addEventListener(`mousemove`, (e) => {if (drawing) paint(e)});
  div.addEventListener(`mouseup`, () => drawing = false);
  div.addEventListener(`mouseover`, trail);
  div.addEventListener(`dragstart`, (event) => {
    event.preventDefault();
  });
  divContainer.appendChild(div);
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
