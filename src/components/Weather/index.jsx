import { useCallback, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import './weatherStyle.scss';

function Weather({data}) {
    const title = data.display_name
    const [isOpen, setIsOpen] = useState(false);
    const [weatherId, setweatherId] = useState(false);
    Modal.setAppElement('#root');
    const toggleModal = useCallback((id) => () => {
        setIsOpen(!isOpen)
        setweatherId(id)
    }, [isOpen]);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <>
            <p><Link onClick={toggleModal(data.place_id)}>{title.slice(0,150)}...</Link></p>
            <Modal
                style={customStyles}
                isOpen={isOpen}
                onRequestClose={toggleModal(weatherId)}>
                <button className="close-modal" onClick={toggleModal(weatherId)}>
                    X 
                </button>
                <h3>{title}</h3>
            </Modal>
        </>
    )
}
export default Weather