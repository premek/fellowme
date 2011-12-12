Ext.define('FellowMe.view.PersonInfo', {
	extend: 'Ext.Panel',
	alias: 'widget.personinfo',
	config: {
		//layout: 'fit',
		items: [
		{
			xtype: 'dataview',
			store: Ext.create('FellowMe.store.PersonInfo'),
			itemTpl: '<a href="mailto:{email}">{email}</a><br />Fakulta: {fakulta}<br />Obor: {obor}<br />Ročník: {rocnik}',
			id: 'personinfo',
			padding: 20,
		},
		{
			id: 'pitoptoolbar',
			xtype: 'titlebar',
			docked: 'top',
			items: [{
				ui: 'back',
				action: 'back',
				iconCls: 'arrow_left',
				iconMask: true,
				id: 'personinfoBackButton'
			}]
		}
		]
	}
});

