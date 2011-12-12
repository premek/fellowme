Ext.define('FellowMe.store.Events', {
    extend: 'Ext.data.Store',
    requires: 'FellowMe.model.Event',
    model: 'FellowMe.model.Event',
    autoLoad: false,
	sorters: [{
		property : 'kdy',
		direction: 'ASC'
	}],
	getGroupString : function(record) {
        return Ext.Date.format(record.get('kdy'), 'D j.n.');
    },
});
