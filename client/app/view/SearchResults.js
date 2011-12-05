Ext.define('FellowMe.view.SearchResults', {
	extend: 'Ext.dataview.List',
	alias:'widget.searchresults',
	config: {
		store: 'SearchResults',
		layout: 'fit',
		//height: '200',
		itemTpl: '<div class=\'{typ}\'>{name}</div>',
		id:'searchresults',
		onItemDisclosure: function(){} // show disclosure buttons
	}
});

