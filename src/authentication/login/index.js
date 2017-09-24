import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

class Login extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }
  
  componentWillReceiveProps(nextProps) {
    const { auth, history } = nextProps;

    if (auth.isLoaded && !auth.isEmpty) {
      history.push('/organizer/acm');
    }
  }
  
  onChange = (value, type) => {
    this.setState({
      [type]: value
    });
  }

  onLogin = () => {
    const { email, password } = this.state;
    const { firebase } = this.props;
    firebase.login({ email, password });
  }

  render() {
    const { email, password } = this.state;
    const { authError } = this.props;
    return (
      <div className="auth-form">
        {authError && <div className="auth-error">{authError.message}</div>}
        <input className="auth-field" type="text" value={email} onChange={({ target: { value }}) => this.onChange(value, 'email')}/>
        <input className="auth-field" type="password" value={password} onChange={({ target: { value }}) => this.onChange(value, 'password')} />
        <div className="signup-button" onClick={this.onLogin}>Login</div>
      </div>
    );
  }

}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth, authError } }) => ({ 
      auth,
      authError
    })
  )
)(Login);