import React, { Component } from 'react';
import '../styles/prize.scss';

export default class Prize extends Component {
  render() {
    const { type } = this.props;
    
    return (
      <div className="prize__card">
        <div className="prize__card__header">
          <div className="prize__card__header__cost">
            <p>Activation Cost: {type.cost}</p> 
            <div className="carrot"></div>
          </div>
          <p>Duration: {type.duration}</p>
        </div>
        <img src={type.image} />
        <h3>Powerup: {type.name}</h3>
        <p className="prize__descr">{type.description}</p>
      </div>
    );
  }
}
