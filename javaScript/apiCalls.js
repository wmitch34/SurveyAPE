function httpRegister(){
    let new_email = document.getElementById("regEmail").value;
    let new_password = document.getElementById("regPass").value;
    let new_password_confirm = document.getElementById("regPassConfirm").value;

    if (new_password === new_password_confirm){
        let theUrl = baseURL+"/php/register.php"
        var xhr = new XMLHttpRequest();

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.open( "POST", theUrl, true ); // false for synchronous request

        // Converting JSON data to string
        var data = JSON.stringify({ "email": email });

        // Sending data with the request
        xhr.send(data);
        return xmlHttp.responseText;

    }else{
        //show some error
    }

}





// request for getting sutveys for home page
// ret result depends on input string
function httpPost(input)
{
    if (input ==="complete"){
        let theUrl = baseURL+"/php/getCompleteSurveys.php"
    }else if(input === "incomplete"){
        let theUrl = baseURL+"/php/getInompleteSurveys.php"
    }else if(input === "mySurveys"){
        let theUrl = baseURL+"/php/getMySurveys.php"
    }else{
        console.log("Bad request from user");
        return -1;
    }
    
    var xhr = new XMLHttpRequest();

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.open( "POST", theUrl, true ); // false for synchronous request

    // Converting JSON data to string
    var data = JSON.stringify({ "email": email });

    // Sending data with the request
    xhr.send(data);
    return xmlHttp.responseText;
}
