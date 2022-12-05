function showMySurveys(){
    let temp = document.cookie.toString();

    temp = temp.slice(1, -1);
    let payLoad = {
        email:temp
    }

    let theUrl = "/php/getSurveys.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let res = xhr.responseText
                display_my_surveys(JSON.parse(res))
            }else{
                console.log("server error")
            }
        };
        xhr.send(JSON.stringify(payLoad))
    } catch (err) {
        //whoops?
    }
}

function display_my_surveys(input){    
    let display = "";
    for(let i = 0; i < input.length;i++){

        let title = input[i].title + ""
        title = title.replace('\'', '')

        let desc = input[i].description + ""
        desc = desc.replace('\'', '')

        display+= "<span>Title: " +title + " Description: " + desc + "<button onclick=\"showResponses(" + input[i].surveyID + ", '" + title + "', '" +desc+"')\">Show Responses</button></span><br>"
    }
    document.getElementById("my_survey_display_box").innerHTML = display;

}

function logout(){
    document.cookie = '';
    window.location.href = "/index.html"
}

function showCreateForm(){
    document.getElementById("createSurveyForm").style = "display: block;"
    document.getElementById("page").style = "display: block;"
    document.getElementById("pop_up").style = "display: none;"
    showEmailList();

}

var ret;

function showEmailList(){
    let theUrl = "/php/getUsers.php"
    let xhr = new XMLHttpRequest();
    let display_html = "";
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                ret = xhr.responseText;
                ret = JSON.parse(ret);
                let length = ret.length;
            
                for(let i = 0; i < length; i++){
                    display_html += "<input id = \" emailList "+i+"\" type=\"checkbox\" name = \"participantCheckBoxes\"><label id = \"emailListLabel"+i+"\">" + ret[i].email + "</label><br>"

                }
                document.getElementById("email_display_box").innerHTML = display_html
            }
        }
    }catch(err){
    }
    xhr.open( "GET", theUrl, true ); // false for synchronous request
    xhr.send(null)
    return ret;
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
    //document.getElementById("addq").style = "display: none;"
    
}
function newMultChoice(){
    question_box += "<div id = \"question" + count + "\"><label>Question(User response Multiple choice 1 - 5)</label><input type = \"textarea\" id = \"question_num_" + count+"\"></input></div>"
    type_arr[count] = 0;
    count++;
    document.getElementById("question_box").innerHTML = question_box;
    //document.getElementById("addq").style = "display: none;"

}

function cancel_add_survey(){

    document.getElementById("createSurveyForm").style = "display: none;"
    document.getElementById("create_error").style = "display: none;"
    document.getElementById("question_box").innerHTML = "";
    document.getElementById("addq").innerHTML = "";

}

function showResponses(id, title, desc){
    document.getElementById("page").style = "display: none;"
    document.getElementById("pop_up").style = "display: block;"

    let payLoad = {
        surveyID: id+""
    }
    let theUrl = "/php/getQuestions.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let res = xhr.responseText
                res = JSON.parse(res)
                display_questions(res,title, desc)
            }else{
                console.log("server error")
            }
        };
        xhr.send(JSON.stringify(payLoad))
    } catch (err) {
        //whoops?
    }
}

function display_questions(res,title, desc){
    let display = "<h2>Title: '"+ title +"' Desc: '" + desc + "'</h2>"
    JSON.stringify(res)

    for(let i = 0 ; i < res.length; i++){
        if(res[i].question ==  null || res[i].question == "null" ||res[i].question == ""){
            continue;
        }
        display+="<p>Question : "+ res[i].question +"</p>"
        
        let arr = (res[i].answer+"").split(",")
        display += "<p>Answers:</p>"
        for(let j = 0; j < arr.length; j++){
            
            if(arr[i] ==  null || arr[i] == "null"){
                continue;
            }
            display += "<p>"+ arr[i]+ "</p>"
        
        }
    }
    document.getElementById("showResponsesBox").innerHTML= display

}

function closePopUp(){
    document.getElementById("showResponsesBox").innerHTML=""
    document.getElementById("page").style = "display: block;"
    document.getElementById("pop_up").style = "display: none;"

}

function getCompleteSurveys(){
    let temp = document.cookie.toString();
    temp = temp.slice(1, -1);

    let payLoad = {
        email: temp
    }
    let theUrl = "/php/getCompleteSurveys.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let res = xhr.responseText
                res = JSON.parse(res)
                console.log("Complete surveys: " + res)
            }else{
                console.log("server error")
            }
        };
        xhr.send(JSON.stringify(payLoad))
    } catch (err) {
        //whoops?
    }

}
function showMyIncompleteSurveys(){
    let temp = document.cookie.toString();
    temp = temp.slice(1, -1);

    let payLoad = {
        email: temp
    }
    let theUrl = "/php/getIncompleteSurveys.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                display_my_incomplete_surveys(JSON.parse(xhr.responseText))
            }else{
                console.log("server error")
            }
        };
        xhr.send(JSON.stringify(payLoad))
    } catch (err) {
        console.log("server error")
    }

}

