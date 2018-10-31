
import React, { Component } from 'react';

import Box from '../../../components/box';
import Highcharts from 'highcharts';

import error from '../../../func/error';

const targetPercentage = 25;

class DRU extends Component {

  componentDidMount() {
    this.drawGraph();
  }

  componentDidUpdate() {
    this.drawGraph();
  }

  drawGraph() {
    setTimeout(() => {
      const {combined} = this.props.data.series[0];

      if(combined.length !== 32) {
        error('DRU Graph Error', 'Did not get 32 elements in the DRU graph data from Amplitude');
      }

      //we calculate the last 30 data points in the data set

      const actualData = [];

      for(let a=1; a<combined.length-1; a++) {
        let percentage = ( combined[a].count / combined[a].outof ) * 100;
        percentage = Math.round(percentage * 100) / 100;
        actualData.push(percentage);
      }

      Highcharts.chart(this.target, {
        chart: {
            type: 'areaspline',
            backgroundColor: null,
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          floating: true,
          itemStyle: {"color": "#ffffff", "cursor": "pointer", "fontSize": "1.0vw", "textOverflow": "ellipsis"},
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        colors: ['#ffffff', '#e8430e'],
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    //return this.value; // clean, unformatted number for year
                    /*const date = new Date();

                    date.setDate(date.getDate() - (30 - this.value));

                    return `${date.getDate()}/${date.getMonth()+1}` ;*/

                    return `${this.value} Days`;
                },

                style: {"color": "#ffffff", "cursor": "default", "fontSize": "0.6vw"},
            },
            gridLineWidth: 0,
            lineWidth:2,
            lineColor: '#ffffff'
        },
        yAxis: {
            max: 100,
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                },
                style: {"color": "#ffffff", "cursor": "default", "fontSize": "0.6vw"},
            },
            

          gridLineWidth: 0,
          lineWidth:2,
          lineColor: '#ffffff'
          
        },
        plotOptions: {
            areaspline: {
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: `Target (${targetPercentage}%)`,
            fillOpacity: 1,
            data: Array(30).fill(targetPercentage)
        }, {
            name: `Actual (${actualData[actualData.length-1]}%)`,
            fillOpacity: 0.8,
            data: actualData,
        }]
      });

    }, 5000);
  }

  render() {
    const obj = (
        <div style={{height: '100%'}}>
          <div style={{position: 'absolute', top: '6%', left: '18%'}}><span className="box-title">UNBOUNDED RETENTION</span></div>

          <div style={{height: '100%'}} ref={(element) => {this.target = element;}}>

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
