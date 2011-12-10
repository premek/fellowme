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
			xtype: 'titlebar',
			docked: 'top',
			//layout: 'fit',
			//height: 44, 
			items: [{
				xtype: 'textfield',
				clearIcon: true,
				value: '',
				placeHolder: 'Type someone\'s name',
				// FIXME
				id: 'searchinput'
			},{
				text:"?",
				align : 'right',
				id:"helpbutton"
			}]
		}]
	},
	initialize: function() {
		console.log('initialize home view');
		this.callParent();
	}
});

