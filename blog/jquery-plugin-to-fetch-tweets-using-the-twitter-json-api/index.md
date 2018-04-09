# jQuery plugin to fetch tweets using the Twitter JSON API

* URL: https://lupomontero.com/jquery-plugin-to-fetch-tweets-using-the-twitter-json-api/
* Tags: `javascript`, `jquery`, `twitter`
* Author: lupo
* Published on: 2011-10-10

***

Over a year ago I posted a script showing how you could
[fetch tweets using jQuery and Twitter’s JSON API](https://lupomontero.com/jquery-plugin-to-fetch-tweets-using-the-twitter-json-api/fetching-tweets-with-jquery-and-the-twitter-json-api/),
and to my surprise it has had a decent amount of traffic. So now that I’ve been
learning more JavaScript and jQuery I decided to re-write the script as a jQuery
plugin.

The plugin allows for much easier re-use and integration as well as adding some
features like optionally showing the users profile data and autorefresh.

Once jQuery and the plugin are loaded you can load a user’s tweets as simple as:

```js
$('#some-element').fetchTweets({
  username: 'some-twitter-user'
});
```

Hope you enjoy!

* [The demo](http://e-noise.github.com/jQuery.fetchTweets/)
* [The source code](https://github.com/E-NOISE/jQuery.fetchTweets)
