FellowMe = {};
FellowMe.config = {
	windowTitle: "Fellow Me",
	server: "http://fellowme.ondrejstastny.cz/Home/"
};


document.title = FellowMe.config.windowTitle;
// XXX: vyhodit
var fnLog = function(){console.log(arguments)}

Ext.Loader.setConfig({ enabled: true });



// Main application entry point
Ext.application({
	phoneStartupScreen: 'images/sencha_logo.png',
	name: 'FellowMe',  
	controllers: ['Main']
	});
