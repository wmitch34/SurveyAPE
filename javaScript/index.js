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
        window.location.href = "./html/home.html"
    }
}

function register(){
    let email = document.getElementById("logEmail").value;
    let password = document.getElementById("logPass").value;
    let verifiedPassword = document.getElementById("regPassConfirm").value;

    if(pasword === verifiedPassword){
        let regObj = {
            email: email,
            password: password     
        }
        let regReq // = sendRegRequest(regObj);

        if(loginReq === -1){
            // error message
            // possibly bad request or email already in use?
        }else{
            // redirect to login prompt
            // show account created message
        }

    }
    

}

function showRegisterForm(){
    document.getElementById("registerPrompt").style = "display: block"
    document.getElementById("loginPrompt").style = "display: none"
}

function cancelRegister(){
    document.getElementById("registerPrompt").style = "display: none"
    document.getElementById("loginPrompt").style = "display: block"
}