Ext.define('FellowMe.view.Search', {
	extend: 'Ext.form.Panel',
	//alias: 'widget.login',
	layout: 'vbox',
	title: "Search",
	config:{
	items: [
	{xtype:'fieldset',items:{
			xtype: 'textfield',
			clearIcon:true,
			value: 'Mr. Somebody', // FIXME
			id: 'searchinput'
		}},
	{
		xtype: 'searchresults',
		id:'searchresults'
	},
	{
		xtype: 'toolbar',
		docked: 'top',
		items: [{
			text: 'Mr. Somebody', // FIXME
			id: 'loggedinuser'
		},
		{
			xtype: 'spacer'
		},
		{
			text: 'Search',
			ui: 'confirm',
			handler: function() {
				form.submit({
					waitMsg: {
						message: 'Submitting',
						cls: 'demos-loading'
					}
				});
			}
		}]
	}]},
	initialize: function() {
		console.log('initialize home view');
		this.callParent();
	}
});

