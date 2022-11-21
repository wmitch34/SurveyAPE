function login(){
    let email = Document.getElementbyID("logEmail");
    let password = Document.getElementbyID("logPass");
    let loginReq = {
        email: email,
        password: password     
    }
    sendLoginRequest(loginReq);
}

function register(){

}

function showRegisterForm(){
    document.getElementById("registerPrompt").style = "display: block"
    document.getElementById("loginPrompt").style = "display: none"

}

function cancelRegister(){
    document.getElementById("registerPrompt").style = "display: none"
    document.getElementById("loginPrompt").style = "display: block"


}