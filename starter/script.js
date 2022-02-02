'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currScore0El = document.getElementById('current--0');
const currScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let activePlayer,currentScore,isPlaying,scores ;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const initGame = function (){
    scores = [0, 0]
    activePlayer = 0;
    isPlaying = true;
    currentScore = 0;
    currScore0El.textContent = 0;
    currScore1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    
}

initGame()

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      isPlaying = false;
      // alert(`Player ${activePlayer} has won the game`)
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click',
    initGame
)
