<?php
	//<!-- return array of surveys that curr user has created -->
	$inData = getRequestInfo();
	$ownerEmail = $inData["ownerEmail"];	//email of person logged in
	//$ownerEmail = "test@gmail.com";
	$conn = new mysqli("localhost", "will", "dbscrub", "Group18");
	if($conn->connect_error){
		returnWithError($conn->connect_error);
	}
	else{
		//echo"three";
		$result = $conn->query("SELECT * FROM surveys WHERE email = $ownerEmail ");
		//$result = $conn->query("SELECT * FROM surveys WHERE `email` = $ownerEmail");
		//$result->bind_param("s", $ownerEmail);
		//echo "four";
        $rows = array();
		//echo "five";
		//$result->execute();
		//$final = $result->get_result();
		while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        echo json_encode($rows);
		$conn->close();

	}

	function returnWithInfo( $ownerEmail, $final)
	{
		$retValue = '{"User":[' . $searchResults . '],"Owns Surveys":['. $final . '], "error":""}';
		//$retValue = '{"results":[' . $searchResults . '], "error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
