
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

    if(pasword === verifiedPassword){
        let regObj = {
            email: email,
            password: password     
        }
        let regReq // = sendLoginRequest(regObj);

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