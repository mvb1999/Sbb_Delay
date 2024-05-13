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

    // Erstellung des Diagramms
    createChart(weekdays, delays);

    // Anzeige der Zuginformationen
    displayTrainInfo(weekdays, numTrains, numDelayedTrains);
}

function createChart(weekdays, delays) {
    const ctx = document.getElementById('sbbDelay').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weekdays,
            datasets: [{
                label: 'Total Delay (minutes)',
                data: delays,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displayTrainInfo(weekdays, numTrains, numDelayedTrains) {
    const trainInfoContainer = document.getElementById('train-info');

    for (let i = 0; i < weekdays.length; i++) {
        const info = document.createElement('div');
        info.innerHTML = `<p>${weekdays[i]}</p><p>Total Trains: ${numTrains[i]}</p><p>Delayed Trains: ${numDelayedTrains[i]}</p>`;
        trainInfoContainer.appendChild(info);
    }
}
