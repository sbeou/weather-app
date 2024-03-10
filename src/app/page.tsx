"use client";
import { motion } from "framer-motion";

import SearchForm from "@/components/SearchForm";


export default function Home() { 
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-5 max-w-screen-sm mx-auto w-full"
      initial={{y:20, opacity: 0}} 
      animate={{y:0, opacity:1}} 
      transition={{delay:0.5, duration: 0.5}}
    >
      <h2 className="p-5 text-xl font-light pb-10 text-center">Digite o nome da cidade</h2> 
      <SearchForm />
    </motion.div>
  )
}