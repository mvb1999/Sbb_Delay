<?php
// Datenbankkonfiguration einbinden
require_once 'config.php';

// Header setzen, um JSON-Inhaltstyp zurückzugeben
header('Content-Type: application/json');

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query, um Daten basierend auf dem Standort auszuwählen, sortiert nach Wochentag
    $sql = "SELECT AVG(delay_arrival + delay_departure) AS total_delay, week_day
            FROM `train_journeys`
            WHERE actual_arrival >= CURDATE() - INTERVAL 30 DAY 
            GROUP BY week_day
            ORDER BY FIELD(week_day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Führt die Abfrage aus
    $stmt->execute();

    // Holt alle passenden Einträge
    $results = $stmt->fetchAll();

    // Gibt die Ergebnisse im JSON-Format zurück
    echo json_encode($results);
} catch (PDOException $e) {
    // Gibt eine Fehlermeldung zurück, wenn etwas schiefgeht
    echo json_encode(['error' => $e->getMessage()]);
}
?>
