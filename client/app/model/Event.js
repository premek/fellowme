Ext.define('FellowMe.model.Event', {
	extend: 'Ext.data.Model',
	fields: ['co', 'kde', {
		//name: 'kdy_date',
		name: 'kdy',
		type: 'date',
		dateFormat: 'MS',
	},
	//{
	//	name: 'kdy',
	//	type: 'string',
	//	convert: function(value, neco) {
	//		return neco.get('kdy_date');//.format('HH:MM');
	//	}
	//},
	/* TODO: za jak dlouho */],
	proxy: {
		type: 'ajax',
		url: FellowMe.config.server + 'Schedule',
		reader: {
			type: 'json',
			root: 'results'
		}
	}
});

