let scores, roundScore, activePlayer, playingGame, winningScore, dicePass;

init();

document.getElementById("playerScore-0").innerText = 0;
document.getElementById("playerScore-1").innerText = 0;

// Click RollUp Button
document.getElementById("rollupBtn").addEventListener('click', function () {
    if (playingGame) {
        diceAnimation();

    }
});



// Click Hold Button
document.getElementById("holdBtn").addEventListener('click', function () {
    if (playingGame) {
        scores[activePlayer] += roundScore;

        document.getElementById("playerScore-" + activePlayer).innerText = scores[activePlayer];
        if (!(firstRound)) {
            if (scores[activePlayer] > 10) {
                document.getElementById("playerName-" + activePlayer).style.color = "red";
                document.getElementById("playerName-" + activePlayer).innerHTML = "<big><b>Winner ! </b></big>";
                document.getElementById("dice").style.display = "none";
                playingGame = false;
            }
            else {
                nextPlayer();
            }
        }
        else {
            if (scores[activePlayer] <= 20) {
                winningScore = 50;
                firstRound = false;
                document.getElementById("showWiningScore").style.display = "block";
                document.getElementById("showWiningScore").innerHTML = "Winning Score<br><big><b><i>" + winningScore + "</i></b></big>";
                nextPlayer();
            }
            else {
                winningScore = scores[activePlayer] * 2;
                firstRound = false;
                document.getElementById("showWiningScore").style.display = "block";
                document.getElementById("showWiningScore").innerHTML = "Winning Score<br><big><b><i>" + winningScore + "</i></b></big>";
                nextPlayer();
            }
        }
    }

});



// Passing Next Player
function nextPlayer() {
    document.getElementById("playerName-" + activePlayer).style.color = "gray";
    document.getElementById("player-" + activePlayer).style.color = "gray";
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    dicePass = Math.floor(Math.random() * 7) + 1;
    document.getElementById("currentScore-0").innerText = "0";
    document.getElementById("currentScore-1").innerText = "0";
    document.getElementById("playerName-" + activePlayer).style.color = "black";
    document.getElementById("player-" + activePlayer).style.color = "black";
    // document.getElementById("dice").style.display = "none";
    scores[activePlayer] += roundScore;
    document.getElementById("playerScore-" + activePlayer).innerText = scores[activePlayer];
}


// Click NewGame Button
document.getElementById("newGame").addEventListener('click', init);


// Initialization Function
// Variable Declaration
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    playingGame = true;
    firstRound = true;
    winningScore = 0;
    dicePass = Math.floor(Math.random() * 7) + 1;

    document.getElementById("dice").style.display = "none";
    document.getElementById("playerScore-0").innerText = 0;
    document.getElementById("playerScore-1").innerText = 0;
    document.getElementById("currentScore-0").innerText = 0;
    document.getElementById("currentScore-1").innerText = 0;
    document.getElementById("playerName-0").style.color = "black";
    document.getElementById("player-0").style.color = "black";
    document.getElementById("playerName-0").innerHTML = "Player 1";
    document.getElementById("playerName-1").style.color = "gray";
    document.getElementById("player-1").style.color = "gray";
    document.getElementById("playerName-1").innerHTML = "Player 2";
    document.getElementById("showWiningScore").style.display = "none";
    document.getElementById("showWiningScore").innerHTML = "Winning Score<br>" + winningScore;

}

function diceAnimation() {
    let animId = setInterval('Animation()', 100);
    setTimeout(() => {
        clearInterval(animId);
        let diceDOM = document.getElementById("dice");
        let dice = Math.floor(Math.random() * 7) + 1;
        diceDOM.src = "dice-" + dice + ".png";
        diceDOM.style.display = "block";
        if (dicePass !== dice && dice !== 7) {
            roundScore += dice;
            document.getElementById("currentScore-" + activePlayer).innerText = roundScore;

        }
        else {
            if (firstRound) {
                if (scores[activePlayer] <= 20) {
                    winningScore = 50;
                    firstRound = false;
                    document.getElementById("showWiningScore").style.display = "block";
                    document.getElementById("showWiningScore").innerHTML = "Winning Score<br><big><b><i>" + winningScore + "</i></b></big>";
                }
            }
            nextPlayer();
            diceDOM.src = "dice-7.png";
        }
    }, 1000);
}
function Animation() {
    let diceDOM = document.getElementById("dice");
    diceDOM.style.display = "none";
    let dice = Math.floor(Math.random() * 7) + 1;
    diceDOM.src = "dice-" + dice + ".png";
    diceDOM.style.display = "block";
}