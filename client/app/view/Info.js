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
			padding: 20,
			height: 90,
			scrollable:false
		},{
			xtype: 'dataview',
			store: Ext.create('FellowMe.store.Events'),
			itemTpl: '<div class="event"><h2>{kdy} - {kde}</h2><p>{co}</p></div>', // TODO format date
			id: 'personevents',
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

