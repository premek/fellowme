Ext.define('FellowMe.view.Help', {
	extend: 'Ext.Panel',
	alias: 'widget.help',
	config: {
		items: [
		{
			padding:20,
			html:'Tady bude nějaký krásný a chytrý text...' //FIXME
		},
		{
			xtype: 'titlebar',
			docked: 'top',
			title: 'About',
			items: [{
				ui: 'back',
				action: 'back',
				iconCls: 'arrow_left',
				iconMask: true,
				id: 'helpBackButton'
			}]
		}
		]
	}
});

