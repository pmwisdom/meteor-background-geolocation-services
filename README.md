# cordova-background-geolocation-services
Background Geolocation For Android and iOS with pure javascript callbacks.

# About
This is a new background geolocation plugin that aims at getting constant location updates in the background. 

Meaning if you request a location updates every 3 seconds, you will get one every 3 seconds. Mind your users battery!

I also made sure that android and iOS were exactly the same in their API, you don't need to POST for android, you use javascript callbacks for android and iOS.

This is a meteor wrapper for my background geolocation plugin:
https://github.com/pmwisdom/cordova-background-geolocation-services

### Changelog (Cordova Plugin):
 * 1.1.0 -Breaking- (If you need the lower swift versions, use 1.0.4)
   - [iOS]: Converted to new Swift Version
   - [iOS]: Fixed some cases where the plugin would keep running in the foreground
 * 1.0.4 New Low GPS mode for increased battery life on iOS
 * 1.0.3 Activity Detection And Much Better Battery Life For iOS!
 * 1.0.2 Error callbacks now correctly funnel through the location register
 

### Setup:
* Need to make sure you have Google Play Services AND Google Repository installed via your android-sdk manager prior to building your application with this. It will be under the extras part of the sdk manager. More information can be found here: http://developer.android.com/sdk/installing/adding-packages.html.

### How to use: 

This plugin exports an object at 
````javascript
BackgroundLocation
````

````javascript
//Only start if this is a cordova project
if (Meteor.isCordova) {
  //Only run commands after cordova has finished device Ready
  Meteor.startup(function() {
    //Configure Plugin
    BackgroundLocation.configure({
      desiredAccuracy: 5, // Desired Accuracy of the location updates (lower = more accurate).
      distanceFilter: 1, // (Meters) Distance between points aquired.
      debug: true, // Show debugging info on device.
      interval: 9000, // (Milliseconds) Requested Interval in between location updates.
      useActivityDetection: true, // Shuts off GPS when your phone is still, increasing battery life enormously
      
      //[Android Only Below]
      notificationTitle: 'BG Plugin', // Customize the title of the notification.
      notificationText: 'Tracking', // Customize the text of the notification.
      fastestInterval: 5000, //(Milliseconds) - Fastest interval OS will give updates.
    });

    //Register a callback for location updates.
    //this is where location objects will be sent in the background
    BackgroundLocation.registerForLocationUpdates(function (location) {
      console.log("We got a Background Update" + JSON.stringify(location));
    }, function (err) {
      console.log("Error: Didnt get an update", err);
    });
    
    //Register a callback for activity updates 
    //If you set the option useActivityDetection to true you will recieve
    //periodic activity updates, see below for more information
    BackgroundLocation.registerForActivityUpdates(function (activities) {
      console.log("We got an activity Update" + activites);
    }, function (err) {
      console.log("Error:", err);
    });

    //Start the Background Tracker. 
    //When you enter the background tracking will start.
    BackgroundLocation.start();
    
    ///later, to stop
    BackgroundLocation.stop();

  });
}

````

### Location Data:

````javascript
{
 "latitude":47.000000,
 "longitude":-122.000000,
 "accuracy":20,
 "altitude":0,
 "speed":0
 "timestamp":1446873979589,
 "heading":0
}
````

### Extra Options - These must be set before meteor.startup : 
* fetchLocationOnStart -- Automatically fetches a foreground location update on start. This means you do not have to do so before you send a user into the background. If you set this to false, you must manually fetch the users location in the foreground before you start tracking in the background. Defaults to TRUE.

    To set : 
````javascript
    BackgroundLocation.options.fetchLocationOnStart = false;
````
