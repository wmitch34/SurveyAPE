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
     
        //display += "<button onclick=\"showResponses(" + input[i].surveyID + ", '" + title + "', '" +desc+"')\">Show Responses</button>"
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

function display_my_incomplete_surveys(input){
    
    
    let display = "";
    for(let i = 0; i < input.length;i++){

        let title = input[i].title + ""
        title = title.replace('\'', '')

        let desc = input[i].description + ""
        desc = desc.replace('\'', '')
        display+= "<span>Title: " +title + " Description: " + desc + "<button onclick=\"myResponses(" + input[i].surveyID + ", '" + title + "', '" +desc+"')\">My Responses</button></span><br>"
    }
    document.getElementById("incompletesurveysDisplayBox").innerHTML = display;

}

function myResponses(surveyID, titel, desc){
    console.log("SurveyID: "+surveyID +"Title: "+ titel + " Desc"+desc)

    let temp = document.cookie.toString();
    temp = temp.slice(1, -1);

    let payLoad = {
        email: temp
    }
    let theUrl = "/php/getMyQuestions.php"
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

