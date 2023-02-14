import React, { Component } from "react";
import { Field, Formik } from "formik";
import * as axios from "axios";
import PopupModifSouhait from "../Popup/PopupModifSouhait";
import { Link, Redirect, Switch } from "react-router-dom";


const CustomSelect = ({ field, form: { touched, errors }, ...props }) => (
  <div className="form-group">
    <label> {props.label} </label>
    <select {...props} className="form-control" {...field} />
  </div>
);


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manage: [],
      visible: false
    };
  }

  componentDidMount() {
    console.log(parseInt(this.props.location.search.split("?")[1]));
    axios
      .post(
        "http://localhost:3001/recupSouhait.php",
        parseInt(this.props.location.search.split("?")[1])
      )
      .then((response) => this.setState({ manage: response.data }));
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

  handleChange(event) {
      event.preventDefault();
  }

  

  submit = (values) => {
    values.idSouhait = parseInt(this.props.location.search.split("?")[1]);
    console.log(values);
    axios
      .post("http://localhost:3001/updateSouhait.php", values)
      .then((response) => response.data);
    // window.location.reload(false)
  };
  render() {
console.log(this.state.manage);
    return (
        <div>
                <p className="test">Editer un souhait</p>
                <hr className="barre2" />
      <div className="bar-container">
        <Formik
          enableReinitialize
          onSubmit={this.submit}
          initialValues={{
            titre: this.state.manage.titre,
            categorie: this.state.manage.categorie,
            descriptif: this.state.manage.descriptif,
      
          }}
        >
          {({ handleBlur, handleSubmit, errors, touched, values }) => (
            <form
              onSubmit={handleSubmit}
              onChange={this.handleChange.bind(this)}
            >

              <div className="form-group">
                <label>Titre</label>
                <Field
                  name="titre"
                  type="text"
                  className="form-control"
                />
                {errors.name && touched.name ? (
                  <div className="text-danger">{errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label>Categorie</label>
                <Field
                name="categorie"
                component={CustomSelect}
              >
                <option value="Voyage">Voyage</option>
                <option value="Rencontre">Rencontre</option>
                <option value="Amour">Amour</option>
                <option value="Loisirs">Loisirs</option>
                <option value="Autre">Autre</option>
              </Field>
                {errors.name && touched.name ? (
                  <div className="text-danger">{errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label>Description</label>
                <Field
                  name="descriptif"
                  type="text"
                  className="form-control"
                  component="textarea"
                  rows="10"
                  cols="50"
                />
                {errors.descriptif && touched.descriptif ? (
                  <div className="text-danger">{errors.descriptif}</div>
                ) : null}
              </div>
                
              <br />
              <div className="btn-save">
                <button type="submit" className="btnIconSelect" onClick={this.montre}>
                  <img
                    className="iconSave"
                    src={require("../img/save.png")}
                    alt=""
                  />
                  <p className="txtBtnIcon">Save</p>                 
                </button>
              </div>
            </form>
          )}
        </Formik>
        <PopupModifSouhait 
                    visible={this.state.visible}
                    cache={this.cache} />
      </div>
      </div>
    );
  }
}

export default Edit;
