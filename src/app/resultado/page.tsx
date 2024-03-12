"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";

import ResultSearch from "@/components/ResultSearch";

export default function Resultado() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <motion.div 
        className="flex flex-col items-center justify-center p-5 max-w-screen-sm mx-auto w-full"
        initial={{y:20, opacity: 0}} 
        animate={{y:0, opacity:1}} 
        transition={{delay:0.5, duration: 0.5}}
      >
        <ResultSearch />
      </motion.div>
    </QueryClientProvider>
    
  )
}