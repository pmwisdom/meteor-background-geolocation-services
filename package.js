Package.describe({
  name: 'mirrorcell:background-geolocation-plus',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Cordova Background Geolocation For Android and iOS with pure javascript callbacks.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/pmwisdom/cordova-background-geolocation-services',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Cordova.depends({
  "cordova-plugin-geolocation" : "1.0.1",
  "org.flybuy.cordova.background-location-services" : "https://github.com/pmwisdom/cordova-background-geolocation-services.git#14ea2ab3b2f5debc007aabd28f765905835fbc40"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');

  api.addFiles('background-geolocation-plus.js');

  api.export('BackgroundLocation');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('mirrorcell:background-geolocation-plus');
  api.addFiles('background-geolocation-plus-tests.js');
});
