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
				text:"Login",
				align: 'left',
				ui:"back",
				id:"searchback"
			},{
				hidden:true // nejaky bug, tohle pomaha...
			},{
				align: 'right',				
				xtype: 'textfield',
				clearIcon: true,
				value: '',
				placeHolder: 'Type someone\'s name',
				// FIXME
				id: 'searchinput'
			},{
				// nic to nedela, je to jen pro klid uzivatele, a aby si to nepletl a nechtel kliknout na About, asi se to muze dat pryc ;)
				align: 'right',				
				iconCls: 'search',
				iconMask: true,
				ui:'confirm' 
			}]
		}]
	},
	initialize: function() {
		console.log('initialize home view');
		this.callParent();
	}
});

