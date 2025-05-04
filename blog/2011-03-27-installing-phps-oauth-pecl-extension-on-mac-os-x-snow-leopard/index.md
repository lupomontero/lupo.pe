---
url: https://lupomontero.com/installing-phps-oauth-pecl-extension-on-mac-os-x-snow-leopard/
tags:
  - osx
  - pecl
  - php
author: lupo
publishedAt: 2011-03-27
---

# Installing PHP’s OAuth PECL extension on Mac OS X Snow Leopard

I recently reinstalled the operating system on my Macbook and this time around I
decided to use [homebrew](https://github.com/mxcl/homebrew) to manage packages.
Since `php` comes pre-installed with OS X and homebrew encourages using the
pre-installed binaries, I have been using the built-in install of `php`, and so
far so good.

But today I tried to install [php’s OAuth extension](http://php.net/manual/en/book.oauth.php),
which comes as a `pecl` package, and I run into some errors.

Before I started I updated the default `pecl` channel and upgraded `pecl`
extensions already installed:

```sh
$ sudo pecl channel-update pecl.php.net
$ sudo pecl upgrade
```

At this point everything looked good, so I went ahead trying to install the
OAuth extension but run into the following error:

```sh
$ sudo pecl install oauth

downloading oauth-1.1.0.tgz ...
Starting to download oauth-1.1.0.tgz (44,731 bytes)
............done: 44,731 bytes
6 source files, building
running: phpize
Configuring for:
PHP Api Version:         20090626
Zend Module Api No:      20090626
Zend Extension Api No:   220090626
building in /var/tmp/pear-build-root/oauth-1.1.0
running: /private/var/tmp/apache_mod_php/apache_mod_php-53~1/Build/tmp/pear/temp/oauth/configure
checking for grep that handles long lines and -e... /usr/bin/grep

...

In file included from /private/var/tmp/apache_mod_php/apache_mod_php-53~1/Build/tmp/pear/temp/oauth/php_oauth.h:47,
             from /private/var/tmp/apache_mod_php/apache_mod_php-53~1/Build/tmp/pear/temp/oauth/oauth.c:14:
/usr/include/php/ext/pcre/php_pcre.h:37: error: expected ‘=’, ‘,’, ‘;’, ‘asm’ or ‘__attribute__’ before ‘*’ token
/usr/include/php/ext/pcre/php_pcre.h:38: error: expected ‘=’, ‘,’, ‘;’, ‘asm’ or ‘__attribute__’ before ‘*’ token
/usr/include/php/ext/pcre/php_pcre.h:44: error: expected specifier-qualifier-list before ‘pcre’
make: *** [oauth.lo] Error 1
ERROR: 'make' failed
```

Hmmm. So something was wrong with the built-in [PCRE](http://www.pcre.org/)
package. After “googling” the problem and reading many contradicting solutions
the only thing that was clear is that I needed a newer version of PCRE. So I
installed PCRE using homebrew with the following command (this should also work
using any other method – macports, compile from source, …):

```sh
$ brew install pcre
```

This worked fine. So now I tried to install the OAuth extension once again using
the same comand as before:

```sh
$ sudo pecl install oauth
```

And this time the extension was insatlled ok, yay!!

The only thing I needed to do after that was adding the extension in my
`php.ini` fie (by default it is in `/etc/php.ini`). Before the end of the
`php.ini` file add `extension=oauth.so`. Finally we can check if the extension
is getting loaded:

```sh
$ php -i | grep -i oauth

OAuth
OAuth support => enabled
source version => $Id: oauth.c 308061 2011-02-06 17:15:34Z jawed $
```

Note that you will need to restart the apache web server in order for the
extension to be loaded in the web server.
