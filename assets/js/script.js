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
 * Moves players pieces around the board and adds 10 people to players score once they pass recharge. 
 */
function movePiece() {
    let diceRoll = rollDice();
    if (currentPlayer === players[0]) {
        currentPosition1 += diceRoll;
        if (currentPosition1 >= board.length) {
            let people = parseInt(document.getElementById('player1').innerText);
            document.getElementById('player1').innerText = people + 5;
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
            let people = parseInt(document.getElementById('player2').innerText);
            document.getElementById('player2').innerText = people + 5;
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
/**
 * Gives the player the option to buy a square for a cost of 5 people. 
 * @param {*} currentPlayer 
 */
async function buySquare(currentPlayer) {
    await sleep(4000);
    if (currentPlayer === players[0]) {
        message.innerHTML = `<p>Would you like to buy ${pieceOne.parentElement.getAttribute('data-type')} for 5 people?`;
        let input = await getUserInput();
        if (input === 'y') {
            player1Owned.push(pieceOne.parentElement.getAttribute('data-type'));
            let people = parseInt(document.getElementById('player1').innerText);
            document.getElementById('player1').innerText = people - 5;
        } else {
            console.log('you have not bought this square');
        } currentPlayer = players[1];
    } else if (currentPlayer === players[1]) {
        message.innerHTML = `<p>Would you like to buy ${pieceTwo.parentElement.getAttribute('data-type')} for 5 people?`;
        let input = await getUserInput();
        if (input === 'y') {
            player2Owned.push(pieceTwo.parentElement.getAttribute('data-type'));
            let people = parseInt(document.getElementById('player2').innerText);
            document.getElementById('player2').innerText = people - 5;
        } else {
            console.log('you have not bought this square');
        } currentPlayer = players[0];
    }
}

/**
 * Checks if player is on opponents square, if player is on own square and 
 * if none of the above will allow player to buy square. 
 */
async function checkIfOwned() {
    if (currentPlayer === players[1] && player1Owned.includes(pieceTwo.parentElement.getAttribute('data-type'))) {
        message.innerHTML = `<p>${players[1]} you Landed on your opponents square,${pieceTwo.parentElement.getAttribute('data-type')}, you have to pay them 5 people. Please enter ok to confirm!</p>`;
        await getUserInput();
        let people2 = parseInt(document.getElementById('player2').innerText);
        let people1 = parseInt(document.getElementById('player1').innerText);
        document.getElementById('player2').innerText = people2 - 5;
        document.getElementById('player1').innerText = people1 + 5;
        currentPlayer === players[0];
    } else if (currentPlayer === players[0] && player2Owned.includes(pieceOne.parentElement.getAttribute('data-type'))) {
        message.innerHTML = `<p>${players[0]} you Landed on your opponents square,${pieceOne.parentElement.getAttribute('data-type')}, you have to pay them 5 people. Please enter ok to confirm!</p>`;
        await getUserInput();
        let people1 = parseInt(document.getElementById('player1').innerText);
        let people2 = parseInt(document.getElementById('player2').innerText);
        document.getElementById('player1').innerText = people1 - 5;
        document.getElementById('player2').innerText = people2 + 5;
        currentPlayer === players[1];
    } else if (currentPlayer === players[0] && player1Owned.includes(pieceOne.parentElement.getAttribute('data-type'))) {
        message.innerHTML = `<p>${players[0]} you own ${pieceOne.parentElement.getAttribute('data-type')}. ${players[1]} please roll the dice</p>`;
        currentPlayer = players[1];
    } else if (currentPlayer === players[1] && player2Owned.includes(pieceTwo.parentElement.getAttribute('data-type'))) {
        message.innerHTML = `<p>${players[1]} you own ${pieceTwo.parentElement.getAttribute('data-type')}. ${players[0]} please roll the dice</p>`;
        currentPlayer = players[0];
    } else {
        buySquare(currentPlayer);
    }
}
//const checkWinnerInterval = setInterval(checkWinner, 1000);
setInterval(async () => {
    await checkWinner();
}, 1000);

async function checkWinner() {
    if (document.getElementById('player1').innerText === '0') {
        message.innerHTML = `<p>${players[1]} you have won the game</p>`;
        await sleep(8000);
        window.location.reload();
    }
    if (document.getElementById('player2').innerText === '0') {
        message.innerHTML = `<p>${players[0]} you have won the game</p>`;
        await sleep(8000);
        window.location.reload();
    }

}

var players, currentPlayer;
/**
 * calls the setPlayers function and sets currentPlayer and then calls switchTurn. 
 */
(async () => {
    players = await setPlayers();
    currentPlayer = players[0];
    switchTurn();
})();






