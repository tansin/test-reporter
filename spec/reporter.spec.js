const Reporter = require('../jasmine/reporter');

describe('Reporter', () => {
  describe('used without options', () => {
    it('creates reporter', () => {
      expect(Reporter).not.toThrow();
    });
  });

  describe('used with default options', () => {
    let options;
    let reporter;

    beforeEach(function()  {
      options = { writeFn: (fileName, obj) => {} };
      spyOn(options, 'writeFn');
      reporter = Reporter(options);
    });

    it('writes empty report using default file name', () => {
      reporter.jasmineDone();
      expect(options.writeFn).toHaveBeenCalledWith(
        'testresults/report.json',
        jasmine.objectContaining({suites: [], specs: []}),
        {spaces: 2}
      );
    });

    describe('in case of failure', () => {
      it('reports failed expectations', () => {
        expect('This spec').toBe('reported as failed ;)');
      })
    });

    xdescribe('and when ignored', () => {
      it('reports ignored spec', () => {
        expect('Nothing happens').toBeTruthy();
      })
    })
  });

  afterAll(() => {
    console.log(':\nNOTE: One failed and one ignored spec are expected to be reported.');
  });

});
