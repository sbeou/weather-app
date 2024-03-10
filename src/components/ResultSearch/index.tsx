//"use client";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { Loader } from "../loader";
import WeatherTitle from "../WeatherTitle";
import Weather from "../Weather";

import { fetchGeocode } from "@/app/fetchApi/fetchGeocode";

export default function ResultSearch({address} : {address : string}) {


  const { data, isLoading } = useQuery({
    queryKey: ['geocode', address],
    queryFn: () => fetchGeocode(address),
  });

  if (isLoading || !data) {
    return <div className="min-h-96"><Loader /></div>;
  }
    
  const geocode = data[0];

return (
  <motion.section 
    className="text-center w-full result min-h-96"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2, delay: 1}}
  >
   <WeatherTitle geocode={geocode} />
    <Weather geocode={geocode} /> 
  </motion.section>
)
}