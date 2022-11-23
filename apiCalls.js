function httpPost(theUrl)
{
    indata = JSON.stringify(indata)
    var xhr = new XMLHttpRequest();

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.open( "POST", theUrl, true ); // false for synchronous request

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            result.innerHTML = this.responseText;

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify({ "email": email });

    // Sending data with the request
    xhr.send(data);
    xmlHttp.send( indata );
    return xmlHttp.responseText;
}