// This displays the incomplete surveys By survey title
function display_my_incomplete_surveys(input){  
    let display = "";
    for(let i = 0; i < input.length;i++){

        let title = input[i].title + ""
        title = title.replace('\'', '')

        let desc = input[i].description + ""
        desc = desc.replace('\'', '')
        let title_box = "<div style=\"width: 200px; display: inline;\">Title: " +title+"</div>"
        let desc_box = "<div style=\"width: 200px; display: inline;\">  Description: " +desc+"  </div>"
        let myButton = "<div style=\"width: 200px; display: inline;\"><button onclick=\"myResponses(" + input[i].surveyID + ", '" + title + "', '" +desc+"')\">My Responses</button></div><br>"
        display+= (title_box+desc_box+myButton+"")
    }
    document.getElementById("incompletesurveysDisplayBox").innerHTML = display;

}

// this gets and The questions for the survey with "surveyID" in the arguments
function myResponses(surveyID, titel, desc){
    let temp = document.cookie.toString();
    temp = temp.slice(1, -1);

    let payLoad = {
        email: temp,
        surveyID:surveyID
    }
    let theUrl = "/php/getIncompleteQuestions.php"
    let xhr = new XMLHttpRequest();

    console.log("sending responses")
    xhr.open( "POST", theUrl, true ); // false for synchronous request
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                display_my_incomplete_Responses(JSON.parse(xhr.responseText), surveyID, titel, desc)
            }else{
                console.log("server error")
            }
        };
        xhr.send(JSON.stringify(payLoad))
    } catch (err) {
        console.log("server error")
    }
}

// this displays the responses
function display_my_incomplete_Responses(input, surveyID, title, desc){
    console.log("Input is: " + input)
    let display = "<h1>"+title+"<h1><h2>"+desc+"</h2><br>"
    let flag_arr = [];

    for(let i = 0; i < input.length;i++){
        let q_ID = input.id
        let question = input[i].question+""
        let answer = input[i].answer+""
        let answer_box = "";
        let answered = false;

        if(question == ""){
            continue;
        }
        // mult choice
        if(input[i].type == 0){
            if(answer >= 1 && answer <= 5){
                answered = true;
            }
            answer_box = "<label><input id = \"check_box"+q_ID +"1\" type = \"radio\" name=\"name"+q_ID+"\" value=\"1\"> 1</label><label><input id = \"check_box"+q_ID +"2\" type=\"radio\" name=\"name"+q_ID+"\" value=\"2\"> 2</label></label><label><input id = \"check_box"+q_ID +"3\" type=\"radio\" name=\"name"+q_ID+"\" value=\"3\"> 3</label></label><label><input id = \"check_box"+q_ID +"4\" type=\"radio\" name=\"name"+q_ID+"\" value=\"4\"> 4</label></label><label><input id = \"check_box"+q_ID +"5\" type=\"radio\" name=\"name"+q_ID+"\" value=\"5\"> 5</label>"
        }else if(input[i].type == 1){
            if(answer == "NULL"){
                answer_box = "<input type=\"text\"></input>"
            }else{
                answer_box = "<input id = \"text_"+q_ID+"\"type=\"text\" value = \""+ answer+"\"></input>"
            }
        }
        if(answered && answer >= 1 && answer <= 5){
            document.getElementById("check_box"+q_ID +answer).checked = true;
        }

        display+= "<span><p>Question: " +question + " <p></p><label>Your Response: </label>"+ answer_box +""
    
    }

    display += "<br><button onclick = \"sendResponses("+input+")\">Save and Submit</button><button onclick = \"cancelSend()\">cancel</button>"

    document.getElementById("incompletesurveysDisplayBox").innerHTML = display;

    for(let i = 0; i < flag_arr.length; i++){
        let here = flag_arr[i]
        document.getElementById("check_box"+here).checked = true;
    }
}

// send answers if they are filled out
function sendResponses(input){
    let payLoad = []
    let answer = "";
    
    for(let i = 0; i < numQuestions; i++){
        let id = input[i].id
        if(input[i].type == 0){
            for(let j = 01; j <= 5; j++){
                if(document.getElementById("check_box"+id+j).checked){
                    answer = j
                }
            }
        }

        if(answer == ""){
            console.log("Submitting with incomplete data")
            continue
        }
        let temp_obj = {
            id:respArr[i].id,
            answer:answer
        }

        payLoad.push(temp_obj)
    }
    console.log(payload);
    payload = JSON.stringify(payLoad)

    console.log(payLoad)
    let theUrl = "/php/submitResponses.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Successs")
            }else{
                console.log("server error")
            }
        };
        xhr.send(JSON.stringify(payLoad))
    } catch (err) {
        console.log("server error")
    }
    // 
    showMyIncompleteSurveys()
}

function cancelSend(){
    showMyIncompleteSurveys()

}

function showCompleteSurveys(){
    let temp = document.cookie.toString();
    temp = temp.slice(1, -1);

    let payLoad = {
        email: temp
    }
    let theUrl = "/php/getCompleteSurveys.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                display_my_complete_surveys(JSON.parse(xhr.responseText))
            }else{
                console.log("server error")
            }
        };
        xhr.send(JSON.stringify(payLoad))
    } catch (err) {
        console.log("server error")
    }

}

function display_my_complete_surveys(input){
    let display = "";
    for(let i = 0; i < input.length;i++){

        let title = input[i].title + ""
        title = title.replace('\'', '')

        let desc = input[i].description + ""
        desc = desc.replace('\'', '')
        let title_box = "<div style=\"width: 200px; display: inline;\">Title: " +title+"</div>"
        let desc_box = "<div style=\"width: 200px; display: inline;\">  Description: " +desc+"</div>"
        display+= (title_box+desc_box)
    }
    document.getElementById("completeSurveysDisplayBox").innerHTML = display;
}