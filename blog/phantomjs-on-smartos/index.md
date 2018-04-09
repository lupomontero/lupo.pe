# PhantomJS on SmartOS

* URL: https://lupomontero.com/phantomjs-on-smartos/
* Tags: `phantomjs`, `javascript`, `smartos`
* Author: lupo
* Published on: 2015-06-01

***

So I’ve been playing around with [Joyent’s Smart Data Center](https://www.joyent.com/)
for a few days and so far it’s been a very positive experience. Today I was
deploying a test app when bang!

```sh
$ phantomjs@1.9.17 install /root/releases/web/node_modules/haribo/node_modules/phantomjs
$ node install.js

Unexpected platform or architecture: sunos x64
```

Silly me I didn’t remember I was depending on [`phantomjs`](http://phantomjs.org/),
and it turns out there is no “official” binary for [SmartOS](https://smartos.org/).
This seems to have been an issue for a while.

https://twitter.com/AriyaHidayat/status/324035301750226944

The GitHub issue is a long one... but luckily I spotted [@mamash](https://twitter.com/mamash)‘s comments (and
contributions), where he [shared a link](https://github.com/ariya/phantomjs/issues/10521#issuecomment-70156661)
to a [pre-built binary for SmartOS](https://us-east.manta.joyent.com/pkgsrc/public/packages/SmartOS/phantomjs/phantomjs-1.9.8-smartos-i386.tgz), oh
yeah! This binary is for `phantomjs` 1.9.8, which is not exactly the latest, but
will suffice for my experiment.

So I went ahead, dowloaded, linked the binary and voil?!

```sh
PREFIX=/opt/local
SRC=$PREFIX/src/phantomjs
DOWNLOAD_FILE=phantomjs-1.9.8-smartos-i386.tgz
DOWNLOAD_URL=https://us-east.manta.joyent.com/pkgsrc/public/packages/SmartOS/phantomjs/$DOWNLOAD_FILE

# Create directory where we are going to put phantomjs' source files
mkdir -p $SRC
# Go into dir, download and extract archive
cd $SRC
wget $DOWNLOAD_URL
tar -xzvf $DOWNLOAD_FILE
# Link binary
ln -s $SRC/bin/phantomjs $PREFIX/bin/
```

After following these steps, `phantomjs` is now on my `PATH` and seems to work
as expected. So far, I have been able to run all of my `phantomjs` scripts.

Now the question becomes: What needs to be resolved in order to build/compile
PhantomJS 2.0 on SmartOS/Solaris? Any ideas? I will likely be exploring this in
the near future, but I’m no C++ expert, so pointers would be appreciated 😉
