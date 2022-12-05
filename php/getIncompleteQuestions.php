<?php	//return array of surveys that curr user has created
	$inData = json_decode(file_get_contents('php://input'), true);
	$surveyID = $inData["surveyID"];	//surveyID of person logged in
    $pEmail = $inData["email"];
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		$stmt = $conn->prepare("SELECT `id`, `type`, `question`, group_concat(IFNULL(answer, 'NULL')) AS answer
                                FROM questions
                                WHERE participantEmail = ?
                                AND surveyID = ? 
                                GROUP BY `question`, `id`, `type`");
		$stmt->bind_param("si", $pEmail, $surveyID);
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