
import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Sound from 'react-sound';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/global-style.css';
import bgImage from './images/back.jpg';
import danBGImage from './images/dan-pisstake.jpg';
import allBGImage from './images/normal-screen.jpg';

import Retention from './components/graphs/retention';
import Today from './components/graphs/today';
import DRU from './components/graphs/DRU';
import Downloads from './components/graphs/downloads';
import Month from './components/graphs/month';
import Tagging from './components/graphs/tagging';
import Twitter from './components/graphs/twitter';
import Social from './components/graphs/social';
import Targets from './components/graphs/targets';
import Bouncers from './components/bouncers';
import Box from './components/box';

//import exampleData from './example.json';

const adjustData = [
  {date: '2018-10-01', count: 11},
  {date: '2018-10-02', count: 18},
  {date: '2018-10-03', count: 11},
  {date: '2018-10-04', count: 14},
  {date: '2018-10-05', count: 7},
  {date: '2018-10-06', count: 8},
  {date: '2018-10-07', count: 13},
  {date: '2018-10-08', count: 6},
  {date: '2018-10-09', count: 10},
  {date: '2018-10-10', count: 16},
  {date: '2018-10-11', count: 12},
  {date: '2018-10-12', count: 10},
  {date: '2018-10-13', count: 10},
  {date: '2018-10-14', count: 8},
  {date: '2018-10-15', count: 24},
  {date: '2018-10-16', count: 29},
  {date: '2018-10-17', count: 34},
  {date: '2018-10-18', count: 31},
  {date: '2018-10-19', count: 58},
  {date: '2018-10-20', count: 65},
  {date: '2018-10-21', count: 66},
  {date: '2018-10-22', count: 78},
  {date: '2018-10-23', count: 86},
  {date: '2018-10-24', count: 65},
  {date: '2018-10-25', count: 41},
  {date: '2018-10-26', count: 64},
  {date: '2018-10-27', count: 70},
  {date: '2018-10-28', count: 121},
  {date: '2018-10-29', count: 64},
  {date: '2018-10-30', count: 65},
  {date: '2018-10-31', count: 97},
  {date: '2018-11-01', count: 127},
];

