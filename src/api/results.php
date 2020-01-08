<?php
    $host = "localhost"; 
    $user = "u0788297_leonovl"; 
    $password = "!_84-SAv0"; 
    $dbname = "u0788297_xo";
    $id = '';

    // $con = mysqli_connect($host, $user, $password, $dbname);
    
    $mysqli = new mysqli('localhost', 'u0788297_leonovl', '!_84-SAv0', 'u0788297_xo');

    // $method = $_SERVER['REQUEST_METHOD'];
    // $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


    // if (!$con) {
    //     die("Connection failed: " . mysqli_connect_error());
    // }


    // switch ($method) {
    //     case 'GET':
    //         $id = $_GET['id'];
            // $sql = "SELECT * FROM results"; 
    //         break;
                    // case 'POST':
                    //     $name = $_POST["name"];
                    //     $email = $_POST["email"];
                    //     $country = $_POST["country"];
                    //     $city = $_POST["city"];
                    //     $job = $_POST["job"];

                    //     $sql = "insert into contacts (name, email, city, country, job) values ('$name', '$email', '$city', '$country', '$job')"; 
                    //     break;
    // }

    // run SQL statement
    $result = $mysqli->query('SELECT * FROM results');
    
	while ($row = mysqli_fetch_assoc($result)) {
		echo "<div>".$row['player_name']."</div><hr>";
	}

    // $result = mysqli_query($con, $sql);

    // die if SQL statement failed
    // if (!$result) {
    //     http_response_code(404);
    //     die(mysqli_error($con));
    // }

    // if ($method == 'GET') {
    //     if (!$id) echo '[';
            // for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
                // echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
                echo json_encode($result);
            // }
    //     if (!$id) echo ']';
    // } 
        // elseif ($method == 'POST') {
        //     echo json_encode($result);
        // } else {
        //     echo mysqli_affected_rows($con);
        // }

    $mysqli->close();

?>