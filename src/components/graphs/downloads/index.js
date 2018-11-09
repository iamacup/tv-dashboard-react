
import React, { Component } from 'react';

import Box from '../../../components/box';
import Highcharts from 'highcharts';
import regression from 'regression';

import error from '../../../func/error';

class DRU extends Component {

  getSeriesData() {
    const {data, adjustData} = this.props;
    const series = [];

    let firstOpenSeries = [];

    for(let a=0; a<data.xValues.length; a++) {
      let found = false;

      for(let b=0; b<adjustData.length; b++) {
        if(data.xValues[a] === adjustData[b].date) {
          firstOpenSeries.push(adjustData[b].count);
          found = true;
        }
      }

      if(found === false) {
        firstOpenSeries.push(data.series[1][a].value);
      }
    }

    for(let a=0; a<data.series[0].length; a++) {
      series.push(firstOpenSeries[a]);
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

    console.log(series);


    //const result = regression.linear([[0, 1], [32, 67], [12, 79]]);
    let regressionData = [];

    for(let a=0; a<series.length; a++) {
      regressionData.push([a, series[a]]);
    }

    const result = regression.linear(regressionData);
    let regressionSeries = [];
    console.log(result);

    console.log('hello');
    console.log(result.points);
    console.log(result.points.length);

    for(let a=0; a<result.points.length; a++) {
      regressionSeries.push(result.points[a][1]);
    }


    console.log('final output');
    console.log(regressionSeries);



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
        colors: ['#e8430e', '#ffffff'],
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
        },{
            name: `trend`,
            fillOpacity: 0.5,
            data: regressionSeries,
        }]
      });

    }, 5000);
  }

  render() {
    const obj = (
        <div style={{height: '100%'}}>
          <div style={{position: 'absolute', top: '6%', left: '15%'}}><span className="box-title">DOWNLOADS</span></div>

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
