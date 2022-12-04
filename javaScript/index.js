// JS for index page. includes cookie data

// url
var baseURL = "198.211.100.16"
// userID for cookie
var email_cookie = "";

function getcookie(){
    return email_cookie;
}

function register(){
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPass").value;
    let verifiedPassword = document.getElementById("regPassConfirm").value;

    if(email == "" || password == ""){
        reg_error("Please enter a valid email and password")
        return;
    }

    if(password === verifiedPassword){
        let regObj = {
            email: email,
            password: password     
        }
        httpRegister(regObj);
    }else  reg_error("Passwords dont match")
    
       
}

function httpRegister(input){
    let email = input.email;
    let password = input.password;

    let data = JSON.stringify({ "email": email, "password": password });

    
    let theUrl = "/php/register.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let res = xhr.responseText
                    console.log(res)
                    cancelRegister()
                    displaySuccessMessage();
                }else{
                    reg_error("This email is in use.")
                }
            };
            xhr.send(data);
        } catch (err) {
            //whoops?
        }
}

function login(){
    let email = document.getElementById("logEmail").value;
    let password = document.getElementById("logPass").value;
    if(email == "" || password == ""){
        login_error("Please enter a valid email and password")
        return;
    }
    let loginObj = {
        email: email,
        password: password     
    }
    let loginReq //= sendLoginRequest(loginObj);
    if(loginReq === -1){
        // error message
    }else{
        // set cookie
        window.location.href = "./Html/home.html"
    }
}

function httpLogin(){
    let email = input.email;
    let password = input.password;

    let data = JSON.stringify({ "email": email, "password": password });

    
    let theUrl = "/php/login.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let res = xhr.responseText
                    console.log(res)
                    
                }
            };
            xhr.send(data);
        } catch (err) {
            //whoops?
        }
}


function reg_error(input){
    document.getElementById("regError").innerHTML = input;
}
function login_error(input){
    document.getElementById("logError").innerHTML = input;
}

function displaySuccessMessage(){
    document.getElementById("logError").innerHTML = "Success! Please sign in to continue";
}


function showRegisterForm(){
    document.getElementById("registerPrompt").style = "display: block"
    document.getElementById("loginPrompt").style = "display: none"
}

function cancelRegister(){
    document.getElementById("registerPrompt").style = "display: none"
    document.getElementById("loginPrompt").style = "display: block"
}


