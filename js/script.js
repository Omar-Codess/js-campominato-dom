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
const mainGrid = document.getElementById("grid");
const levelSelect = document.getElementById("level");
document.getElementById("play-button").addEventListener("click", startGame);

// Funzione principale del gioco
function startGame(){
    // numero di bombe
    const bombsNumber = 16;

    // controllo il livello scelto
    const level = parseInt(levelSelect.value);
    let squaresNumber;
    let squaresInRow;

    switch (level) {
        case 1:
            squaresNumber = 100;
            squaresInRow = 10;
            break;
        case 2:
            squaresNumber = 81;
            squaresInRow = 9;
            break;
        case 3:
            squaresNumber = 49;
            squaresInRow = 7;
    }

    // calcolare il numero delle celle non bombe
    let safeCells = squaresNumber - bombsNumber;
    console.log(safeCells);

    // creare l'array di 16 bombe (numeri casuali non ripetuti) in range da 1 a squaresNumber
    const bombsArray = generateRandomNumbersArray(bombsNumber, 1, squaresNumber);
    console.log(bombsArray);

    // creare l'array delle celle non bombe cliccate, inizialmente vuoto
    const clickedCells = [];

    mainTitle.classList.add("hidden");
    mainGrid.innerHTML = "";
    for (let i = 1; i <= squaresNumber; i++) {
        const newSquare = createSquare(i, squaresInRow);
        newSquare.addEventListener("click", handleSquareClick);
        mainGrid.append(newSquare);
    }

    mainGrid.classList.remove("hidden");

    // Funzione che gestisce il click sulla cella
    function handleSquareClick(){
        // leggo il numero della cella cliccata
        const clickedNumber = parseInt(this.textContent);
        // SE il numero è contenuto nell'array delle bombe
        if (bombsArray.includes(clickedNumber)){
            // la cella diventa rossa
            this.classList.add("bomb");
            // gioco finisce, utente perde
            endGame("lose");
        } else {
            // coloro di blu la cella
            this.classList.add("clicked");
            // SE non è già presente (se non è già stato cliccato) salvo il numero nell'array del punteggio
            if (!clickedCells.includes(clickedNumber)){
                clickedCells.push(clickedNumber);
            }
            // SE la lunghezza dell'array delle celle cliccate è uguale al safeCells
            if (clickedCells.length === safeCells){
                // il gioco finisce, l'utente vince
                endGame("win")
            }
        }
    }

    // Funzione che gestisce la fine del gioco
    function endGame(winLose){
        // Rendere le celle non cliccabili
        const allcells = document.getElementsByClassName("square");
        for(let i = 0; i < allcells.length; i++) {
            const thisCell = allcells[i];
            thisCell.removeEventListener("click", handleSquareClick);
        }
        // SE l'utente ha vinto
        if(winLose === "win"){
            // mostrare il messaggio "hai vinto"
            alert("Hai vinto!");
        } else {
            // mostrare tutte le bombe
            // Per ogni cella
            for(let i = 0; i < allcells.length; i++){
                const thisCell = allcells[i];
                // prendo il numero della cella
                const thisCellNumber = parseInt(thisCell.textContent);
                // SE il numero è contenuto nell'array delle bombe
                if(bombsArray.includes(thisCellNumber)){
                    // coloro la cella di rosso
                    thisCell.classList.add("bomb");
                }
            }
            // Mostrare il messaggio "hai perso" e il numero di tentativi
            alert(`Hai perso con il punteggio ${clickedCells.length}`);
        }
    }
}




// Funzione che crea un elemento html che rappresenta un quadrato della griglia
function createSquare(innerNumber) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `calc(100% / 10)`;
    square.style.height = `calc(100% / 10)`;
    square.innerHTML = `<span>${innerNumber}</span>`;
    return square;
}

// Funzione che genera un array di data lunghezza con numeri random non duplicati compresi nel range dato
function generateRandomNumbersArray(totalNumbers, min, max){
    // Finchè l'array non ha la lunghezza uguale al totalNumbers
    const resultArray = [];
    while(resultArray.length < totalNumbers){
        // Generare un numero random
        const rdnNumber = getRndInteger(min, max);
        // SE non è presente nell'array
        if(!resultArray.includes(rdnNumber)){
            // pushare il numero nell'array
            resultArray.push(rdnNumber);
        }
    }
    return resultArray;
}

// Funzione che genera un numero random in un range tra min e max (inclusi)
function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}