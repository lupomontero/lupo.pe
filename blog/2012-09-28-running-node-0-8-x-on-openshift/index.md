---
tags:
  - javascript
  - node
  - openshift
author: lupo
publishedAt: 2012-09-28
---

# Running nodejs 0.8.x (or any other version) on OpenShift

This week I had a quick look at Red Hat’s [OpenShift](https://openshift.redhat.com/)
platform. After a very good first impression I decided to create a sort of
“hello world” node app to see the gears in motion. So I look around...
cartdriges... and voila! There it is, nodejs... but its 0.6... hmmm... scroll
down a bit more... DIY [experimental]... aha!

Next thought: Why don’t I use the DIY thing to try and install node 0.8.x, or
even better, something that allows me to chose which nodejs version I want to
run.

To my surprise, two coffees later there it was, working fine and doing what I
was expecting it to do. Even if this is a half-baked solution (to say the
least), it may still help someone out there trying to run nodejs v0.8.x on
OpenShift. So why not share it. Before I wrote up this
[post I found a post on the OpenShift community explaining how to run 0.8 on OpenShift](https://openshift.redhat.com/community/content/node-08),
but I thought this could be simplified a bit using nave, a script by Isaac Z.
Schlueter based on Tim Caswell’s “nvm” and Kris Kowal’s “sea” programs.

To start with I created a new app using the DIY cartridge and cloned the git
repo on my computer. Looking at the files included by default in the repo there
was a directory named `.openshift` which contained `action_hooks` and `cron`. In
this article I won’t go into the cron stuff, thats a completely different topic.
But the `action_hooks` look like they would give us the tools we need, together
with the incredibly helpful [nave](https://github.com/isaacs/nave).

After messing about for a bit my file structure looked a bit like this:

```
.
??? .gitignore
??? .openshift
??? ??? action_hooks
??? ??? ??? build
??? ??? ??? deploy
??? ??? ??? post_deploy
??? ??? ??? pre_build
??? ??? ??? start
??? ??? ??? stop
??? ??? cron (omitting dir contents)
??? README
??? app.js
??? package.json
??? public
??? ??? favicon.ico
??? ??? style.css
??? views
    ??? index.hbs
    ??? layout.hbs
```

I added a `package.json` file with the normal stuff including dependencies. Im
using [handlebars](http://handlebarsjs.com/) to render views and serving static content from `public/`. I also
added `app.js` which contains the application code. Now we need to make sure the
hooks get to install and choose the right version of nodejs and then start the
server using this version of nodejs. To do this we concentrate on 4 files:


* `.openshift/action_hooks/pre_build`
* `.openshift/action_hooks/start`
* `.openshift/action_hooks/stop`
* `app.js`

The gists below should speak for themselves.

`.openshift/action_hooks/pre_build`

```sh
#!/bin/bash
# This is a simple script and will be executed on your CI system if
# available.  Otherwise it will execute while your application is stopped
# before the build step.  This script gets executed directly, so it
# could be python, php, ruby, etc.

NAVE=$OPENSHIFT_DATA_DIR/nave/nave.sh

# If `nave` doesn't exist we get it from GitHub.
if [ ! -f $NAVE ]; then
  echo 'Downloading isaacs/nave from GitHub...'
  git clone git://github.com/isaacs/nave.git $OPENSHIFT_DATA_DIR/nave
fi

# We go into the repo where the app lives so we can run `npm install` in there.
cd $OPENSHIFT_REPO_DIR

# Use `nave` to make sure we use the right `node` and `npm` versions.
# We set the `$HOME` environment variable to data dir as this is the only place
# where we can write and `npm` will need to do so in home.
HOME=$OPENSHIFT_DATA_DIR $NAVE use 0.10.33 npm install --production
```

`.openshift/action_hooks/start`

```sh
#!/bin/bash
# The logic to start up your application should be put in this
# script. The application will work only if it binds to
# $OPENSHIFT_INTERNAL_IP:8080

HOME=$OPENSHIFT_DATA_DIR nohup $OPENSHIFT_DATA_DIR/nave/nave.sh use 0.10.33 \
  $OPENSHIFT_REPO_DIR'app.js' $OPENSHIFT_INTERNAL_PORT $OPENSHIFT_INTERNAL_IP \
  > $OPENSHIFT_LOG_DIR/app.log 2>&1 &
```

`.openshift/action_hooks/stop`

```sh
#!/bin/bash
# The logic to stop your application should be put in this script.
kill `ps -ef | grep app.js | grep -v grep | awk '{ print $2 }'` > /dev/null 2>&1
exit 0
```

`app.js`

```js
#!/usr/bin/env node

var express = require('express');
var port = process.argv[2] || 8080;
var ip = process.argv[3] || '127.0.0.1';
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
  res.render('index', { title: 'A test app', node_version: process.version });
});

app.listen(port, ip, function () {
  console.log('nodejs ' + process.version + ' server listening on ' + ip + ':' + port);
});
```

With all of this in place, when I commit my changes and push them to the server
the pre_build script is doing its job and installing all my dependencies. The
app also starts and stops normally and all of it running nodejs v0.8.10. Nice.

Bear in mind that this example is very rough and nowhere near perfect, but it
shows some of the possibilities and how easy it is to put the different parts
together. For the time being the code in this example is running here:
http://test-lupo.rhcloud.com/.
