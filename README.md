# Restaurant Ionic
This project is an Ionic application that suits any restaurant’s needs to display its menu and enable an ordering process.

## Dependecies, Run and Build

### Install NodeJS dependencies

Run `npm install` to install all needed dependencies.

### Install Plugins and Javascript dependencies
#### Linux/MacOX
Run `./install.sh` to install all needed plugins and dependencies

#### Windows Users
Similarly, Windows users should run `install.bat`.

### Run the app
Use `grunt serve -l` to run the app in browser and watch for changes in code

or

use `grunt serve` to just run the app for a browser preview

or

use `grunt serve --lab` to run the app in a browser on two platforms at the same time.

### Add a platform

```bash
$ grunt platform:add:<platform>
```

Supported Cordova platforms:

```bash
$ grunt platform:add:ios
$ grunt platform:add:android
```

### Build the app

```bash
$ grunt build
```

### Εmulate the app on simulator
iOS:

```bash
$ grunt emulate:ios
```

Android:

```bash
$ grunt emulate:android
```

For more information, see [Ionic Framework Generator's instructions](https://github.com/diegonetto/generator-ionic).

### Plugins installation

Use the following commands and install all the plugins required by the app:
```bash
$ cordova plugin add {plugin id or url}
```

eg:

```bash
cordova plugin add cordova-plugin-inappbrowser
```

## Used Cordova plugins
In case that the required Cordova plugins are not installed while installing NodeJS dependencies, Cordova's command mentioned previously can be used to install the following plugins:

* **cordova-plugin-device** - This plugin defines a global device object, which describes the device's hardware and software.
* **cordova-plugin-console** - This plugin is meant to ensure that console.log() is as useful as it can be. It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows.
* **ionic-plugin-keyboard** - It provides functions to make interacting with the keyboard easier, and fires events to indicate that the keyboard will hide/show.
* **cordova-plugin-inappbrowser** - Provides a web browser view. It could be used to open images, access web pages, and open PDF files.
* **phonegap-plugin-push** - This plugin offers support to receive and handle native push notifications with a single unified API, and with no dependency on any other plugins. (https://github.com/phonegap/phonegap-plugin-push.git).
* **de.appplant.cordova.plugin.email-composer@0.8.2** - The plugin provides access to the standard interface that manages the editing and sending an email message.
* **cordova-plugin-geolocation** - Grab the current location of the user, or grab continuous location changes
* **SocialSharing-PhoneGap-Plugin** - Share images, text, messages via Facebook, Twitter, Email, SMS, WhatsApp, etc using this plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git).
* **cordova-plugin-whitelist** - This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
* **cordova-plugin-transport-security** - Cordova / PhoneGap Plugin to allow 'Arbitrary Loads' by adding a declaration to the Info.plist file to bypass the iOS 9 App Transport Security
* **cordova-plugin-network-information** - This plugin provides an implementation of an old version of the Network Information API. It provides information about the device's cellular and wifi connection, and whether the device has an internet connection.
* **cordova-plugin-sim** - A cordova plugin to get data from the SIM card like the carrier name, mcc, mnc and country code and other system dependent additional info.

## Demo
Install [Ionic View](http://view.ionic.io/) and preview the app on your mobile device using the following Ionic View ID: `ab64f538`

## Documentation
* [Restaurant Ionic Quick Start Guide](https://docs.google.com/document/d/1ybqCxaZ-hPG0Qq_O5cwTupAfbkc9XXROaQns5Hk4iI4/edit?usp=sharing)

## Changelog
```
1.7 - Sep 21, 2016
- Migration to the Ionic Cloud Client Push

1.6 - July 29, 2016
- Upgrade to Firebase 3.x

1.5 - July 15, 2016
- Addition of "Dine in" delivery method

1.4 - May 04, 2016
- Ionic update to v1.3.0
- Fix on showing a pin and setting the destination on Android's maps app
- Fix of the ionic keyboard plugin id

1.3 - April 21, 2016
- Addition of phone number field on “Take Away” order confirmation dialog
- Addition of city and country fields on "Home Delivery" order confirmation form
- Auto-completion of user's personal details on order confirmation forms after his first order submission
- Addition of "Quick add to cart" button for adding an item with the default quantity of 1
- Addition of "-" and "+" buttons for increasing/reducing the number of the items to be added to the cart

1.2 - March 10, 2016
- Integration of Firebase as a backend
- Addition of ten new color themes

1.1 - February 10, 2016
- Ionic update to v1.2.4 as Ionic 1.2 uses native scrolling by default.
- Ionic CLI update to v1.7.13
- Addition of task in Gruntfile to minify and obfuscate CSS, HTML and Javascript files

1.0 - January 29, 2016
- Initial release
```

## Credits

* [Yeoman](http://yeoman.io/)
* [Yeoman's Ionic Framework generator](https://github.com/diegonetto/generator-ionic)

## Third Party Licences
* [Apache License](http://www.apache.org/licenses/)
* [MIT License](https://opensource.org/licenses/MIT)
