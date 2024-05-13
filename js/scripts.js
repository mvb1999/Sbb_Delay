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

// Funktion, um Wochentage abzukürzen
function abbreviateWeekday(weekday) {
    switch (weekday) {
        case 'Monday':
            return 'Mo';
        case 'Tuesday':
            return 'Di';
        case 'Wednesday':
            return 'Mi';
        case 'Thursday':
            return 'Do';
        case 'Friday':
            return 'Fr';
        case 'Saturday':
            return 'Sa';
        case 'Sunday':
            return 'So';
        default:
            return weekday; // Wenn der Wochentag nicht erkannt wird, wird er unverändert zurückgegeben
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

    // Durchschnittliche Verspätungen pro Wochentag berechnen
    const averageDelays = calculateAverageDelay(weekdays, delays, numTrains);

    // Anzeige der Zuginformationen
    displayTrainInfo(weekdays, numTrains, numDelayedTrains, averageDelays);
}



// Funktion, um Wochentage abzukürzen
function abbreviateWeekdays(weekdays) {
    return weekdays.map(weekday => abbreviateWeekday(weekday));
}



function displayTrainInfo(weekdays, numTrains, numDelayedTrains, averageDelays) {
    const trainInfoContainer = document.getElementById('train-info');
    trainInfoContainer.innerHTML = ''; // Löscht den aktuellen Inhalt, um neue Daten anzuzeigen

    const abbreviatedWeekdays = abbreviateWeekdays(weekdays); // Abgekürzte Wochentage erstellen

    abbreviatedWeekdays.forEach((weekday, index) => {
        const info = document.createElement('div');
        const delayedTrainsPercentage = `${numDelayedTrains[index]}/${numTrains[index]}`; // Berechnet die Anzahl verspäteter Züge im Format "xx/xx"
        const averageDelay = averageDelays[weekdays[index]] ? averageDelays[weekdays[index]].toFixed(2) : 'N/A'; // Durchschnittliche Verspätung pro Wochentag anzeigen
        info.innerHTML = `<p>${weekday}</p>
                          <p>Anzahl Züge: ${numTrains[index]}</p>
                          <p>Davon verspätet: ${delayedTrainsPercentage}</p>
                          <p>Durchschnittliche Verspätung: ${averageDelay}min</p>`; // Fügt die durchschnittliche Verspätung hinzu
        trainInfoContainer.appendChild(info);
    });
}



function calculateAverageDelay(weekdays, delays, numTrains) {
    const averageDelays = {};

    weekdays.forEach((weekday, index) => {
        if (!averageDelays[weekday]) {
            averageDelays[weekday] = delays[index] / numTrains[index]; // Durchschnittliche Verspätung berechnen
        }
    });

    return averageDelays;
}
