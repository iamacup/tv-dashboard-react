
import React, { Component } from 'react';

import Box from '../../../components/box';
import Highcharts from 'highcharts';

import error from '../../../func/error';

class DRU extends Component {

  getSeriesData() {
    const {data} = this.props;
    const series = [];

    for(let a=0; a<data.series[0].length; a++) {
      series.push(data.series[0][a].value - data.series[1][a].value);
    }

    return series;
  }

  componentDidMount() {
    this.drawGraph();
  }

  componentDidUpdate() {
    this.drawGraph();
  }

  drawGraph() {
    const series = this.getSeriesData();
    const {xValues} = this.props.data;

    setTimeout(()=>{

      Highcharts.chart(this.target, {
        chart: {
            type: 'line',
            backgroundColor: null,
        },
        legend: {
          enabled: false,
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        colors: ['#e8430e'],
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    const str = xValues[this.value].substr(5).split('-');

                    return str[1] + '-' + str[0];
                },

                style: {"color": "#ffffff", "cursor": "default", "fontSize": "0.6vw"},
            },
            gridLineWidth: 0,
            lineWidth:2,
            lineColor: '#ffffff'
        },
        yAxis: {
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return this.value;
                },
                style: {"color": "#ffffff", "cursor": "default", "fontSize": "0.6vw"},
            },
            

          gridLineWidth: 0,
          lineWidth:2,
          lineColor: '#ffffff'
          
        },
        plotOptions: {
            line: {
                dataLabels: {
                  enabled: true,
                  style: {"color": "#ffffff", "cursor": "default", "fontSize": "0.6vw"},
                },
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
            name: `Data`,
            fillOpacity: 1,
            data: series,
        }]
      });

    }, 5000);
  }

  render() {
    const obj = (
        <div style={{height: '100%'}}>
          <div style={{position: 'absolute', top: '6%', left: '15%'}}><span className="box-title">DAILY RETURNING USERS</span></div>

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
