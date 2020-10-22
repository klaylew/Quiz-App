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
      <p>This quiz will test your knowledge of basic Construction Methods.</p>
      <p>Click the button below to get started.</p>
      <p>Each question is worth 10 Points.</p>
      <button type="button" id="startQuiz">Begin Quiz</button>
    </form>
  </div>
  `;
}

// track score and current question
function scoreAndQuestionTracker(){
  return` 
  <ul class="trackScoreAndQuestion">
    <li id="score">
      Your current score is ${STORE.score * 10} out of ${STORE.questions.length * 10}
    </li>
    <li id="question">
      You are on question ${STORE.questionNumber + 1} out of ${STORE.questions.length}
    </li>
  </ul>
  `
}

//display current question
function displayQuestion(){
  let currentQuestion = STORE.questions[STORE.currentQuestion];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${buildAnswerList()}
          </div>
        </div>
        <button type="submit" id="submit" >Submit</button>
        <button type="button" id="next" > Next </button>
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
function answerFeedback(){

};

// build screen to display results from quiz
function buildResultsScreen(){

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
  else if (STORE.quizStarted === true){
    console.log("quizStarted changed to true");
    html = scoreAndQuestionTracker();
    html += buildAnswerList();
    $('main').html(html);
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
function submitAnswer(){};

// move to next question on button click
function nextQuestion(){};

// restart of quiz on button click on results screen
function restartQuiz(){};

function handleQuiz() {
  // console.log("handleQuiz ran");
  render();
  startQuizClick();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(handleQuiz);