Ext.define('FellowMe.model.SearchResult', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name'],
    proxy: {
        type: 'ajax',
        url: FellowMe.config.server + 'Search',
        reader: {
            type: 'json',
            root: 'results' 
        }
    }
});
