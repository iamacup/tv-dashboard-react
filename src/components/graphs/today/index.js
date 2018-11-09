
import React, { Component } from 'react';

import Box from '../../../components/box';
import Highcharts from 'highcharts';

import error from '../../../func/error';
import numberFormat from '../../../func/numberFormat';

/*
this.props.data.series[n] =

  n=0 - Onboarding Questions Completed
  n=1 - First Open
  n=2 - Start Session

*/

class DRU extends Component {
  componentDidMount() {

  }

  render() {
    const {series} = this.props.data;

    const downloadsNum = series[1][1].value;
    const signupNum = series[0][1].value;

    let conversionPercent = Math.round(((signupNum/downloadsNum) * 100) * 100) / 100;

    if(conversionPercent > 100) {
      conversionPercent = '???';
    }

    const activeNum = series[2][1].value;
    const returningNum = series[2][1].value - downloadsNum;

    const obj = (
        <div style={{height: '100%'}}>
          <div className="text-center"><span className="box-title">TODAY</span></div>
          <br/>

          <div style={{height: '90%'}} ref={(element) => {this.target = element;}}>

            <div className="row text-center">
              <div className="col">
                <span className="data-title">Downloads</span> 
                <br/>
                <span className="data-content">{numberFormat(downloadsNum)}</span>
                <hr className="hr-emphasis" />
              </div>
              <div className="col">
                <span className="data-title">Signup Convert %</span>
                <br/>
                <span className="data-content">{conversionPercent}%</span>
                <hr className="hr-emphasis" />
              </div>
            </div>

            <div className="row text-center" style={{marginTop: '1.5vh'}}>
              <div className="col">
                <span className="data-title">Active Users</span> 
                <br/>
                <span className="data-content">{numberFormat(activeNum)}</span>
                <hr className="hr-emphasis" />
              </div>
              <div className="col">
                <span className="data-title">Returning Users</span>
                <br/>
                <span className="data-content">{numberFormat(returningNum)}</span>
                <hr className="hr-emphasis" />
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

export default DRU;
