const words = ['חתול', 'כלב', 'שמש', 'ירח', 'ים', 'רוח', 'פרח', 'דבש'];
let cards = [...words, ...words];
cards = shuffle(cards);

const board = document.getElementById('game-board');
let flipped = [];
let lockBoard = false;
let matches = 0;

const successSound = new Audio('sounds/success.mp3');
const failSound = new Audio('sounds/fail.mp3');
const winSound = new Audio('sounds/win.mp3');

cards.forEach(word => {
    const card = createCard(word);
    board.appendChild(card);
});

function createCard(word) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.word = word;

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = '?';

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = word;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => {
        if (lockBoard || card.classList.contains('flip') || flipped.includes(card)) return;

        card.classList.add('flip');
        flipped.push(card);

        if (flipped.length === 2) {
            lockBoard = true;
            setTimeout(checkMatch, 700);
        }
    });

    return card;
}

function checkMatch() {
    const [card1, card2] = flipped;
    const isMatch = card1.dataset.word === card2.dataset.word;

    if (isMatch) {
        card1.classList.add('match');
        card2.classList.add('match');
        successSound.play();
        matches++;
        if (matches === words.length) {
            setTimeout(() => {
                winSound.play();
                alert('🎉 כל הכבוד! סיימת את המשחק!');
            }, 500);
        }
    } else {
        failSound.play();
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
        }, 700);
    }

    flipped = [];
    lockBoard = false;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
