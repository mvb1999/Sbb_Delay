<?php

// Include the script 'extract.php' to fetch raw data
$data = include('extract.php');

// Initialize an array to store the transformed data
$transformedData = [];

// Transform and add the necessary information about each train connection directly from St. Gallen to Geneva
foreach ($data['connections'] as $connection) {
    $from = $connection['from'];
    $to = $connection['to'];

 
    $transformedData[] = [
        'from_station' => $from['station']['name'],
        'to_station' => $to['station']['name'],
        'scheduled_departure' => $from['departure'],
        'actual_departure' => isset($from['prognosis']['departure']) ? $from['prognosis']['departure'] : $from['departure'],
        'scheduled_arrival' => $to['arrival'],
        'actual_arrival' => isset($to['prognosis']['arrival']) ? $to['prognosis']['arrival'] : $to['arrival'],
        'delay_departure' => $from['delay'] ?? 0,
        'delay_arrival' => $to['delay'] ?? 0,
    ];
}

// Encode the transformed data into JSON with pretty print
$jsonData = json_encode($transformedData, JSON_PRETTY_PRINT);

// Return the JSON data instead of outputting it directly
return $jsonData;

?>

