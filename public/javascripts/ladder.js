const modal = document.getElementById('jsModal');
const peopleNumber = document.getElementById('jsPeopleNumber');
const downBtn = document.getElementById('jsDownBtn');
const upBtn = document.getElementById('jsUpBtn');
const submit = document.getElementById('jsSubmit');
const canvas = document.getElementById('jsLadder');
const canvasCover = document.getElementById('jsLadderCover');

const ctx = canvas.getContext('2d');

function percent (num) {
	return Math.ceil(Math.random() * num);
}

var people = 2;

peopleNumber.innerHTML = people;

var ladderStatus = false;
var ladderBridgeStatus = [];
var ladderButtonStatus = [];

function drawRect () {
	let line = 100;
	let xPlus = Math.floor(550 / (people - 1));

	function ladderLineTemp (height) {
		ctx.lineWidth = 1;

		ctx.beginPath();
		ctx.moveTo(height, 80);
		ctx.lineTo(height, 270);
		ctx.stroke();

		ctx.lineWidth = 3;
	}

	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgb(0, 0, 0)';

	for (let i = 1; i <= people; i++) {
		ctx.strokeRect(line - 30, 40, 60, 30);
		ladderLineTemp(line);
		ctx.strokeRect(line - 30, 280, 60, 30);

		line += xPlus;
	}
}

function drawLadder () {
	let line = 100;
	let xPlus = Math.floor(550 / (people - 1));

	function ladderLineFirst (x) {
		ctx.beginPath();
		ctx.moveTo(x, 80);

		let y = 85;

		let ladderBridge = 0;

		let oneSpaceBridge = 0;

		for (let i = 1; i <= 5; i++) {
			y += 30;
			ctx.lineTo(x, y);

			if (ladderBridge < 3 && oneSpaceBridge !== 1) {
				if (percent(10) <= 7) {
					ctx.lineTo(x + xPlus, y);
					ctx.moveTo(x, y);
					++ladderBridge;
					++oneSpaceBridge;
					ladderBridgeStatus[x + y + i] = true;
				}
			} else if (oneSpaceBridge === 1) {
				++oneSpaceBridge;
			}
		}

		ctx.moveTo(x, 235);
		ctx.lineTo(x, 270);
		ctx.stroke();

		if (ladderBridge === 0) {
			ctx.beginPath();

			let y = 115;

			for (let i = 1; i <= 4; i++) {
				if (ladderBridge < 2 && oneSpaceBridge !== 1) {
					if (!ladderBridgeStatus[x + y + i]) {
						ctx.moveTo(x, y);
						ctx.lineTo(x + xPlus, y);
						++ladderBridge;
						++oneSpaceBridge;
						ladderBridgeStatus[x + y + i] = true;
					}
				} else if (oneSpaceBridge === 1) {
					++oneSpaceBridge;
				}

				y += 30;
			}

			ctx.stroke();
		}
	}

	function ladderLine (x) {
		ctx.beginPath();
		ctx.moveTo(x, 80);

		let y = 85;

		let ladderBridge = 0;

		for (let i = 1; i <= 5; i++) {
			y += 30;
			ctx.lineTo(x, y);

			if (ladderBridge < 3) {
				if (!ladderBridgeStatus[x - xPlus + y + i]) {
					if (percent(10) <= 5) {
						ctx.lineTo(x + xPlus, y);
						ctx.moveTo(x, y);
						++ladderBridge;
						ladderBridgeStatus[x + y + i] = true;
					}
				}
			}
		}

		ctx.moveTo(x, 235);
		ctx.lineTo(x, 270);
		ctx.stroke();

		if (ladderBridge === 0) {
			ctx.beginPath();

			let y = 115;

			let oneSpaceBridge = 0;

			for (let i = 1; i <= 4; i++) {
				if (ladderBridge < 2 && oneSpaceBridge !== 1) {
					if (!ladderBridgeStatus[x - xPlus + y + i]) {
						if (!ladderBridgeStatus[x + y + i]) {
							ctx.moveTo(x, y);
							ctx.lineTo(x + xPlus, y);
							++ladderBridge;
							++oneSpaceBridge;
							ladderBridgeStatus[x + y + i] = true;
						}
					}
				} else if (oneSpaceBridge === 1) {
					++oneSpaceBridge;
				}

				y += 30;
			}

			ctx.stroke();
		}
	}

	function ladderLineLast (height) {
		ctx.beginPath();
		ctx.moveTo(height, 80);
		ctx.lineTo(height, 270);
		ctx.stroke();
	}

	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(0, 0, 0)';

	for (let i = 1; i <= people; i++) {
		if (i === 1) {
			ladderLineFirst(line);

			line += xPlus;
		} else if (i < people) {
			ladderLine(line);

			line += xPlus;
		} else if (i === people) {
			ladderLineLast(line);
		}
	}

	ladderStatus = true;
}

