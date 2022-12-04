<?php	//return array of surveys that curr user has created
	$inData = json_decode(file_get_contents('php://input'), true);
    $email = $inData["email"];
	$surveyID = $inData["surveyID"];	//surveyID of person logged in
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		//$stmt = $conn->prepare("SELECT `title`, `description`, `type`  FROM surveys, questions WHERE surveys.surveyID = ? AND surveys.surveyID = questions.surveyID");
		$stmt = $conn->prepare("SELECT `question`, `answer` FROM questions WHERE surveyID = ? AND participantEmail = ?");
		$stmt->bind_param("is", $surveyID, $email);
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
?>