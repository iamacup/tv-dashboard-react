
import React, { Component } from 'react';

import Box from '../../../components/box';

import numberFormat from '../../../func/numberFormat';


class Social extends Component {
  componentDidMount() {

  }

  render() {
    const {data} = this.props;

    const obj = (
        <div style={{height: '100%'}}>
          <div className="text-center"><span className="box-title">SOCIAL FOLLOWING</span></div>

          <div style={{height: '90%'}} ref={(element) => {this.target = element;}}>


            <div className="row">

              <div className="col text-right">
                
                <span className="data-title text-orange">Facebook </span>
                <span className="data-content">TBC</span>
                <br/>
                <span className="data-title text-orange">Instagram </span>
                <span className="data-content">{numberFormat(data.instagramFollowers)}</span>
              </div>

              <div className="col">
                <span className="data-content">{numberFormat(data.twitterFollowers)}</span>
                <span className="data-title text-orange"> Twitter</span>
                
                <br/>
                <span className="data-content">TBC</span>
                <span className="data-title text-orange"> LinkedIn</span>
                
              </div>


        

            </div>
            

            

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

export default Social;
