<!-- add created survey to database -->

<?php
	$inData = getRequestInfo();
	echo $inData["title"];
	$title = $inData["title"];						//title of survey
	$desc = $inData["desc"]; 						//survey desc
	$ownerEmail = $inData["ownerEmail"];			//owners email
	#$paEmails = $inData["pEmails"];							//array of JSON objects consisting of participant emails
	#$question = $inData["question"];							//array of JSON objects consisting of string & type
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        $stmt = $conn->prepare("INSERT into surveys (`surveyID`, `title`, `description`, `email`) VALUES(NULL,?,?,?)");
        $stmt->bind_param("sss", $title, $desc, $ownerEmail);
		
		$stmt1 = $conn->query("SELECT LAST_INSERT_ID()");
		

		$stmt1 = $conn->prepare("INSERT into questions (`surveyID`,`pEmails`,`question, `answer`, `type`) VALUES(NULL,?,?,?,?,?)");
        $stmt1->bind_param("isss",$surveyID, $pEmails, $question, $answer, $type);  //if s's are string then i could be int and it could be sssi
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		//return json_decode(file_get_contents('php://input'), true);
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
