const api = "http://127.0.0.1:8000";

const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key');
console.log(key);

function arrow_scroll(){
    document.getElementById(`description-title`).scrollIntoView();
}

async function show_detail(){
    const header_name = document.getElementById('header-name');
    const header_type = document.getElementById('header-type');
    const paragraph_text = document.getElementById('paragraph-text')

    let response = await fetch(`${api}/getpercentage?answer_key=${key}`); // Fetch data from '/hotel' endpoint
    let data = await response.json(); // Parse the JSON response
    console.log(data);
    let personality_text = "";
    let percentage_array = []
    for(const [key, value] of Object.entries(data)){
        if(value >= 0){
            personality_text += key[0];
        }
        else{
            personality_text += key[1];
        }
        percentage_array.push(value)
    }   
    let detail_response = await fetch(`${api}/getdetails?personality=${personality_text}`); // Fetch data from '/hotel' endpoint
    let detail_data = await detail_response.json(); // Parse the JSON response
    console.log(detail_data)

    header_name.innerHTML = detail_data['name'];
    header_type.innerHTML = detail_data['personality_type'];
    paragraph_text.innerHTML = `
    &nbsp&nbsp&nbsp&nbsp${detail_data['description']}
    `;

    console.log(percentage_array)
    let bg_array = [" bg-info", " bg-danger", "", " bg-warning", " bg-success"]
    for(let i = 0; i < percentage_array.length; i++){
        percentage = percentage_array[i];
        let num, dir;
        if(percentage >= 0){
            num = Math.round(percentage * 100);
            dir = "ltr";
        }
        else{
            num = Math.round(percentage * -100);
            dir = "rtl";
        };
        console.log(num, dir);
        let currentbar = document.getElementById(`bar-${i}`);
        let currentletter = document.getElementById(`bar-${i}-${dir}`);
        let content = `
            <div class="progress-bar rounded-5${bg_array[i]}" role="progressbar" style="width: ${num}%" aria-valuenow="${num}" aria-valuemin="0" aria-valuemax="100">
            ${num}%
            </div>
        `;
        currentbar.style.direction = `${dir}`;
        currentletter.style.color = "rgba(255, 0, 0, 0.75)";
        // currentletter.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        currentletter.style.borderRadius = "10px";
        currentbar.innerHTML = content;
    };
}

show_detail();