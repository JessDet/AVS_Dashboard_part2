import axios from "axios";
import { Field, Formik } from "formik";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PopupModifUser from "../Popup/PopupModifUser";

class ModifUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            visible: false            
        }
    }
    componentDidMount() {
        axios.post('http://localhost:3001/recupUser.php', parseInt(this.props.location.search.split("?")[1]))
        .then(
          response =>this.setState({
              users: response.data
          })
        )
    }

    handleChange(event) {
        event.preventDefault();
    }

    submit = (values) => {
    values.idUser = parseInt(this.props.location.search.split("?")[1]);
        axios.post('http://localhost:3001/updateUser.php', values).then(
            response => console.log(response.data)
        )
        
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

    render() {

    return (
            <div>
                <p className="test">Utilisateur / Mise à jour</p>
                <hr className="barre2" />
                <div className="diner-container">
                    <Formik 
                    enableReinitialize
                    onSubmit={this.submit}
                    initialValues={{Pseudo: this.state.users.Pseudo,
                         email:this.state.users.email, dateDeNaissance:this.state.users.dateDeNaissance, Ville:this.state.users.Ville}}
                    
                    >
                        {
            ({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              errors,
              touched
            }) => (
                        <form onSubmit={handleSubmit}  onChange={this.handleChange.bind(this)}>
                            <div className="form-group">
                                <label>Pseudo</label>
                                <Field type="text" name="Pseudo" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <Field type="text" name="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Date de Naissance</label>
                                <Field type="date" name="dateDeNaissance" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Ville</label>
                                <Field type="text" name="Ville" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btnIconSelect"
                                    onClick={this.montre}
                                >
                                    <img
                                        className="iconSave"
                                        src={require("../img/save.png")}
                                        alt=""
                                    />
                                    <p className="txtBtnIcon">Sauvegarde</p>
                                </button>
                            </div>
                        </form>
                           )            
                        }
                    </Formik>
                    <PopupModifUser 
                    visible={this.state.visible}
                    cache={this.cache} />
                </div>
            </div>);
    }
    

        
    }


export default ModifUser;