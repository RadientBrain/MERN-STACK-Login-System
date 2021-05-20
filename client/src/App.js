import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

//Routing imports
import PrivateRoute from './components/routing/PrivateRoute';

//Screens imports
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

const NoMatchPage = () => {
  return (
    <div id="center-scr">
        <h3 id="blink"><b>404-Not Found</b></h3>
        <p><Link to="/login"  style={{ textDecoration: 'none', border: '1px solid black', padding:'0.3rem'}}>
          <span style={{color:"white"}}>Go To Login Page</span></Link>
        </p>
    </div>

  );
};

const App = ()=> {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen}/>
          <Route exact path="/login" component={LoginScreen}/>
          <Route exact path="/register" component={RegisterScreen}/>
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>
          <Route component={NoMatchPage} />
        </Switch>
      </div>
      
    </Router>
  );
}

export default App;
