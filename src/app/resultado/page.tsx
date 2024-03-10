"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";

import ResultSearch from "@/components/ResultSearch";
import { useAddressContext } from "@/context/address";
import { AddressContextType } from "@/interfaces/interface";

export default function Resultado() {

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
      <motion.div 
        className="flex flex-col items-center justify-center p-5 max-w-screen-sm mx-auto w-full"
        initial={{y:20, opacity: 0}} 
        animate={{y:0, opacity:1}} 
        transition={{delay:0.5, duration: 0.5}}
      >
        <ResultSearch address={city} />
        <Link href={"/"} className="bg-yellow-500 px-4 py-2 border-yellow-500 border hover:bg-transparent text-white hover:text-yellow-500 transition-all">Nova Busca</Link>
      </motion.div>
    </QueryClientProvider>
    
  )
}