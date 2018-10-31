
import React, { Component } from 'react';

import Box from '../../../components/box';

class RightNow extends Component {
  componentDidMount() {

  }

  render() {
    const obj = (
        <div className="">
          <div className="text-center"><span className="box-title">ONLINE NOW</span></div>
          <br/>

          <div style={{height: '90%'}} ref={(element) => {this.target = element;}}>

          </div>
        </div>
      );

    return (
      <Box
        content={obj}
      />
    );
  }
}

export default RightNow;
