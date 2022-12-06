<?php	//return array of surveys that curr user has created
	$inData = json_decode(file_get_contents('php://input'), true);
	$email = $inData["email"];	//email of person logged in
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		$stmt = $conn->prepare("SELECT DISTINCT s.title, s.description, s.surveyID
								FROM questions q
								INNER JOIN surveys s 
								ON s.surveyID = q.surveyID
								WHERE q.answer IS NULL
								AND q.participantEmail = ?");
		$stmt->bind_param("s", $email);
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