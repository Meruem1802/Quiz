import { questions } from "./questions.js";

//Init part

const question = document.getElementById('question');
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');
const optionElements = document.querySelectorAll('.option');
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');


const modalWindow = document.querySelector('.quiz-over-modal');
const resultText = document.querySelector('.quiz-over-modal h1');
const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');
const btnTryAgain = document.getElementById('btn-try-again');

let orderOfQuestions = [];
let indexOfPage = 0;
let score = 0;

numberOfAllQuestions.innerHTML = questions.length;

const generateRandomOrderOfQuestions = () => {
    while (orderOfQuestions.length < questions.length) {
        let num = Math.floor( Math.random() * questions.length );
        if (orderOfQuestions.indexOf(num) == -1) {
            orderOfQuestions.push(num);
        }
    }
};

generateRandomOrderOfQuestions();

//Quiz logic

const loadQuestion = (quest) => {
    numberOfQuestion.innerHTML = indexOfPage + 1;
    question.innerHTML = quest.question;
    option1.innerHTML = quest.answerOptions[0];
    option2.innerHTML = quest.answerOptions[1];
    option3.innerHTML = quest.answerOptions[2];
    option4.innerHTML = quest.answerOptions[3];
    
};

const answerTracker = () => {
    for (let i = 0; i < questions.length; i++) {
        let div = document.createElement('div');
        answersTracker.appendChild(div);
    }
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage].classList.add(`${status}`);
}

const checkAnswer = (event) => {
    
    if (event.target.dataset.id == questions[orderOfQuestions[indexOfPage]].rightAnswer) {
        event.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        event.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }

    disabledOptions();
};



const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[orderOfQuestions[indexOfPage]].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

const validate = () => {
    if (optionElements[0].classList.contains('disabled')) {
        clearAnswerResultStyles();
        indexOfPage++;
        if (indexOfPage >= questions.length) {
            quizOver();
        } else {
            loadQuestion(questions[ orderOfQuestions[indexOfPage] ]);
        }
    } else {
        alert('Выбери один из вариантов ответа!');
    }
};

const clearAnswerResultStyles = () => {
    optionElements.forEach(item => {
        item.classList.remove('correct', 'wrong', 'disabled');
    });
};

const quizOver = () => {
    if (score <= 2) {
        resultText.innerHTML = 'Не жми наугад...';
    } else if (score >= 3 && score <= 6) {
        resultText.innerHTML = 'Неплохой результат, но можно лучше!';
    } else if (score >= 7 && score <= 9) {
        resultText.innerHTML = 'Хороший результат!';
    } else {
        resultText.innerHTML = 'Великолепный результат!';
    } 
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
    modalWindow.classList.add('active');
};

//Event handlers

window.addEventListener('load', () => {
    loadQuestion (questions[ orderOfQuestions[indexOfPage] ]);
    answerTracker();
});

for (let option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

btnNext.addEventListener('click', () => {
    validate();
});

btnTryAgain.addEventListener('click', () => {
    window.location.reload();
});