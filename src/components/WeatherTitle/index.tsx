import { motion } from "framer-motion";

import { IGeocodeData } from "@/interfaces/interface";

export default function WeatherTitle({data} : {data:IGeocodeData}) {
  
  const location: string = data.display_name.slice(0, data.display_name.indexOf(','))
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