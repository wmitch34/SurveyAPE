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

function add_question(){
    // send request,
    // request everything be returned to update
}

function cancel_add_survey(){
    document.getElementById("createSurveyForm").style = "display: none;"

}