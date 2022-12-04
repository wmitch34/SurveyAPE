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

    // send array of questions formatted as json
    let sendString = []
    sendString[0] = survey_obj;
    sendString[1] = stringArr;
    console.log(sendString)

}