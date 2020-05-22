const beforeWords = document.getElementById('jsBeforeWords');
const nowWord = document.getElementById('jsNowWord');
const remainTime = document.getElementById('jsRemainTime');
const wordStatus = document.getElementById('jsWordStatus');
const wordInput = document.getElementById('jsWordInput');
const modal = document.getElementById('jsModal');
const modalValue = document.getElementById('jsModalValue');
const startBtn = document.getElementById('jsStart');

var wordNumber = 1;
var wordList = {};
var firstWord = false;
var timer;

function httpRequestPostAsync (url, data, callback) {
	let xmlHttp = new XMLHttpRequest();

	xmlHttp.open('POST', url, true);
	xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {
			callback(xmlHttp.responseText);
		}
	};
	xmlHttp.send(data);
}


startBtn.addEventListener('click', function () {
	modal.classList.add('hidden');
});

wordInput.addEventListener('keydown', function (e) {
	if (this.value.length >= 2) {
		wordStatus.innerHTML = '';
		if (e.keyCode === 13) {
			let wordValue = this.value;
			let wordForm = {
				name: wordNumber,
				value: wordValue,
				wordList: wordList
			};

			if (wordList[wordValue]) {
				wordStatus.innerHTML = '사용했던 단어 입니다.';
			} else if (!firstWord || nowWord.innerHTML[nowWord.innerHTML.length - 1] === wordValue[0]) {
				this.value = '';
				httpRequestPostAsync('./wordchain/word', JSON.stringify(wordForm), function (response) {
					if (response === 'NONE') {
						wordStatus.innerHTML = '단어가 아닙니다.';
					} else if (response === 'NOT') {
						wordStatus.innerHTML = '명사가 아닙니다.';
					} else if (response === 'LOSE') {
						clearInterval(timer);
						modalValue.innerHTML = '승리! 하지만 컴퓨터는 배웠습니다!';
						startBtn.innerHTML = 'Restart?';
						modal.classList.remove('hidden');
						startBtn.addEventListener('click', function () {
							wordNumber = 1;
							wordList = {};
							firstWord = false;
							wordStatus.innerHTML = '';
							nowWord.innerHTML = '';
							beforeWords.innerHTML = '';
							remainTime.innerHTML = '';
							modal.classList.add('hidden');
						});
					} else {
						clearInterval(timer);
						remainTime.innerHTML = '';

						wordList[wordValue] = true;
						++wordNumber;

						nowWord.innerHTML = response;
						wordList[response] = true;
						++wordNumber;

						firstWord = true;
						beforeWords.innerHTML = `[ ${wordValue} ]`;

						let time = 5;

						timer = setInterval(function () {
							if (time < 0) {
								clearInterval(timer);
								modalValue.innerHTML = 'Game Over';
								startBtn.innerHTML = 'Restart?';
								modal.classList.remove('hidden');
								startBtn.addEventListener('click', function () {
									wordNumber = 1;
									wordList = {};
									firstWord = false;
									wordStatus.innerHTML = '';
									nowWord.innerHTML = '';
									beforeWords.innerHTML = '';
									remainTime.innerHTML = '';
									modal.classList.add('hidden');
								});
							}

							remainTime.innerHTML = time;
							--time;
						}, 1000);
					}
				});
			} else if (firstWord && nowWord.innerHTML[nowWord.innerHTML.length - 1] !== wordValue[0]) {
				wordStatus.innerHTML = '제시된 낱말의 마지막 글자로 시작하는 낱말을 제시해주세요.';
			}
		}
	} else {
		wordStatus.innerHTML = '2글자 이상만 가능합니다.';
	}
});
