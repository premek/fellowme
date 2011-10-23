Ext.define('FellowMe.model.SearchResult', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name'],
    proxy: {
        type: 'ajax',
        url: 'http://localhost/premek/results.json.php',
        reader: {
            type: 'json',
            root: 'results' 
        }
    }
});
