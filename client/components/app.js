import React from 'react';
import UserForm from './user-form';
import Counter from './counter';

const postConfig = {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: false
    };

    this.setUsername = this.setUsername.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  async componentDidMount(){
    this.getUsername();
  }

  async getUsername() {
    const resp = await fetch('/api/user');
    const { username } = await resp.json();

    this.setState({ username });
  }

  async setUsername(username) {
    console.log('Username:', username);
    const resp = await fetch('/api/user', { 
      ...postConfig,
      body: JSON.stringify({ username }) 
    });
    const user = await resp.json();

    this.setState(user);
  }

  async signOut() {
    const resp = await fetch('/api/sign-out');

    if(resp.status === 200) {
      this.setState({username: null});
    }
  }

  renderUserForm() {
    const { username } = this.state;

    if(username === false){
      return <h1>Loading...</h1>
    }

    if(!username) {
      return (
        <div className="mt-5">
          <UserForm onSubmit={this.setUsername} />
        </div>
      );
    }

    return null;
  }

  renderCounter() {
    const { username } = this.state;

    if(!username) {
      return null;
    }

    return (
      <div>
        <div className="row my-5">
          <div className="col-12 text-center">
            <h2>Welcome back {username}</h2>
            <button onClick={this.signOut} className="btn btn-outline-info">Sign Out</button>
          </div>
        </div>
        <Counter />
      </div>
    );
  }

  render() {
    return (
      <div className="container pt-5">
        <h1 className="text-center">Express Session Example</h1>

        {this.renderUserForm()}
        {this.renderCounter()}
      </div>
    );
  }
}

export default App;
