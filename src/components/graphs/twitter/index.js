
import React, { Component } from 'react';

import $ from 'jquery';

class Twitter extends Component {
  componentDidMount() {
    const {width, height} = this.props;

    $(this.thing).html(`<a class="twitter-timeline" data-theme="dark" data-width="${width}" data-height="${height}" href="https://twitter.com/jafa?ref_src=twsrc%5Etfw">Tweets by jafa</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`);
  }

  render() {
    return (
        <div ref={(element) => {this.thing = element;}}></div>
      );
  }
}

export default Twitter;
