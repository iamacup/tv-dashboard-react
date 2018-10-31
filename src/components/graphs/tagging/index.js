
import React, { Component } from 'react';

import Box from '../../../components/box';

class DRU extends Component {
  componentDidMount() {

  }

  render() {
    const obj = (
        <div className="">
          <div className="text-center"><span className="box-title">NEWS SCHEDULE</span></div>
          <br/>

          <div className="text-center" style={{height: '90%'}} ref={(element) => {this.target = element;}}>

            <span className="data-title">Tagging Status</span> 

            <br/><br/>
            <span className="news-tagged">UPDATED</span>

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

export default DRU;
