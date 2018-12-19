let weatherData = [];

getWeatherData()
    .then(data => {
        if (data && data.length) {

            // Для 1 варианта из /scripts/template-generator.js
            // weatherData = data.map(el => new ForecastForDay(el));

            // Для 2 варианта из /scripts/template-generator.js
            weatherData = data.reduce((arr,el) =>{
                if (el.date >= today) {
                    arr.push(new ForecastForDay(el));
                }
                return arr;
            }, []);

            setView();
            renderPage();
        }
        else{
            alert('Что-то пошло не так!')
        }
    });

const changeView = (arg) => {

    const addAnimation = (arg) => {
       let list = document.querySelectorAll('.weather-forecast-for-day');

       if(arg > 0){
           for(let i = 0; i < list.length; i++){
               list[i].classList.add('move-forward');
               list[i].classList.remove('move-reverse');
           }
       }
       else{
           for(let i = 0; i < list.length; i++){
               list[i].classList.add('move-reverse');
               list[i].classList.remove('move-forward');
           }
       }
    };

    // Для 2 варианта из /scripts/template-generator.js
    if((currentView + arg) < 0 || (currentView + arg + viewLength) > weatherData.length){
        return;
    }


    currentView += arg;
    let list = document.querySelector('.weather-forecast-slider');
    list.innerHTML = '';

    setView();
    renderPage();
    addAnimation(arg);
};