<!-- return array of  surveys I have been invited to, but not completed-->
<?php
	$exist = True;

	$inData = getRequestInfo();
    //$Email = $indDatata["Email"];
	//$CheckUser = "SELECT * from Users WHERE Email = '$Email'";
	$conn = new mysqli("localhost", "root@localhost", "Group18Aa", "Group18");	//*****
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$CheckQuery = mysqli_query($conn,$CheckUser);
		$stmt = $conn->prepare
        ("SELECT title
         FROM responses R, users U
          WHERE R.completed = 0  AND R.email == U.email");    //selects the completed surveys titles using the primary key btwn survey and responses 'surveyID' 
		//assuming 0=incomplete, 1=complete
        $stmt->execute();
		$result = $stmt->get_result();
		if( $row = $result->fetch_assoc())
		{
			returnWithInfo( $row['title']);
		}
		else
		{
			returnWithError("Unexpected error");
		}
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

	function returnWithInfo($result)
	{
		$retValue = '{"ID":' . $result . '}';
		sendResultInfoAsJson($retValue);
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
