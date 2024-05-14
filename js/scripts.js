// Diese Funktion wird beim Laden der Seite aufgerufen und ruft die fetchData-Funktion auf.
window.onload = function() {
    fetchData();
};

// Diese Funktion ruft die Daten von der API ab und ruft dann die sortAndPlotData-Funktion auf, um die Daten zu verarbeiten.
async function fetchData() {
    try {
        const response = await fetch('https://398547-2.web.fhgr.ch/php/unload.php');
        const data = await response.json();
        sortAndPlotData(data);
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Diese Funktion verkürzt die Wochentagsnamen auf ihre ersten zwei Buchstaben.
function abbreviateWeekday(weekday) {
    switch (weekday) {
        case 'Monday':
            return 'Mo';
        case 'Tuesday':
            return 'Tu';
        case 'Wednesday':
            return 'We';
        case 'Thursday':
            return 'Th';
        case 'Friday':
            return 'Fr';
        case 'Saturday':
            return 'Sa';
        case 'Sunday':
            return 'Su';
        default:
            return weekday;
    }
}

// Diese Funktion verkürzt eine Liste von Wochentagsnamen.
function abbreviateWeekdays(weekdays) {
    return weekdays.map(weekday => abbreviateWeekday(weekday));
}

// Diese Funktion verarbeitet die empfangenen Daten, sortiert sie und ruft die displayTrainInfo-Funktion auf, um die Informationen anzuzeigen.
function sortAndPlotData(data) {
    const weekdays = data.map(entry => entry.week_day);
    const delays = data.map(entry => entry.total_delay);
    const numTrains = data.map(entry => entry.num_trains);
    const numDelayedTrains = data.map(entry => entry.num_delayed_trains);
    const averageDelays = calculateAverageDelay(weekdays, delays, numTrains);

    displayTrainInfo(weekdays, numTrains, numDelayedTrains, averageDelays);
}

// Diese Funktion zeigt die Zuginformationen in einer Tabelle an.
function displayTrainInfo(weekdays, numTrains, numDelayedTrains, averageDelays) {
    const trainInfoContainer = document.getElementById('train-info');
    trainInfoContainer.innerHTML = '';

    const abbreviatedWeekdays = abbreviateWeekdays(weekdays);

    abbreviatedWeekdays.forEach((weekday, index) => {
        const info = document.createElement('div');
        const delayedTrainsPercentage = `${numDelayedTrains[index]}/${numTrains[index]}`;
        const averageDelay = averageDelays[weekdays[index]] ? averageDelays[weekdays[index]].toFixed(2) : 'N/A';
        info.innerHTML = `
            <p>${weekday}</p>
            <p>Anzahl Züge: ${numTrains[index]}</p>
            <p>Davon verspätet: ${delayedTrainsPercentage}</p>
            <p>Durchschnittliche Verspätung: ${averageDelay}min</p>`;
        trainInfoContainer.appendChild(info);
    });
}

// Diese Funktion berechnet die durchschnittliche Verspätung für jeden Wochentag.
function calculateAverageDelay(weekdays, delays, numTrains) {
    const averageDelays = {};

    weekdays.forEach((weekday, index) => {
        if (!averageDelays[weekday]) {
            averageDelays[weekday] = delays[index] / numTrains[index];
        }
    });

    return averageDelays;
}
