import React, { Component } from 'react';
import Moment from 'react-moment';
import Badge from "../Badge/Badge";
import './Header.css';

class Header extends Component {
  render() {
    const {metadata, start, end, passedSum, failedSum, pendingSum, excludedSum} = this.props.report || {};

    return (
      <header className='Header-layout'>
        <h2 className='Header-layout-description'>{metadata.title || 'HTML Report'}</h2>
        <Moment fromNow>{end}</Moment>
        <Badge kind='passed'>Passed: {passedSum}</Badge>
        <Badge kind='failed'>Failed: {failedSum}</Badge>
        <Badge kind='excluded'>Ignored: {pendingSum + excludedSum}</Badge>
        <Badge kind='stopwatch'>
          <span>Time elapsed: </span>
          <Moment duration={start}>{end}</Moment>
        </Badge>
      </header>
    );
  }
}

export default Header;
