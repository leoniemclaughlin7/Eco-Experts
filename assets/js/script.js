let roll = document.getElementById('roll');
roll.addEventListener('click', rollDice);

function rollDice() {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    let dice = document.getElementById("dice");

    dice.innerHTML = randomNum;

    if (randomNum === 1) {
        document.getElementById("img").src = "assets/images/dice1.jfif";
    }
    if (randomNum === 2) {
        document.getElementById("img").src = "assets/images/dice2.jfif";
    }
    if (randomNum === 3) {
        document.getElementById("img").src = "assets/images/dice3.jfif";
    }
    if (randomNum === 4) {
        document.getElementById("img").src = "assets/images/dice4.jfif";
    }
    if (randomNum === 5) {
        document.getElementById("img").src = "assets/images/dice5.jfif";
    }
    if (randomNum === 6) {
        document.getElementById("img").src = "assets/images/dice6.jfif";
    }
}