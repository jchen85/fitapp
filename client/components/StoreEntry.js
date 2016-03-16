import React, { Component } from 'react';
import '../styles/store.scss';
import Card from './Card';

export default class StoreEntry extends Component {
  render() {
    const { type } = this.props;
    
    return (
      <div className="store__entry">
        <Card type={type} />
        <div className="store__cost">
          -800 <div className="store__carrot" />
        </div>
        <button className="store__buy_btn">
          Buy
        </button>
      </div>
    );
  }
}
