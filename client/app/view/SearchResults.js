Ext.define('FellowMe.view.SearchResults', {
	extend: 'Ext.dataview.List',
	alias:'widget.searchresults',
	config: {
		store: 'SearchResults',
		itemTpl: '<div class=\'{typ}\'>{name}</div>',
		id:'searchresults',
		//emptyText: 'Nobody to display. Please try to find someone else…',
		padding: '0 0 50 0',
		onItemDisclosure: function(){} // show disclosure buttons
	}
});

