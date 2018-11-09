import React, { Component } from 'react';
import {symbols} from "../utils";
import './Badge.css';

class Badge extends Component {
  render() {
    let {children, kind} = this.props;

    if (!children)
      children = symbols[kind].char;

    return (
      <span className={'Badge' + (kind ? ' ' + kind : '')}>{children}</span>
    );
  }
}

export default Badge;
