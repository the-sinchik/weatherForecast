const now = new Date();
now.setHours(0, 0, 0, 0);
const today = now.getTime();

const getWeatherData = async () => {
    try {
        const response = await fetch('data/data.json');
        return await response.json();
    }
    catch (error) {
        throw error;
    }
};

function ForecastForDay(day) {
    const date = new Date(day.date);
    const monthMap = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const weekDayMap = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];

    this.weekDay = (day.date === today) ? 'Сегодня' : weekDayMap[date.getDay()];
    this.dayDate = date.getDate().toString() + ' ' + monthMap[date.getMonth()];
    this.temperature = {
        day: (day.temperature.day <= 0 ? 'Днем ' + day.temperature.day.toString() + '°C' :
            'Днем +' + day.temperature.day.toString() + '°C'),
        night: (day.temperature.night <= 0 ? 'Ночью ' + day.temperature.night.toString() + '°C' :
            'Ночью +' + day.temperature.night.toString() + '°C')
    };
    this.weatherType = (day.cloudiness === 'Ясно' ? day.cloudiness :
        ( day.snow && day.rain ) ? 'Дождь со снегом' :
            ( day.snow) ? 'Снег' :
                (day.rain) ? 'Дождь' : day.cloudiness );
    switch(this.weatherType) {
        case 'Ясно':
            this.icon = 'icons/contrast.svg';
            break;
        case 'Дождь':
            this.icon = 'icons/drop.svg';
            break;
        case 'Снег':
            this.icon = 'icons/snowflake.svg';
            break;
        case 'Дождь со снегом':
            this.icon = 'icons/rainy-snow.svg';
            break;
        case 'Облачно':
            this.icon = 'icons/clouds.svg';
            break;
    }
}