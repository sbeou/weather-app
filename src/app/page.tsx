"use client";
import { motion } from "framer-motion";

import SearchForm from "@/components/SearchForm";
import ResultSearch from "@/components/ResultSearch";

export default function Home() {
  return (
      <motion.main 
        className="flex flex-col items-center justify-center p-5 max-w-screen-sm mx-auto main"
        initial={{y:20, opacity: 0}} 
        animate={{y:0, opacity:1}} 
        transition={{delay:1, duration: 1}}
      >
        <ResultSearch />
        <SearchForm />
      </motion.main>
  )
}
