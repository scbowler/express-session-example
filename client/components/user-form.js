import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.username);

    this.setState({ username: '' });
  }

  render() {
    const { username } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => this.setState({username: e.target.value})}/>
          </div>
        </div>
        <div className="text-right">
          <button className="btn btn-outline-primary">Save</button>
        </div>
      </form>
    );
  }
}

export default UserForm;
