let scores, roundScores, activePlayer, gamePlaying, lastDice, winScore;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {

    let dice = Math.floor(Math.random() * 6) + 1;
    let dice1 = Math.floor(Math.random() * 6) + 1;
    console.log(dice, dice1);


    let diceDOM = document.querySelector('.dice');
    let diceDOM1 = document.querySelector('.dice1');

    showDice();
    diceDOM.setAttribute('src', `dice-${dice}.png`)
    diceDOM1.setAttribute('src', `dice-${dice1}.png`)

    if (dice == 6 && dice1 == 6) {
      console.log("**********");


      scores[activePlayer] = 0;
      document.querySelector(`#score-` + activePlayer).textContent = 0;
      nextPlayer();
    } else if (dice !== 1 && dice1 !== 1) {
      roundScores += dice + dice1;
      document.querySelector('#current-' + activePlayer).textContent = roundScores;
    } else {

      nextPlayer();

    }
    lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScores;
    lastDice = 0;

    document.querySelector(`#score-` + activePlayer).textContent = scores[activePlayer];
    console.log(winScore + "<<<");

    if (scores[activePlayer] >= winScore) {

      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

      hideDice();
      gamePlaying = false;


    } else {
      nextPlayer();
    }
  }
})

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScores = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  hideDice();
}

function showDice() {
  document.querySelector('.dice').style.display = 'block';
  document.querySelector('.dice1').style.display = 'block';
}

function hideDice() {
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  gamePlaying = true;
  winScore = 100;


  document.querySelector('.win-score').value = 100;
  hideDice();
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#current-0').textContent = '0'
  document.querySelector('#score-1').textContent = '0';
  document.querySelector('#current-1').textContent = '0'

  document.querySelector(`#name-0`).textContent = 'Player 1';
  document.querySelector(`#name-1`).textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

}

document.querySelector('.win-score').addEventListener('change', function () {
  winScore = document.querySelector('.win-score').value;
  if (winScore && winScore <= 100) {
    console.log("return score");

    return winScore;
  } else {
    winScore = 100;
    document.querySelector('.win-score').value = 100;
    console.log("else");


  }


})