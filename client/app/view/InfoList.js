Ext.define('FellowMe.view.InfoList', {
	extend: 'Ext.dataview.List',
	alias:'widget.infolist',
	config: {
		store: Ext.create('FellowMe.store.Events'),
		layout: 'fit',
		itemTpl: '<div class="event"><h2>{kdy} - {kde}</h2><p>{co}</p></div>', // TODO format date
		padding: '10 10 50 10',
	}
});

