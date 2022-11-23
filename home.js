function showMySurveys(){
    let retArr = httpGet(baseURL + "/php/get.php")

    // show my surveys

}
function showIncompleteSurveys(){
    let retArr = httpGet(theUrl)
    // request incomplete surveys
    // show incomplete surveys

}
function showCompleteSurveys(){
    let retArr = httpGet(theUrl)
    // request complete surveys

}
function logout(){
    // clear cookie
    window.location.href = "/index.html"
}