function ladderBridgeColor (x, num) {
	if (ladderStatus && !ladderButtonStatus[num]) {
		let red;
		let green;
		let blue;

		switch (num) {
		case 1:
			// RED
			red = 255;
			green = 0;
			blue = 0;
			break;
		case 3:
			// CYAN
			red = 0;
			green = 255;
			blue = 255;
			break;
		case 5:
			// ORANGE
			red = 255;
			green = 128;
			blue = 0;
			break;
		case 7:
			// DARK BLUE
			red = 0;
			green = 0;
			blue = 128;
			break;
		case 9:
			// YELLOW
			red = 255;
			green = 255;
			blue = 0;
			break;
		case 11:
			// BLUE
			red = 0;
			green = 0;
			blue = 255;
			break;
		case 13:
			// GREEN
			red = 0;
			green = 255;
			blue = 0;
			break;
		case 15:
			// PINK
			red = 255;
			green = 0;
			blue = 255;
			break;
		}

		x += 30;

		ctx.lineWidth = 3;
		ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
		ctx.strokeRect(x - 30, 40, 60, 30);

		ctx.beginPath();
		ctx.moveTo(x, 80);
		ctx.lineTo(x, 85);

		let y = 85;
		let xPlus = Math.floor(550 / (people - 1));

		for (let i = 1; i <= 5; i++) {
			y += 30;
			ctx.lineTo(x, y);

			if (ladderBridgeStatus[x - xPlus + y + i]) {
				x -= xPlus;
				ctx.lineTo(x, y);
			} else if (ladderBridgeStatus[x + y + i]) {
				x += xPlus;
				ctx.lineTo(x, y);
			}
		}

		ctx.lineTo(x, y + 35);
		ctx.stroke();

		ctx.strokeRect(x - 30, 280, 60, 30);
		ladderButtonStatus[num] = true;
	}
}

function canvasTextInput () {
	let line = 100;
	let xPlus = Math.floor(550 / (people - 1));

	let inputNum = 0;

	function addInput (x, num) {
		let canvasInput = document.createElement('input');

		++inputNum;

		canvasInput.number = inputNum;
		canvasInput.type = 'text';
		canvasInput.maxLength = '3';
		canvasInput.style.width = '57px';
		canvasInput.style.height = '30px';
		canvasInput.style.border = 'none';
		canvasInput.style.position = 'fixed';

		if (num === 1) {
			let y = 32;

			canvasInput.left = x;
			canvasInput.style.marginLeft = `${x + 3}px`;
			canvasInput.top = y;
			canvasInput.style.marginTop = `${y}px`;
		} else if (num === 2) {
			let y = 272;

			canvasInput.left = x;
			canvasInput.style.marginLeft = `${x + 3}px`;
			canvasInput.top = y;
			canvasInput.style.marginTop = `${y}px`;
		}

		canvasInput.addEventListener('focusout', function (e) {
			if (this.value) {
				if (e) {
					this.readOnly = true;
					if (this.top === 32) {
						this.style.cursor = 'pointer';
						this.addEventListener('click', function (e) {
							if (e) {
								ladderBridgeColor(this.left, this.number);
							}
						});
					}

					--inputNum;
					if (inputNum === 0) {
						drawLadder();
					}
				}
			}
		});

		canvasCover.appendChild(canvasInput);
	}

	canvasCover.classList.remove('hidden');

	for (let l = 1; l <= people; l++) {
		addInput(line - 30, 1);
		addInput(line - 30, 2);
		line += xPlus;
	}
}

downBtn.addEventListener('click', function () {
	if (people >= 3) {
		--people;
		peopleNumber.innerHTML = people;
	} else {
		null;
	}
});

upBtn.addEventListener('click', function () {
	if (people <= 7) {
		++people;
		peopleNumber.innerHTML = people;
	} else {
		null;
	}
});

submit.addEventListener('click', function () {
	modal.classList.add('hidden');
	drawRect();
	canvasTextInput();
});
