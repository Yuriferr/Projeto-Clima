const container = document.querySelector('.container');
const search = document.querySelector('header button');
const weatherBox = document.querySelector('main');
const weatherDetails = document.querySelector('footer');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '18cad22e69252aa4dd95daa8da20c3f3';
    const city = document.querySelector('header input').value;

    if(city == ""){
        return;
    }
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`).then(response => response.json()).then(json => {
        if(json.cod == 404){
            container.style.height = '430px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('main img');
        const temperature = document.querySelector('main .temperature');
        const description = document.querySelector('main .description');
        const humidity = document.querySelector('footer .humidity span');
        const wind = document.querySelector('footer .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                    image.src = './assets/images/clear.png';
                    break;
            case 'Rain':
                    image.src = './assets/images/rain.png';
                    break;
             case 'Snow':
                    image.src = './assets/images/snow.png';
                    break;
            case 'Clouds':
                    image.src = './assets/images/cloud.png';
                    break;
            case 'Haze':
                    image.src = './assets/images/mist.png';
                    break;
            default:
                    image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });
});