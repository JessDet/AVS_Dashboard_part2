import React from "react";
import { NavLink, Link } from 'react-router-dom';

function TopMenu(props) {
    return(
        <header>
        <div className="header">
            <div className="logo">
                <img src={require("../img/outline_admin_panel_settings_white_24dp.png")} alt="" />
                <Link to="/dashboard"><p>Interface Administrateur</p>  </Link>
            
            
            </div>
            <ul className="link">
                    <li>
                    <img className="img" src={require("../img/outline_source_white_24dp.png")} alt="" />
                      <NavLink to="/content" activeClassName="activeHeader">Contenus</NavLink>  
                    </li>
                    <li>
                    <img className="img" src={require("../img/outline_person_white_24dp.png")} alt="" />
                      <NavLink to="/users" activeClassName="activeHeader">Utilisateurs</NavLink>  
                    </li>
                    <li>
                    <img className="img" src={require("../img/outline_message_white_24dp.png")} alt="" />
                      <NavLink to="/messages" activeClassName="activeHeader">Messages</NavLink>
                      <span>1</span>  
                    </li>
                    <li >
                    <NavLink className="logout" to="/Login" onClick={props.deleteCookie} >
                    <img className="img" src={require("../img/icons8-déconnexion-90.png")} alt="" />Déconnexion</NavLink>
                    </li>
                    
            </ul>
        </div>
    </header>
    )
}


export default TopMenu