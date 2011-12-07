Ext.define('FellowMe.store.Events', {
    extend: 'Ext.data.Store',
    requires: 'FellowMe.model.Event',
    model: 'FellowMe.model.Event',
    autoLoad: false,
	sorters: [{
		property : 'kdy',
		direction: 'ASC'
	}],
});
