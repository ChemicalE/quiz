const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who painted the Mona Lisa?",
        a: "Vincent van Gogh",
        b: "Leonardo da Vinci",
        c: "Pablo Picasso",
        d: "Claude Monet",
        correct: "b"
    },
    {
        question: "What is the largest planet in our Solar System?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c"
    },
    {
        question: "What is the chemical symbol for water?",
        a: "O2",
        b: "H2O",
        c: "CO2",
        d: "NaCl",
        correct: "b"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        a: "Harper Lee",
        b: "Mark Twain",
        c: "Ernest Hemingway",
        d: "F. Scott Fitzgerald",
        correct: "a"
    },
    {
        question: "What is the smallest country in the world?",
        a: "Monaco",
        b: "San Marino",
        c: "Liechtenstein",
        d: "Vatican City",
        correct: "d"
    },
    {
        question: "Which element has the atomic number 1?",
        a: "Oxygen",
        b: "Hydrogen",
        c: "Carbon",
        d: "Helium",
        correct: "b"
    },
    {
        question: "What is the capital of Japan?",
        a: "Beijing",
        b: "Seoul",
        c: "Tokyo",
        d: "Bangkok",
        correct: "c"
    },
    {
        question: "Who developed the theory of relativity?",
        a: "Isaac Newton",
        b: "Nikola Tesla",
        c: "Albert Einstein",
        d: "Galileo Galilei",
        correct: "c"
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Venus",
        correct: "b"
    },
    {
        question: "What is the largest ocean on Earth?",
        a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Arctic Ocean",
        d: "Pacific Ocean",
        correct: "d"
    }
];

let currentQuestion = 0;
let userAnswers = [];

const quiz = document.getElementById('quiz');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    quiz.innerHTML = `
        <div class="quiz-question">
            <h2>${currentQuizData.question}</h2>
            <label>
                <input type="radio" name="answer" value="a">
                ${currentQuizData.a}
            </label><br>
            <label>
                <input type="radio" name="answer" value="b">
                ${currentQuizData.b}
            </label><br>
            <label>
                <input type="radio" name="answer" value="c">
                ${currentQuizData.c}
            </label><br>
            <label>
                <input type="radio" name="answer" value="d">
                ${currentQuizData.d}
            </label>
        </div>
    `;
    updateButtons();
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        saveAnswer();
        currentQuestion--;
        loadQuestion();
    }
}

function showNextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        saveAnswer();
        currentQuestion++;
        loadQuestion();
    }
}

function saveAnswer() {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (answer) {
        userAnswers[currentQuestion] = answer.value;
    }
}

function updateButtons() {
    document.getElementById('prevBtn').style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = currentQuestion === quizData.length - 1 ? 'inline-block' : 'none';
}

function submitQuiz() {
    saveAnswer();

    let score = 0;

    quizData.forEach((quizItem, index) => {
        const answer = userAnswers[index];
        if (answer === quizItem.correct) {
            score++;
        }
    });

    const percentage = (score / quizData.length) * 100;

    let resultMessage = '';
    let emoji = '';

    if (percentage >= 50) {
        resultMessage = 'Congratulations, you passed!';
        emoji = '😊';
    } else {
        resultMessage = "Sorry, you didn't make it.";
        emoji = '😢';
    }

    quiz.innerHTML = quizData.map((quizItem, index) => `
        <div class="quiz-question ${userAnswers[index] === quizItem.correct ? 'correct' : 'incorrect'}">
            <h2>${quizItem.question}</h2>
            <p class="${quizItem.correct === 'a' ? 'correct' : ''}">a. ${quizItem.a}</p>
            <p class="${quizItem.correct === 'b' ? 'correct' : ''}">b. ${quizItem.b}</p>
            <p class="${quizItem.correct === 'c' ? 'correct' : ''}">c. ${quizItem.c}</p>
            <p class="${quizItem.correct === 'd' ? 'correct' : ''}">d. ${quizItem.d}</p>
            <p>Your answer: ${userAnswers[index]}</p>
        </div>
    `).join('');

    document.getElementById('result').innerHTML = `${emoji} ${resultMessage}`;
}

loadQuestion();
