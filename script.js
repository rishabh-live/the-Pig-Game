'use strict';
let music = new Audio('roll.mp3');
music.playbackRate = 2.5;

let currentPlayer = 0;
let activeScore = 0;
let playing = false; //boolean status of the game
let name1;
let name2;
document.querySelector('.btn--start').addEventListener('click', function () {
  //brings modal window

  document.querySelector('main').classList.add('overlay');

  document.querySelector('.outer').classList.remove('hidden');

  //what if pressed outside the modal window ?
  //hifing the window

  //what if cancel is pressed
  document.querySelector('#cancel').addEventListener('click', function () {
    //hifing the window
    document.querySelector('.outer').classList.add('hidden');
    //removing blur
    document.querySelector('main').classList.remove('overlay');
  });
  document.querySelector('#home').addEventListener('click', function () {
    name1 = document.querySelector('#p1').value;
    name2 = document.querySelector('#p2').value;
    document.querySelector('#name--0').textContent = name1;
    document.querySelector('#name--1').textContent = name2;
    playing = true;
    document.querySelector('.outer').classList.add('hidden');
    document.querySelector('main').classList.remove('overlay');

    //remove start game button
    document.querySelector('.btn--start').classList.add('hidden');
  });
  //setting up the names
});

//1) set initial score =0;
document.querySelector('#score--0').textContent = Number(0);
document.querySelector('#score--1').textContent = Number(0);

//2) hide the dice image
document.querySelector('.dice').classList.add('hidden');

//3) functionality to roll dice button

document.querySelector('.btn--roll').addEventListener('click', function () {
  //dice image set up
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6 + 1);

    document.querySelector('.dice').src = `dice-${diceNumber}.png`; //applying suitable image
    music.play();
    document.querySelector('.dice').classList.remove('hidden'); //view the dice on the roll (especially for the 1st roll)

    if (diceNumber > 1) {
      activeScore = Number(
        document.querySelector(`#current--${currentPlayer}`).textContent
      );
      activeScore += diceNumber;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        activeScore;
    } else {
      //FISRT make current score =0;
      document.querySelector(`#current--${currentPlayer}`).textContent = 0;

      //change the player
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      currentPlayer = currentPlayer ^ 1; //XORing changes the current player
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--active');
      activeScore = 0;
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  //the current player retains its point
  if (playing) {
    document.querySelector(`#current--${currentPlayer}`).textContent =
      activeScore;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');

    let total = Number(
      document.querySelector(`#score--${currentPlayer}`).textContent
    );
    total = total + activeScore;
    document.querySelector(`#score--${currentPlayer}`).textContent = total;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      Number(0);
    if (total >= 50) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      playing = false;

      //hide the dice
      document.querySelector('.dice').classList.add('hidden');
      //make roll button do nothing
    } else {
      currentPlayer = currentPlayer ^ 1;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--active');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  //make all scores 0
  playing = true;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  document.querySelector('#score--0').textContent = Number(0);
  document.querySelector('#score--1').textContent = Number(0);
  document.querySelector('#current--0').textContent = Number(0);
  document.querySelector('#current--1').textContent = Number(0);
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  currentPlayer = 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');

  document.querySelector('.dice').classList.add('hidden');
});
