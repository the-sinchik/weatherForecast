(()=>{
    let monthForecast = [];

    function Weather(date) {
        let maxTemp = 10;
        let minTemp = -maxTemp;
        let night = Math.round(minTemp + Math.random() * (maxTemp - minTemp));

        this.date = date;
        this.temperature = {
            night: night,
            day: Math.round(night + Math.random() * 5)
        };
        this.cloudiness =(Math.random() > 0.5) ? 'Облачно' : 'Ясно' ;
        this.snow = ( this.cloudiness !== 'Ясно' && (Math.random() > 0.5) && this.temperature.day <= 1);
        this.rain  = ( this.cloudiness !== 'Ясно' &&  (Math.random() > 0.5) && this.temperature.day >= -1);
    }

    for (let i = -1 ; i < 30 ; i++){
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        now.setDate(now.getDate() + i);
        monthForecast.push(new Weather(now.getTime()));
    }

// console.log(JSON.stringify(monthForecast));
})();