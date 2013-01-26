# RapidPush jQuery plugin
This JavaScript plugin for jQuery is used to send notifications to your android devices using the RapidPush-Service.

# What is RapidPush?
RapidPush is an easy-to-use push notification service.
You can receive notifications from third-party applications like nagios, github or flexget directly to your smartphone.
With our simple API you can also implement RapidPush to your own software.

# IMPORTANT NOTICE
This is **NOT** a plug-in which you should use on a public web-page. As you can see your API-Key will be visible in PLAIN TEXT.
If you would use it within a public page, it is possible to see or read out your API-Key and therefore other people could use your
API-Key in future to send you Ad's or Spam messages.

# How to use

```js
$(document).ready(function() {

	$.rapidpush.get_groups({
		api_key: 'YOUR-API-KEY',
		success: function(result) {
			console.log('Success');
			for (var i in result.data) {
				if (!result.data.hasOwnProperty(i)) {
					continue;
				}
				console.log("Got group: "+ result.data[i].group);
			}
		},
		error: function(result) {
			console.log('Error');
			console.log(result);
		}
	});

	$.rapidpush.notify({
		api_key: 'YOUR-API-KEY',
		title: 'Test title',
		message: 'Test message',
		success: function(result) {
			console.log('Success');
			console.log(result);
		},
		error: function(result) {
			console.log('Error');
			console.log(result);
		}
	});
});
```
You can try out the included **example.html**

# Tip
A good gmdate function for JavaScript can be found at [http://phpjs.org/functions/gmdate](http://phpjs.org/functions/gmdate).
The gmdate function depends on the date function for phpjs [http://phpjs.org/functions/date](http://phpjs.org/functions/date).

With this function transforming a local date into gmdate is very simple:

```js
gmdate("Y-m-d H:i:00", Date.parse("2013-01-25 22:50:34") / 1000);
// If you live on GMT + 1 the result will be "2013-01-25 21:50:00"
```