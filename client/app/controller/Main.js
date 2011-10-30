Ext.define('FellowMe.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['Login', 'Search', 'SearchResults'],
	stores: ['SearchResults'],
	// These "refs" will generate "getters" for each of the view component instances
	refs: [{
		ref: 'login',
		selector: 'loginview',
		autoCreate: true,
		xtype: 'loginview'
	},
	{
		ref: 'search',
		selector: 'searchview',
		xtype: 'searchview'
	}],

	init: function() {

		console.log('Init home controller');

		Ext.Viewport.add(
		Ext.create('Ext.Panel', {
			//items: this.getLoginView().create({})
			scrollable: false,
			items: this.getSearchView().create({
				userName: 'New Awesome'
			})
		}));

		this.control({
			'#loggedinuser': {
				'tap': function(button) {
					var name = button.getText();
					Ext.getCmp('searchinput').setValue(name);
					this.onSearchChange(name);
				}
			},
			'#searchinput': {
				'keyup': function(ev, input) {
					this.onSearchChange(input.value);
				},
				'change': function(ev, newVal) {
					this.onSearchChange(newVal);
				},
			},
			'#searchresults': {
				'select': function(list, selected) {
					console.log("Selected " + selected.get('name'));
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
				store.getProxy().extraParams.query = newVal;
				store.load();
			},
			700); // wait this long before doing ajax request
		}
	}
});

