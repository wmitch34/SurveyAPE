// Font end js for Home page
function showMySurveys(){
    let retArr = httpGet(baseURL + "/php/getMySurveys.php")

    // show my surveys

}
function showIncompleteSurveys(){
    let retArr = httpGet(baseURL + "/php/getIncompleteSurveys.php")
    // request incomplete surveys
    // show incomplete surveys

}
function showCompleteSurveys(){
    let retArr = httpGet(theUrl)
    // request complete surveys

}
function logout(){
    // clear cookie goes here
    window.location.href = "/index.html"
}

function showCreateForm(){
    document.getElementById("createSurveyForm").style = "display: block;"

}

var question_box = "";
var count = 0;
var type_arr =[]

function add_question(){

    document.getElementById("addq").innerHTML = "<div id = \"qtype\"><button onclick=\"newFreeResp()\">Free Response</button><button onclick=\"newMultChoice()\">Multiple Choice</button></div>"
    document.getElementById("addq").style = "display: block;"
}
function newFreeResp(){
    question_box += "<div id = \"question" + count + "\"><label>Question(User response is free response)</label><input type = \"textarea\" id = \"question_num_" + count+"\"></input></div>"
    type_arr[count] = 1;
    count++;
    document.getElementById("question_box").innerHTML = question_box;
    document.getElementById("addq").style = "display: none;"
    
}
function newMultChoice(){
    console.log("made it")
    question_box += "<div id = \"question" + count + "\"><label>Question(User response Multiple choice 1 - 5)</label><input type = \"textarea\" id = \"question_num_" + count+"\"></input></div>"
    type_arr[count] = 0;
    count++;
    document.getElementById("question_box").innerHTML = question_box;
    document.getElementById("addq").style = "display: none;"

}

function cancel_add_survey(){
    document.getElementById("createSurveyForm").style = "display: none;"

}
