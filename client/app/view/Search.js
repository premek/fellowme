Ext.define('FellowMe.view.Search', {
	extend: 'Ext.form.Panel',
	alias: 'widget.search',
	layout: 'vbox',
	title: "Search",
	config: {
		items: [{
			xtype: 'fieldset',
			items: {
				xtype: 'textfield',
				clearIcon: true,
				value: 'abc',
				// FIXME
				id: 'searchinput'
			}
		},
		{
			xtype: 'searchresults',
			id: 'searchresults',
			flex: 1
		},
		{
			xtype: 'toolbar',
			docked: 'top',
			items: [{
				text: 'Mr. Somebody',
				// FIXME
				id: 'loggedinuser'
			},
			{
				xtype: 'spacer'
			},
			{
				text: 'Search',
				//iconCls: 'search',
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
		}]
	},
	initialize: function() {
		console.log('initialize home view');
		this.callParent();
	}
});

