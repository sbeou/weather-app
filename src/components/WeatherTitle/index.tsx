import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { IGeocodeData, ILocation } from "@/interfaces/interface";

export default function WeatherTitle({data} : {data:IGeocodeData}) {
  const [cityData, setCityData] = useState<ILocation>()
  useEffect(() => {
    async function getApiLocation({data}: {data: IGeocodeData}) {
      await fetch(`${process.env.API_GEOCODE}/reverse?lat=${data.lat}&lon=${data.lon}`).then(res => res.json()).then(data => {
        setCityData(data)  
      });
    }
    getApiLocation({data})
  },[data])
  const getCity = () => {
    if(cityData?.address.city) {
        return `${cityData.address.city},`
    }
    if(cityData?.address.municipality) {
        return `${cityData.address.municipality},`
    }
    if(cityData?.address.city_district) {
        return `${cityData.address.city_district},`
    }
    return ''
  }
  const location = `${getCity()} ${cityData?.address.state}`
  if(cityData === undefined) {
    return ''
  }
  return (
    <motion.h2 
      className="text-4xl font-light"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2, delay: 1}}
    >
      {location}
    </motion.h2>
  )
}