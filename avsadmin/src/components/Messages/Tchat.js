import React, { Component } from "react";
import { Field, Formik } from "formik";
import * as axios from "axios";




class sendTopicIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manage: [],
     
    };
  }


  handleChange(event) {
      event.preventDefault();
  }

  

  submit = (values) => {
  
    axios
      .post("http://localhost:3001/insertTopicIdea.php", values)
      .then((response) => response.data);
    // window.location.reload(true)
  };
  render() {
console.log(this.state.manage);
    return (
        <div>
                <p className="test">Partager un sujet de discussion</p>
                <hr className="barre2" />
      <div className="bar-container">
        <Formik
          enableReinitialize
          onSubmit={this.submit}
          initialValues={{
            message: this.state.manage.message,
          }}
        >
          {({ handleBlur, handleSubmit, errors, touched, values }) => (
            <form
              onSubmit={handleSubmit}
              onChange={this.handleChange.bind(this)}
            >
              <div className="form-group">
                <label>Topic Idea</label>
                <Field
                  name="message"
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
                <button type="submit" className="btnIconSelect">
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
      </div>
      </div>
    );
  }
}

export default sendTopicIdea;
