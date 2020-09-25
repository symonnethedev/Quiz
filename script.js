const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "Who said 'Tell me and I forget. Teach me and I remember. Involve me and I learn'?",
    answers: [
      { text: "Albert Einstein", correct: false },
      { text: "Oscar Wilde", correct: false },
      { text: "Margaret Mead", correct: false },
      { text: "Benjamin Franklin", correct: true },
    ],
  },
  {
    question:
      "Who said 'Don't judge each day by the harvest you reap but by the seeds that you plant'?",
    answers: [
      { text: "Robert Louis Stevenson", correct: true },
      { text: "Anne Frank", correct: false },
      { text: "Aristotle", correct: false },
      { text: "Ralph Waldo Emerson", correct: false },
    ],
  },
  {
    question:
      "Who said 'The greatest glory in living lies not in never falling, but in rising every time we fall'?",
    answers: [
      { text: "Mother Teresa", correct: false },
      { text: "Nelson Mandela", correct: true },
      { text: "Eleanor Roosevelt", correct: false },
      { text: "Helen Keller", correct: false },
    ],
  },
  {
    question:
      "Who said 'Do not let making a living prevent you from making a life.'?",
    answers: [
      { text: "Norman Vaughan", correct: false },
      { text: "Audrey Hepburn", correct: false },
      { text: "James M. Barrie", correct: false },
      { text: "John Wooden", correct: true },
    ],
  },
  {
    question:
      "Who said 'The way to get started is to quit talking and begin doing?",
    answers: [
      { text: "Ralph Waldo Emerson", correct: false },
      { text: "Walt Disney", correct: true },
      { text: "Dr. Seuss", correct: false },
      { text: "Helen Keller", correct: false },
    ],
  },
];
