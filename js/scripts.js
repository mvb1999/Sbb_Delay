window.onload = function() {
    fetchData();
};

async function fetchData() {
    try {
        const response = await fetch('https://398547-2.web.fhgr.ch/php/unload.php'); // Hier müsstest du den Pfad zu deinem PHP-Skript angeben, das die Daten zurückgibt
        const data = await response.json();
        sortAndPlotData(data);
        console.log(data)
    } catch (error) {
        console.error('Error:', error);
    }
}

function sortAndPlotData(data) {
    // Mapping der Wochentage zu Zahlen, um sie später zu sortieren
    const weekdayOrder = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
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
    const trainInfoContainer = document.getElementById('week-container');
    trainInfoContainer.innerHTML = ''; // Löscht den aktuellen Inhalt, um neue Daten anzuzeigen

    weekdays.forEach((weekday, index) => {
        const info = document.createElement('div');
        /*info.innerHTML = `<p>${weekday}</p>
                          <p>Total Trains: ${numTrains[index]}</p>
                          <p>Delayed Trains: ${numDelayedTrains[index]}</p>`;
*/
        //info.innerHTML = "test";
        info.innerHTML = `<div class="day" id="${weekday}">
        <div class="delay">2'</div>
        <div class="delays-count">${numDelayedTrains[index]}/${numTrains[index]}</div>
    </div>`;                 
        trainInfoContainer.appendChild(info);
    });
}