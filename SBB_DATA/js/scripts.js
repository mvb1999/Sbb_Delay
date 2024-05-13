let url = 'https://398547-2.web.fhgr.ch/php/unload.php'
let data;

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}


async function init(){
    let response = await fetch(url);
    data = await response.json();
    data.forEach(verspaetung => {
        console.log(verspaetung.total_delay);
        
    });

}

init();
