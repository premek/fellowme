Ext.define('FellowMe.view.Help', {
	extend: 'Ext.Panel',
	alias: 'widget.help',
	config: {
		items: [
		{
			padding:20,
			html:'<center><h2>Fellow Me v. 1.0<h2><br><br>'+
			'Authors:<br>Ondřej Šťastný<br />Přemysl Vyhnal<br>Jan Černý<br>Jakub Podlaha<br><br>'+
			'Your private data are handled with care. '+
			'Do your own security audit at <a href="http://code.google.com/p/fellowme/source/checkout">our source code repository.</a><br>'+
			'Feel free to report <a href="http://code.google.com/p/fellowme/issues/list">bugs</a> in this software.<br><br>'+
			'Copyright @2011</center>' //TODO
		},
		{
			xtype: 'titlebar',
			docked: 'top',
			title: 'About',
			items: [{
				ui: 'back',
				action: 'back',
				iconCls: 'arrow_left',
				iconMask: true,
				id: 'helpBackButton'
			}]
		}
		]
	}
});

