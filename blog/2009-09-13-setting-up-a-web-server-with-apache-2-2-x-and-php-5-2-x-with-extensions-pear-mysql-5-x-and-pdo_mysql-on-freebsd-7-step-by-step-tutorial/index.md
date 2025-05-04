---
tags:
  - apache
  - freebsd
  - mysql
  - pear
  - php
author: lupo
publishedAt: 2009-09-13
---

# Setting up a web server with Apache 2.2.x and PHP 5.2.x with extensions, PEAR, MySQL 5.x and pdo_mysql on FreeBSD 7 step by step tutorial

This quick tutorial will show you how to set up a FreeBSD machine (based on
minimal install) to run as a web server using Apache 2.2.x, PHP 5 and MySQL 5.
This tutorial is based on FreeBSD 7.2 (the current stable release at the time of
this writing).

This tutorial builds on the minimal installation described here and assumes you
have also downloaded the ports collection. If you haven’t done so please read
the following article first: Managing ports in FreeBSD.


## Install MySQL 5.1.x from BSD ports

Installing ports will normally involve two commands, changing directory to the
correct port in the ports collection and then running “make install clean”. The
second command is actually composed of three steps (making, installing and
cleaning up after the installation).

```sh
$ cd /usr/ports/databases/mysql51-server
$ make install clean
```

Now MySQL will be built from source. This process will take a while (actually, a
very long while…).

After the installation process finishes we run mysql’s install script:

```sh
$ /usr/local/bin/mysql_install_db
```

For security reasons it is recommended that we change ownership of the mysql
directory:

```sh
$ chown -R mysql /var/db/mysql/
$ chgrp -R mysql /var/db/mysql/
```

Set MySQL root password:

```sh
$ /usr/local/bin/mysqladmin -u root password 'Ch4ng3m3'
```

To automatically start MySQL on boot we need to edit the rc.conf file:

```sh
$ ee /etc/rc.conf
```

Then add the following lines near the bottom:

```
# Enable Mysql
mysql_enable="YES"
```

## Install apache 2.2.x from BSD ports

```sh
$ cd /usr/ports/www/apache22
$ make install clean
```

This will take a while as it will install dependencies like perl, autoconf and
many other packages from source.

Start Apache on boot:

```sh
$ ee /etc/rc.conf
```

Then add the following lines near the bottom:

```
# Enable Apache 2.2.x
apache22_enable="YES"
```

To start/stop/restart the apache server:

```sh
$ apachectl start
$ apachectl stop
$ apachectl restart
```

To “gracefully” restart the web server (without breaking current connections):

```sh
$ apachectl graceful
```

To simply reload configuration:

```sh
$ apachectl reload
```

## Install PHP 5.2.x from BSD ports

```sh
$ cd /usr/ports/lang/php5
$ make install clean
```

This will show a configuration screen where you can choose the installation
options. I personally choose everything except the CGI and CGI related options.
I much prefer running PHP as an Apache module than CGI.

After installing we edit Apache config:

```sh
$ ee /usr/local/etc/apache22/httpd.conf
```

You have to add index.php after index.html to the DirectoryIndex directive, so
it should look like this:

```
# DirectoryIndex: sets the file that Apache will serve if a directory
# is requested.
#
<IfModule dir_module>
DirectoryIndex index.html index.php
</IfModule>
```

Add the following lines at the end and save changes:

```
AddType application/x-httpd-php .php
AddType application/x-httpd-php-source .phps
```

## Install PHP extensions

```sh
$ cd /usr/ports/lang/php5-extensions
$ make install clean
```

This will show a configuration screen where you can choose the installation
options. I personally choose all the defaults plus:

```
bz2
curl
ftp
gd
imap
mbstring
mysql
openssl
pdf
xmlrpc
zip
zlib
```

Restart apache

```sh
$ apachectl restart
```

## Install PEAR

```sh
$ cd /usr/ports/devel/pear
$ make install clean
```

## Install pdo_mysql

```sh
$ cd /usr/ports/databases/php5-pdo_mysql
$ make install clean
```

## Install phpMyAdmin

```sh
$ cd /usr/ports/databases/phpmyadmin
$ make install clean
```
