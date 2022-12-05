<?php	//return array of surveys that curr user has created
	$inData = json_decode(file_get_contents('php://input'), true);
	$surveyID = $inData["surveyID"];	//surveyID of person logged in
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		$stmt = $conn->prepare("SELECT `question`, group_concat(`answer`) AS answer FROM questions WHERE surveyID = ? GROUP BY question");
		$stmt->bind_param("i", $surveyID);
		$stmt->execute();
		$result = $stmt->get_result();
        $rows = array();
		while($row = mysqli_fetch_assoc($result)){
            $rows[] = $row;
        }

        echo json_encode($rows);
		$stmt->close();
		$conn->close();
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