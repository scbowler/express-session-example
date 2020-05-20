import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.updateCounter = this.updateCounter.bind(this);
  }

  componentDidMount() {
    this.getCount();
  }

  async getCount() {
    const resp = await fetch('/api/count');
    const { count = 0 } = await resp.json();

    this.setState({ count });
  }

  async updateCounter(type) {
    const resp = await fetch(`/api/count/${type}`, {method: 'post', body: '{}'});
    const { count } = await resp.json();

    this.setState({ count });
  }

  render() {
    return (
      <div className="row text-center justify-content-center">
        <div className="col-2">
          <button onClick={() => this.updateCounter('subtract')} className="btn btn-outline-danger">-</button>
        </div>
        <div className="col-2">
          <h1>{this.state.count}</h1>
        </div>
        <div className="col-2">
          <button onClick={() => this.updateCounter('add')} className="btn btn-outline-success">+</button>
        </div>
      </div>
    )
  }
}

export default Counter;
