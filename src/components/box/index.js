
import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <div className="outer-box">
        <div className="inner-box">
          <div className="my-card" style={{height: '100%'}}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default Box;
