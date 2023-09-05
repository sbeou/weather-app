import { useForm } from 'react-hook-form';
import './formStyle.scss';
import { useDispatch, useSelector } from 'react-redux'
import { adressSelector, clearState, fetchCep } from '../../features/AdressSlices';
import { useEffect, useState } from 'react';

function Form() {
  const {register, handleSubmit, setValue, setFocus, resetField} = useForm();
  const [message, setMessage] = useState("")
  const onSubmit = (e) => {
  }
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage, address, neighborhood, city, uf, error } = useSelector(adressSelector)
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '')
    if(cep.length === 8) {
        dispatch(fetchCep({cep: cep}))  
    }    
  }
  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
      
    }

    if (isSuccess) {
      dispatch(clearState());
      console.log(error);
      if(! error === true) {
        setValue('address', address)
        setValue('neighborhood', neighborhood)
        setValue('city', city)
        setValue('uf', uf)
        setFocus('addressNumber')
        setMessage("")
      } else {
        setMessage("CEP não encontrado!")
        resetField("cep")
      } 
    }
  }, [dispatch,isError, isSuccess, errorMessage, setMessage, address, neighborhood, city, uf, setFocus, resetField, setValue, error]);
  return (
    <div className="main">
      <form onSubmit={handleSubmit(onSubmit)} className='adress-form'>
        <label>
          CEP:
          <input type="text" {...register("cep", { required: true })} onChange={checkCEP} />
        </label>
        <label>
          Rua:
          <input readOnly type="text" {...register("address")}/>
        </label>
        <label>
          Número:
          <input type="text" {...register("addressNumber", { required: true })}/>
        </label>
        <label>
          Bairro:
          <input readOnly type="text" {...register("neighborhood")}/>
        </label>
        <label>
          Cidade:
          <input readOnly type="text" {...register("city")}/>
        </label>
        <label>
          Estado:
          <input readOnly type="text" {...register("uf")}/>
        </label>
        <p className='alert'>{message}</p>
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}
export default Form