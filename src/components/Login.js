import React from 'react';
import { CometChat } from '@cometchat-pro/chat';
import { NotificationManager } from 'react-notifications';
class Login extends React.Component {

  state = {
    username: '',
    isLoading: false,
  };

  handleLogin = event => {
    event.preventDefault();
    const { username } = this.state;
    if(!username){
      NotificationManager.error('Username must not be empty', 'Login Failed');
      return;
    }
    this.setState({
      isLoading: true
    })
    CometChat.login(username, process.env.REACT_APP_COMETCHAT_API_KEY).then(
      user => {
        console.log("Login Successful:", {user});
        NotificationManager.success('You are now logged in', 'Login Success');
        this.setState({ username: '', isLoading: false });
        this.props.history.push({
          pathname: '/call',
          state: { user }
        })
      },
      error => {
        NotificationManager.error('Username is not registered', 'Login Failed');
        this.setState({
          isLoading: false
        })
      }
    );
  };


  render() {
    const {username, isLoading} = this.state;
    const loadingSpinner = isLoading? <span className="fa fa-spin fa-spinner"/>  :'';
    return (
      <div className='login-page'>
        <div className='login'>
          <div className='login-container'>
            <div className='login-form-column'>
              <form>
                <h3>Welcome!</h3>
                <p>
                  Login with the username "superhero1" or "superhero2" to test this React-CometChat application. To create your own user, visit{' '}
                  <a href='https://prodocs.cometchat.com/reference#createuser'>
                    our documentation
                  </a>
                </p>
                <div className='form-wrapper'>
                  <label>Username</label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    placeholder='Enter your username'
                    value={username}
                    onChange={event => this.setState({ username: event.target.value })}
                    className='form-control'
                    required
                  />
                </div>
                <button type='submit' onClick={this.handleLogin} disabled={isLoading}>
                  LOG IN {loadingSpinner}
                </button>
              </form>
            </div>
            <div className='login-image-column'>
              <div className='image-holder'>
                <img src={loginIllustration} alt='Login illustration' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
