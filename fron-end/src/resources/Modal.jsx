import {useState} from "react";

function Modal({titulo, class_name, button_text, children}) {
    const [ShowModal, setShowModal] = useState(false);
    const [CloseModal, setCloseModal] = useState(false);
    function handleShowModal(e) {
        e.stopPropagation()
        setShowModal(false)
        console.log(titulo);
    }
    const handleCloseModal = () => setCloseModal(true);
    return (
        <>
            <button type="button" onClick={handleShowModal} className={class_name} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                {button_text}
            </button>

            {/*Modal*/}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{titulo}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal} data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary">{button_text}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;