// JS for index page. includes cookie data

// url
let baseURL = "198.211.100.16"
// userID for cookie
let email = "";

function login(){
    let email = document.getElementById("logEmail").value;
    let password = document.getElementById("logPass").value;
    let loginObj = {
        email: email,
        password: password     
    }
    let loginReq //= sendLoginRequest(loginObj);
    if(loginReq === -1){
        // error message
    }else{
        // set cookie
        window.location.href = "/home.html"
    }
}

function register(){
    let email = document.getElementById("logEmail").value;
    let password = document.getElementById("logPass").value;
    let verifiedPassword = document.getElementById("regPassConfirm").value;

    if(password === verifiedPassword){
        let regObj = {
            email: email,
            password: password     
        }
        var str_regObj = stringify(regObj);
        let regReq = sendRegRequest(str_regObj); //call to sendRegRequest passing JSON

        if(regReq === -1){
            // error message
            // possibly bad request or email already in use?
        }else{
            // redirect to login prompt
            // show account created message
        }

    }
    

}

//creates HTTP POST request passing the email variable of the regObj JSON
function sendRegRequest(str_regObj){ 
    let theUrl = baseURL + "/php/register.php"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", theUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(str_regObj);
    return xhr.responseText;
}

function showRegisterForm(){
    document.getElementById("registerPrompt").style = "display: block"
    document.getElementById("loginPrompt").style = "display: none"
}

function cancelRegister(){
    document.getElementById("registerPrompt").style = "display: none"
    document.getElementById("loginPrompt").style = "display: block"
}