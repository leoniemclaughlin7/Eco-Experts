const sleep = ms => new Promise(res => setTimeout(res, ms));

/**
 * Gets and returns user input.
 */
function getUserInput() {
    return new Promise(function (resolve) {
        document.getElementById("user-input").addEventListener("keydown", function (event) {
            if (event.key !== "Enter") { return; }
            let input = this.value;
            console.log(input);
            resolve(input);
        });
        //document.getElementById("user-input").value = "";
    });

}

let message = document.getElementById('game-message');
/**
 * Sets players names. 
 */
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
/**
 * Rolls dice and changes the dice face acording to the randsom number rolled. 
 */
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

/**
 * Moves players pieces around the board. 
 */
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
        checkIfOwned();
        currentPlayer = players[1];
    } else {
        currentPosition2 += diceRoll;
        if (currentPosition2 >= board.length) {
            currentPosition2 -= board.length;
        }
        let currentSquare = squares[currentPosition2];
        currentSquare.appendChild(pieceTwo);
        message.innerHTML = `${players[1]} you are on ${pieceTwo.parentElement.getAttribute('data-type')}`;
        checkIfOwned();
        currentPlayer = players[0];
    }
}

/**
 * Switches the turn depending on which players turn it is. 
 */
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

var player1Owned = [];
var player2Owned = [];
var squareOwned = false;
async function buySquare(currentPlayer) {
    await sleep(4000);
    if (currentPlayer === players[0] && !squareOwned) {
        message.innerHTML = `<p>Would you like to buy ${pieceOne.parentElement.getAttribute('data-type')} for 5 people?`;
        let input = await getUserInput();
        if (input === 'y') {
            player1Owned.push(pieceOne.parentElement.getAttribute('data-type'));
        } else {
            console.log('you have not bought this square');
        }
    } if (currentPlayer === players[1] && !squareOwned) {
        message.innerHTML = `<p>Would you like to buy ${pieceTwo.parentElement.getAttribute('data-type')} for 5 people?`;
        let input = await getUserInput();
        if (input === 'y') {
            player2Owned.push(pieceTwo.parentElement.getAttribute('data-type'));
        } else {
            console.log('you have not bought this square');
        }
    }
}


var players, currentPlayer;
/**
 * calls the setPlayers function and sets currentPlayer
 */
(async () => {
    players = await setPlayers();
    currentPlayer = players[0];
})();






