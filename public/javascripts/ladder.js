const modal = document.getElementById('jsModal');
const peopleNumber = document.getElementById('jsPeopleNumber');
const downBtn = document.getElementById('jsDownBtn');
const upBtn = document.getElementById('jsUpBtn');
const submit = document.getElementById('jsSubmit');
const canvas = document.getElementById('jsLadder');
const canvasCover = document.getElementById('jsLadderCover');

const ctx = canvas.getContext('2d');

function percent (num) {
	return Math.round(Math.random() * num);
}

var people = 2;

peopleNumber.innerHTML = people;

function drawLadder () {
	let line = 100;
	let xPlus = Math.floor(550 / (people - 1));

	let ladderBridgeStatus = [];

	function ladderLineFirst (x) {
		ctx.beginPath();

		ctx.moveTo(x, 80);

		let y = 85;

		let ladderBridge = 0;

		let oneSpaceBridge = 0;

		for (let i = 1; i <= 5; i++) {
			y += 30;
			ctx.lineTo(x, y);

			if (ladderBridge >= 3 || oneSpaceBridge === 1) {
				ladderBridgeStatus[x + y + i] = 0;
				++oneSpaceBridge;
			} else {
				if (percent(10) <= 6) {
					ctx.lineTo(x + xPlus, y);
					ctx.moveTo(x, y);
					++ladderBridge;
					++oneSpaceBridge;
					ladderBridgeStatus[x + y + i] = 1;
				} else {
					ladderBridgeStatus[x + y + i] = 0;
				}
			}
		}

		if (ladderBridge === 0) {
			let y2 = 85;

			for (let i = 1; i <= 5; i++) {
				y2 += 30;

				if (ladderBridge >= 2) {
					break;
				} else {
					if (ladderBridgeStatus[x + y2 + i] === 0) {
						ctx.moveTo(x, y2);
						ctx.lineTo(x + xPlus, y2);
						ctx.moveTo(x, y2);
						++ladderBridge;
						ladderBridgeStatus[x + y2 + i] = 1;

						y2 += 30;
					}
				}
			}
		}

		ctx.moveTo(x, 235);
		ctx.lineTo(x, 270);
		ctx.stroke();
	}

	function ladderLine (x) {
		ctx.beginPath();

		ctx.moveTo(x, 80);

		let y = 85;

		let ladderBridge = 0;

		for (let j = 1; j <= 5; j++) {
			y += 30;
			ctx.lineTo(x, y);

			if (ladderBridgeStatus[x - xPlus + y + j] === 1) {
				ladderBridgeStatus[x + y + j] = 0;
			} else {
				if (ladderBridge >= 3) {
					ladderBridgeStatus[x + y + j] = 0;
				} else {
					if (percent(10) <= 4) {
						ctx.lineTo(x + xPlus, y);
						ctx.moveTo(x, y);
						++ladderBridge;
						ladderBridgeStatus[x + y + j] = 1;
					} else {
						ladderBridgeStatus[x + y + j] = 0;
					}
				}
			}
		}

		if (ladderBridge === 0) {
			let y2 = 85;

			for (let j = 1; j <= 5; j++) {
				y2 += 30;

				if (ladderBridge >= 2) {
					break;
				} else {
					if (ladderBridgeStatus[x - xPlus + y2 + j] === 0) {
						if (ladderBridgeStatus[x + y2 + j] === 0) {
							ctx.moveTo(x, y2);
							ctx.lineTo(x + xPlus, y2);
							ctx.moveTo(x, y2);
							++ladderBridge;
							ladderBridgeStatus[x + y2 + j] = 1;

							y2 += 30;
						}
					}
				}
			}
		}

		ctx.moveTo(x, 235);
		ctx.lineTo(x, 270);
		ctx.stroke();
	}

	function ladderLineLast (height) {
		ctx.beginPath();
		ctx.moveTo(height, 80);
		ctx.lineTo(height, 270);
		ctx.stroke();
	}


	function drawRect (xStart, yStart, width, height) {
		ctx.lineWidth = 3;
		ctx.strokeRect(xStart, yStart, width, height);
		ctx.lineWidth = 1;
	}

	for (let k = 1; k <= people; k++) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgb(0, 0, 0)';

		if (k === 1) {
			drawRect(line - 30, 40, 60, 30);

			ladderLineFirst(line);

			drawRect(line - 30, 280, 60, 30);

			line += xPlus;
		} else if (k < people) {
			drawRect(line - 30, 40, 60, 30);

			ladderLine(line);

			drawRect(line - 30, 280, 60, 30);

			line += xPlus;
		} else if (k === people) {
			drawRect(line - 30, 40, 60, 30);

			ladderLineLast(line);

			drawRect(line - 30, 280, 60, 30);
		}
	}
}

function canvasTextInput () {
	let line = 100;
	let xPlus = Math.floor(550 / (people - 1));

	function drawText (text, x, y) {
		ctx.textBaseline = 'center';
		ctx.textAlign = 'left';
		ctx.font = '16px sans-serif';
		ctx.fillText(text, x + 5, y + 20);
	}

	function addInput (x, y, num) {
		let canvasInput = document.createElement('input');

		if (num === 1) {
			canvasInput.left = x;
			canvasInput.top = 40;
		} else if (num === 2) {
			canvasInput.left = x;
			canvasInput.top = 280;
		}

		canvasInput.type = 'text';
		canvasInput.maxLength = '4';
		canvasInput.style.width = '58px';
		canvasInput.style.height = '30px';
		canvasInput.style.border = 'none';
		canvasInput.style.position = 'fixed';
		canvasInput.style.marginLeft = `${x + 2}px`;
		canvasInput.style.marginTop = `${y}px`;

		canvasInput.addEventListener('keydown', function (e) {
			if (e.keyCode === 13) {
				drawText(this.value, this.left, this.top);
				canvasCover.removeChild(this);
			}
		});

		canvasCover.appendChild(canvasInput);
	}

	canvasCover.classList.remove('hidden');
	for (let l = 1; l <= people; l++) {
		addInput(line - 30, 40, 1);
		addInput(line - 30, 280, 2);
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
	drawLadder();
	canvasTextInput();
});
