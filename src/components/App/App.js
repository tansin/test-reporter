import React, { Component } from 'react';
import ReportService from '../../services/ReportService';
import Header from "../Header/Header";
import Suite from "../Suite/Suite";
import Charts from "../Charts/Charts";
import './App.css';

class App extends Component {
  state = {};

  constructor(props) {
    super(props);
    new ReportService().getReport().then(report => {
      this.setState({ report: report });
    });
  }

  render() {
    const report = this.state.report;

    if (!report) {
      return <main><p>No report is available <i>yet</i></p></main>;
    }

    return (
      <>
        <Header report={report}/>
        <main>
          <section>
            <Charts report={report}/>
          </section>
          <section>
            {report.suites.map(suite =>
              <Suite key={suite.id} suite={suite}/>
            )}
          </section>
        </main>
      </>
    );
  }
}

export default App;
