import { useForm } from 'react-hook-form';
import './formStyle.scss';
import { useDispatch, useSelector } from 'react-redux'
import { adressSelector, clearState, fetchCep, fetchGeocode } from '../../features/AdressSlices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const {register, handleSubmit, setValue, setFocus} = useForm()
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isSuccess, isError, isFetching,errorMessage, street, neighborhood, city, uf, error } = useSelector(adressSelector)
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '')
    if(cep.length === 8) {
      dispatch(fetchCep({cep: cep}))   
    }    
  }
  useEffect(() => {
    if (isError) {
      console.log(errorMessage); 
    }
    if (isSuccess) {
      if(! error === true ) {
        setValue('street', street)
        setValue('neighborhood', neighborhood)
        setValue('city', city)
        setValue('uf', uf)
        setFocus('addressNumber')
        setMessage("")
      } else {
        setMessage("CEP não encontrado!")

      } 
      dispatch(clearState());
    }
  }, [dispatch,isError, isSuccess, errorMessage, setMessage, street, neighborhood, city, uf, setFocus, setValue, error, isFetching]);
  const onSubmit = async (data) => {
    const street = data.street.split(' ').join('+');
    const city = data.city.split(' ').join('+');
    const cep = data.cep.slice(0,5)
    const address = `${data.addressNumber}+${street}+${city}+${data.uf}+${cep}`;
    dispatch(fetchGeocode({address: address}));
    dispatch(clearState());
    navigate('/previsao-de-tempo')
  };
  return (
    <main className="main">
      <h3>Prévisão meteoróligica</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='adress-form'>
        <label>
          CEP:
          <input type="text" {...register("cep")} onChange={checkCEP} />
        </label>
        <label>
          Rua:
          <input type="text" {...register("street")}/>
        </label>
        <label>
          Número:
          <input type="text" {...register("addressNumber")}/>
        </label>
        <label>
          Bairro:
          <input type="text" {...register("neighborhood")}/>
        </label>
        <label>
          Cidade:
          <input type="text" {...register("city")}/>
        </label>
        <label>
          Estado:
          <input type="text" {...register("uf")}/>
        </label>
        <p className='alert'>{message}</p>
        <button type="submit">Buscar</button>
      </form>
    </main>
  )
}
export default Form