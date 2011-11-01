Ext.define('FellowMe.view.Info', {
	extend: 'Ext.form.Panel',
	alias: 'widget.info',
	layout: 'vbox',
	title: "Info",
	config: {
		items: [{
			html: "AA"
		},
		{
			xtype: 'toolbar',
			docked: 'top',
			items: [{
				text: 'Back',
				ui: 'back',
				id: 'infoBackButton'
			}
			/*,
			{
				xtype: 'spacer'
			},
			{
				text: 'Close',
				ui: 'confirm',
				handler: function() {
					form.submit({
						waitMsg: {
							message: 'Submitting',
							cls: 'demos-loading'
						}
					});
				}
			}*/
			]
		}]
	}
});

