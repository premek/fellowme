Ext.define('FellowMe.view.Search', {
	extend: 'Ext.form.Panel',
	alias:  'widget.search',
	layout: 'vbox',
	title:  'Search',
	config: {
		scrollable: false,
		items: [
		{
			xtype: 'searchresults',
			id: 'searchresults',
			flex: 1
		},
		{
			xtype: 'toolbar',
			docked: 'top',
			layout: 'fit',
			height: 44, 
			items: [{
				scrollable:false,
				xtype: 'textfield',
				clearIcon: true,
				value: 'abc',
				// FIXME
				id: 'searchinput'
			}]
		}]
	},
	initialize: function() {
		console.log('initialize home view');
		this.callParent();
	}
});

