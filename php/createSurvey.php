<!-- add created survey to database -->

<?php
	$inData = getRequestInfo();
	$title = $inData["title"];						//title of survey
	$desc = $inData["desc"]; 						//survey desc
	$ownerEmail = $inData["ownerEmail"];			//owners email
	$startDate = $inData["startDate"];
	$endDate = $inData["endDate"];
	$pEmail = "";
	$question = "";
	$type = PHP_INT_MAX;
	$surveyID = PHP_INT_MAX;
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        $stmt = $conn->prepare("INSERT INTO surveys (`surveyID`, `title`, `description`, `email`, `startDate`, `endDate`) 
								VALUES(NULL,?,?,?,?,?)");
        $stmt->bind_param("sssss", $title, $desc, $ownerEmail, $startDate, $endDate);
		$stmt->execute();
		$stmt->close();
		$surveyID = $conn->insert_id;
		echo $surveyID . " ";
		foreach($inData["participants"] as $x)
			foreach($inData["questionArray"] as $y){
				$type = $y["type"];
				echo $type . " ";
				$question = $y["question"];
				echo $question . " ";
				$pEmail = $x["participantEmail"];
				echo $pEmail . " ";
				$stmt1 = $conn->prepare("	INSERT INTO questions (`id`,`surveyID`,`participantEmail`,`question`, `answer`, `type`) 
											VALUES(NULL,?,?,?,NULL,?)");
				$stmt1->bind_param("issi",$surveyID, $pEmail, $question, $type);
				$stmt1->execute();
				$stmt1->close();
			}
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
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
