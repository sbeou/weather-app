import { Link } from "react-router-dom";
import './footerStyle.scss';

function Footer() {
    return (
        <footer>
            © Desenvolvimento <Link to={'https://french.dev.br'} target="_Blank">Sebastien Guilet</Link> 
        </footer>
    )
}
export default Footer