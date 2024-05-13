
<?php

// Include the transformation script 'transform.php' which supposedly provides the JSON data
$jsonData = include('transform.php');

// Decode the JSON data into an array
$dataArray = json_decode($jsonData, true);

require_once 'config.php'; // Includes the database configuration

$week_day = date('l');

try {
    // Create a new PDO instance using configuration from config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL query with placeholders for inserting data
    $sql = "INSERT INTO train_journeys (from_station, to_station, scheduled_departure, actual_departure, scheduled_arrival, actual_arrival, delay_departure, delay_arrival, week_day) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepare the SQL statement
    $stmt = $pdo->prepare($sql);

    // Insert each item in the array into the database
    foreach ($dataArray as $item) {
        $stmt->execute([
            $item['from_station'],
            $item['to_station'],
            $item['scheduled_departure'],
            $item['actual_departure'],
            $item['scheduled_arrival'],
            $item['actual_arrival'],
            $item['delay_departure'],
            $item['delay_arrival'],
            $week_day
        ]);
    }

    echo "Data successfully inserted.";
} catch (PDOException $e) {
    die("Could not connect to the database: " . $e->getMessage());
}
?>
