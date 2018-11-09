export default class ReportService {

  async getReport() {
    let report;

    try {
      const response = await fetch('report.json');
      report = await response.json();
    } catch (e) {
      return;
    }

    if (!report || !Array.isArray(report.suites) || !Array.isArray(report.specs))
      return;

    const totals = setAndGetResults(report);

    Object.assign(report, totals);

    markTopLevelSuites(report.suites);

    return report;
  }
}


function setAndGetResults(suite) {
  const suitesResults = setAndGetResultsForAll(suite.suites);
  const specResults = calculateSpecResults(suite.specs);
  const resultSums = sumUp(specResults, suitesResults);

  Object.assign(suite, resultSums);

  return resultSums;
}

function setAndGetResultsForAll(suites) {
  return suites
    .map(suite => setAndGetResults(suite))
    .reduce(sumUp, getEmptySumObject())
}

function calculateSpecResults(specs) {
  return specs
    .map(spec => ({
      passedSum: spec.status === 'passed' ? 1 : 0,
      failedSum: spec.status === 'failed' ? 1 : 0,
      pendingSum: spec.status === 'pending' ? 1 : 0,
      excludedSum: spec.status === 'excluded' ? 1 : 0,
    }))
    .reduce(sumUp, getEmptySumObject())
}

function sumUp(acc, cur) {
  return {
    passedSum: acc.passedSum + cur.passedSum,
    failedSum: acc.failedSum + cur.failedSum,
    pendingSum: acc.pendingSum + cur.pendingSum,
    excludedSum: acc.excludedSum + cur.excludedSum,
  }
}

function getEmptySumObject() {
  return {passedSum: 0, failedSum: 0, pendingSum: 0, excludedSum: 0};
}

function markTopLevelSuites(suites) {
  suites.forEach(suite => suite.topLevel = true);
}
