const input = document.getElementById('input-text');
const close = document.getElementsByClassName('fa-times')[0];
const wrapper = document.querySelectorAll('.wrapper');
const today = document.getElementsByClassName('today')[0];
const otherDays = document.getElementsByClassName('other-days')[0];
const searchBar = document.getElementsByClassName('search-bar')[0];

function weather(city) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            const timezoneText = document.getElementById('timezone');
            const nameText = document.getElementById('city');
            const regionText = document.getElementById('region');
            const tempText = document.getElementById('temp');
            const currentCondition = document.getElementById('current-condition');
            const currentDay = document.getElementsByClassName('current-day');
            const minTemp = document.getElementsByClassName('min-temp');
            const maxTemp = document.getElementsByClassName('max-temp');
            const avgTemp = document.getElementsByClassName('average-temp');
            const icon = document.getElementsByClassName('icon');
            const name = data.location.name;
            const region = data.location.region;
            const timezone = data.location.tz_id;
            const temp = data.current.temp_c;
            const conditionIcon = data.current.condition.icon;
            const forecast = data.forecast.forecastday;
            timezoneText.innerHTML = 'Timezone:' + timezone;
            nameText.innerHTML = name;
            regionText.innerHTML = region;
            tempText.innerHTML = temp + '°';
            currentCondition.src = 'https:' + conditionIcon;
            const date = new Date().getDay();
            let number = date;
            for (let i = 0; i < forecast.length; i++) {
                const days = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ];
                currentDay[i].innerHTML = days[number];
                minTemp[i].innerHTML = 'min: ' + forecast[i].day.mintemp_c + '°';
                maxTemp[i].innerHTML = 'max: ' + forecast[i].day.maxtemp_c + '°';
                avgTemp[i].innerHTML = 'avg: ' + forecast[i].day.avgtemp_c + '°';
                icon[i].src = 'https:' + forecast[i].day.condition.icon;
                console.log(forecast[i].day.condition.icon);
                number++;
            }
        }
    };

    xhttp.open(
        'GET',
        `https://api.weatherapi.com/v1/forecast.json?key=78b537d9d1ff4a008c1234931221701&q=${city}&days=5&aqi=no&alerts=no`,
        true
    );

    xhttp.send();
}

function showWeather() {
    weather(input.value);
    close.style.display = 'block';
    searchBar.style.display = 'none';
    wrapper.forEach((el) => (el.style.height = '70%'));
    today.style.display = 'flex';
    otherDays.style.display = 'flex';
    input.value = '';
}

function closeWeather() {
    close.style.display = 'none';
    wrapper.forEach((el) => (el.style.height = '11.5%'));
    searchBar.style.display = 'flex';
    today.style.display = 'none';
    otherDays.style.display = 'none';
}

document.getElementById('send').addEventListener('click', function () {
    if (input.value.trim() != '') {
        showWeather();
    }
});

close.addEventListener('click', function () {
    closeWeather();
});

input.addEventListener('keyup', function (e) {
    if (e.key == 'Enter' && input.value.trim() != '') {
        showWeather();
    }
});

document.addEventListener('keyup', function (e) {
    if (e.key == 'Escape' && today.style.display == 'flex') {
        closeWeather();
    }
});
