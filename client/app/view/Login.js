Ext.define('FellowMe.view.Login', {
	extend: 'Ext.form.Panel',
	alias: 'widget.login',
	layout: 'vbox',
	config: {
		/*
				modal        : true,
                hideOnMaskTap: false,
                height       : 300,
                width        : '90%',
                centered     : true,
				*/
		url: FellowMe.config.server + 'Authenticate',

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
				clearIcon: true,
				autoCapitalize: false
			},
			{
				xtype: 'passwordfield',
				name: 'password',
				label: 'Password',
				clearIcon: false
			},
			]
		},
		{
			xtype: 'titlebar',
			docked: 'top',
			title: 'Fellow Me',
			items: [{
				xtype: 'spacer'
			},
			{
				text: 'Log In',
				ui: 'confirm',
				align: 'right',
				handler: function() {

					this.up('formpanel').submit({
						method: 'POST',
						success: function(form, result){
							this.fireEvent("loginsuccess", result);
						},
						failure: function(form, result){
							this.fireEvent("loginfailure", result);
						},
						waitMsg: {
							message: 'Please wait…'
						}
					});
				}
			},
			/*{
				text: 'Taky Login',
				ui: 'confirm',
				align: 'right',
				handler: function() {
debugger;
					this.fireEvent("loginsuccess", {} );
				}
			},
			{
				text: '<img src="images/favicon.png" />',
				align: 'left'
			}*/]
		}]
	},
	initialize: function() {
		console.log('initialize home view');
		this.callParent();
	}
});

