<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    $conn = new mysqli("localhost", "will", "dbscrub", "Group18");
    if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
    else{
        foreach($inData as $value){
            $stmt = $conn->prepare("UPDATE questions
                                    SET answer = ?
                                    WHERE id = ?");
		    $stmt->bind_param("si", $value['answer'], $value['id']);
		    $stmt->execute();
        }
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
