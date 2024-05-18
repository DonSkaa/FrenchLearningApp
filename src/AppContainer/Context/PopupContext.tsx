import React, { createContext, useState, ReactNode, useContext } from "react";

type PopupContextType = {
    togglePopup: boolean;
    showPopup: (toggle: boolean, maxWidth?: string) => void;
    popupContent: ReactNode;
    addPopupContent: (content: ReactNode, maxWidth?: string) => void;
    togglePopup2: boolean;
    showPopup2: (toggle: boolean) => void;
    popupContent2: ReactNode;
    addPopupContent2: (content: ReactNode) => void;
};

export const PopupContext = createContext<PopupContextType | undefined>(undefined);

function PopupContextProvider(props: { children: ReactNode }) {
    // MAIN POPUP
    const [togglePopup, setTogglePopup] = useState(false)
    const [popupContent, setPopupContent] = useState<ReactNode>()

    /**
     *
     * @param {Boolean} toggle true or false to show or hide the popup
     * @param {String} maxWidth width of the popup as css property ex: '1200px'
     */
    const showPopup = (toggle: boolean, maxWidth?: string) => {
        if (toggle === true) {
            document.getElementsByTagName("body")[0].style.overflowY = "hidden"
        } else {
            document.getElementsByTagName("body")[0].style.overflowY = "auto"
        }
        maxWidth && (document.getElementById("popup")!.style.maxWidth = maxWidth)
        setTogglePopup(toggle);
        /* Suppression du contenu si masque de la popup */
        !toggle &&
            setTimeout(() => {
                setPopupContent(undefined);
            }, 250)
    }

    const addPopupContent = (content: ReactNode, maxWidth?: string) => {
        showPopup(true, maxWidth)
        setPopupContent(content)
    }

    // SECOND POPUP
    const [togglePopup2, setTogglePopup2] = useState(false);
    const [popupContent2, setPopupContent2] = useState<ReactNode>()

    const showPopup2 = (toggle: boolean) => {
        setTogglePopup2(toggle)
        /* Suppression du contenu si masque de la popup */
        !toggle &&
            setTimeout(() => {
                setPopupContent2(undefined)
            }, 250)
    }

    const addPopupContent2 = (content: ReactNode) => {
        showPopup2(true)
        setPopupContent2(content)
    }

    const contextValue: PopupContextType = {
        togglePopup,
        showPopup,
        popupContent,
        addPopupContent,
        togglePopup2,
        showPopup2,
        popupContent2,
        addPopupContent2,
    }

    return (
        <PopupContext.Provider value={contextValue}>
            {props.children}
        </PopupContext.Provider>
    )
}

export default PopupContextProvider
