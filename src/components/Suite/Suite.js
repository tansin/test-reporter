import React, { Component } from 'react';
import Spec from '../Spec/Spec';
import Badge from '../Badge/Badge';
import '../Header/Header.css';

class Suite extends Component {
  render() {
    const {topLevel, description, suites, specs, passedSum, failedSum, pendingSum, excludedSum} = this.props.suite;
    const status = failedSum === 0 ? 'passed' : 'failed';

    return (
      <article>
        <details>
          <summary className='Header-layout'>
            <Badge kind={status}/>
            <h3 className={'Header-layout-description ' + status}>
              {(topLevel && <strong>TestSuite: </strong>)}
              {description}
              </h3>
            {passedSum > 0 &&
              <Badge kind={'passed'}>{passedSum}</Badge>
            }
            {failedSum > 0 &&
              <Badge kind={'failed'}>{failedSum}</Badge>
            }
            {(pendingSum + excludedSum) > 0 &&
              <Badge kind={'pending'}>{pendingSum + excludedSum}</Badge>
            }
          </summary>
          {specs.map(spec =>
            <Spec key={spec.id} spec={spec}/>
          )}
          {suites.map(suite =>
            <Suite key={suite.id} suite={suite}/>
          )}
        </details>
      </article>
    );
  }
}

export default Suite;
