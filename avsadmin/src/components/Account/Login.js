import React, { Component } from 'react';
import { Formik } from 'formik';
import * as axios from "axios";
import * as Yup from 'yup';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorConnect: false
        }
    }


  userSchema = Yup.object().shape({
    pseudo: Yup.string().min(3, 'trop court').required('User is required'),
    password: Yup.string().min(3, 'trop court').required('Password is required')
  })


  submit = (values, actions) => {
    axios.post('http://localhost:3001/login.php', values)
    .then(response => response.data ? this.props.changeLog() : this.setState({errorConnect: true}))
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 3000);
  }


  render() {
    return (
      <div>
        <Formik
        onSubmit={ this.submit}
        initialValues={{pseudo:'', password:''}}
        validationSchema={this.userSchema}
        >
          { ({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            touched
          }) => (
              <>
                <div className='adminLogo'>
                  <img src={require("../img/outline_admin_panel_settings_white_24dp.png")} alt="Logo Admin" />
                  <p>Interface Administrateur</p>
                </div>
                <hr />

              <form className='formAdminLogin' onSubmit={handleSubmit} >
                <p>Connexion</p>
                <div className='pseudoPassword'>
                  <label>Utilisateur</label>
                  <input placeholder='User' name='pseudo' value={values.email} onChange={handleChange} onBlur={handleBlur} type="text" />
                  { errors.pseudo && touched.pseudo ? <div className='text-danger'>{ errors.pseudo}</div> : null}
                </div>

                <div className='pseudoPassword' >
                  <label>Mot de passe</label>
                  <input placeholder='Password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" />
                  { errors.password && touched.password ? <div className='text-danger' >{ errors.password}</div> : null}
                </div>
                <button className='submitLogin' type='submit' disabled={isSubmitting}>Soumettre</button>
              </form>
              {
                  this.state.errorConnect && (
                      <h1>Mail ou Mot de passe incorrect</h1>
                  )
              }
              <hr />

            </>
          )}
        </Formik>
      </div>
    )
  }
}
