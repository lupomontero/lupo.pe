---
url: https://lupomontero.com/php-5-2-10-and-pear-notice-undefined-variable-dorest-in-pearcommandinstall-php-on-line-1220/
tags:
  - pear
  - php
author: lupo
publishedAt: 2009-12-08
---

# PHP 5.2.10 and PEAR – Notice: Undefined variable: dorest in PEAR/Command/Install.php on line 1220

Today, after upgrading packages with apt-get on a server running Debian Lenny my
PEAR installation seemed to be broken. PHP had been updated to 5.2.10 and PEAR
version was now 1.8.0. So when I realised that PEAR wasn’t the latest stable I
tried upgrading PEAR using the command I’ve always used: pear upgrade pear,
where the first “pear” is the command we run, then the “upgrade” sub-command and
finally the name of the package we want to work with, unsurprisingly “pear”.

So I type the following expecting a happy success message and get this instead:

```sh
$ pear upgrade pear
Notice: Undefined variable: dorest in PEAR/Command/Install.php on line 1220
Notice: Undefined variable: latest in PEAR/Command/Install.php on line 1228
Notice: Undefined variable: latest in PEAR/Command/Install.php on line 1234
Warning: array_change_key_case(): The argument should be an array in PEAR/Command/Install.php on line 1234
Nothing to upgrade
```

After a quick look at the problem I figured out that it was a problem with the
cached channel data that PEAR stores under a directory called ./channels in the
PEAR installation directory. The problem is quickly solved by deleting the files
in that directory. To find out where PEAR is installed you can use the
`pear list-files` command as follows:

```sh
$ pear list-files pear
Installed Files For pear
========================
Type   Install Path
php    /usr/local/zend/share/pear/OS/Guess.php
php    /usr/local/zend/share/pear/PEAR/ChannelFile/Parser.php
...
```

In this case my installation directory is /usr/local/zend/share/pear. So now
that we know were the directory is we change directory and delete all files in
it.

```sh
$ cd /usr/local/zend/share/pear/.channels/
$ rm -rf *
```

After deleting the channels cache you will need to update it by issuing the
following command:

```sh
$ pear channel-update pear.php.net
Updating channel "pear.php.net"
Update of Channel "pear.php.net" succeeded
```

And finally we run the upgrade as originally expected.

```sh
$ pear upgrade pear
downloading PEAR-1.9.0.tgz ...
Starting to download PEAR-1.9.0.tgz (291,634 bytes)
.................................done: 291,634 bytes
downloading Structures_Graph-1.0.3.tgz ...
Starting to download Structures_Graph-1.0.3.tgz (30,191 bytes)
...done: 30,191 bytes
upgrade ok: channel://pear.php.net/Structures_Graph-1.0.3
upgrade ok: channel://pear.php.net/PEAR-1.9.0
PEAR: Optional feature webinstaller available (PEAR's web-based installer)
PEAR: Optional feature gtkinstaller available (PEAR's PHP-GTK-based installer)
PEAR: Optional feature gtk2installer available (PEAR's PHP-GTK2-based installer)
PEAR: To install optional features use "pear install pear/PEAR#featurename"
```

To wrap it up lets use the “pear info” command to check that we are now running
the latest version (1.9.0 in this case).

```sh
$ pear info pear
About pear.php.net/PEAR-1.9.0
=============================
Release Type           PEAR-style PHP-based Package
Name                   PEAR
Channel                pear.php.net
Summary                PEAR Base System
Description            The PEAR package contains:
...
```
