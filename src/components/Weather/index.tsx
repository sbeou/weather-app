import Image from 'next/image'
import moment from "moment";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { Loader } from '../loader';

import { IGeocodeData, IWeathercode } from "@/interfaces/interface";
import { fetchMeteo } from "@/app/fetchApi/fetchMeteo";

export default function Weather({geocode} : {geocode:IGeocodeData}) {

  const {data, isLoading} = useQuery({
    queryKey: ['meteo', geocode],
    queryFn: () => fetchMeteo(geocode)
  })

  if (isLoading || !data) {
    return <div className="min-h-96"><Loader /></div>;
  }

  const weatherData = data;

  if(weatherData === undefined) {
    return
  }
  const weatherIcon : IWeathercode = {
        0: {
          title: 'Ensolarado',
          icon: 'sun.svg'
        },
        1: {
          title: 'Parcialemte nublado',
          icon: 'suny-clouds.svg'
        },
        2: {
          title: 'Nublado',
          icon: 'cloud.svg'
        },
        3: {
          title: 'Muito nublado',
          icon: 'cloud.svg'
        },
        45: {
          title: 'Neblina',
          icon: 'fog.svg'
        },
        48: {
          title: 'Muito neblina',
          icon: 'fog.svg'
        },
        51: {
          title: 'Chuvisca leve',
          icon: 'sleet.svg'
        },
        53: {
          title: 'Chuvisca',
          icon: 'sleet.svg'
        },
        55: {
          title: 'Chuvisca',
          icon: 'sleet.svg'
        },
        56: {
          title: 'Chuvisco congelante leve',
          icon: 'sleet.svg'
        },
        57: {
          title: 'Chuvisco congelante',
          icon: 'sleet.svg'
        },
        61: {
          title: 'Chuva leve',
          icon: 'raini.svg'
        },
        63: {
          title: 'Chuva',
          icon: 'soft-rain.svg'
        },
        65: {
          title: 'Chuva forte',
          icon: 'raining.svg'
        },
        71: {
          title: 'Neve leve',
          icon: 'soft-snow.svg'
        },
        73: {
          title: 'Neve',
          icon: 'snowy.svg'
        },
        75: {
          title: 'Neve forte',
          icon: 'snowing.svg'
        },
        77: {
          title: 'Neve',
          icon: 'snow.svg'
        },
        80: {
          title: 'Chuva leve',
          icon: 'raini.svg'
        },
        81: {
          title: 'Chuva',
          icon: 'soft-rain.svg'
        },
        82: {
          title: 'Chuva forte',
          icon: 'raining.svg'
        },
        85: {
          title: 'Neve',
          icon: 'snowy.svg'
        },
        86: {
          title: 'Neve forte',
          icon: 'snowing.svg'
        },
        95: {
          title: 'Tempestade leve',
          icon: 'flashing.svg'
        },
        96:{
          title: 'Tempestade',
          icon:  'raining-flashing.svg'
        },
        99: {
          title: 'Tempestade forte',
          icon: 'raining-flashing.svg'
        }
    }
    const weekDay = [
        "SEG",
        "TER",
        "QUA",
        "QUI",
        "SEX",
        "SAB",
        "DOM"
    ]
    moment.locale('pt-br');
    const currentWeatherCode: number = weatherData.current_weather.weathercode
    const currentDate: string = weatherData.current_weather.time
    const dailyWeatherCode: number[] = weatherData.daily.weathercode
    const dailyTemperatureMax: number[] = weatherData.daily.temperature_2m_max
    const dailyTemperatureMin: number[] = weatherData.daily.temperature_2m_min
  return (
    <motion.div 
      className="flex flex-col items-center pb-10"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2, delay: 1}}
    >
      <p className="font-bold">{moment(currentDate).format("DD/MM/YYYY")}</p>
      <Image
        src={`/icon/${weatherIcon[currentWeatherCode].icon}`}
        width={200}
        height={200}
        alt="tempo"
        className="transition-all"
      />
      <h3 className="text-xl font-light -mt-10">{weatherIcon[currentWeatherCode].title}</h3>
      <div className="text-8xl font-thin pb-5">
        {weatherData.current_weather.temperature}<sup>º</sup>
      </div>
      <ul className="flex m-0 p-0 list-none justify-between w-full max-w-sm transition-all">
        {weatherData.daily.time.map((date, index) => (
          <li key={date} className="flex flex-col gap-3">
            <p>{weekDay[moment(date).day()]}</p>
            <Image 
              src={`/icon/${weatherIcon[dailyWeatherCode[index]].icon}`}
              width={30}
              height={30}
              alt="tempo"
              className="transition-all"
            />
            <p className="text-md">{dailyTemperatureMax[index]}<sup>º</sup></p>
            <p className="text-md">{dailyTemperatureMin[index]}<sup>º</sup></p>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}