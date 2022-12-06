<?php
	$inData = getRequestInfo();
	$Email = $inData["email"];
	$Password = $inData["password"];

    $conn = new mysqli("localhost", "will", "dbscrub", "Group18");	

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt1 = $conn->prepare("SELECT * FROM users WHERE `email` = ?");
		$stmt1->bind_param("s", $Email);
		$stmt1->execute();
		$result = $stmt1->get_result();
		
		if($row = $result->fetch_assoc()){
			
			$stmt1->close();
			$conn->close();
			
			returnWithError( "Account Already Exists With this email.");
		}else{

			$stmt = $conn->prepare("INSERT into users (`email`, `password`) VALUES(?,?)");
			$stmt->bind_param("ss", $Email, $Password);
			$stmt->execute();
		
			$stmt->close();
			$stmt1->close();
			$conn->close();
			
			returnWithError("");
    	}
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
