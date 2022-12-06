<?php	//return array of surveys that curr user has created
	$inData = json_decode(file_get_contents('php://input'), true);
	$email = $inData["email"];	//email of person logged in
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		//$stmt = $conn->prepare("SELECT `title`, `description`, `type`  FROM surveys, questions WHERE surveys.email = ? AND surveys.surveyID = questions.surveyID");
		$stmt = $conn->prepare("SELECT title, description, surveyID
								FROM surveys 
								WHERE surveyID IN (	SELECT surveyID
														FROM questions q
														WHERE q.participantEmail = ?
														GROUP BY surveyID
														having SUM(q.answer IS NULL) = 0)");
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

