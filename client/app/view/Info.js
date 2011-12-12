Ext.define('FellowMe.view.Info', {
	extend: 'Ext.Panel',
	alias: 'widget.info',
	title: "Info",
	config: {
		//layout: 'fit',
		items: [
		/*{
			xtype: 'dataview',
			store: Ext.create('FellowMe.store.PersonInfo'),
			itemTpl: '<h2>{fullname}</h2><p><a href="mailto:{email}">{email}</a></p>',
			id: 'personinfo',
			padding: 20,
			height: 90,
			scrollable:false
		},*/
		{
			xtype: 'infolist',
			id: 'personevents',
		},
		{
			id: 'toptoolbar',
			xtype: 'titlebar',
			docked: 'top',
			title: 'Info',
			items: [{
				ui: 'back',
				action: 'back',
				iconCls: 'search',
				iconMask: true,
				id: 'infoBackButton'
			},{
				text: 'Info',
				ui: 'confirm',				
				id: 'infoInfoButton',
				align : 'right'
			}]
		}
		]
	}
});