//update frequency in minutes
const updateFrequency = 20;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
      screenNumber: 1,
    };
  }

  starsBG() {
    $('body')
      .css('background', `url(${bgImage}) no-repeat center center fixed`)
      .css('background-size', 'cover');
  }

  danBG() {
    $('body')
      .css('background', `url(${danBGImage}) no-repeat center center fixed`)
      .css('background-size', 'cover');
  }

  allBG() {
    $('body')
      .css('background', `url(${allBGImage}) no-repeat center center fixed`)
      .css('background-size', 'cover');
  }

  async componentDidMount() {
    //set the background image
    this.starsBG();

    $(document).keypress((e) => {
        const keyNum = e.which - 48;

        if(keyNum === 1) {
          this.setState({screenNumber: keyNum, error: null, data:null}, () => {
            this.doUpdate(true);
          });

        } else if(keyNum === 2 || keyNum === 3 || keyNum === 4 || keyNum === 5) {
          this.setState({screenNumber: keyNum, error: null, data: '', playSound: false});
        } else if(keyNum === 67) {
          this.setState({playSound: true, soundKey: Math.random()});
        }
    });

    this.doUpdate(true);
  }

  doUpdate(instant) {
    setTimeout(async () => {
      try {
        const now = new Date();
        let updateTime = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}/${now.getMonth()+1}`;

        //uncomment this for 'blink less' update on the dashboard
        this.setState({data: null});   

        const res = await axios.get(`http://localhost:8080/update`);

        if(res.data.generalStatus === 'success') {
          this.setState({data: res.data, updateTime});
        } else {
          throw new Error(res.data.payload);
        }

        this.doUpdate();

        //this uses the test stuff
        //this.setState({data: exampleData, updateTime});

      } catch (error) {
        this.doUpdate();
        this.setState({error: error.toString()});
      }
    }, instant === true ? 1 : updateFrequency*60*1000);
  }

  render() {
    const {error, data, screenNumber} = this.state;

    if(error !== null) {
      return (
          <div className="container">
            <div className="d-flex justify-content-center" style={{paddingTop: '20%'}}>
              <div className="alert alert-danger" role="alert">
                <h4>Oooooo Shiiiiii.....</h4>
                {this.state.error}
              </div>
            </div>
          </div>
        ); 
    }

    if(data === null) {
      return (
          <div className="container">
            <div className="d-flex justify-content-center" style={{paddingTop: '20%'}}>
              <div className="la-ball-grid-pulse la-3x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ); 
    } 

    let soundItem = null;

    if(this.state.playSound === true) {
      soundItem = (
          <Sound
            onFinishedPlaying={() => { this.setState({playSound: false}); }}
            key={this.state.soundKey}
            url="http://static1.squarespace.com/static/5a254f97cd39c30b5ba88697/t/5be19d616d2a739c3fdc5178/1541512546580/sound.mp3/original/sound.mp3"
            playStatus={Sound.status.PLAYING}
          />
        );
    }

    //we know data is not null here
    const {payload} = data;

    if(screenNumber === 1) {
        this.starsBG();

        const twitterBox = (
            <div style={{padding: '3%', height: '100%'}}>
              <div className="d-flex justify-content-center h100">
                <Twitter 
                  width="400"
                  height="100%"
                />
              </div>
            </div>
          );

        const retentionBox = (
            <div style={{height: '100%'}}>
              {/*<Retention
                data={payload.retention}
              />*/}
              <Downloads
                data={payload.druDaily}
                adjustData={adjustData}
              />
            </div>
          );

        const druBox = (
            <div style={{height: '100%'}}>
              <DRU
                data={payload.druDaily}
                adjustData={adjustData}
              />
            </div>
          );

        const todayBox = (
            <div>
              <Today
                data={payload.day1}
              />
            </div>
          );

        const monthBox = (
            <div>
              <Month
                data={payload.day30}
                druMonthly={payload.druMonthly}
                mauMonthly={payload.mauMonthly}
              />
            </div>
          );

        const logoBox = (
              <div className="d-flex align-items-center h100">
                  <img className="img-fluid" src={require('./images/logo.svg')} style={{paddingLeft: '15px'}}/>
              </div>
       
          );

        const taggingBox = (
            <Tagging />
          )

        const socialBox = (
            <Social 
              data={payload.social}
            />
          );

        const targetsBox = (
            <div>
              <Targets 
                data={{
                  druWeekly: payload.druWeekly,
                  druMonthly: payload.druMonthly,
                  mauWeekly: payload.mauWeekly,
                  mauMonthly: payload.mauMonthly,
                }}
              />
            </div>
          );

        return (
          <div className="container-fluid h100">

            <div className="row no-gutters h100">

              <div className="col-sm-9">

                <div className="row no-gutters" style={{height: '30%'}}>
                
                  <div className="col-6">
                    {retentionBox}
                  </div>
                  <div className="col-6">
                    {druBox}
                  </div>
                </div>

                <div className="row no-gutters" style={{height: '35%'}}>
                  <div className="col-4 h100">
                    {todayBox}
                  </div>

                  <div className="col-4 h100">
                    {targetsBox}
                  </div>

                  <div className="col-4 h100">
                    {monthBox}
                  </div>
                </div>

                <div className="row no-gutters" style={{height: '25%'}}>
                    <div className="col-3">
                      {logoBox}
                    </div>
                    
                    <div className="col-3">
                      {taggingBox}
                    </div>

                    <div className="col-6">
                      {socialBox}
                    </div>
                </div>
                
                <div className="row no-gutters" style={{height: '8%'}}>
                    <div className="col-6 text-left">
                        <span className="data-title">Last Update: {this.state.updateTime}</span>
                    </div>
                </div>
                
              </div>

              <div className="col-sm-3 h100">
                {twitterBox}
              </div>

            </div>

            {soundItem}
          </div>
        );
    } else if(screenNumber === 2) {
      this.starsBG();
      return (
          <div>
            <Bouncers />
            {soundItem}
          </div>
        ); 
    } else if (screenNumber === 3) {
      this.starsBG();
      return (
          <div style={{paddingTop: '12%', paddingLeft: '10%', paddingRight: '10%'}}>
            <img className="img-fluid" src={require('./images/logo.svg')} />
            <div className="text-center">
              <span className="splash-large">JUST A FANS ANALYSIS</span>
            </div>
            {soundItem}
          </div>
        );
    } else if(screenNumber === 4) {
      this.danBG();
      return <div>{soundItem}</div>;
    } else if(screenNumber === 5) {
      this.allBG();
      return <div>{soundItem}</div>;
    }
  }
}

export default App;
