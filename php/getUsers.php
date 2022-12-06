<?php

	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");	
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		$result = $conn->query("SELECT `email` FROM users");
        $rows = array();
		// $stmt->execute();
		while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        echo json_encode($rows);
		//$stmt->close();
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