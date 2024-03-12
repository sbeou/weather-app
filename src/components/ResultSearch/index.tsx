//"use client";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { Loader } from "../loader";
import WeatherTitle from "../WeatherTitle";
import Weather from "../Weather";

import { fetchGeocode } from "@/app/fetchApi/fetchGeocode";
import { useAddressContext } from "@/context/address";
import { AddressContextType } from "@/interfaces/interface";

export default function ResultSearch() {

  const { address } = useAddressContext() as AddressContextType;
  const city = address.address;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['geocode', city],
    queryFn: () => fetchGeocode(city),
  });

  if (isLoading || !data) {
    return (
      <div className="min-h-96"><Loader /></div>
    );
  }

  const geocode = data[0];

  if(geocode === undefined) {
    redirect("/")
  }

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