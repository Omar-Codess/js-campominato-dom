// Generare una griglia quadrata formata da 100 celle, in cui ogni cella contiene un numero da 1 a 100.
// Quando l'utente clicca su una cella, diventa azzurra.

// ESECUZIONE
/*
    Quando l'utente clicca sul bottone:
    -nascondere il titolo
    -ripulire la griglia
    -creare (il numero di quadrati da generare) square:
        *creare l'elemento
        *aggiungere la classe
        *inserire l'elemento
        *aggiungere il click listener allo square
            .al click colorare lo square cliccato di azzurro e scrivere in console il numero
        *appendere lo square alla griglia
    -mostrare la griglia
*/

const mainTitle = document.getElementById("main-title");
console.log(mainTitle);
const mainGrid = document.getElementById("grid");
console.log(mainGrid);
document.getElementById("play-button").addEventListener("click", startGame);

// Funzione principale del gioco

function startGame(){
    let squaresNumber = 100
    let squaresInRow = 10

    mainTitle.classList.add("hidden");
    mainGrid.innerHTML = "";
    for (let i = 1; i <= squaresNumber; i++) {
        const newSquare = createSquare(i, squaresInRow);
        newSquare.addEventListener("click", handleSquareClick);
        mainGrid.append(newSquare);
    }

    mainGrid.classList.remove("hidden");
}

// Funzione che crea le celle
function createSquare(innerNumber) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `calc(100% / 10)`;
    square.style.height = `calc(100% / 10)`;
    square.innerHTML = `<span>${innerNumber}</span>`;
    return square;
}

// Funzione che gestisce il click sulla cella
function handleSquareClick(){
    console.log(this.textContent);
    this.classList.add("clicked");
}