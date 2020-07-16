// Grabbing the buttons
const circle = document.querySelector('.circle');
const blueButton = document.querySelector('.blue');
const redButton = document.querySelector('.red');
const yellowButton = document.querySelector('.yellow');
const greenButton = document.querySelector('.green');
let message = document.querySelector('#message');
let score = document.querySelector('.score-js');
let scoreCount = 0;
score.innerHTML = `Score: ${scoreCount}`;
let nextRoundButton = document.querySelector('.next-round');
nextRoundButton.addEventListener('click', nextRound);

let roundCount = 1;
let roundLabel = document.querySelector('.round-js');
roundLabel.innerText = `Round ${roundCount}`;

let startButton = document.querySelector('.start-button');

startButton.addEventListener('click', handleStartButton);
circle.addEventListener('click', handleUserChoice);
var rando;
let timeout = 2000;
let timeoutTracker = timeout;
let userSequence = [];
let gameSequence = [];

function handleStartButton(event) {
	//
	// fixUnpromptedClicks();
	// rightChoice = false;
	checkAndRemoveColors();
	message.style.opacity = '1';
	message.innerText = 'WATCH!';

	console.log('handleStartButton');

	gameChoice();
}
let rightChoice = false;
function handleUserChoice(event) {
	//the message should say your turn

	console.log('handle user choice');
	glowAndSound(event);
	userSequence.push(`${event.target.dataset.color}`);
	console.log(event.target);

	if (
		gameSequence.length === userSequence.length &&
		gameSequence.length !== 0 &&
		userSequence.length !== 0
	) {
		for (let i = 0; i < gameSequence.length; i++) {
			if (gameSequence[i] !== userSequence[i]) {
				// do nothing
				rightChoice = false;
			} else if (gameSequence[i] === userSequence[i]) {
				rightChoice = true;
				// delete this later
				// console.log(rightChoice);
			}
		}
		if (rightChoice === false) {
			// player loses so a losing message pops up
			message.innerHTML = 'YOU LOSE -1pt';
			scoreCount -= 1;
			score.innerHTML = `Score: ${scoreCount}`;
			// clearData();
			loseSound.play();
			startButton.innerText = 'replay';
		} else if (rightChoice === true) {
			startButton.style.opacity = '0';
			// player wins so a winning message pops up
			scoreCount += 2;
			score.innerHTML = `Score: ${scoreCount}`;
			winSound.play();
			message.innerHTML = 'YOU WIN!!!';

			//make the next round button visible
			nextRoundButton.style.opacity = '1';
			// clearData();
		}
	} else {
		rightChoice = false;
	}

	// fixUnpromptedClicks();
}

function gameChoice() {
	for (let i = 0; i < roundCount; i++) {
		rando = Math.floor(Math.random() * 4) + 1;

		if (rando === 1) {
			setTimeout(() => {
				checkAndRemoveColors();
				blueButton.classList.add('onBlue');
				blueSound.play();
				playerTurnMessage(timeout);
			}, timeout);
			// checkAndRemoveColors();
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${blueButton.dataset.color}`);
			console.log('blue');
		} else if (rando === 2) {
			setTimeout(() => {
				checkAndRemoveColors();
				redButton.classList.add('onRed');
				redSound.play();
				playerTurnMessage(timeout);
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${redButton.dataset.color}`);
			console.log('red');
		} else if (rando === 3) {
			setTimeout(() => {
				checkAndRemoveColors();
				yellowButton.classList.add('onYellow');
				yellowSound.play();
				playerTurnMessage(timeout);
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${yellowButton.dataset.color}`);
			console.log('yellow');
		} else {
			setTimeout(() => {
				checkAndRemoveColors();
				greenButton.classList.add('onGreen');
				greenSound.play();
				playerTurnMessage(timeout);
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${greenButton.dataset.color}`);
			console.log('green');
		}
		let clearTime = 200 + timeout;
		setTimeout(checkAndRemoveColors, clearTime);
		timeout += 1000;
		// setTimeout(checkAndRemoveColors, timeout);
	}
	timeout = timeoutTracker;
}

//makes sure only one button lights up at a time
function checkAndRemoveColors() {
	if (blueButton.classList.contains('onBlue')) {
		blueButton.classList.remove('onBlue');
	} else if (redButton.classList.contains('onRed')) {
		redButton.classList.remove('onRed');
	} else if (yellowButton.classList.contains('onYellow')) {
		yellowButton.classList.remove('onYellow');
	} else if (greenButton.classList.contains('onGreen')) {
		greenButton.classList.remove('onGreen');
	}
}

//handles the glow and sound of the button when clicked
function glowAndSound(event) {
	let color = event.target.dataset.color;
	if (color === 'blue') {
		blueButton.classList.add('onBlue');
		blueSound.play();
		setTimeout(checkAndRemoveColors, 200);
	} else if (color === 'red') {
		redButton.classList.add('onRed');
		redSound.play();
		setTimeout(checkAndRemoveColors, 200);
	} else if (color === 'yellow') {
		yellowButton.classList.add('onYellow');
		yellowSound.play();
		setTimeout(checkAndRemoveColors, 200);
	} else if (color === 'green') {
		greenButton.classList.add('onGreen');
		greenSound.play();
		setTimeout(checkAndRemoveColors, 200);
	}
}

function nextRound(event) {
	clearData();
	event.target.style.opacity = '0';
	startButton.innerText = 'start';
	startButton.style.opacity = '1';
	roundCount++;
	roundLabel.innerText = `Round ${roundCount}`;
	message.style.opacity = '0';
}

function clearData() {
	//empties the arrays for the user and game sequence
	gameSequence = [];
	userSequence = [];
	timeout = 2000;
	timeoutTracker = timeout;
}

function playerTurnMessage(time) {
	if (gameSequence.length === roundCount) {
		setTimeout(() => {
			message.innerHTML = 'Your Turn!';
		}, time);
	}
}

let reset = document.querySelector('.reset');

reset.addEventListener('click', handleReset);
function handleReset(event) {
	// event.preventDefault();
	roundCount = 1;
	roundLabel.innerText = `Round ${roundCount}`;
	timeout = 2000;
	timeoutTracker = timeout;
	scoreCount = 0;
	score.innerHTML = `Score: ${scoreCount}`;
	clearData();
	rightChoice = false;
	message.innerHTML = '';
	nextRoundButton.style.opacity = '0';
	startButton.style.opacity = '1';
	startButton.innerText = 'start';
}

/** STORE THE SCORE, ROUND, AND DATA */
// window.onload = function (){
// 	let stored = sessionStorage.getItem('storedScore');
// 	scoreCount = Number(stored);
// }

// window.onbeforeunload =  function(){
// 	sessionStorage.setItem('storedScore', scoreCount);
// }

/** the sounds */

// ******* creating sound objects **********
let blueSound = new Audio();
blueSound.src = 'sounds/blueSound.mp3';
let redSound = new Audio();
redSound.src = 'sounds/redSound.wav';
let yellowSound = new Audio();
yellowSound.src = 'sounds/yellowSound.wav';
let greenSound = new Audio();
greenSound.src = 'sounds/greenSound.wav';
let winSound = new Audio();
winSound.src = 'sounds/winSound.wav';
let loseSound = new Audio();
loseSound.src = 'sounds/loseSound.wav';

function fixUnpromptedClicks() {
	if (gameSequence.length !== roundCount) {
		userSequence = [];
	}
}
