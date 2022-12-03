<!-- add created survey to database -->
<?php
	$inData = getRequestInfo();
	$title = $inData["title"];
	$type = $inData["type"];
    $description = $inData["description"];
    $question = $inData["question"];

	$conn = new mysqli("localhost", "root@localhost", "Group18Aa", "Group18");	//*****
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//$stmt = $conn->prepare("UPDATE Contacts ID SET Name = ?, Phone =?, Email = ? where ID=?");
        $stmt = $conn->prepare("INSERT into surveys (title, description, question, type) VALUES(?,?,?,?)");
        //$stmt = $conn->prepare("UPDATE into Contacts (UserId,Name,Phone, Email) VALUES(?,?,?,?)");
		//$stmt->bind_param("ssss", $userId, $Name, $Phone, $Email);
        $stmt->bind_param("ssss",$title, $description, $question, $type);  //if s's are string then i could be int and it could be sssi
		$stmt->execute();
		$stmt->close();
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
