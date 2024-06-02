import React from 'react';
import './FullScreenPopup.css';

interface FullScreenPopupProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const FullScreenPopup: React.FC<FullScreenPopupProps> = observer(({ show, onClose, children }) => {
    if (!show) {
        return null
    }

    return (
        <div className="fullscreen-popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
})

export default FullScreenPopup
