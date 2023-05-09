let state = "";
const cells = document.getElementsByClassName("cell");
const button = document.getElementById("boton");
const cellsGroup = Array.prototype.slice.call(cells);
const winLoseMsg = document.getElementById("WinLoseMsg")
const p = document.createElement("p");
winLoseMsg.appendChild(p);
const cell = cellsGroup[0].parentNode;
let winState = false;

function toggleCell() {
  state = state === "O" ? "X" : "O"; // Cambia el valor de state entre "X" y "O"
  const p = this.querySelector("p");
  p.textContent = state;
  this.removeEventListener("click", toggleCell); // Elimina el listener después de que se ha hecho clic
  checkWinState();
}

function checkWinState() {
  const winStates = [    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];

  for (let i = 0; i < winStates.length; i++) {
    const [a, b, c] = winStates[i];
    if (cells[a].querySelector("p").textContent &&
        cells[a].querySelector("p").textContent === cells[b].querySelector("p").textContent &&
        cells[a].querySelector("p").textContent === cells[c].querySelector("p").textContent) {
      winState = true;
      const winMsg = cells[a].querySelector("p").textContent + " wins";
      p.innerHTML = `  ${state} wins!`;
      winLoseMsg.style.display = "block";
      cellsGroup.forEach(cell => cell.removeEventListener("click", toggleCell)); // Elimina los listeners de clics de todas las celdas
      break;
    }
  }
  if (!winState && Array.from(cellsGroup).every(cell => cell.querySelector("p").textContent)) {
    p.innerHTML ="Tie! Play Again!";
    winLoseMsg.style.display = "block";
  }
}


cellsGroup.forEach(cell => {
  cell.addEventListener("click", toggleCell);
  cell.appendChild(p.cloneNode());
});

button.addEventListener("click", function() {
  state = "";
  winState = false;
  winLoseMsg.style.display = "none";
  cellsGroup.forEach(cell => {
    const p = cell.querySelector("p");
    p.textContent = "";
    cell.classList.add("shrink");
    setTimeout(() => {
      cell.classList.remove("shrink");
      cell.addEventListener("click", toggleCell); // Agrega el listener después de reiniciar el juego
    }, 300);
  });
});
