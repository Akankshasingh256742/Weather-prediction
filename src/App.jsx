import { useEffect, useState } from 'react'

import TopButtons from './component/TopButtons'
import Inputs from './component/Inputs'
import Timeandlocation from './component/Timeandlocation'
import Temperatureanddetails from './component/Temperatureanddetails'
import Forecast from './component/Forecast'
import getFormattedWeatherData from './Services/weatherservices'


function App() {
    
    const [query,setquery] = useState({q:'berlin'})
    const [units,setunits] = useState('metric')
    const [weather,setweather] = useState(null)
    

  useEffect(()=>{     
  const fetchweather = async ()=>{
      const data =await getFormattedWeatherData({...query,units})
      .then((data)=>{
        setweather(data);
      }) 
    }
fetchweather();

}, [query,units])



const formatbackground = () =>{
  if (!weather) return 'from-cyan-700 to-blue-700'
  const thresold = units === 'metric' ? 20:60;
  if(weather.temp <= thresold) return 'from-cyan-700 to-blue-700'

  return 'from-yellow-700 to-orange-700'
}


  return (
   <div className={`mx-auto max-w-screen-md mt-2 py-2 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatbackground()}`}>
     <TopButtons setquery={setquery}/>
     <Inputs setquery={setquery} units={units} setunits={setunits} />
      {weather && (
        <div>
          <Timeandlocation  weather={weather} />
         <Temperatureanddetails weather={weather} />
          <Forecast title='Hourly forecast' items={weather.hourly} />
          <Forecast title='Daily forecast' items={weather.daily} />
        </div>
      )}
     
   </div>
  )
}

export default App
