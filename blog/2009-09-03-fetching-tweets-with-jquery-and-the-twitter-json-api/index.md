---
url: https://lupomontero.com/fetching-tweets-with-jquery-and-the-twitter-json-api/
tags:
  - ajax
  - javascript
  - jquery
  - twitter
author: lupo
publishedAt: 2009-09-03
---

# Fetching tweets with jQuery and the Twitter JSON API

Just thought it’d be nice to share this little script that fetches tweets using
a jQuery AJAX request and the Twitter API. The script is based on a snippet I
picked up from my good friend Sven Lito.

I’ve added verbose comments in the code itself, so let’s keep this post short 😉

This post is pretty old… I posted a newer version of something like this here.

The [javascript](https://gist.github.com/lupomontero/2245759):

```js
$(document).ready(function() {
  // Declare variables to hold twitter API url and user name
  var twitter_api_url = 'http://search.twitter.com/search.json';
  var twitter_user    = 'lupomontero';

  // Enable caching
  $.ajaxSetup({ cache: true });

  // Send JSON request
  // The returned JSON object will have a property called "results" where we find
  // a list of the tweets matching our request query
  $.getJSON(
    twitter_api_url + '?callback=?&rpp=5&q=from:' + twitter_user,
    function(data) {
      $.each(data.results, function(i, tweet) {
        // Uncomment line below to show tweet data in Fire Bug console
        // Very helpful to find out what is available in the tweet objects
        //console.log(tweet);

        // Before we continue we check that we got data
        if(tweet.text !== undefined) {
          // Calculate how many hours ago was the tweet posted
          var date_tweet = new Date(tweet.created_at);
          var date_now   = new Date();
          var date_diff  = date_now - date_tweet;
          var hours      = Math.round(date_diff/(1000*60*60));

          // Build the html string for the current tweet
          var tweet_html = '<div class="tweet_text">';
          tweet_html    += '<a href="http://www.twitter.com/';
          tweet_html    += twitter_user + '/status/' + tweet.id + '">';
          tweet_html    += tweet.text + '<\/a><\/div>';
          tweet_html    += '<div class="tweet_hours">' + hours;
          tweet_html    += ' hours ago<\/div>';

          // Append html string to tweet_container div
          $('#tweet_container').append(tweet_html);
        }
      });
    }
  );
});
```

The [markup](https://gist.github.com/lupomontero/2245762):

```html
<div id="tweet_container"></div>
```
