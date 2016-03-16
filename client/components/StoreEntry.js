import React, { Component } from 'react';
import '../styles/store.scss';
import Card from './Card';

export default class StoreEntry extends Component {
  render() {
    const { type } = this.props;
    
    return (
      <div className="store__entry">
        <Card type={type} />
      </div>
    );
  }
}
