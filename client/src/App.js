import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'antd'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landingpage from './components/Landingpage.jsx'
import Customers from './components/CustomerOrder.jsx'
import Notfound from './components/NotFound.jsx'
import Adminpage from './components/AdminPage'
import Chefpage from './components/Chefpage'
import Myorder from './components/MyOrder.jsx'
import Useredit from './components/Useredit'
import store from './store/index.js'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <BrowserRouter> 
          <Switch>
            <Route exact path="/" component={Landingpage}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/myorder" component={Myorder} />
            <Route path="/chef" component={Chefpage} />
            <Route path="/admin" component={Adminpage}/>
            <Route path={`/edituser/:id`} component={Useredit}/>
            <Route component={Notfound} />
          </Switch>  
        </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
