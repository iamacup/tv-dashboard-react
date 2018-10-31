
import React, { Component } from 'react';

import Box from '../../../components/box';
import Highcharts from 'highcharts';

import error from '../../../func/error';
import numberFormat from '../../../func/numberFormat';

/*
this.props.data.series[n] =

  n=0 - Onboarding Questions Completed
  n=1 - First Open
  n=2 - Add JAFA Button
  n=3 - JAFA Comment
  n=4 - News Comment
  n=5 - Start Session
  n=6 - Share JAFA
  n=7 - Share News
*/

class DRU extends Component {
  componentDidMount() {

  }

  getSeriesData(data) {
    const series = [];

    for(let a=0; a<data.series[0].length; a++) {
      series.push(data.series[0][a].value - data.series[1][a].value);
    }

    return series;
  }

  render() {

    const {data} = this.props;
    console.log(data);

    const mauWeeklyCurrent = data.mauWeekly.series[0][data.mauWeekly.series[0].length-1].value;
    const mauWeeklyTarget = Math.floor(data.mauWeekly.series[0][data.mauWeekly.series[0].length-2].value * 1.3, 10);

    const mauMonthlyCurrent = data.mauMonthly.series[0][data.mauMonthly.series[0].length-1].value;
    const mauMonthlyTarget = Math.floor(data.mauMonthly.series[0][data.mauMonthly.series[0].length-2].value * 1.3, 10);

    const druWeeklySeries = this.getSeriesData(data.druWeekly);

    const druWeeklyCurrent = druWeeklySeries[druWeeklySeries.length-1];
    const druWeeklyTarget = Math.floor(druWeeklySeries[druWeeklySeries.length-2] * 1.3, 10);

    const druMonthlySeries = this.getSeriesData(data.druMonthly);

    const druMonthlyCurrent = druMonthlySeries[druMonthlySeries.length-1];
    const druMonthlyTarget = Math.floor(druMonthlySeries[druMonthlySeries.length-2] * 1.3, 10);

    const obj = (
        <div style={{height: '100%'}}>
          <div className="text-center"><span className="box-title">TARGETS</span></div>
          <br/>

          <div style={{height: '90%'}} ref={(element) => {this.target = element;}}>

            <div className="row text-center">
              <div className="col">
                <span className="data-title">AU This Week</span> 
                <br/>
                <span className={mauWeeklyTarget <= mauWeeklyCurrent ? 'data-content text-green' : 'data-content-smaller text-orange'}>
                  {numberFormat(mauWeeklyCurrent)}
                </span> <span className={mauWeeklyTarget > mauWeeklyCurrent ? 'data-content' : 'data-content-smaller'}> 
                  {numberFormat(mauWeeklyTarget)}
                </span>
                
              </div>
              <div className="col">
                <span className="data-title">RU This Week</span>
                <br/>
                <span className={druWeeklyTarget <= druWeeklyCurrent ? 'data-content text-green' : 'data-content-smaller text-orange'}>
                  {numberFormat(druWeeklyCurrent)}
                </span> <span className={druWeeklyTarget > druWeeklyCurrent ? 'data-content' : 'data-content-smaller'}> 
                  {numberFormat(druWeeklyTarget)}
                </span>
              </div>
            </div>

            <div className="row text-center">
              <div className="col">
                <span className="data-title">AU This Month</span> 
                <br/>
                <span className={mauMonthlyTarget <= mauMonthlyCurrent ? 'data-content text-green' : 'data-content-smaller text-orange'}>
                  {numberFormat(mauMonthlyCurrent)}
                </span> <span className={mauMonthlyTarget > mauMonthlyCurrent ? 'data-content' : 'data-content-smaller'}> 
                  {numberFormat(mauMonthlyTarget)}
                </span>
              </div>
              <div className="col">
                <span className="data-title">RU This Month</span>
                <br/>
                <span className={druMonthlyTarget <= druMonthlyCurrent ? 'data-content text-green' : 'data-content-smaller text-orange'}>
                  {numberFormat(druMonthlyCurrent)}
                </span> <span className={druMonthlyTarget > druMonthlyCurrent ? 'data-content' : 'data-content-smaller'}> 
                  {numberFormat(druMonthlyTarget)}
                </span>
              </div>
            </div>

            <div className="text-center"><span>Colored number = actual</span></div>
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
