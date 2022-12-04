<!-- return array of  surveys I have been invited to, but not completed-->
<?php
	$inData = getRequestInfo();
	$email = $inData['email'];
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");	
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		$stmt = $conn->prepare("SELECT `title`,`description`,`email` FROM surveys WHERE `email` = ?");
		$stmt->bind_param("s", $email);
		$stmt->execute();
        $rows = array();
		// $stmt->execute();
		while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        echo json_encode($rows);
		$stmt->close();
		$conn->close();
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