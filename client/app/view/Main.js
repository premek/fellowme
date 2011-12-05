Ext.define('FellowMe.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'FellowMe.view.Search',
        'FellowMe.view.Info'
    ],

    config: {
        //fullscreen: true,
        layout: 'card',
		animation:'slide',
        items: [
            {
                xtype: 'search'
            },
            {
                xtype: 'info'
            }
        ]
    }
});
