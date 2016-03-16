import React, { Component, PropTypes } from 'react';
import StoreEntry from '../components/StoreEntry';
import Card from '../components/Card';
import CardTypes from '../constants/CardTypes';

export default class Store extends Component {
  render() {
    return (
      <div className="store__container">
        <h2>Welcome to the store!</h2>
        Spend your carrots on powerups to help you perform better
        <div className="store__entries__container">
          <StoreEntry type={CardTypes.Speedwalk} />
          <StoreEntry type={CardTypes.MagicUtensils} />
          <StoreEntry type={CardTypes.RocketFuel} />
        </div>
      </div>
    );
  }
}

Store.propTypes = {
  user: PropTypes.object.isRequired
};
