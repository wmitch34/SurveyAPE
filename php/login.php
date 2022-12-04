<?php

	$inData = getRequestInfo();
	$id = 0;
	$email = "";
	$password = "";
	#$conn = new mysqli("localhost", "username", "password", "database");
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");	
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		$stmt = $conn->prepare("SELECT `email`, `password` FROM users WHERE `email` = ? AND `password` = ?");
		$stmt->bind_param("ss", $inData['email'], $inData['password']);
		$stmt->execute();
		$result = $stmt->get_result();

		if($row = $result->fetch_assoc()) //$Row is not empty
		{
			echo json_encode($row['email']);
		}
		else //$Row is empty
		{ 
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
	}
	
	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj){
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err){
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($email){
		$retValue = '{"email":"' . $email . '"}';
		sendResultInfoAsJson($retValue);
	}
	
?>
