import { useDispatch, useSelector } from 'react-redux'
import { adressSelector, clearState } from '../../features/AdressSlices';
import { Link, useNavigate} from 'react-router-dom';
import './resultSearchStyle.scss'
import Weather from '../Weather';

function ResultSearch() {
    const { geocode, isFetching } = useSelector(adressSelector)
    const searchResult = geocode
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
                searchResult?.length > 0  ? (
                    <>
                        {searchResult.map((result) => (
                            <Weather
                            key={result.place_id} 
                            data={result}
                            /> 
                        ))}
                        <Link className='button' to={'/'} onClick={newSearch}>Nova busca</Link>
                    </>
                    ) : (
                        <>
                            <p>Nenhum resultado encontrado</p>
                            <Link className='button' to={'/'} onClick={newSearch}>Nova busca</Link>
                        </>
                    )
            )}
        </main>  
    )
}

export default ResultSearch