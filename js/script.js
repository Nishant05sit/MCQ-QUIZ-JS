//getting all required elements
let start_btn = document.querySelector('.start_btn');
let info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = document.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const option_list = document.querySelector('.option_list');
const timerCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeoff = quiz_box.querySelector("header .timer_text");

// if start Quiz Button clicked
start_btn.onclick = () => {
    info_box.classList.add('activeInfo');
}

// exit button clicked
exit_btn.onclick = () => {
    info_box.classList.remove('activeInfo');
}

// if continue button clicked
continue_btn.onclick = () => {
    info_box.classList.remove('activeInfo');
    quiz_box.classList.add('activeQuiz');
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}


let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const quit_quiz = result_box.querySelector(".buttons .quit");



quit_quiz.onclick = () => {
    window.location.reload();
}

//if next button is clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeoff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

//getting questions and options from array
function showQuestions(index) {
    const ques_text = document.querySelector('.que_text');

    let que_tag = `<span>` + questions[index].numb +". "+ questions[index].question + `</span>`;
    let option_tag = `<div class="option"><span>` + questions[index].options[0] +`</span></div>`
                   + `<div class="option"><span>` + questions[index].options[1] + `</span></div>`
                   + `<div class="option"><span>` + questions[index].options[2] + `</span></div>`
                   + `<div class="option"><span>` + questions[index].options[3] + `</span></div>`;
    ques_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else {
        answer.classList.add("incorrect");
        console.log("wrong Ans");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //if answers is incorrect then automatically selected the correct answer
        for (let i = 0; i < alloptions; i++){
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    //once user selected disabled all options
    for (let i = 0; i < alloptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeQuiz");// hide the quiz box
    result_box.classList.add("activeResult");// show the result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore >= 4) {
        let scoreTag = `<span>and YES!!! You got <p>`+ userScore +`</p> out of <P>`+ questions.length +`</P></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore >= 2) {
        let scoreTag = `<span> Maybe! You got <p>`+ userScore +`</p> out of <P>`+ questions.length +`</P></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = `<span> No, You got only <p>`+ userScore +`</p> out of <P>`+ questions.length +`</P></span>`;
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time < 9){
            let addZero = timerCount.textContent;
            timerCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timerCount.textContent = "00";
            timeoff.textContent = "Time Off";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

//displaying counter at the bottom
function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCounttag = `<span><p>` + index + `</p>of<p>` + questions.length + `</p>Questions</span>`;
    bottom_ques_counter.innerHTML = totalQuesCounttag;
}