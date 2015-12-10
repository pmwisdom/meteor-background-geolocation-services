// Write your package code here!
BackgroundLocation = {
    tag : 'BackgroundLocation',
    plugin : null,
    started : false,
    hasLocationCallback : false,
    config : {
        desiredAccuracy: 1,
        distanceFilter: 1,
        debug: false,
        interval: 1000,
        //Android Only
        notificationTitle: 'BG Plugin',
        notificationText: 'Tracking',
        fastestInterval: 5000,
        useActivityDetecton: false
    },
    getPlugin: function() {
        this.plugin = window.plugins.backgroundLocationServices;
    },
    havePlugin : function() {
        if(!this.plugin) {
            throw new Meteor.Error(this.tag, 'Could not find the background location plugin, please run BackgroundLocation.getPlugin');
            return false;
        }
        return true;
    },
    configure: function(config) {
        if(!this.havePlugin()) return;

        if(_.isObject(config)) {
            this.config = config;
            this.plugin.configure(this.config);
        } else {
            throw new Meteor.Error(this.tag, 'Config parameter must be a object')
        }
    },
    registerForLocationUpdates: function(success, failure){
        if(!this.havePlugin()) return;

        this.hasLocationCallback = true;
        this.plugin.registerForLocationUpdates(success, failure);
    },
    start: function() {
        if(!this.havePlugin()) return;

        if(!this.hasLocationCallback) {
            throw new Meteor.Error(this.tag, 'You must register for location updates before starting background location updates');
        }

        this.plugin.start();

    },
    stop: function() {
        if(!this.havePlugin()) return;

        this.plugin.stop();
    }
};

if(Meteor.isCordova) {
    Meteor.startup(function () {
        BackgroundLocation.getPlugin();

        navigator.geolocation.getCurrentPosition(function(location){
        }, function(err){
        });
    });
}