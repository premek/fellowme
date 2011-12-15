Ext.define('FellowMe.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['Login', 'Search', 'SearchResults', 'Info', 'InfoList', 'PersonInfo', 'Main'],
	stores: ['PersonInfo', 'SearchResults'],
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

	main: undefined,

	init: function() {
		var store;
		var startScreen = 4; //login
		this.main = this.getMainView().create({});

		Ext.Viewport.add(
		Ext.create('Ext.Panel', {
			//items: this.getLoginView().create({})
			scrollable: false,
			items: this.main
		}));

		if (window.localStorage && localStorage.getItem("token")) {
			startScreen = 1; //person events
			Ext.Ajax.defaultHeaders.FellowMeToken = localStorage.getItem("token");
			this.showUserInfo(localStorage.getItem("myId"));
		}

		this.main.setActiveItem(startScreen);

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
					this.main.setActiveItem(4);
					//main.getLayout().getAnimation().setReverse(false);
				}
			},
			'#infoBackButton': {
				'tap': function(button) {
					//main.getLayout().getAnimation().setReverse(true);
					this.main.setActiveItem(0);
					//main.getLayout().getAnimation().setReverse(false);
				}
			},
			'#personinfoBackButton': {
				'tap': function(button) {
					//main.getLayout().getAnimation().setReverse(true);
					this.main.setActiveItem(1);
					//main.getLayout().getAnimation().setReverse(false);
				}
			},
			'#searchback': {
				'tap': function(button) {
					//main.getLayout().getAnimation().setReverse(true);
					this.main.setActiveItem(4);
					//main.getLayout().getAnimation().setReverse(false);
				}
			},

			'#infoInfoButton': {
				'tap': function(button) {
					this.main.setActiveItem(2);
				}
			},
			'#helpbutton': {
				'tap': function(button) {
					this.main.setActiveItem(3);
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
					this.showUserInfo(user.get('id'));
				}
			},
			'#loginscreen': {
				'loginfailure': function(result) {
					Device.showToast("Log in failed. Please try again.");
				},
				'loginsuccess': function(result) {
					Device.showToast("Log in successful.");

					if (window.localStorage) {
						localStorage.setItem("token", result.token);
						localStorage.setItem("myId", result.person);
					}

					Ext.Ajax.defaultHeaders.FellowMeToken = result.token;

					this.showUserInfo(result.person);
				}
			}
		});
	},

	onSearchChange: function(newVal) {
		if (typeof newVal !== 'string') return;

		var fn = arguments.callee,
		me = this;

		clearTimeout(fn.timer); // cancel previous waiting calls
		if (!fn.lastCall || fn.lastCall != newVal) { // do not repeat same calls
			fn.timer = setTimeout(function() {
				var list = Ext.getCmp('searchresults'),
				store = list.getStore();

				fn.lastCall = newVal;

				//				list.deselect(list.getSelection());
				store.removeAll();
				store.getProxy().extraParams.q = newVal;
				store.load();
			},
			700); // wait this long before doing ajax request
		}
	},

	showUserInfo: function(id) {
		Device.vibrate(30);

		var store,
			me = this;

		Ext.getCmp('toptoolbar').setTitle("Loading…"); 
		this.main.setActiveItem(1);

		store = Ext.getCmp('personevents').getStore();
		store.removeAll();
		store.getProxy().extraParams.id = id;
		store.load();

		store = Ext.getCmp('personinfo').getStore();
		store.getProxy().extraParams.id = id;
		store.on({
			load: function(store, records, successful) {
				if (successful) {
					Ext.getCmp('toptoolbar').setTitle(records[0].get('name')); // samo se to zkrati kdyz je to moc dlouhe
					Ext.getCmp('pitoptoolbar').setTitle(records[0].get('name'));
				} else {
					me.main.setActiveItem(4);
				}

			}
		});

		store.load();

	}
});

