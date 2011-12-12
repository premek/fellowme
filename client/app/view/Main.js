Ext.define('FellowMe.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'FellowMe.view.Search',
        'FellowMe.view.Info',
        'FellowMe.view.PersonInfo',
        'FellowMe.view.Help'
    ],

    config: {
        //fullscreen: true,
        layout: {
			type: 'card',
			/* pekny ale na androidu to moc nefunguje... 
			animation: {
	            type: 'cube',
				direction: 'left'
			}*/
		},
        items: [
            {
                xtype: 'search'
            },
            {
                xtype: 'info'
            },
            {
                xtype: 'personinfo'
            },
            {
                xtype: 'help'
            },
            {
            	xtype: 'login'
            }
        ]
    }
});
