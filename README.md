# test-reporter

Jasmine custom reporter which generates hierarchical HTML report.
When used with Protractor, it takes screenshots on failure.

## Development

### Installation

`yarn install`

### Building

`yarn build`

### Testing

Jasmine custom reporter should be tested first:

`yarn jasmine`

Then you can start html reporter which consumes the jasmine json report:

`yarn start`

## Usage

test-reporter can be used like any Jasmine custom reporter
(https://jasmine.github.io/tutorials/custom_reporter):

```javascript
const reporter = require('./jasmine/reporter');
jasmine.getEnv().addReporter(reporter({
  reportDirPath: 'path/to/report/dir',
  metadata: {
    title: 'Report Title'
  }
}))
```  

## Acknowledgment

Visual design of this reporter is made similar to
https://github.com/etxebe/protractor-html-reporter

CSS Framework: https://github.com/yegor256/tacit

## License
MIT
