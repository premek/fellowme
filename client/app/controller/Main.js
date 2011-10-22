Ext.define('FellowMe.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['Login'],
	//stores: ['Stations'],
	// These "refs" will generate "getters" for each of the view component instances
	refs: [{
		ref: 'login',
		selector: 'loginview',
		autoCreate: true,
		xtype: 'loginview'
	}],

	init: function() {

		console.log('Init home controller');

		Ext.Viewport.add(
		Ext.create('Ext.Panel', {
			items: this.getLoginView().create({})
		}));

		this.control({
			// example of listening to *all* button taps
			'button': {
				'tap': function() {
					console.log('Every button says Hello world');
				}
			}
		});
	},

	onLaunch: function() {
		console.log('onLaunch home controller');
	}
});

