
function getUserInput() {
    return new Promise(function (resolve) {
        document.getElementById("user-input").addEventListener("keydown", function (event) {
            if (event.key !== "Enter") { return; }
            let input = this.value;
            console.log(input);
            resolve(input);
        });
        document.getElementById("user-input").value = "";
    });

}

let message = document.getElementById('game-message');
// async allows the use of the "await" keyword
async function setPlayers() {
    message.innerHTML = `<p>Name of player One?</p>`;
    let player1 = await getUserInput();
    message.innerHTML = `<p>Name of player Two</p>`;
    let player2 = await getUserInput();
    const players = [];
    players.push(player1, player2);
    return players;

}

let roll = document.getElementById('roll');
roll.addEventListener('click', rollDice);
roll.addEventListener('click', movePiece);
function rollDice() {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    let dice = document.getElementById("dice");

    dice.innerHTML = `You rolled: ${randomNum}`;

    if (randomNum === 1) {
        document.getElementById("img").src = "assets/images/dice1.jfif";
    } else if (randomNum === 2) {
        document.getElementById("img").src = "assets/images/dice2.jfif";
    } else if (randomNum === 3) {
        document.getElementById("img").src = "assets/images/dice3.jfif";
    } else if (randomNum === 4) {
        document.getElementById("img").src = "assets/images/dice4.jfif";
    } else if (randomNum === 5) {
        document.getElementById("img").src = "assets/images/dice5.jfif";
    } else {
        document.getElementById("img").src = "assets/images/dice6.jfif";
    }

    return randomNum;

}

let pieceOne = document.getElementById('piece-one');
let pieceTwo = document.getElementById('piece-two');
let squares = document.getElementsByClassName('board-square');
var currentPosition1 = 0;
var currentPosition2 = 0;
const board = [
    'recharge',
    'city-garden',
    'earthship',
    'hydroponics',
    'ev-car',
    'greenway',
    'cycle-path',
    'greenspace',
    'hydroelectric',
    'solar-farm',
    'community-work',
    'habitat-survey'
];

function movePiece() {
    let diceRoll = rollDice();
    if (currentPlayer === players[0]) {
        currentPosition1 += diceRoll;
        if (currentPosition1 >= board.length) {
            currentPosition1 -= board.length;
        }
        let currentSquare = squares[currentPosition1];
        currentSquare.appendChild(pieceOne);
        message.innerHTML = `${players[0]} you are on ${pieceOne.parentElement.getAttribute('data-type')} `;
        currentPlayer = players[1];
    } else {
        currentPosition2 += diceRoll;
        if (currentPosition2 >= board.length) {
            currentPosition2 -= board.length;
        }
        let currentSquare = squares[currentPosition2];
        currentSquare.appendChild(pieceTwo);
        currentPlayer = players[0];
        message.innerHTML = `${players[1]} you are on ${pieceTwo.parentElement.getAttribute('data-type')}`;
    }
}


async function switchTurn() {
    for (i = 0; i < 50; i++) {
        if (players[0] === currentPlayer) {
            message.innerHTML = `${players[0]} its your turn. Please roll the dice`;
            await getUserInput();
            currentPlayer = players[1];
        } else {
            message.innerHTML = `${players[1]} its your turn. Please roll the dice`;
            await getUserInput();
            currentPlayer = players[0];
        }
    }
}

var players, currentPlayer;
(async () => {
    players = await setPlayers();
    currentPlayer = players[0];
})();






