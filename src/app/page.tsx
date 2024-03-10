"use client";
import { motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchForm from "@/components/SearchForm";
import ResultSearch from "@/components/ResultSearch";
import { useAddressContext } from "@/context/address";
import { AddressContextType } from "@/interfaces/interface";

export default function Home() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })
  const { address } = useAddressContext() as AddressContextType;
  const city = address.address
  return (
    <QueryClientProvider client={queryClient}>
      <motion.main 
        className="flex flex-col items-center justify-center p-5 max-w-screen-sm mx-auto main"
        initial={{y:20, opacity: 0}} 
        animate={{y:0, opacity:1}} 
        transition={{delay:1, duration: 1}}
      >
        {city === "" ? <h2 className="p-5 text-3xl font-light pb-10">Digite o nome da cidade</h2> : (<ResultSearch address={city} />) }
        <SearchForm />
      </motion.main>
    </QueryClientProvider>
  )
}
