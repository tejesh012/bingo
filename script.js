// DOM Elements
const inputField = document.querySelector("#input");
const startButton = document.querySelector("#go");
const landingPage = document.querySelector(".landingpage");
const playerDataSection = document.querySelector(".playersdata");
const gameContainer = document.querySelector(".container");
const playerInputsContainer = document.querySelector(".playerinputs");
const gameBoard = document.querySelector(".gameboard");
const currentPlayerAnnouncement = document.querySelector("#cpannounce");
const winnerpage = document.querySelector(".winner")
const scoreboard = document.querySelector(".scorelist")
const countdownpage = document.querySelector(".countdown")
const playerchange = document.querySelector(".playerchange")
const cd = document.querySelector(".cd")
// Initial State
playerDataSection.style.display = "none";
gameContainer.style.display = "none";
winnerpage.style.display = "none";
countdownpage.style.display = "none";

const MAX_PLAYERS = 5;
let playerNames = [];
let clickedNumbers = [];
let playerBoards = [];
let leaderboard = [];
let countdowncap = 2;

cd.innerHTML = countdowncap

// Event Listeners
startButton.addEventListener("click", () => {
    const playerCount = parseInt(inputField.value, 10);

    if (!isNaN(playerCount) && playerCount >= 2 && playerCount <= MAX_PLAYERS) {
        landingPage.style.display = "none";
        displayPlayerInputFields(playerCount);
    } else {
        showShakeEffect(inputField);
    }
});

function showShakeEffect(element) {
    element.classList.add("shake");
    setTimeout(() => element.classList.remove("shake"), 350);
}


function displayPlayerInputFields(playerCount) {
    playerDataSection.style.display = "flex";
    playerInputsContainer.innerHTML = ""; 

    for (let i = 0; i < playerCount; i++) {
        const playerDiv = document.createElement("div");
        const label = document.createElement("p");
        const input = document.createElement("input");

        label.textContent = `Player ${i + 1}:`;
        input.placeholder = "Enter Name";
        label.classList.add("player-data-label");
        input.classList.add("playerdatainput");

        playerDiv.classList.add("playerdatadiv");
        playerDiv.append(label, input);
        playerInputsContainer.append(playerDiv);
    }

    const startGameButton = document.createElement("button");
    startGameButton.textContent = "Start";
    startGameButton.classList.add("startgamebutton");
    playerInputsContainer.append(startGameButton);

    startGameButton.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".playerdatainput");
        const newPlayerNames = [];

        inputs.forEach(input => {
            const name = input.value.trim();
            if (name && !newPlayerNames.includes(name)) {
                newPlayerNames.push(name);
            } else {
                newPlayerNames.length = 0; 
                showShakeEffect(input);
                showShakeEffect(startGameButton);
            }
        });

        if (newPlayerNames.length === playerCount) {
            playerNames = newPlayerNames;
            initializeGame(playerCount);
        }
    });
}

// Game Initialization
function initializeGame(playerCount) {
    playerDataSection.style.display = "none";
    gameContainer.style.display = "flex";
    generatePlayerBoards(playerCount);
    renderGameBoard(0, playerCount);
}


function generatePlayerBoards(playerCount) {
    const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);

    playerBoards = Array.from({ length: playerCount }, () => shuffleArray([...allNumbers]));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderGameBoard(currentPlayer, playerCount) {
    gameBoard.innerHTML = ""; 
    currentPlayerAnnouncement.textContent = `Current Player: ${playerNames[currentPlayer]}`;
    let clickedcords = []
    let clickedcordsindex = 0
    const playerBoard = playerBoards[currentPlayer];
    playerBoard.forEach((value, index) => {
        const row = Math.floor(index / 5);
        const column = index % 5;

        const cell = document.createElement("div");
        cell.classList.add(`cords-${row}${column}`, `num-${value}`, "box");
        cell.textContent = value;
        
        if (clickedNumbers.includes(value)) {
            cell.classList.add("marked");
            clickedcords[clickedcordsindex]=cell.classList[0]
            clickedcordsindex+=1
        }

        cell.addEventListener("click", () => {
            if (cell.classList.contains("marked")) {
                alert("This number is already clicked!");
            } else {
                cell.classList.add("marked");
                previousplayer = currentPlayer
                clickedNumbers.push(value);
                clickedcords[clickedcordsindex]=cell.classList[0]
                clickedcordsindex+=1
                currentPlayer = (currentPlayer + 1) % playerCount;
                updateGame(previousplayer,currentPlayer, playerCount,clickedcords);
            }
        });

        if (index % 5 === 0) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            gameBoard.append(rowDiv);
        }

        gameBoard.lastChild.append(cell);
    });
}

function updateGame(previousplayer,currentPlayer, playerCount,clickedcords) {
    if (checkWin(previousplayer,clickedcords)){
        gameBoard.innerHTML = `winner ${previousplayer}`
        printleaderboard()
    }
    else{
        countdownfun(currentPlayer,playerCount)
        
    }

}


function checkWin(previousplayer,clickedcords) {
    patterncount = 0
    patterncount += checkRow(clickedcords)
    patterncount += checkColumn(clickedcords)
    patterncount += checkDiagonal(clickedcords)
    leaderboard[previousplayer] = patterncount*1000
    if (patterncount>=5){
        console.log("we have a winner")
        return true
    }

    return false
}

function checkRow(cordlist) {
    let rowcount = 0
    for(let i=0;i<5;i++){
        let check = 0
        for (let j =0;j<5;j++){
            if (cordlist.includes(`cords-${j}${i}`)){
                check+=1
            }
        }
        if (check == 5){
            rowcount+=1
        }
    }
    return rowcount
}
function checkColumn(cordlist) {
    let colcount = 0
    for(let i=0;i<5;i++){
        check = 0
        for (let j =0;j<5;j++){                                                            
            if (cordlist.includes(`cords-${j}${i}`)){
                check+=1
            }
        }
        if (check == 5){
            colcount+=1
        }

    }
    return colcount
}
function checkDiagonal(cordlist) {
    diacount = 0
    let check1 = 0
    let check2 = 0
    for(let i=0;i<5;i++){
        
        if (cordlist.includes(`cords-${i}${i}`)){
            check1+=1
        }
    }
    if (check1 == 5){
        diacount+=1
    }
    for(let i=0;i<5;i++){
        if (cordlist.includes(`cords-${i}${4-i}`)){
            check2+=1
            
        }
    }
    if (check2 == 5){
        diacount+=1
        console.log("reversedia")
    }
    return diacount
}


function printleaderboard(){
    
    for(let i =0;i<leaderboard.length;i++){
        let score = document.createElement("div")
        score.innerHTML = `${playerNames[i]} : ${leaderboard[i]}`
        scoreboard.append(score)
    }
    gameContainer.style.display = "none";
    winnerpage.style.display = "flex"
}

function countdownfun(currentPlayer, playerCount){
    let count= countdowncap
    swappages()
    playerchange.innerHTML = `Switching to "${playerNames[currentPlayer]} in"`
    renderGameBoard(currentPlayer, playerCount)
    
    const countdowninterval = setInterval(() => {
        count-=1
        if (count>0){
            cd.innerHTML = count
        }
        else{
            clearInterval(countdowninterval)
            swappages()
            cd.innerHTML = countdowncap
        }
    }, 1000);
    
    
}

function swappages(){
    if(countdownpage.style.display=== "flex"){
        countdownpage.style.display = "none"
        gameContainer.style.display = "flex"
    }
    else{
        countdownpage.style.display = "flex"
        gameContainer.style.display = "none"
    }
}
