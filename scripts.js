// Grabbing the buttons
const circle = document.querySelector('.circle');
const blueButton = document.querySelector('.blue');
const redButton = document.querySelector('.red');
const yellowButton = document.querySelector('.yellow');
const greenButton = document.querySelector('.green');
let message = document.querySelector('#message');
let score = document.querySelector('.score-js');
let scoreCount = 0;
score.innerText = `Score: ${scoreCount}`;
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
	message.style.opacity = '1';
	message.innerText = 'WATCH!';

	console.log('handleStartButton');

	gameChoice();
}

function handleUserChoice(event) {
	//the message should say your turn

	console.log('handle user choice');
	glowAndDim(event);
	userSequence.push(`${event.target.dataset.color}`);
	console.log(event.target);
	let rightChoice = false;
	if (gameSequence.length == userSequence.length) {
		for (let i = 0; i < gameSequence.length; i++) {
			if (gameSequence[i] == userSequence[i]) {
				rightChoice = true;
			} else {
				rightChoice = false;
				// delete this later
				console.log(rightChoice);
			}
		}
		if (rightChoice == false) {
			// player loses so a losing message pops up
			message.innerHTML = 'YOU LOSE';
			clearData();
		} else if (rightChoice == true) {
			// player wins so a winning message pops up
			scoreCount += 2;
			score.innerText = `Score: ${scoreCount}`;
			message.innerHTML = 'YOU WIN!!!';

			//make the next round button visible
			nextRoundButton.style.opacity = '1';
			clearData();
		}
	}
}

function gameChoice() {
	for (let i = 0; i < roundCount; i++) {
		rando = Math.floor(Math.random() * 4) + 1;

		if (rando == 1) {
			setTimeout(() => {
				checkAndRemoveColors();
				blueButton.classList.add('onBlue');
				playerTurnMessage();
			}, timeout);
			// checkAndRemoveColors();
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${blueButton.dataset.color}`);
			console.log('blue');
		} else if (rando == 2) {
			setTimeout(() => {
				checkAndRemoveColors();
				redButton.classList.add('onRed');
				playerTurnMessage();
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${redButton.dataset.color}`);
			console.log('red');
		} else if (rando == 3) {
			setTimeout(() => {
				checkAndRemoveColors();
				yellowButton.classList.add('onYellow');
				playerTurnMessage();
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${yellowButton.dataset.color}`);
			console.log('yellow');
		} else {
			setTimeout(() => {
				checkAndRemoveColors();
				greenButton.classList.add('onGreen');
				playerTurnMessage();
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

function glowAndDim(event) {
	let color = event.target.dataset.color;
	if (color == 'blue') {
		blueButton.classList.add('onBlue');
		setTimeout(checkAndRemoveColors, 200);
	} else if (color == 'red') {
		redButton.classList.add('onRed');
		setTimeout(checkAndRemoveColors, 200);
	} else if (color == 'yellow') {
		yellowButton.classList.add('onYellow');
		setTimeout(checkAndRemoveColors, 200);
	} else if (color == 'green') {
		greenButton.classList.add('onGreen');
		setTimeout(checkAndRemoveColors, 200);
	}
}

function nextRound(event) {
	event.target.style.opacity = '0';
	roundCount++;
	roundLabel.innerText = `Round ${roundCount}`;
	message.style.opacity = '0';
}

function clearData() {
	//empties the arrays for the user and game sequence
	gameSequence.forEach(() => {
		gameSequence.pop();
	});
	userSequence.forEach((choice) => {
		userSequence.pop();
	});
	timeout = 2000;
	timeoutTracker = timeout;
}

function playerTurnMessage() {
	if (gameSequence.length == roundCount) {
		message.innerHTML = 'Your Turn!';
	}
}
