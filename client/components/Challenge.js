import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { challenge, actions, user } = this.props;
    window.props = this.props;
    return (
      <div>
        {challenge.category}
        <button onClick={() => actions.addMember(challenge.id, user.id)}>Join</button>
      </div>
    );
  }
}

Counter.propTypes = {
  challenge: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
