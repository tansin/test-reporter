const Reporter = require('../../jasmine/reporter');
const env = jasmine.getEnv();
env.configure({random: false});
env.addReporter(Reporter({reportDirPath: 'public', metadata: {title: 'Jasmine JSON nested Report'}}));
