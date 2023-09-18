import { useDispatch, useSelector } from 'react-redux'
import { adressSelector, clearState } from '../../features/AdressSlices';
import { Link, useNavigate} from 'react-router-dom';
import './resultSearchStyle.scss'
import Weather from '../Weather';

function ResultSearch() {
    const { geocode, isFetching } = useSelector(adressSelector)
    const searchResult = geocode?.find(element=>element!==undefined);
    const dispatch = useDispatch()
    const newSearch = () => {
        dispatch(clearState())
    }
    const navigate = useNavigate()
    if(!geocode) {
        navigate('/');
    }
    return (
        <main className='main'>
            {isFetching ? (<p>Carregando</p>) : (
                searchResult  ? ( 
                    <Weather data={searchResult} />
                ) : (
                    <p>Nenhum resultado encontrado</p>
                )      
            )}
            <Link className='button' to={'/'} onClick={newSearch}>Nova busca</Link>
        </main>  
    )
}

export default ResultSearch