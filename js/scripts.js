window.onload = function() {
    fetchData();
};

async function fetchData() {
    try {
        const response = await fetch('https://398547-2.web.fhgr.ch/php/unload.php'); // Hier müsstest du den Pfad zu deinem PHP-Skript angeben, das die Daten zurückgibt
        const data = await response.json();
        sortAndPlotData(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function sortAndPlotData(data) {
    // Mapping der Wochentage zu Zahlen, um sie später zu sortieren
    const weekdayOrder = {
        'Mo': 1,
        'Di': 2,
        'Mi': 3,
        'Do': 4,
        'Fr': 5,
        'Sa': 6,
        'So': 7
    };

    // Daten sortieren basierend auf den Wochentagen
    data.sort((a, b) => weekdayOrder[a.week_day] - weekdayOrder[b.week_day]);

    // Extrahieren der sortierten Wochentage und Verspätungen
    const weekdays = data.map(entry => entry.week_day);
    const delays = data.map(entry => entry.total_delay);
    const numTrains = data.map(entry => entry.num_trains);
    const numDelayedTrains = data.map(entry => entry.num_delayed_trains);

    // Anzeige der Zuginformationen
    displayTrainInfo(weekdays, numTrains, numDelayedTrains);
}


function displayTrainInfo(weekdays, numTrains, numDelayedTrains) {
    const trainInfoContainer = document.getElementById('train-info');
    trainInfoContainer.innerHTML = ''; // Löscht den aktuellen Inhalt, um neue Daten anzuzeigen

    weekdays.forEach((weekday, index) => {
        const info = document.createElement('div');
        info.innerHTML = `<p>${weekday}</p>
                          <p>Total Trains: ${numTrains[index]}</p>
                          <p>Delayed Trains: ${numDelayedTrains[index]}</p>`;
        trainInfoContainer.appendChild(info);
    });
}