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
		showToast: window.alert,
		getModel: Ext.emptyFn,
		getManufacturer: Ext.emptyFn,
		getUUID: Ext.emptyFn,
	};
}

document.title = FellowMe.config.windowTitle;

Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('FellowMe', 'app');

// require // XXX - to se mi tady nelibi
Ext.require('FellowMe.store.PersonInfo');
Ext.require('FellowMe.store.Events');


// Main application entry point
Ext.application({
	phoneStartupScreen: 'images/sencha_logo.png',
	name: 'FellowMe',  
	controllers: ['Main']
	});
