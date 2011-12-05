Ext.define('FellowMe.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['Login', 'Search', 'SearchResults', 'Info', 'Main'],
	stores: ['PersonInfo','SearchResults'],
	// These "refs" will generate "getters" for each of the view component instances
	refs: [{
		ref: 'main',
		selector: 'mainview',
		xtype: 'mainview'
	},
	{
		ref: 'login',
		selector: 'loginview',
		autoCreate: true,
		xtype: 'loginview'
	},
	{
		ref: 'search',
		selector: 'searchview',
		xtype: 'searchview'
	},
	{
		ref: 'info',
		selector: 'infoview',
		xtype: 'infoview'
	}],

	init: function() {
		var main = this.getMainView().create({});

		console.log('Init home controller');

		Ext.Viewport.add(
		Ext.create('Ext.Panel', {
			//items: this.getLoginView().create({})
			scrollable: false,
			items: main
		}));
		main.setActiveItem(1);

		this.control({
			'button': {
				'tap': function() {
					Device.vibrate(30);
				}
			},
			'#loggedinuser': {
				'tap': function(button) {
					var name = button.getText();
					Ext.getCmp('searchinput').setValue(name);
					this.onSearchChange(name);
				}
			},
			'#infoBackButton': {
				'tap': function(button) {
					main.setActiveItem(0);
				}
			},

			'#searchinput': {
				'keyup': function(ev, input) {
					this.onSearchChange(input.target.value);
				},
				'change': function(ev, newVal) {
					this.onSearchChange(newVal);
				},
			},
			'#searchresults': {
				'select': function(list, user) {
					var store;
					
					console.log("Selected " + user.get('name'));
					main.setActiveItem(1);
				
					//store = Ext.getCmp('personinfo').getStore();
					//store.getProxy().extraParams.id = user.get('id');
					//store.load();

					Ext.getCmp('toptoolbar').setTitle(user.get('name'));

					store = Ext.getCmp('personevents').getStore();
					store.getProxy().extraParams.id = user.get('id');
					store.on('load',fnLog);
					store.load();

				}
			}
		});
	},

	onLaunch: function() {
		console.log('onLaunch home controller');
	},

	onSearchChange: function(newVal) {
		var fn = arguments.callee,
		me = this;

		clearTimeout(fn.timer); // cancel previous waiting calls
		if (!fn.lastCall || fn.lastCall != newVal) { // do not repeat same calls
			fn.timer = setTimeout(function() {
				var list = Ext.getCmp('searchresults'),
					store = list.getStore();

				fn.lastCall = newVal;

				console.log("Do XHR: " + newVal);
				list.deselect(list.getSelection());
				store.getProxy().extraParams.q = newVal;
				store.load();
			},
			700); // wait this long before doing ajax request
		}
	}
});

