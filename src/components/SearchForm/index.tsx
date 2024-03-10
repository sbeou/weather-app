import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { NextResponse } from 'next/server'

import { useAddressContext } from "@/context/address";
import { AddressContextType } from "@/interfaces/interface";


export async function middleware(req : any) {
  const { nextUrl: url, geo } = req
  const country = geo.country || 'US'

  url.searchParams.set('country', country)

  return NextResponse.rewrite(url)
}

export const getServerSideProps = ({ query } : any) => ({
  props: query,
})


type FormValues = {
  city: string
}

export default function SearchForm(props: any) {
  console.log(props.country)
  const { register, handleSubmit, resetField} = useForm<FormValues>()
  const {setAddress} = useAddressContext() as AddressContextType;
  const router = useRouter()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const addressField: string = data.city.split(' ').join('+').replace(/[.,\s]/g, '');
    setAddress({address: addressField})
    resetField("city")
    router.push('/resultado/')
  };
  return (
      <form onSubmit={handleSubmit(onSubmit)} className="pb-7">
        <input type="text" {...register("city")} placeholder='Cidade' className="text-gray-900 rounded-s border border-white"/>
        <button type="submit" className=" rounded-e hover:bg-yellow-500 px-4 py-2 border-yellow-500 border bg-transparent hover:text-white text-yellow-500 transition-all">Buscar</button>
      </form>
  )
}