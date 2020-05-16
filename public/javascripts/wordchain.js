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

function httpRequestAsync (type, url, data, callback) {
	let xmlHttp = new XMLHttpRequest();

	xmlHttp.open(type, url, true);
	if (type === 'POST') {
		xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	}
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
	// eslint-disable-next-line no-useless-escape
	this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅣ]|[\s*]|[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g, '');

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
				httpRequestAsync('POST', './wordchain/word', JSON.stringify(wordForm), function (response) {
					if (response === 'NOT') {
						wordStatus.innerHTML = '명사가 아닙니다.';
					} else if (response === 'LOSE') {
						modalValue.innerHTML = '승리! 하지만 컴퓨터는 점점 성장합니다.';
						startBtn.innerHTML = 'Restart?';
						modal.classList.remove('hidden');
						startBtn.addEventListener('click', function () {
							window.location.reload();
						});
					} else {
						wordList[wordValue] = true;
						++wordNumber;

						nowWord.innerHTML = response;
						wordList[response] = true;
						++wordNumber;

						firstWord = true;
						beforeWords.innerHTML = `[ ${wordValue} ]`;

						let time = 10;

						let timer = setInterval(function () {
							remainTime.innerHTML = time;
							--time;

							if (time < 0) {
								clearInterval(timer);
								modalValue.innerHTML = 'Game Over';
								startBtn.innerHTML = 'Restart?';
								modal.classList.remove('hidden');
								startBtn.addEventListener('click', function () {
									window.location.reload();
								});
							}
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
