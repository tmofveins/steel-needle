const Modal = ({ isOpen, onClose, children }) => {
  return (isOpen
            ? <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {children}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
            : null
    );
};

export default Modal;
