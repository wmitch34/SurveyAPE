<!-- add created survey to database -->

<?php
	$inData = getRequestInfo();
	$title = $inData["title"];						//title of survey
	$desc = $inData["desc"]; 						//survey desc
	$ownerEmail = $inData["ownerEmail"];			//owners email
	$pEmail = "";									//array of JSON objects consisting of participant emails
	$question = "";									//array of JSON objects consisting of string & type
	$type = -1;
	$surveyID = -1;
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        $stmt = $conn->prepare("INSERT into surveys (`surveyID`, `title`, `description`, `email`) VALUES(NULL,?,?,?)");
        $stmt->bind_param("sss", $title, $desc, $ownerEmail);
		
		#insert id returning 0??
		$stmt1 = $conn->query("SELECT LAST_INSERT_ID()");
		$surveyID = $conn->insert_id;
		echo $surveyID;
		foreach($inData["participants"] as $x)
			$pEmail = $x["participantEmail"];
			foreach($inData["questionArray"] as $y){
				$type = $y["type"];
				$pEmail = $y[""];
				$question = $y["question"];
				$stmt2 = $conn->prepare("INSERT into questions (`surveyID`,`pEmails`,`question, `answer`, `type`) VALUES(NULL,?,?,?,?,?)");
				$stmt2->bind_param("isss",$surveyID, $pEmail, $question, $answer, $type);  //if s's are string then i could be int and it could be sssi
				$stmt2->execute();
				$stmt2->close();
			}
		
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
