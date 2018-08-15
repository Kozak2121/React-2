import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Experementarium from '../../../../assets/experemental.png';
import Spiral from '../../../../assets/spiral.png';
import Egmont from '../../../../assets/egmont.png';

class Authorization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    };

    this.Changed = this.Changed.bind(this);
    this.SignIn = this.SignIn.bind(this);
    this.SignUp = this.SignUp.bind(this);
  }

  Changed({ target: { id, value } = {} }) {
    this.setState({ [id]: value });
  }

  SignIn(event) {
    this.props.Login(this.state.email, this.state.password);
    event.preventDefault();
  }

  SignUp(event) {
    this.props.Create(this.state.username, this.state.email, this.state.password);
    event.preventDefault();
  }
  render() {
    const { username, email, password } = this.state;
    const { form, success } = this.props;
    return (
      <div id="authorization">
        <div id="flex-form">
          <div id="experementarium">
            <img src={Experementarium} alt="Experementarium" />`
          </div>
          <div id="form" className="card">
            <img src={Spiral} alt="Spiral" />
            <Form onSubmit={(form === 'login') ? this.SignIn : this.SignUp} className="w-75">
              {
                  (this.props.form !== 'login') ?
                    <FormGroup>
                      <Label htmlFor="username">Username</Label>
                      <Input type="text" id="username" onChange={this.Changed} value={username} required={(form !== 'login')} />
                    </FormGroup>
                      : null

              }
              <FormGroup>
                <Label htmlFor="email">{(form === 'login' ? 'Username or Email' : 'Email')}</Label>
                <Input type="text" id="email" onChange={this.Changed} value={email} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" onChange={this.Changed} value={password} required />
              </FormGroup>
              <div>
                <Button color="info" className="w-75">{(this.props.form === 'login') ? 'Sign In' : 'Sign Up'}</Button>
              </div>
            </Form>
            { (success !== null && !success && form === 'login') ?
              <p style={{ color: 'red' }}>Your Username or Password is not correct. Please check it.</p>
                : null
            }
            { (success !== null && !success && form !== 'login') ?
              <p style={{ color: 'red' }}>This user already exist.</p>
                : null
            }
            <div id="alt-btn">
              <Button tag={Link} to="/login" color="link">Forgot password</Button>
              <Button tag={Link} to={(form === 'login') ? '/create' : '/'} color="link">{(form === 'login') ? 'Create account' : 'Login'}</Button>
            </div>
          </div>
          <div className="card" id="egmont">
            <img src={Egmont} alt="Egmont" />
          </div>
        </div>
      </div>
    );
  }
}

Authorization.propTypes = ({
  Login: PropTypes.func.isRequired,
  Create: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
});

export default Authorization;