<!-- add a user to db if it does not already exist. Return negative message for failure, positive mesage for success -->
<?php
	$exist = True;

	$inData = getRequestInfo();
	$Email = $inData["Email"];
	$Password = $inData["Password"];
	$CheckUser = "SELECT * from Users WHERE Email = '$Email'";

    $conn = new mysqli("localhost", "root@localhost", "Group18Aa", "Group18");	//*****
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$CheckQuery = mysqli_query($conn,$CheckUser);
		if(mysqli_num_rows($CheckQuery)>0){
			returnWithError( "Username taken");
		}else{

		$stmt = $conn->prepare("INSERT into users (Email, Password) VALUES(?,?)");
		$stmt->bind_param("ss", $Email, $Password);
		$stmt->execute();
		$stmt2 = $conn->prepare("SELECT Email FROM users WHERE Email='$Email'");
		$stmt2->execute();
		$result = $stmt2->get_result();
		if( $row = $result->fetch_assoc())
		{
			returnWithInfo( $row['email']);
		}
		else
		{
			returnWithError("Unexpected error");
		}

		$stmt->close();
		$stmt2->close();
		$conn->close();
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
