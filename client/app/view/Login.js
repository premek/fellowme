Ext.define('FellowMe.view.Login', {
	extend: 'Ext.form.Panel',
	//alias: 'widget.login',
	layout: 'vbox',
	title: "Log In",
	config: {
		/*
				modal        : true,
                hideOnMaskTap: false,
                height       : 300,
                width        : '90%',
                centered     : true,
				*/
		url: 'postUser.php',

		standardSubmit: false,
		items: [{
			xtype: 'fieldset',
			title: 'Please Log In',
			instructions: 'Please use your CVUT login and password.',
			defaults: {
				required: true,
				labelAlign: 'left',
				labelWidth: '40%'
			},
			items: [{
				xtype: 'textfield',
				name: 'login',
				label: 'Login',
				useClearIcon: true,
				autoCapitalize: false
			},
			{
				xtype: 'passwordfield',
				name: 'password',
				label: 'Password',
				useClearIcon: false
			},
			]
		},
		{
			xtype: 'toolbar',
			docked: 'top',
			items: [{
				xtype: 'spacer'
			},
			{
				text: 'Log In',
				ui: 'confirm',
				handler: function() {
					form.submit({
						waitMsg: {
							message: 'Submitting',
							cls: 'demos-loading'
						}
					});
				}
			}]
		}]
	},
	initialize: function() {
		console.log('initialize home view');
		this.callParent();
	}
});

