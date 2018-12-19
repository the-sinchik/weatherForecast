let currentView = 0;
let viewList = [];
let viewLength;

// Вариант(1) для просмотра всего массива данных, при выходе за границы возвращает на сегодняшний день
//
// const setView = () => {
//     viewLength = 4;
//     viewList = [];
//
//     weatherData.forEach((el,i) =>{
//         if(el.weekDay === 'Сегодня'){
//             if(!weatherData[i + currentView + viewLength - 1] || !weatherData[i + currentView]){
//                 currentView = 0;
//                 setView();
//             }
//             else{
//                 for (let index = 0 ; index < viewLength; index++) {
//                     viewList.push(weatherData[i + currentView + index])
//                 }
//             }
//         }
//     });
// };

// Вариант(2) для просмотра только настоящей и возможной(будущей погоды), не возвращает на сегодняшний день

const setView = () => {
    viewLength = 4;
    viewList = [];

    weatherData.forEach((el,i) =>{
        if(el.weekDay === 'Сегодня'){
            for (let index = 0 ; index < viewLength; index++) {
                viewList.push(weatherData[i + currentView + index])
            }
        }
        if(currentView === 0){
            let angle = document.querySelector('.angle-left');
            angle.classList.add('limit')
        }
        if((currentView  + viewLength) >= weatherData.length){
            let angle = document.querySelector('.angle-right');
            angle.classList.add('limit')
        }
        if(currentView !== 0 && (currentView  + viewLength) !== weatherData.length){
            let angleLeft = document.querySelector('.angle-left');
            let angleRight = document.querySelector('.angle-right');
            angleLeft.classList.remove('limit');
            angleRight.classList.remove('limit');
        }
    });
};


const renderPage = () => {
    document.removeEventListener("keyup", keyUpFunc);
    let list = document.querySelector('.weather-forecast-slider');
    list.innerHTML = '';

    viewList.forEach(el =>{
        let section = document.createElement('section');
        let template = `<header class="forecast-title">
                            <p class="week-day">${el.weekDay}</p>
                            <h3 class="day-date">${el.dayDate}</h3>
                        </header>
                        <figure class="icon-wrapper">
                            <img class="icon" src="${el.icon}" alt="${el.weatherType}">
                            <figcaption class="temperature">
                                <h3 class="day">${el.temperature.day}</h3>
                                <p class="night">${el.temperature.night}</p>
                            </figcaption>
                        </figure>
                        <footer class="weather-type">${el.weatherType}</footer>`;

        section.innerHTML = template;
        section.className = "weather-forecast-for-day";
        list.appendChild(section);
    });
    document.addEventListener("keyup", keyUpFunc);
};

const keyUpFunc = (event) => {
    if(event.keyCode === 37){
        changeView(-1);
    } else if(event.keyCode === 39){
        changeView(1);
    }
};