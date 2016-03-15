import React, { Component } from 'react';
import '../../styles/prize.scss';

export default class Speedwalk extends Component {
  render() {
    let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Lightning_Bolt_on_Circle.svg/2000px-Lightning_Bolt_on_Circle.svg.png";

    return (
        <img className="prize" src={image} />
    );
  }
}
