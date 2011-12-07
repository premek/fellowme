Ext.define('FellowMe.view.InfoList', {
	extend: 'Ext.dataview.List',
	alias:'widget.infolist',
	config: {
		store: Ext.create('FellowMe.store.Events'),
		layout: 'fit',
		emptyText: 'No events to display',
		itemTpl: '<div class="event">{[Ext.Date.format(values.kdy, "D j.n. G:i")]}<br />{kde}<br />{co}</div>',
		padding: '10 10 50 10',
	}
});

