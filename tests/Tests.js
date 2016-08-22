
var TestBrowser = function(browser) {

	this.browser = browser;

	this.reset = function() {
		return browser
			.url('http://localhost:8080')
			.waitForElementVisible('body', 5000);
	};

};


module.exports = {

	before: function(client) {
		this.browser = new TestBrowser(client);
	},
	beforeEach: function(client) {
		this.browser.reset();
	},
	'Load Home' : function(client) {

		client.assert.visible('body')
			.assert.title('Bizagi - Vacations')
			.pause(200)
			.assert.visible('aside.body-aside')
			.assert.visible('ul.menu');

		/*
		client
			.url("http://www.google.com")
			.waitForElementVisible('body', 1000)
			.setValue('input[type=text]', 'nightwatch')
			.waitForElementVisible('button[name=btnG]', 1000)
			.click('button[name=btnG]')
			.pause(1000)
			.assert.containsText('#main', 'The Night Watch')
			.end();
			*/
	},
/*

	beforeEach: function(browser) {
		this.ddg.reset();

	},

	'search single word' : function(browser) {
		this.ddg.search('gato')
			.resultsShouldContain('gato');
	},

	'search exact phrase': function(browser) {
		this.ddg.search('"perro verde"')
			.resultsShouldContain('perro verde');
	},*/

	after: function(browser) {
		browser.end();
	}
};

