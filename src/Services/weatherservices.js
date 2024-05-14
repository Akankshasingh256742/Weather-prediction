import { DateTime } from 'luxon'

const API_KEY = "b50ce7f23f2862c48ade4239460050e7";
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const BASE_URL2 = "https://api.openweathermap.org/data/3.0"

const getweatherData = (infoType,searchParams)=>{
    const url = new URL(BASE_URL + '/' +infoType)
    url.search = new URLSearchParams({...searchParams,appid:API_KEY})
    console.log(url)

    return fetch(url)
    .then((res) => res.json())
}

const getweatherDatacallapi = (infoType,searchParams)=>{
    const url = new URL(BASE_URL2 + '/' +infoType)
    url.search = new URLSearchParams({...searchParams,appid:API_KEY})
    console.log(url)

    return fetch(url)
    .then((res) => res.json())
}



const formatCurrentweather = (data)=>{
    const {
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
    } = data

    const {main:details,icon} = weather[0]
    
    return {lat,lon,temp,feels_like,temp_max,temp_min,humidity,name,dt,country,sunrise,sunset,speed,details,icon}
}

const formateforcastweather = (data)=>{
        let {timezone,daily,hourly} = data;
        daily = daily.slice(1,6).map(d => {
            return {
                title: formattolocaltime(d.dt,timezone,'ccc'),
                temp:d.temp.day,
                icon: d.weather[0].icon
            }
        });

        hourly = hourly.slice(1,6).map(d => {
            return {
                title: formattolocaltime(d.dt,timezone,'hh:mm a'),
                temp:d.temp,
                icon: d.weather[0].icon
            }
        })

        return {timezone,daily,hourly}
        
}


const getFormattedWeatherData = async (searchParams) => {
      const formattedCurrentWeather = await getweatherData('weather',searchParams)
      .then(formatCurrentweather)

    const {lat, lon} = formattedCurrentWeather

    const formattedforcastweather = await getweatherDatacallapi('onecall',{
        lat,
        lon,
        exckude:'current,minutely,alerts',
        units: searchParams.units
    }).then(formateforcastweather)
      

      
      
      return {...formattedCurrentWeather,...formattedforcastweather}
}

const iconUrlfromcode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

const formattolocaltime = (secs,
    zone,
    formate = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => { 
    return DateTime.fromSeconds(secs)
                .setZone(zone)
                .toFormat(formate)
  }

export default getFormattedWeatherData;

export { formattolocaltime, iconUrlfromcode };