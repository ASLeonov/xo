<?php
    // header("Access-Control-Allow-Origin: http://www.xo.leonovlab.ru/");
    $host = "localhost"; 
    $user = "u0788297_leonovl"; 
    $password = "!_84-SAv0"; 
    $dbname = "u0788297_xo";

    $mysqli = new mysqli('localhost', 'u0788297_leonovl', '!_84-SAv0', 'u0788297_xo');
    $method = $_SERVER['REQUEST_METHOD'];
    
        function check_text_input($input_data) {
        	$data = strip_tags($input_data);    // Обрезаем теги html, php; После обрезки тегов остаются пробелы;
        	$data = ucfirst(trim($data));       // Обрезаем пробелы; Первый символ в верхний регистр;
        	return $data;
        }

    switch ($method) {
        case 'GET':
            $result = $mysqli->query('SELECT * FROM results ORDER BY player_result DESC, id_results ASC');
            echo '[';
                for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
                    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
                }
            echo ']';
            break;
        case 'POST':
            $name = check_text_input($_POST["playerName"]);
            $score = $_POST["playerScore"];
            
            $currentScores = $mysqli->query('SELECT * FROM results');
            
            if (mysqli_num_rows($currentScores) < 10) {
                $mysqli->query("INSERT INTO results VALUES (null, '$name', '$score')");
                echo 'ADD_SCORE';
            } else {
                $minScoreQuery = $mysqli->query("SELECT * FROM results ORDER BY player_result ASC, id_results DESC LIMIT 1");
                while ($row = mysqli_fetch_assoc($minScoreQuery)) {
                    $minScore = $row["player_result"];
                    if ($score > $minScore) {
                        $mysqli->query("INSERT INTO results VALUES (null, '$name', '$score')");
                        
                        $deleteMinScore = $row["id_results"];
                        $mysqli->query("DELETE FROM results WHERE id_results=$deleteMinScore");
                        
                        // sleep(10);
                        echo 'ADD_SCORE';
                    }
                }
            }
            break;
    }
    $mysqli->close();
?>