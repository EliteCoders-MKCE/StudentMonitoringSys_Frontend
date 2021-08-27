import React from 'react';
import {Route,Switch} from 'react-router-dom';
import StudentLogin from './pages/studentLogin';
import staffLogin from './pages/staffLogin';
import studentPortal from './pages/studentPortal';
import staffPortal from './pages/staffPortal';

function App()
{
  return(
  <Switch>
    <Route exact path="/" component={StudentLogin}/>
    <Route exact path="/faculty-login" component={staffLogin} />
    <Route exact path="/faculty" component={staffPortal}/>
    <Route exact path="/faculty/:tab" component={staffPortal}/>
    <Route exact path="/student" component={studentPortal}/>
    <Route exact path="/student/:tab" component={studentPortal}/>
  </Switch>);
}
export default App;
