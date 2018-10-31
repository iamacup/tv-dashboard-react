
import React, { Component } from 'react';
import Flip from 'react-reveal/Flip';
import $ from 'jquery';

import tomPicture from '../../images/people/tom.png';
import jamesPicture from '../../images/people/james.png';
import danPicture from '../../images/people/dan.png';
import joePicture from '../../images/people/joe.png';

const duration = 7000;

const data = [
    {
      picture: tomPicture,
      name: 'Tom',
      job: 'CTO',
    },
    {
      picture: jamesPicture,
      name: 'James',
      job: 'Head of Content',
    },
    {
      picture: danPicture,
      name: 'Dan',
      job: 'CEO',
    },
    {
      picture: joePicture,
      name: 'Joe',
      job: 'Head of Design',
    },
];

class Twitter extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: data[0],
        index: 0,
      };
  }

  componentDidMount() {
    this.update();
  }

  update() {
    setTimeout(() => {
      this.update();
    }, duration);

    if(this.state.index === data.length-1) {
      this.setState({data: data[0], index: 0});
    } else {
      this.setState({data: data[this.state.index + 1], index: this.state.index + 1});
    }
  }

  render() {
    return (
        <div className="container-fluid">
          <Flip left cascade>
            <div className="text-center" key={this.state.index} style={{paddingLeft: '36%', paddingRight: '36%', paddingTop: '5%'}}>
              <img className="img-fluid" src={this.state.data.picture}/>
            </div>

            <br/><br/>
            <div className="text-center">
              <div className="splash-large">{this.state.data.name}</div>
              <div className="splash-large">{this.state.data.job}</div>
            </div>
          </Flip>
        </div>
      );
  }
}

export default Twitter;
