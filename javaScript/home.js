// Font end js for Home page
function showMySurveys(){
    let theUrl = "/php/getMySurveys.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let res = xhr.responseText
                    console.log("Return from server: " + res)
                }else{
                    console.log("server error")
                }
            };
            xhr.send(payLoad);
        } catch (err) {
            //whoops?
        }

}
function showIncompleteSurveys(){
    // let retArr = httpGet(baseURL + "/php/getIncompleteSurveys.php")
    // request incomplete surveys
    // show incomplete surveys

}
function showCompleteSurveys(){
    // let retArr = httpGet(theUrl)
    // request complete surveys

}
function logout(){
    document.cookie = '';
    window.location.href = "/index.html"
}

function showCreateForm(){
    document.getElementById("createSurveyForm").style = "display: block;"
    showEmailList();email

}

var ret;

function showEmailList(){

    console.log(document.cookie)
    let theUrl = "/php/getUsers.php"
    let xhr = new XMLHttpRequest();
    let display_html = "";

    console.log("generating email list")

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                ret = xhr.responseText;

                console.log(ret)
                ret = JSON.parse(ret);
                console.log(ret)
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
