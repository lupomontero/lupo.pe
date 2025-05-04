---
tags:
  - freebsd
  - unix
author: lupo
publishedAt: 2009-08-31
---

# Managing ports in FreeBSD

![FreeBSD logo](https://user-images.githubusercontent.com/110297/38502017-f4b9aa76-3bd3-11e8-8bf2-3f156b30324f.png)

The aim of this article is to summarise the installation, reinstallation and deinstallation of ports (packages) in FreeBSD. The FreeBSD ports collection is
probably one of the most compelling reasons to choose FreeBSD (and you will soon
	see why). This tutorial continues from where we left the minimal installation
	in my previous post, so I am assuming you already have a working FreeBSD box.


Before we download the ports collection lets install curl, a very useful tool
that will help us download the ports archive itself. We do this using the
pkg_add command.

```sh
$ pkg_add -r curl
```

As simple as that. The previous command should download the packages from the
remote repo (the -r option stands for “remote”) and install them. If everything
goes according to plan you should output that resembles the following:

```
Fetching ftp://ftp.freebsd.org/pub/FreeBSD/ports/i386/packages-7.2-release/Latest/curl.tbz... Done.
Fetching ftp://ftp.freebsd.org/pub/FreeBSD/ports/i386/packages-7.2-release/All/ca_root_nss-3.11.9_2.tbz... Done.
```

After installing a package you will need to run rehash in order to refresh your
environment path if you want to use the command straight away, otherwise it will
be available next time you log in.

```sh
$ rehash
```

Note that the rehash command will not show any output.

## Download BSD ports

To download the ports simply change directory to /usr, and use the curl command
with the -O option. After the file has downloaded we proceed to extract it using
tar.

```sh
$ cd /usr
$ curl -O ftp://ftp.freebsd.org/pub/FreeBSD/ports/ports/ports.tar.gz
$ tar -xzvf ports.tar.gz
$ rm ports.tar.gz
```

In this example I have removed the archive after extracting it as we wont need
it again.

## Installing ports

Installing ports normally involves issuing only two commands: changing directory
to the required port in the collection and issuing the “make install clean”
command. Well, “make install clean” is actually three commands, make will
compile the software, install will unsurprisingly install it on the system and
clean will clean up after the installation.

For example, lets install “sudo” (a useful tool that allows you to run commands
“as” root):

```sh
$ cd /usr/ports/security/sudo
$ make install clean
```

Some packages will display a menu with build options when installing them. You
can navigate this menu using the tab key. To check/uncheck boxes use the space
bar and when you are done tab your way to the [Ok] button and press enter. The
sudo package should display the following menu:

![FreeBSD sudo options](https://user-images.githubusercontent.com/110297/38502018-f4d3d2c0-3bd3-11e8-94fe-64479231ed76.png)

Note: Packages can take quite a while to install depending on the number of
dependencies needed to build the program.

## Listing installed ports

If you need to check if a port is installed or find out exactly which version is
installed you can use the pkg_info command. This command will list all installed
packages showing the full package names (including the version number) and a
short description. For example:

```sh
$ pkg_info
ca_root_nss-3.11.9_2 The root certificate bundle from the Mozilla Project
curl-7.19.4         Non-interactive tool to get files from FTP, GOPHER, HTTP(S)
sudo-1.6.9.20       Allow others to run commands as root
```

## Uninstalling ports

Ok, now that you know how to install ports you might be wondering how do you get
rid of a program after installing it? Easy peasy, we ca use the pkg_delete
command. Let’s uninstall sudo (that’s the package we installed a minute ago).
First we need to find out which version was installed (can you believe that I
already forgot?). But we now know how to do that:

```sh
$ pkg_info | grep -i sudo
sudo-1.6.9.20       Allow others to run commands as root
```

Note that I have “piped” the output into grep. This will filter the output of
the pkg_info command and only display lines containing the string “sudo”.

```sh
$ pkg_delete sudo-1.6.9.20
```

## Reconfiguring ports after installation

Sometimes you may find that you want to change the build options you specified
when installing a port, because you forgot to enable a module or maybe an option
is required by some other program you are trying to install. We can go back to
the installation menu using the make config command or we could simply remove
the existing build configuration and start the package installation from scratch.

Lets edit the existing build configuration for curl. I dont remember the path to
the port so I will first issue a find command looking for a directory (-type d)
named “curl” within the port collection:

```sh
$ find /usr/ports -type d -name curl
/usr/ports/ftp/curl
$ cd /usr/ports/ftp/curl
$ make config
```

This will display the menu with the build options used when installing and we
can modify them.

If instead we want to remove the configuration and install the package from
scratch:

```sh
$ cd /usr/ports/ftp/curl
$ make rmconfig
```

After you have either deleted of modified the build options you will need to
reinstall by issuing:

```sh
$ make deinstall
$ make reinstall clean
```

If you just want to see the full build configuration use the make showconfig
command within the relevant port directory. For example:

```sh
$ cd /usr/ports/ftp/curl
$ make showconfig
```

For full documentation please visit the official FreeBSD Ports site at:
http://www.freebsd.org/doc/en/books/handbook/ports-using.html
