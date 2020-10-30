console.log("hello");

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// start screen
function buildStartScreen() {
  return `  
    <div class="intro">
    
    <form>
      <h3>Welcome to your quiz on Modern Construction Basics!</h3>
      <p>This simple quiz will test your knowledge of a few basic Construction Methods.</p>
      <p>There are 5 questions worth 10 points each.</p>
      <p>Click the button below to get started! Good luck!</p>
      <button type="button" id="startQuiz">Begin Quiz</button>
    </form>
  </div>
  `;
}

// track score and current question
function scoreAndQuestionTracker(){
  return` 
  <ul class="trackScoreAndQuestion" style="list-style-type:none;">
    <li id="score">
      Current score: ${STORE.score * 10} of ${STORE.questions.length * 10}
    </li>
    <li id="question">
      Question ${STORE.questionNumber + 1} of ${STORE.questions.length}
    </li>
  </ul>
  `
}

//display current question
function displayQuestion(){
  let currentQuestion = STORE.questions[STORE.questionNumber];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${currentQuestion.question}</legend>
        </div>
        <div class="options">
        <br>
        <br>
          <div class="answers">
            ${buildAnswerList()}
          </div>
          <br>
          <br>
        </div>
        <button type="submit" id="submit" >Submit</button>
        <button type="button" id="next" > Next >></button>
      </fieldset>
    </form >
  `;
}

// build possible answer list for current question
function buildAnswerList(){
  const answerList = STORE.questions[STORE.questionNumber].answers;
  let answerlistHtml = '';
  let i = 0;

  answerList.forEach(answer =>{
    answerlistHtml += `
    <div id="option-${i}">
      <input type="radio" name="list" id="option${i+1}" value="${answer}" required>
      <label for="option${i+1}"> ${answer} </label>
    </div>
    `;
      i++;
  })
  return answerlistHtml;
}

  

// build feedback for submitted answer on each question
function answerFeedback(answerValidity){
    let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
    let html = '';
    if (answerValidity === 'correct') {
        html = `
      <div class="right-answer">That is correct!</div>
      `;
    }
    else if (answerValidity === 'incorrect') {
        html = `
        <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
      `;
    }
    
    return html;
};

// build screen to display results from quiz
function buildResultsScreen(){
  return `
  <div class="results">
  <form id="restart-quiz">
      <legend>Your Score: ${STORE.score*10}/50</legend>
      <br>
      <p>Click below to start over.</p>
      <br>
      <button type="button" id="restartBtn"> Restart Quiz </button>
  </form>
  </div
`
};



/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  console.log('render ran');
  let html = '';

  if (STORE.quizStarted === false) {
    console.log("quiz started still false");
    $('main').html(buildStartScreen());
    return;
  }
  else if (STORE.questionNumber >= 0 && STORE.questionNumber < STORE.questions.length){
    console.log("quizStarted changed to true");
    html = scoreAndQuestionTracker();
    html += displayQuestion();
    $('main').html(html);
  }
  else {
    $('main').html(buildResultsScreen());
  }
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// start of quiz on button click
function startQuizClick(){
  console.log('startQuizClick');
  $('main').on('click', '#startQuiz', function (event) {
    STORE.quizStarted = true;
    render();
  });
}

// submission of answer on every question
function submitAnswer(){
  $('body').on('submit', '#question-form', function(event){
    event.preventDefault();
    console.log("submit answer ran")
    const question = STORE.questions[STORE.questionNumber];
   
    //identify selected answer from radio list
    let selection = $('input[name=list]:checked').val();

    //
    let optionId = `#option-${question.answers.findIndex(i => i === selection)}`;

    if (selection === question.correctAnswer) {
      STORE.score ++;
      $(optionId).append(answerFeedback('correct'));
    }
    else {
      $(optionId).append(answerFeedback('incorrect'));
    }

    STORE.questionNumber++;
     // hide the submit button
     $('#submit').hide();
     // disable all inputs
     $('input[type=radio]').each(() => {
         $('input[type=radio]').attr('disabled', true);
     });
     // show the next button
     $('#next').show();

    });
     
}

// move to next question on button click
function nextQuestion(){
  $('body').on('click', '#next', (event) => {
    render();
    });
}

// restart of quiz on button click on results screen
function restartQuiz(){
    STORE.quizStarted = false;
    STORE.questionNumber = 0;
    STORE.score = 0;
};

function restartButton() {
  console.log("clicked on restart button");
  $('main').on('click', '#restartBtn', () => {
    restartQuiz();
    render();
  });
}

function handleQuiz() {
  // console.log("handleQuiz ran");
  render();
  startQuizClick();
  submitAnswer();
  nextQuestion();
  restartButton();
}

$(handleQuiz);