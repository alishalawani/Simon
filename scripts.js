// Grabbing the buttons
const cirlce = document.querySelector('.circle');
const bluebutton = document.querySelector('.blue');
const redButton = document.querySelector('.red');
const yellowButton = document.querySelector('.yellow');
const greenButton = document.querySelector('.green');

let roundCount = 1;
document.querySelector('.round-js').innerText = `Round ${roundCount}`;

let startButton = document.querySelector('.start-button');

startButton.addEventListener('click', handleStartButton);

var rando = 1;
function gameChoice() {
	for (let i = 0; i < roundCount; i++) {
		rando = Math.floor(Math.random() * 4) + 1;

		if (rando == 1) {
			bluebutton.classList.add('onBlue');
			console.log('blue');
		} else if (rando == 2) {
			redButton.classList.add('onRed');
			console.log('red');
		} else if (rando == 3) {
			yellowButton.classList.add('onYellow');
			console.log('yellow');
		} else {
			greenButton.classList.add('onGreen');
			console.log('green');
		}
	}
}

function handleStartButton(event) {
	console.log('handleStartButton');

	gameChoice();
}
