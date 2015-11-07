# cordova-background-geolocation-services
Background Geolocation For Android and iOS with pure javascript callbacks.

#About
This is a new background geolocation plugin that aims at getting constant location updates in the background. 

Meaning if you request a location updates every 3 seconds, you will get one every 3 seconds. Mind your users battery!

I also made sure that android and iOS were exactly the same in their API, you don't need to POST for android, you use javascript callbacks for android and iOS.

This is a meteor wrapper for my background geolocation plugin:
https://github.com/pmwisdom/cordova-background-geolocation-services



###Setup: 
* Need to make sure you have Google Play Services AND Google Repository installed via your android-sdk manager prior to building your application with this. It will be under the extras part of the sdk manager. More information can be found here: http://developer.android.com/sdk/installing/adding-packages.html.

### How to use: 

This plugin exports an object at 
````javascript
BackgroundLocation
````

````javascript
//Congfigure Plugin
BackgroundLocation.configure({
     desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
     distanceFilter: 5, // (Meters) How far you must move from the last point to trigger a location update
     debug: true, // <-- Enable to show visual indications when you receive a background location update
     interval: 9000, // (Milliseconds) Requested Interval in between location updates.
     //ANDROID ONLY BELOW
     notificationTitle: 'BG Plugin', // <-- customize the title of the notification
     notificationText: 'Tracking', // <-- customize the text of the notification
     fastestInterval: 5000, // <-- (Milliseconds) - Fastest interval your app / server can handle updates
});

//Register a callback for location updates, this is where location objects will be sent in the background
BackgroundLocation.registerForLocationUpdates(function(location) {
     console.log("We got a Background Update" + JSON.stringify(location));
}, function(err) {
     console.log("Error: Didnt get an update", err);
});

//Start the Background Tracker. When you enter the background tracking will start, and stop when you enter the foreground.
BackgroundLocation.start();


///later, to stop
BackgroundLocation.stop();
````
