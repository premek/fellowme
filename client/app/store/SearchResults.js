Ext.define('FellowMe.store.SearchResults', {
    extend: 'Ext.data.Store',
    requires: 'FellowMe.model.SearchResult',
    model: 'FellowMe.model.SearchResult',
    autoLoad: false 
});
