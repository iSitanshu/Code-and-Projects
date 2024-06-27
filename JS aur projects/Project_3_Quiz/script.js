//storing in question array - array containing objects
// [{},{},{},{}] 
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the largest country in the world?",
        answers:[
            {text: "Vatican City", correct: false},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Russia", correct: true}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Europe", correct: false},
            {text: "Africa", correct: false}
        ]
    }
];
const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer_btn")
const nextbutton = document.getElementById("next_btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0
    score=0
    nextbutton.innerHTML="Next"
    showQuestion()
}
function showQuestion(){
    resetstate()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex+1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML=answer.text
        button.classList.add("btn")//giving button classname btn
        answerButton.appendChild(button)//displaying answer
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectanser)
    })
}
function resetstate(){
    nextbutton.style.display = "none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectanser(e){
    const selectbtn = e.target
    const iscorrect = selectbtn.dataset.correct === "true"
    if(iscorrect){
        selectbtn.classList.add("correct")
        score++
    }else{
        selectbtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}
nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handlenextbutton()
    }
    else{
        startQuiz()
    }
})

function handlenextbutton(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showscore()
    }
}

function showscore(){
    resetstate()
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextbutton.innerHTML = "Play Again"
    nextbutton.style.display = "block"
}
startQuiz()