require('./modelLibraries.js');

const bd = browser.driver;

var specReporter = require('jasmine-spec-reporter');

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new specReporter.SpecReporter());
bd.manage().window().maximize();