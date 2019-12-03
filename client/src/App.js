import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from '../src/components/login';
import Header from '../src/components/common/header';
import { Container } from 'react-bootstrap';
import { AuthenticateRoute } from './components/authentication';
import Orders from './components/Orders';
import Reviews from './components/reviews';

class App extends React.Component {
  render(){
  return (
    <div className="App">
    <Router>
      <Header/>
        <Container>
            <Switch>
                <Route exact path="/" component={Login}/>
                <AuthenticateRoute exact path="/orders" component={Orders} />
                <AuthenticateRoute exact path="/review/:product_id" component={Reviews} />
            </Switch>
        </Container>
        </Router>
    </div>
  );
  }
}

export default App;
