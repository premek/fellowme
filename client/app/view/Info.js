Ext.define('FellowMe.view.Info', {
	extend: 'Ext.Panel',
	alias: 'widget.info',
	layout: 'vbox',
	title: "Info",
	config: {
		items: [{
			xtype: 'dataview',
			store: Ext.create('FellowMe.store.PersonInfo'),
			itemTpl: '<h2>{fullname}</h2><p><a href="mailto:{email}">{email}</a></p>',
			id: 'personinfo',
			padding: 20
		},
		{
			xtype: 'toolbar',
			docked: 'top',
			items: [{
				text: 'Search',
				ui: 'back',
				id: 'infoBackButton'
			}]
		}]
	}
});

