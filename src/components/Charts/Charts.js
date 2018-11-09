import React, { Component } from 'react';
import {handlePlural} from "../utils";
import PieChart from "./PieChart";
import './Charts.css';

class Charts extends Component {
  render() {
    const {suites, passedSum, failedSum, pendingSum, excludedSum} = this.props.report || {};

    const failedSuitesCount = suites.filter(suite => suite.failedSum > 0).length;
    const passedSuitesCount = suites.length - failedSuitesCount;
    const testSuiteData = {
      uniqueTitle: handlePlural('TestSuite', suites.length),
      dataTable: [
        ['Status', 'Count'],
        ['passed', passedSuitesCount],
        ['failed', failedSuitesCount],
        ['ignored', 0],
      ]
    };

    const testCaseCount = passedSum + failedSum + pendingSum + excludedSum;
    const testCaseData = {
      uniqueTitle: handlePlural('TestCase', testCaseCount),
      dataTable: [
        ['Status', 'Count'],
        ['passed', passedSum],
        ['failed', failedSum],
        ['ignored', pendingSum + excludedSum],
      ]
    };

    return (
      <div className='Charts'>
        <div className='Chart suite'>
          <PieChart data={testSuiteData} />
        </div>
        <div className='Chart'>
          <PieChart data={testCaseData} />
        </div>
      </div>
    );
  }
}

export default Charts;
