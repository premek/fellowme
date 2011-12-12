Ext.define('FellowMe.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['Login', 'Search', 'SearchResults', 'Info', 'InfoList', 'PersonInfo', 'Main'],
	stores: ['PersonInfo','SearchResults'],
	// These "refs" will generate "getters" for each of the view component instances
	// (...a jsou tu nahovno, zajimavejsi je view/Main.js)
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
	},
	{
		ref: 'personinfo',
		selector: 'personinfoview',
		xtype: 'personinfo'
	}],

	init: function() {
		var main = this.getMainView().create({});

		Ext.Viewport.add(
		Ext.create('Ext.Panel', {
			//items: this.getLoginView().create({})
			scrollable: false,
			items: main
		}));
		main.setActiveItem(0);

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
			'#helpBackButton': {
				'tap': function(button) {
					//main.getLayout().getAnimation().setReverse(true);
					main.setActiveItem(0);
					//main.getLayout().getAnimation().setReverse(false);
				}
			},
			'#infoBackButton': {
				'tap': function(button) {
					//main.getLayout().getAnimation().setReverse(true);
					main.setActiveItem(0);
					//main.getLayout().getAnimation().setReverse(false);
				}
			},
			'#personinfoBackButton': {
				'tap': function(button) {
					//main.getLayout().getAnimation().setReverse(true);
					main.setActiveItem(1);
					//main.getLayout().getAnimation().setReverse(false);
				}
			},
			'#infoInfoButton': {
				'tap': function(button) {
					main.setActiveItem(2); 
				}
			},
			'#helpbutton': {
				'tap': function(button) {
					main.setActiveItem(3); 
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
					Device.vibrate(30);

					var store;
					
					main.setActiveItem(1);
				
					Ext.getCmp('toptoolbar').setTitle(user.get('name')); // samo se to zkrati kdyz je to moc dlouhe
					Ext.getCmp('pitoptoolbar').setTitle(user.get('name'));

					store = Ext.getCmp('personevents').getStore();
					store.removeAll();
					store.getProxy().extraParams.id = user.get('id');
					store.load();

					store = Ext.getCmp('personinfo').getStore();
					store.getProxy().extraParams.id = user.get('id');
					store.load();


				}
			},
			'#loginscreen': {
				'loginsuccess': function() {
					main.setActiveItem(4);
					debugger;
				}
			}
		});
	},

	onSearchChange: function(newVal) {
		if(typeof newVal !== 'string') return;

		var fn = arguments.callee,
		me = this;

		clearTimeout(fn.timer); // cancel previous waiting calls
		if (!fn.lastCall || fn.lastCall != newVal) { // do not repeat same calls
			fn.timer = setTimeout(function() {
				var list = Ext.getCmp('searchresults'),
					store = list.getStore();

				fn.lastCall = newVal;

				console.log("Do XHR: " + newVal);
//				list.deselect(list.getSelection());
				store.removeAll();
				store.getProxy().extraParams.q = newVal;
				store.load();
			},
			700); // wait this long before doing ajax request
		}
	}
});

