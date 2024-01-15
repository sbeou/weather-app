"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Weather from "../Weather";
import WeatherTitle from "../WeatherTitle";

import { useAddressContext } from "@/context/address";
import { AddressContextType, IGeocodeData } from "@/interfaces/interface";

export default function ResultSearch() {
  const { address } = useAddressContext() as AddressContextType;
  const city = address.address
  const [geocode, setGeocode] = useState<IGeocodeData>()
  useEffect(() => {
        async function getGeocodeData({city} : {city : string}) {
            await fetch(`${process.env.API_GEOCODE}/search?q=${city}`).then(res => res.json()).then(data => {
              setGeocode({
                  lat: data[0].lat,
                  lon: data[0].lon,
                  display_name: data[0].display_name,
              })
          });
        }
        if(city) {
          getGeocodeData({city});
        }
    }, [city])
  if (geocode === undefined) {
    return <h2 className="p-5 text-3xl font-light pb-10">Digite o nome da cidade</h2>
  }
return (
  <motion.section 
    className="text-center w-full result"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2, delay: 1}}
  >
    <WeatherTitle data={geocode} />
    <Weather data={geocode} />
  </motion.section>
)
}