import React, { Component } from "react";
import PopupUserList from "../Popup/PopupUserList";
import * as axios from 'axios';
import { Link } from "react-router-dom";


class UserList extends Component {
    constructor(props) {
        super(props)
        this.state= {
            users: [],
            visible: false,
            index : null
        }
    }

    montre = (index) => {
        this.setState({
            visible: true,
            index
        })
    }

    cache = () => {
        this.setState({
            visible: false
        })
    }

    deleteUser = (index) => {
        const users = this.state.users.slice();
        let idUser = users[index];
        axios.post('http://localhost:3001/deleteUser.php', idUser).then(
          response => response.data
        )
        users.splice(index, 1);
        this.setState({
          users,
          visible: false
        });
      }

    componentDidMount() {
        axios.get('http://localhost:3001/userlist.php')
        .then(
          response => this.setState({
            users : response.data
          })
        )
    }

    render () {
        return(
            <div>
                <p className="test">Utilisateurs / Liste</p>
              <hr className="barre2"/>
              <div>
                  <table>
                      <thead className="thead">
                          <tr>
                              <th>#</th>
                              <th>pseudo</th>
                              <th>email</th>
                              <th>Date de naissance</th>
                              <th>Ville</th>
                              
                              <th>Editer</th>
                              <th className="th">Supprimer</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.users.map((users, index) => (
                             <tr>
                              <td>{users.idUser}</td>
                              <td>{users.Pseudo}</td>
                              <td>{users.email}</td>
                              <td>{users.dateDeNaissance}</td>
                              <td>{users.Ville}</td>
                              <td><Link to={{pathname: `/modifUser/`, search:`${users.idUser}`}}><button type="button" className="edit">Editer</button></Link></td>
                              <td className="td"><button type="button" className="delete" onClick={() => this.montre(index)}>Supprimer</button>
                              
                              </td>
                          </tr> 
                         ))}
                          
                      </tbody>
                  </table>
                  {this.state.visible ? 
                  <PopupUserList 
                              visible={this.state.visible}
                              cache={this.cache}
                              users={this.state.users}
                              index = {this.state.index}
                              deleteUser = {this.deleteUser}
                              /> : null}
              </div>
            </div>
           
        )
    }
}

export default UserList