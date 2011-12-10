Ext.define('FellowMe.view.InfoList', {
	extend: 'Ext.dataview.List',
	alias:'widget.infolist',

	config: {
		/// grouped:true, // nefunguje na seznamu s 1 prvkem
		store: Ext.create('FellowMe.store.Events'),
		//layout: 'fit',
		//emptyText: 'No events to display',
		itemTpl: '<div class="event">{[Ext.Date.format(values.kdy, "D j.n. G:i")]} {kde}<br />{co}</div>',
		padding: '0 0 50 0',
	}
});

