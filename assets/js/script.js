
let roll = document.getElementById('roll');
roll.addEventListener('click', rollDice);
roll.addEventListener('click', movePiece);

function rollDice() {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    let dice = document.getElementById("dice");

    dice.innerHTML = randomNum;

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
let squares = document.getElementsByClassName('board-square');
let currentPosition = 0;
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
    currentPosition += diceRoll;
    if (currentPosition >= board.length) {
        currentPosition -= board.length;
    }
    let currentSquare = squares[currentPosition];
    currentSquare.appendChild(pieceOne);
    console.log(pieceOne);

}




