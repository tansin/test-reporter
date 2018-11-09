const shortenSpecFilePaths = require('../jasmine/pathShortener').shortenSpecFilePaths;

describe('Path Shortener', () => {

  describe('shorten away the common part of all paths', () => {

    it('having mixed similarity', () => {
      const suites = [
        {__specFilePath: '/path/to/1/one.spec.js'},
        {__specFilePath: '/path/from/2/two.spec.js'},
        {__specFilePath: '/path/to/3/three.spec.js'},
      ];

      shortenSpecFilePaths(suites);

      expect(suites).toEqual([
        {__specFilePath: 'to/1/one.spec.js'},
        {__specFilePath: 'from/2/two.spec.js'},
        {__specFilePath: 'to/3/three.spec.js'},
      ])
    });

    it('having ascending similarity', () => {
      const suites = [
        {__specFilePath: '/path/to/1/one.spec.js'},
        {__specFilePath: '/path/to/a/2/two.spec.js'},
        {__specFilePath: '/path/to/a/b/3/three.spec.js'},
      ];

      shortenSpecFilePaths(suites);

      expect(suites).toEqual([
        {__specFilePath: '1/one.spec.js'},
        {__specFilePath: 'a/2/two.spec.js'},
        {__specFilePath: 'a/b/3/three.spec.js'},
      ])
    });

    it('having descending similarity', () => {
      const suites = [
        {__specFilePath: '/path/to/a/b/1.spec.js'},
        {__specFilePath: '/path/to/a/2.spec.js'},
        {__specFilePath: '/path/to/3.spec.js'},
      ];

      shortenSpecFilePaths(suites);

      expect(suites).toEqual([
        {__specFilePath: 'a/b/1.spec.js'},
        {__specFilePath: 'a/2.spec.js'},
        {__specFilePath: '3.spec.js'},
      ])
    });

    it('having first and some more empty paths', () => {
      const suites = [
        {},
        {__specFilePath: '/path/to/a/b/1.spec.js'},
        {__specFilePath: ''},
        {__specFilePath: '/path/to/3.spec.js'},
      ];

      shortenSpecFilePaths(suites);

      expect(suites).toEqual([
        {},
        {__specFilePath: 'a/b/1.spec.js'},
        {__specFilePath: ''},
        {__specFilePath: '3.spec.js'},
      ])
    })

  });

  describe('does nothing', () => {

    it('if suites is undefined', () => {
      let suites;
      shortenSpecFilePaths(suites);
      expect(suites).toBeUndefined();
    });

    it('if suites is empty', () => {
      const suites = [];
      shortenSpecFilePaths(suites);
      expect(suites).toEqual([])
    });

    it('if suites has no paths', () => {
      const suites = [{}, {}];
      shortenSpecFilePaths(suites);
      expect(suites).toEqual([{}, {}])
    });

    it('if suites has only same paths', () => {
      const suites = [{__specFilePath: 'path'}, {__specFilePath: 'path'}];
      shortenSpecFilePaths(suites);
      expect(suites).toEqual([{__specFilePath: 'path'}, {__specFilePath: 'path'}])
    });

    it('if suites has only one of two paths set', () => {
      const suites = [{}, {__specFilePath: 'path'}];
      shortenSpecFilePaths(suites);
      expect(suites).toEqual([{}, {__specFilePath: 'path'}])
    });

  })

});
