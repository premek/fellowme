Ext.define('FellowMe.model.Event', {
	extend: 'Ext.data.Model',
	fields: ['co', 'kde', {
		name: 'kdy',
		type: 'date',
		dateFormat: 'MS'
	}/* TODO: za jak dlouho */],
	proxy: {
		type: 'ajax',
		url: FellowMe.config.server + 'Schedule',
		reader: {
			type: 'json',
			root: 'results'
		}
	}
});

