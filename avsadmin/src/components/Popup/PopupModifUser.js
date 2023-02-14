import React from "react";
import { Link } from "react-router-dom";


function PopupModifUser(props) {
    return(
        <div className="Modal" style={{
            transform: props.visible ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: props.visible ? '1' : '0'
        }}>
            
            <div className="modifaccount"> 
            <p className="popup">Le compte est bien modifié</p>
            </div>
             <hr />
             <div className="buttonPopup">
                <Link to='/users'><button className="edit">Confirmer</button></Link>
             </div>
             
        </div>
    )
}

export default PopupModifUser