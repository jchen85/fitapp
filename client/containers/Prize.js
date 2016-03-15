import React, { Component } from 'react';
import '../styles/prize.scss';

import Speedwalk from '../components/prizes/Speedwalk';

export default class Prize extends Component {
  render() {
    const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Lightning_Bolt_on_Circle.svg/2000px-Lightning_Bolt_on_Circle.svg.png";
    
    return (
      <div className="prize">
        <div className="prize__header">
        </div>
        Today's prize:
        <div className="prize__card">
          <div className="prize__card__header">
            <p>Activation Cost: -100</p>
            <p>Duration: 4 hours</p>
          </div>
          <img src={image} />
          <h3>Speedwalk</h3>
          <p className="prize__descr">When Speedwalk is active, Step challenges can be completed with 75% the number of steps.</p>
        </div>
      </div>
    );
  }
}
