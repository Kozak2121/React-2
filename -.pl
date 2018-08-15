import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Authorization from './containers/Authorization';
import Home from './containers/Home';

import Loading from '../../assets/icons/loading.gif';

class App extends Component {
  componentWillMount() {
    this.props.checkToken();
  }
  render() {
    const { authorized } = this.props;
    return (
      <div>
        {
          (authorized === null) ?
             (
               <div className="d-flex align-items-center justify-content-center w-100 h-100">
                 <img src={Loading} alt="Loading" />
               </div>
             )
          : (
            <div className="container-fluid">
              <div className="row" id="container">
                <Router>
                  <div>
                    <Route
                      path="/"
                      exact
                      component={
                          () => (authorized ? <Home /> : <Authorization form="login" />)
                        }
                    />
                    <Route
                      path="/create"
                      exact
                      render={
                          () => (!authorized ? <Authorization form="registration" />
                              : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />)
                        }
                    />
                  </div>
                </Router>
              </div>
            </div>
            )
        }
      </div>

    );
  }
}

export default App;
