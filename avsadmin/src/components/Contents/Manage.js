import React, { Component } from "react";
import * as axios from 'axios';
import { Link } from "react-router-dom";

class Manage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            manage: [],
            manage2: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:3001/contentlist.php')
        .then(
            // response => console.log(response.data)
            response => this.setState({manage : response.data})
          )
    }
    

    render() { 
        return ( 
            <div>
                <p className="test">Contenu / Gestion</p>
              <hr className="barre2"/>
              <div>
                  <h2>Tableau des souhaits</h2>
                  <table>
                      <thead className="thead">
                          <tr>
                              <th>#</th>
                              <th>Titre</th>
                              <th>Catégorie</th>
                              <th>Date de création</th>
                              <th>Créé par</th>
                              <th className="th">Voir</th>
                          </tr>
                      </thead>
                      <tbody>
                      {this.state.manage.map((manage) => (
                          <tr>
                              <td>{manage.idSouhait}</td>
                              <td>{manage.titre}</td>
                              <td>{manage.categorie}</td>
                              <td>{manage.dateAjout}</td>
                              <td>{manage.pseudo}</td>
                              <td className="td"><Link to={{pathname: `/edit/`, search:`${manage.idSouhait}`}}><button type="button" className="see">Voir</button></Link>
                      
                              </td>
                          </tr>
                             ))}
                      </tbody>
                  </table>
              </div>
            </div>
         );
    }
}
 
export default Manage;