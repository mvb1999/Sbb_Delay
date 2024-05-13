<?php
require_once 'config.php'; // Datenbankkonfiguration einbinden
header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    $sql = "SELECT week_day,
                   COUNT(*) AS num_trains,
                   SUM(CASE WHEN delay_arrival > 0 OR delay_departure > 0 THEN 1 ELSE 0 END) AS num_delayed_trains,
                   AVG(delay_arrival + delay_departure) AS total_delay
            FROM train_journeys
            WHERE actual_arrival >= CURDATE() - INTERVAL 30 DAY
            GROUP BY week_day
            ORDER BY FIELD(week_day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>