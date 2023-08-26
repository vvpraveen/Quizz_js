const quizData = [
    
    {
        question: 'Javascript is an _______ language?',
        options: ['Object-oriented', 'object-based', 'procedural', 'none of the above'],
        answer: 'Object-oriented',
      },
      {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        options: ['var', 'let', 'both a&b', 'none of the above'],
        answer: 'both a&b',
      },
      {
        question: 'How can a datatype be declared to be a constant type?',
        options: ['const', 'var', 'let', 'constant'],
        answer: 'const',
      },
      {
          question: 'How do you call a function named “myFunction”?',
          options: ['myFunction()','call myFunction()','call function myFunction()'],
          answer:'myFunction()',
      },
      {
          question:'JavaScript ignores extra spaces',
          options:['True','False'],
          answer:'False',
      },
      {
          question:'Inside which HTML element do we put the JavaScript?',
          options:['js tag','Script tag','scripting tag','javascript tag'],
          answer:'Script tag',
      },
      {
          question:'How does a WHILE loop start?',
          options:['while i = 1 to 10','while (i <= 10)','while (i <= 10; i++)'],
          answer:'while (i <= 10)',
      },
      {
          question:'Which of the following is the tainted property of a window object in Java Script?',
          options:['Host','Protocol','Defaultstatus'],
          answer:'Defaultstatus',
      },
      {
          question:'Which of the following is the tainted property of a window object in Java Script?',
          options:['Host','Protocol','Defaultstatus'],
          answer:'Defaultstatus',
      },
      {
          question:'Which of the following is a client-side Java Script object?',
          options:['Function','File','Fileupload'],
          answer:'Fileupload',
      },
      {
          question:'Where is the correct place to insert a JavaScript?',
          options:[' The head tag section',' The body tag section','Both the head tag section and the body tag section are correct'],
          answer:'Both the head tag section and the body tag section are correct',
      },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
}

function displayQuestion() {
const questionData = quizData[currentQuestion];

const questionElement = document.createElement('div');
questionElement.className = 'question';
questionElement.innerHTML = questionData.question;

const optionsElement = document.createElement('div');
optionsElement.className = 'options';

const shuffledOptions = [...questionData.options];
shuffleArray(shuffledOptions);

for (let i = 0; i < shuffledOptions.length; i++) {
  const option = document.createElement('label');
  option.className = 'option';

  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'quiz';
  radio.value = shuffledOptions[i];

  const optionText = document.createTextNode(shuffledOptions[i]);

  option.appendChild(radio);
  option.appendChild(optionText);
  optionsElement.appendChild(option);
}

quizContainer.innerHTML = '';
quizContainer.appendChild(questionElement);
quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
const selectedOption = document.querySelector('input[name="quiz"]:checked');
if (selectedOption) {
  const answer = selectedOption.value;
  if (answer === quizData[currentQuestion].answer) {
    score++;
  } else {
    incorrectAnswers.push({
      question: quizData[currentQuestion].question,
      incorrectAnswer: answer,
      correctAnswer: quizData[currentQuestion].answer,
    });
  }
  currentQuestion++;
  selectedOption.checked = false;
  if (currentQuestion < quizData.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}
}

function displayResult() {
quizContainer.style.display = 'none';
submitButton.style.display = 'none';
retryButton.style.display = 'inline-block';
showAnswerButton.style.display = 'inline-block';
resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
currentQuestion = 0;
score = 0;
incorrectAnswers = [];
quizContainer.style.display = 'block';
submitButton.style.display = 'inline-block';
retryButton.style.display = 'none';
showAnswerButton.style.display = 'none';
resultContainer.innerHTML = '';
displayQuestion();
}

function showAnswer() {
quizContainer.style.display = 'none';
submitButton.style.display = 'none';
retryButton.style.display = 'inline-block';
showAnswerButton.style.display = 'none';

let incorrectAnswersHtml = '';
for (let i = 0; i < incorrectAnswers.length; i++) {
  incorrectAnswersHtml += `
    <p>
      <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
      <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
      <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
    </p>
  `;
}

resultContainer.innerHTML = `
  <p>You scored ${score} out of ${quizData.length}!</p>
  <p>Incorrect Answers:</p>
  ${incorrectAnswersHtml}
`;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion()