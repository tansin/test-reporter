import React, { Component } from 'react';
import {capitalize, getHashCode} from "../utils";
import Moment from 'react-moment';
import Badge from '../Badge/Badge';
import '../Header/Header.css';
import './Spec.css';

class Spec extends Component {
  render() {
    const {description, status, start, end, failedExpectations, fullName} = this.props.spec || {};

    return (
      <article>
        <details>
          <summary className='Header-layout'>
            <Badge kind={status}/>
            <h3 className={'Header-layout-description ' + status}>{description}</h3>
            <Badge kind={status}>{capitalize(status)}</Badge>
          </summary>
          <div className='Spec-content'>
            <p>
              <Badge kind='stopwatch'/>
              <span> Time elapsed: </span>
              <Moment duration={start} date={end}/>
            </p>
            {failedExpectations.map(expectation =>
              <p key={getHashCode(expectation.stack)}>
                <Badge kind='failed'/>
                <span> {expectation.message}</span>
                <code>{expectation.stack}</code>
              </p>
            )}
            {failedExpectations.length > 0 &&
              <p><a href={fullName.replace(/[\/\\]/g, ' ').substring(0, 230) + '.png'} target="_blank" rel="noopener noreferrer">Error screenshot</a></p>
            }
          </div>
        </details>
      </article>
    );
  }
}

export default Spec;
