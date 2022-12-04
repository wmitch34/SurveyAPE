function create(){
    let title = document.getElementById("create_title").value 
    let desc = document.getElementById("create_desc").value

    let survey_obj = {
        title: title,
        desc: desc,
        ownerEmail: getcookie()
    }

    // send survey table obj

    let stringArr = []

    for(let i = 0; i < count; i++){
        let string = document.getElementById("question_num_" + i).value


        let question = {
            question: string,
            type: type_arr[i]
        }
        JSON.stringify(question);
        stringArr.push(question);
    }
    // console.log(stringArr)

    let participants = getCheckedBoxes("participantCheckBoxes")
    let indexArr = [];
    for(let i = 0; i < participants.length; i++){
        let id_string = (participants[i].id) + ""
        let index = id_string.slice(-1)
        console.log("index is "+ index)
        indexArr.push(index);
    }
    let emailArr = [];
    for(let i = 0; i < participants.length; i++){
        let my_email = document.getElementById("emailListLabel"+indexArr[i]).innerHTML
        let email_obj = {
            participantEmail:my_email
        }
        emailArr.push(email_obj);
    }

    // send array of questions formatted as json
    let sendString = []
    sendString[0] = survey_obj;
    sendString[1] = stringArr;
    sendString[2] = emailArr
    

    let payLoad = JSON.stringify(sendString)

    console.log(payload)

    let theUrl = "/php/createSurvey.php"
    let xhr = new XMLHttpRequest();

    xhr.open( "POST", theUrl, true ); // false for synchronous request

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let res = xhr.responseText
                    console.log("Res return from server: " + res)
                }else{
                    console.log("server error")
                }
            };
            xhr.send(payload);
        } catch (err) {
            //whoops?
        }

}

function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i]);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }
  