
import Image from 'next/image'

import { IWeathercode } from "@/interfaces/interface"
interface IProps {
  size: number;
  code: number;
}

export default function WeatherIcon({size} : IProps, {code} : IProps) {
  const weatherCode : IWeathercode = {
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
    
  return (
      <Image
        src={`/icon/${weatherCode[code].icon}`}
        width={size}
        height={size}
        alt="tempo"
        className="transition-all"
      />
  )
}