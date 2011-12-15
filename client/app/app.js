var FellowMe = {};

FellowMe.config = {
	windowTitle: "Fellow Me",
	server: "http://fellowme.ondrejstastny.cz/Home/"
};

FellowMe.fnLog = function(){console.log("LOG"); console.log(arguments)}

// fallback used in browser
if(typeof(Device)==='undefined'){
	Device = {
		vibrate: Ext.emptyFn,
		showToast: function(message){
			var box = Ext.Msg.show({
					msg: message,
					height:'3em',
					modal: false
			});
			setTimeout(function(){box.hide()},2000);
		},
		getModel: Ext.emptyFn,
		getManufacturer: Ext.emptyFn,
		getUUID: Ext.emptyFn,
	};
}

document.title = FellowMe.config.windowTitle;

Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('FellowMe', 'app');

Ext.require('FellowMe.store.Events');
Ext.require('FellowMe.store.PersonInfo');

if(!Ext.Ajax.defaultHeaders)Ext.Ajax.defaultHeaders={};

// Main application entry point
Ext.application({
    requires: 'Ext.DateExtras',

	phoneStartupScreen: 'images/sencha_logo.png',
	name: 'FellowMe',  
	controllers: ['Main']
	});
