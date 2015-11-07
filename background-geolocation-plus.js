// Write your package code here!
var BackgroundLocation = {
    plugin : null,
    getPlugin: function() {
        this.plugin = window.plugins.backgroundLocationServices;
    },
    configure: function(config) {
        this.plugin.configure(config)
    },
    registerForLocationUpdates: function(success, failure){
        this.plugin.registerForLocationUpdates(success, failure);
    },
    start: function() {
        this.plugin.start();
    },
    stop: function() {
        this.plugin.stop();
    }
};

if(Meteor.isCordova) {
    Meteor.startup(function () {
        BackgroundLocation.getPlugin();
        navigator.geolocation.getCurrentPosition();
    });
}