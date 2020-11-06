import React, {forwardRef, useImperativeHandle} from "react";
import ReactDOM from "react-dom";
import { GrClose } from 'react-icons/gr';

/* Popup Component Styles */
const WRAPPER_STYLES = {
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
}

const BACKDROP_STYLES = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, .5)",
    zIndex: 9000
}

const CONTENT_STYLES = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    overflowX: "auto",
    width: "45%",
    minHeight: "50%",
    maxHeight: "60%",
    padding: "35px",
    backgroundColor: "#FFF",
    boxShadow: "0 0 12px rgba(0, 0, 0, .2)",
    borderRadius: "25px",
    zIndex: 9001
}

const CLOSE_ICON_STYLES = {
    position: "absolute",
    top: "20px",
    right: "20px",
    height: "25px",
    width: "25px",
    cursor: "pointer"
}

/* Popup Function Component */
const Popup = forwardRef((props, ref) => {

    // Hook to handle use states (whether popup is open or closed)
    const [open, setOpen] = React.useState(false);

    // Notes: This attaches methods to ref. The first parameter is
    // ref and the second parameter is a function. The function's
    // return is passed into ref.
    useImperativeHandle(ref, () => {
        return {
            // set openPopup equal to anonymous function that
            // calls openPopup below
            openPopup: () => openPopup(),
            // set closePopup equal to anonymous function that
            // calls closePopup below
            closePopup: () => closePopup()
        }
    });

    // Function for opening popup preview
    const openPopup = () => {
        setOpen(true);
    };

    // Function for closing popup preview
    const closePopup = () => {
        setOpen(false); 
    };

    // If show is false, return nothing
    if (!open) {
        return null;
    }

    // Otherwise, return popup using a portal
    // Note on createPortal: The first parameter is a React
    // child node and the second parameter is a DOM node.
    return ReactDOM.createPortal(
        <div className={"popup-wrapper"} style={WRAPPER_STYLES}>
            <div className={"popup-backdrop"} onClick={closePopup} style={BACKDROP_STYLES}/>
            <div className={"popup-content"} style={CONTENT_STYLES}>
                <GrClose onClick={closePopup} style={CLOSE_ICON_STYLES}/>
                { props.children }
            </div>
        </div>,
        document.getElementById("popup-root")
    )

});

export default Popup;