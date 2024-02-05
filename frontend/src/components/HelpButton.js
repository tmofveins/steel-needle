import React, { useState } from "react";
import Modal from "../components/Modal";

const HelpButton = () => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsHelpOpen(true)}>Help</button>
            <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)}>
                <p>How to Play</p>
            </Modal>
        </div>
    );
}

export default HelpButton;