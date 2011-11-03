Ext.define('FellowMe.model.PersonInfo', {
	extend: 'Ext.data.Model',
	fields: ['id', 'name', 'titul', 'email', 'rocnik', 'fakulta', 'obor', {
		name: 'fullname',
		convert: function(v, rec) {
			return (rec.data.titul ? rec.data.titul + " ": "") + rec.data.name;
		}
	}],
	proxy: {
		type: 'ajax',
		url: FellowMe.config.server + 'Person',
		reader: {
			type: 'json',
			root: 'results'
		}
	}
});

