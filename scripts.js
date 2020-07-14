// Grabbing the buttons
const cirlce = document.querySelector('.circle');
const blueButton = document.querySelector('.blue');
const redButton = document.querySelector('.red');
const yellowButton = document.querySelector('.yellow');
const greenButton = document.querySelector('.green');

let roundCount = 4;
document.querySelector('.round-js').innerText = `Round ${roundCount}`;

let startButton = document.querySelector('.start-button');

startButton.addEventListener('click', handleStartButton);

var rando = 1;
let timeout = 2000;
let timeoutTracker = timeout;
let userSequence = [];
let gameSequence = [];

function gameChoice() {
	for (let i = 0; i < roundCount; i++) {
		rando = Math.floor(Math.random() * 4) + 1;
		
		if (rando == 1) {
			setTimeout(() => {
				checkAndRemoveColors();
				blueButton.classList.add('onBlue');
			}, timeout);
			checkAndRemoveColors();
				blueButton.classList.add('onBlue');
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${blueButton.dataset.color}`);
			console.log('blue');
		} else if (rando == 2) {
			setTimeout(() => {
				checkAndRemoveColors();
				redButton.classList.add('onRed');
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${redButton.dataset.color}`);
			console.log('red');
		} else if (rando == 3) {
			setTimeout(() => {
				checkAndRemoveColors();
				yellowButton.classList.add('onYellow');
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${yellowButton.dataset.color}`);
			console.log('yellow');
		} else {
			setTimeout(() => {
				checkAndRemoveColors();
				greenButton.classList.add('onGreen');
			}, timeout);
			//ADD THE CHOICE TO THE SEQUENCE
			gameSequence.push(`${greenButton.dataset.color}`);
			console.log('green');
		}
		
		timeout += 1000;
		setTimeout(checkAndRemoveColors, timeout);
	}
	timeout = timeoutTracker;
}
setTimeout(checkAndRemoveColors, timeout);
function handleStartButton(event) {
	console.log('handleStartButton');

	gameChoice();
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

function delay (ms){
	const startPoint = new Date().getTime();
	while (new Date().getTime() - startPoint <= ms) {
		/* wait */
	}
};