import { useForm } from 'react-hook-form';
import './formStyle.scss';
import { useDispatch} from 'react-redux'
import { clearState, fetchGeocode } from '../../features/AdressSlices';
import { useNavigate } from 'react-router-dom';
import  season  from '../../assets/season.png'

function Form() {
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const onSubmit = async (data) => {
    const address = data.city.split(' ').join('+');
    dispatch(fetchGeocode({address: address}));
    dispatch(clearState());
    navigate('/previsao-de-tempo')
  };
  return (
    <main className="main">
      <img src={season} alt='prévisão meteoróligica' />
      <h3>Encontre a prévisão meteoróligica de sua cidade</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='adress-form'>
        <input type="text" {...register("city")} placeholder='Cidade'/>
        <button type="submit"><i className="fad fa-search"></i></button>
      </form>
    </main>
  )
}
export default Form