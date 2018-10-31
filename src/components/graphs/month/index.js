
import React, { Component } from 'react';

import Box from '../../../components/box';
import Highcharts from 'highcharts';

import error from '../../../func/error';
import numberFormat from '../../../func/numberFormat';

/*
this.props.data.series[n] =

  n=0 - Onboarding Questions Completed
  n=1 - First Open

*/

class DRU extends Component {
  componentDidMount() {

  }

  seriesWithOnlyThisMonth() {
    const {series, xValues} = this.props.data;

    const useIndices = [];
    const finalOut = [];

    const regex = /[0-9]+-([0-9]+)-[0-9]+/gm;
    const currentMonthNumber = new Date().getMonth() + 1;

    xValues.forEach((value, i) => {
      
      let m;

      while ((m = regex.exec(value)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }

          const month = Number.parseInt(m[1], 10);

          if(month === currentMonthNumber) {
            useIndices.push(i);
          }
      }

    });

    series.forEach((value) => {
      const temp = [];

      value.forEach((value2, i) => {
        if(useIndices.includes(i)) {
          temp.push(value2);
        }
      });

      finalOut.push(temp);
    });

    return finalOut;
  }

  getSum(arr) {
    let tot = 0;

    arr.forEach((value) => {
      tot += value.value;
    });

    return tot;
  }

  getSeriesData(data) {
    const series = [];

    for(let a=0; a<data.series[0].length; a++) {
      series.push(data.series[0][a].value - data.series[1][a].value);
    }

    return series;
  }

  render() {
    const series = this.seriesWithOnlyThisMonth();

    const addFunc = (a, b) => {
        return a + b;
    };

    const downloadsNum = this.getSum(series[1]);
    const signupNum = this.getSum(series[0]);
    const conversionPercent = Math.round(((signupNum/downloadsNum) * 100) * 100) / 100;

    const mauMonthlyCurrent = this.props.mauMonthly.series[0][this.props.mauMonthly.series[0].length-1].value;

    const druMonthlySeries = this.getSeriesData(this.props.druMonthly);
    const druMonthlyCurrent = druMonthlySeries[druMonthlySeries.length-1];

    const obj = (
        <div style={{height: '100%'}}>
          <div className="text-center"><span className="box-title">MONTH TO DATE</span></div>
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
                <span className="data-content">{numberFormat(mauMonthlyCurrent)}</span>
                <hr className="hr-emphasis" />
              </div>
              <div className="col">
                <span className="data-title">Returning Users</span>
                <br/>
                <span className="data-content">{numberFormat(druMonthlyCurrent)}</span>
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
