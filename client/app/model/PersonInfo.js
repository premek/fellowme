Ext.define('FellowMe.model.PersonInfo', {
	extend: 'Ext.data.Model',
	fields: ['id', 'name', 'titul', 'email', 'rocnik', 'fakulta', 'obor', 'katedra', "typ"],
	proxy: {
		type: 'ajax',
		url: FellowMe.config.server + 'Person',
		reader: {
			type: 'json',
			root: 'results'
		}
	}
});

