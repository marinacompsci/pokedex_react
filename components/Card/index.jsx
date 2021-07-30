import React from "react";

class Welcome extends React.Component {
  render() {
    return (
      <div className="card">
        <div>
          <img src={this.props.picture} alt="Pokemon" />
        </div>
        <p className="name">{this.props.name}</p>
        <p className="descr">{this.props.description}</p>
      </div>
    );
  }
}

export default Welcome;
