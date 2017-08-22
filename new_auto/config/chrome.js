exports.config = {

	seleniumAddress: 'http://localhost:4444/wd/hub',

	suites: require('../suites/suite.js'),

	capabilities: {
		browserName: 'chrome'
	},

	framework: 'jasmine2',

	allScriptsTimeout: 120000,
	getPageTimeout: 120000,
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 120000
	},

	onPrepare: function () {
		require('../src/onPrepare.js')
	}
}