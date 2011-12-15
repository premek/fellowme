Ext.define('FellowMe.view.Help', {
	extend: 'Ext.Panel',
	alias: 'widget.help',
	config: {
        scrollable: true,
		items: [
		{
			padding: '50 70 70 70',
            //xtype: 'dataview',
			html:'<center>'+
            '<img src="app/images/logo_large.png" alt="FellowMe" />'+
            '<h2>Fellow Me v. 1.0</h2><br /><br />'+
			'Authors:<br />Ondřej Šťastný<br />Přemysl Vyhnal<br />Jan Černý<br />Jakub Podlaha<br /><br />'+
			'Your private data are handled with care. '+
			'Do your own security audit at <a href="http://code.google.com/p/fellowme/source/checkout">our source code repository.</a><br />'+
			'Feel free to report <a href="http://code.google.com/p/fellowme/issues/list">bugs</a> in this software.<br /><br />'+
			'Copyright @2011<br /><br />'+
            '</center>'+
            '<h2>End User Rights:</h2>'+
            'This software is made available to you by FellowMe team. You may use it copy and distribute it to others. You may also change the source co of this application according to License Agreement.<br /> Thia application uses online services which are not controlled by FellowMe team amd may become unavailable or may contain incoret or outdated information, FellowMe team disclaim all warranties, whether express or implied, including without limitation, warranties that the Services are merchantable and fit for your particular purposes. <br /> This terms may be updated as needed without any prior notice.<br />FellowMe team may discontinue or change the Services at its discretion.<br />'+
            '<h2>Licensing Information</h2>'+
            'All parts of this software are provided under open source software licenses with all code publicly <a href="http://code.google.com/p/fellowme/issues/list">available</a>. <br /> <a href="http://www.sencha.com/products/touch/">Sencha Touch</a> is available under <a href="http://www.gnu.org/copyleft/gpl.html">GNU GPL license v3</a>. <br /> All remaining parts are cowered by MIT license.<br />'+ //TODO
            '<h2>Privacy Policy</h2>'+
            'This applacation only provides data publicly available or data available to student and eployes of Electrotechnical Faculty of CTU Prague. To access non-public data, successful login with valid CTU ID ir required. Usernames and paswords are only stored localy on your device and can be deleted.'
    
    
    
    //TODO
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

