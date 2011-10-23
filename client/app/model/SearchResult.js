Ext.define('FellowMe.model.SearchResult', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name'],
    proxy: {
        type: 'ajax',
        url: 'http://skola.vyhnal.net/via/results.json.php', //TODO: config
        reader: {
            type: 'json',
            root: 'results' 
        }
    }
});
