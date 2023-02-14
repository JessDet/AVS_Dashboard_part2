import React from "react";

function PopupUserList(props) {
    console.log(props);
    return(
        <div className="Modal" style={{
            transform: props.visible ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: props.visible ? '1' : '0'
        }}>
            
            <div className="delaccount">
              <p className="popup">Delete  {props.index !== null ? props.users[props.index].Pseudo : ''} Account </p>  
              <button className="x" onClick={props.cache}>X</button>
            </div>
             <hr />
             <p className="popup">Etes-vous sûr ?</p>
             <hr />
             <div className="buttonPopup">
                 <button className="delete" onClick={
                     props.cache
                 }>Annuler</button>
                 <button className="edit" onClick={() => props.deleteUser(props.index)} >Confirmer</button>
             </div>
             
        </div>
    )
}

export default PopupUserList