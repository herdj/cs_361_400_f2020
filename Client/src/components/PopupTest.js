import React from "react";
import Popup from "./Popup";
import GitHubUserInfo from "./GitHubUserInfo";
import GitHubUserRepoInfo from "./GitHubUserRepoInfo";
import Button from "react-bootstrap/Button";


function PopupTest() {

  /************************* POPUP - START ****************************/

  // Note: This sets ref equal to popUpRef, which will put Popup 
  // methods into popupRef. This gives us access to the openPopup() 
  // and closePopup() via 'popupRef.current'.
  // Resource used: https://www.youtube.com/watch?v=SmMZqh1xdB4
  const popupRef = React.useRef();

  const openPopup= () => {
    popupRef.current.openPopup();
  };
  
  /************************** POPUP - END *****************************/

  return (
    <div className="PopupTest">

    {/************************ POPUP - START *************************/}
    
    <Button variant="primary" size="sm" onClick={openPopup}>
        Preview
    </Button>

    <Popup ref={popupRef}>

    <GitHubUserInfo></GitHubUserInfo>
      <hr />
    <GitHubUserRepoInfo></GitHubUserRepoInfo>

    </Popup>
    
    {/*********************** POPUP - START **************************/}

    </div>
  );
}

export default PopupTest;