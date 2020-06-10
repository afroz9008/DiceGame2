let scores, roundScore, activePlayer, deActivePlayer, playingGame, firstRound = [], currentScore;

init();

document.getElementById("playerScore-0").innerText = 0;
document.getElementById("playerScore-1").innerText = 0;



// Click RollUp Button
document.getElementById("rollupBtn").addEventListener('click', function () {
    if (playingGame) {
        diceAnimation();
    }
});



/* Click Hold Button
document.getElementById("holdBtn").addEventListener('click', function () {
    if (playingGame) {
        scores[activePlayer] += roundScore;

        document.getElementById("playerScore-" + activePlayer).innerText = scores[activePlayer];
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

});
*/


// Passing Next Player
function nextPlayer() {
    document.getElementById("playerName-" + activePlayer).style.color = "gray";
    document.getElementById("player-" + activePlayer).style.color = "gray";
    scores[activePlayer] += roundScore;
    if (scores[activePlayer] < 0) {
        scores[activePlayer] = 0;
    }
    document.getElementById("playerScore-" + activePlayer).innerText = scores[activePlayer];
    if (scores[0] == scores[1]) {
        activePlayer === 0 ? scores[0] = parseInt(scores[0] / 2) : scores[1] = parseInt(scores[1] / 2);
        document.getElementById("playerScore-" + deActivePlayer).innerText = activePlayer === 0 ? scores[0] : scores[1];
    }
    else if (scores[activePlayer] >= 100) {
        document.getElementById("playerName-" + activePlayer).style.color = "red";
        document.getElementById("playerName-" + activePlayer).innerHTML = "<big><b>Winner ! </b></big>";
        document.getElementById("dice").style.display = "none";
        playingGame = false;
    }
    //document.getElementById("playerScore-" + deActivePlayer).innerText = scores[deActivePlayer];
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    deActivePlayer === 1 ? deActivePlayer = 0 : deActivePlayer = 1;
    roundScore = 0;
    currentScore = 0;
    document.getElementById("playerName-" + activePlayer).style.color = "black";
    document.getElementById("player-" + activePlayer).style.color = "black";
    //document.getElementById("dice").style.display = "none";

}


// Click NewGame Button
document.getElementById("newGame").addEventListener('click', init);


// Initialization Function
// Variable Declaration
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    currentScore = 0;
    deActivePlayer = 1;
    playingGame = true;
    firstRound = [false, false];
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
}


function diceAnimation() {

    let diceAnim = setInterval(function () {
        document.getElementById("rollupBtn").style.display = "none";
        let diceDOM = document.getElementById("dice");
        diceDOM.style.display = "none";
        let diceanim = Math.floor(Math.random() * 6) + 1;
        diceDOM.src = "dice-" + diceanim + ".png";
        diceDOM.style.display = "block";
    }, 100);
    setTimeout(() => {
        clearInterval(diceAnim);
        document.getElementById("rollupBtn").style.display = "block";
        let diceDOM = document.getElementById("dice");
        let dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.src = "dice-" + dice + ".png";
        diceDOM.style.display = "block";
        console.log(dice)
        if (firstRound[activePlayer]) {
            if (dice == 6) {
                firstRound[activePlayer] = false;
                roundScore += dice;
                document.getElementById("currentScore-" + activePlayer).innerText = roundScore;
            }
            else {
                firstRound[activePlayer] = true;
                nextPlayer();
            }
        }
        else {

            //alert(dice)
            if (dice == 6) {
                roundScore += dice;
                document.getElementById("currentScore-" + activePlayer).innerText = roundScore;
            }
            else if (dice % 2 !== 0) {
                document.getElementById("currentScore-" + activePlayer).innerText = dice;
                roundScore -= dice;
                nextPlayer();
            }
            else {
                roundScore += dice;
                document.getElementById("currentScore-" + activePlayer).innerText = roundScore;
                nextPlayer();
            }
        }

    }, 1000);
}