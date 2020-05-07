const modal = document.getElementById('jsModal');
const peopleNumber = document.getElementById('jsPeopleNumber');
const downBtn = document.getElementById('jsDownBtn');
const upBtn = document.getElementById('jsUpBtn');
const submit = document.getElementById('jsSubmit');
const canvas = document.getElementById('jsLadder');

const ctx = canvas.getContext('2d');

var people = 2;

peopleNumber.innerHTML = people;

function drawLadder () {
	function ladderLinePlus (height) {
		ctx.beginPath();
		ctx.moveTo(height, 80);
		ctx.lineTo(height, 270);
		ctx.stroke();
	}

	function ladderLine (height) {
		ctx.beginPath();
		ctx.moveTo(height, 80);
		ctx.lineTo(height, 270);
		ctx.stroke();
	}

	let line = 100;
	for (let i = 1; i <= people; i++) {
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'rgb(0, 0, 0)';

		if (i < people) {
			ctx.strokeRect(line - 30, 40, 60, 30);

			ladderLinePlus(line);

			ctx.strokeRect(line - 30, 280, 60, 30);

			line += Math.floor((750 - 200) / (people - 1));
		} else if (i === people) {
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
