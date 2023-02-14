import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import TopMenu from "../TopMenu/TopMenu";
import Login from "../Account/Login";
import Cookies from 'js-cookie';
import Manage from "../Contents/Manage";
import UserList from "../Users/UserList";
import ModifUser from "../Users/ModifUser";
import Tchat from "../Messages/Tchat"
import Edit from "../Contents/EditSouhait";


class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : false,
    }
  }

  readCookie = () => {
    const user = Cookies.get('user');
    if (user){
      this.setState({
        isLoggedIn : true
      })
    }
  }

  componentDidMount(){
    this.readCookie()
  }

 

  changeLog = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn})
    Cookies.set('user','login', { expires: 0.08 })
   
  }

  deleteCookie= () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn})
    Cookies.remove('user')
  } 

    render() {
      return(
      <Router>
        {this.state.isLoggedIn ? (
          <>
          <TopMenu deleteCookie={this.deleteCookie}/>
                <div className="section">
                  <Switch>
                    <Route path="/content" component={Manage}></Route>
                    <Route path="/users" component={UserList}></Route>
                    <Route path="/modifuser" component={ModifUser}></Route>
                    <Route path="/messages" component={Tchat}></Route>
                    <Route path="/edit" component={Edit}></Route>
                    <Redirect to="/content" />
                  </Switch>
                </div>
                </>
        ) : <div>
          <Login isLoggedIn={this.state.isLoggedIn} changeLog={this.changeLog} />
            <Redirect to="/Login" />
           </div>
        }
      </Router>
    )
  }
}

export default Admin