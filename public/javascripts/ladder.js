const modal = document.getElementById('jsModal');
const peopleNumber = document.getElementById('jsPeopleNumber');
const downBtn = document.getElementById('jsDownBtn');
const upBtn = document.getElementById('jsUpBtn');
const submit = document.getElementById('jsSubmit');
const canvas = document.getElementById('jsLadder');

const ctx = canvas.getContext('2d');

function percent (num) {
	return Math.round(Math.random() * num);
}

var people = 2;

peopleNumber.innerHTML = people;

function drawLadder () {
	let line = 100;

	let xPlus = Math.floor(550 / (people - 1));

	function ladderLinePlus (x) {
		ctx.beginPath();

		ctx.moveTo(x, 80);

		let y = 81;

		for (let i = 1; i <= 3; i++) {
			y += 47;
			ctx.lineTo(x, y);
			if (percent(10) < 6) {
				if (percent(10) > 6) {
					ctx.lineTo(x + xPlus, y + 20);
					ctx.moveTo(x, y);
				} else if (percent(10) > 2) {
					ctx.lineTo(x + xPlus, y);
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x + xPlus, y - 20);
					ctx.moveTo(x, y);
				}
			}
		}
		ctx.lineTo(x, 270);
		ctx.stroke();
	}

	function ladderLine (height) {
		ctx.beginPath();
		ctx.moveTo(height, 80);
		ctx.lineTo(height, 270);
		ctx.stroke();
	}


	for (let j = 1; j <= people; j++) {
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'rgb(0, 0, 0)';

		if (j < people) {
			ctx.strokeRect(line - 30, 40, 60, 30);

			ladderLinePlus(line);

			ctx.strokeRect(line - 30, 280, 60, 30);

			line += xPlus;
		} else if (j === people) {
			ctx.strokeRect(line - 30, 40, 60, 30);

			ladderLine(line);

			ctx.strokeRect(line - 30, 280, 60, 30);
		}
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
});
