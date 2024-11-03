const api = "http://127.0.0.1:8000";

function arrow_scroll(){
    document.getElementById(`description-title`).scrollIntoView()
}

async function show_quiz() {
    let response = await fetch(`${api}/getquiz`); // Fetch data from '/hotel' endpoint
    let quizdata = await response.json(); // Parse the JSON response
    const quiz_list = document.getElementById('quiz-list');
    let content = ""
    for (let i = 0; i < quizdata.length; i++){
        let question = quizdata[i]['question']
        content += `
            <div id="question-${i}" class="question container align-content-center">
                <div class="row">
                <div class="col-lg-12 text-center mb-4">
                    <p id="question-no-title" class="question-title fw-semibold mt-5">${question}</p>
                </div>
                <div class="col-lg-12 text-center d-flex align-items-center justify-content-center">
                    <span class="question-choice-label" style="color: rgb(160, 32, 32);">Hell naw</span>
                    <!-- Big Red -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="-2">
                    <span class="circle big red"></span>
                    </label>
                    
                    <!-- Small Red -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="-1">
                    <span class="circle small red"></span>
                    </label>
                    
                    <!-- Tiny Gray -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="0">
                    <span class="circle tiny gray"></span>
                    </label>
                    
                    <!-- Small Green -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="1">
                    <span class="circle small green"></span>
                    </label>
                    
                    <!-- Big Green -->
                    <label class="circle-radio">
                    <input type="radio" name="choice-${i}" value="2">
                    <span class="circle big green"></span>
                    </label>
                    <span class="question-choice-label" style="color: rgb(51, 164, 116);">Hell yea</span>
                </div>
                </div>
            </div>
            <div class="line-thin"></div>
        `;
    }
    quiz_list.innerHTML = content;
}

async function quiz_submit() {
    let data = [];
    const questions = document.querySelectorAll('.question'); // Select all question elements
    console.log(questions)
    for (let index = 0; index < questions.length; index++) {
        let question = questions[index];
        let selectedValue = question.querySelector(`input[name="choice-${index}"]:checked`);
        if (selectedValue) {
            data.push(parseInt(selectedValue.value)); // Push the selected value into the data array
        } else {
            console.log(`Question ${index + 1}: no answer selected`); // Log which question has no answer
            document.getElementById(`question-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    };
    data = data.join();
    window.location.href = `result.html?key=${data}`;
}

submit_button = document.getElementById('quiz-submit');

show_quiz();
submit_button.addEventListener("click", quiz_submit);