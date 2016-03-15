import React, { Component, PropTypes } from 'react';

export default class Store extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="store__container">
        Hi
      </div>
    );
  }
}

Store.propTypes = {
  user: PropTypes.object.isRequired
};
