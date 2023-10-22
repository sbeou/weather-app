'use client'
import { createContext, useContext, useState } from "react";

import { AddressContextType, IAddress } from "@/interfaces/interface";


export const AddressContext = createContext<AddressContextType | null>(null)
export const useAddressContext = () => useContext(AddressContext)

export const AddressProvider = ({ children }: {children: React.ReactNode}) => {
  const [address, setAddress] = useState<IAddress>({
    address: ''
  })

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  )
}