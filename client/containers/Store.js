import React, { Component, PropTypes } from 'react';
import Card from '../components/Card';
import CardTypes from '../constants/CardTypes';

export default class Store extends Component {
  render() {
    return (
      <div className="store__container">
        <Card type={CardTypes.Speedwalk} />
        <Card type={CardTypes.MagicUtensils} />
        <Card type={CardTypes.RocketFuel} />
      </div>
    );
  }
}

Store.propTypes = {
  user: PropTypes.object.isRequired
};
