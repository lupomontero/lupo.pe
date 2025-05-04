---
tags:
  - couchdb
  - javascript
  - smartos
author: lupo
publishedAt: 2015-05-29
---

# CouchDB on Joyent Smart Data Center

Over the last few weeks I have been exploring [Joyent’s Smart Data Center](https://www.joyent.com/)
as an alternative to [AWS](http://aws.amazon.com/). I mainly run [node.js](https://nodejs.org/)
apps these days, so I feel naturally inclined to try out Joyent’s platform. But
before diving into all the node.js goodness, I wanted to check out their command
line tool ([smartdc](https://github.com/joyent/node-smartdc)) and familiarise
with the basics. As it turns out, the other half of most of my apps is quickly
becoming [CouchDB](http://couchdb.apache.org/), so it would make sense to see
how we could go about quickly spinning up a CouchDB instance.

I followed these steps:

## 1. Install smartdc and set up environment

To get started I installed both [`smartdc`](https://www.npmjs.com/package/smartdc)
and [`json`](https://www.npmjs.com/package/json) on my machine as described in
[Joyent’s Cloud API Docs](https://apidocs.joyent.com/cloudapi/):

```sh
npm install smartdc -g
npm install json -g
```

I also added environment variables (`SDC_ACCOUNT`, `SDC_URL` and `SDC_KEY_ID`)
to my shell so I wouldn’t need to include in each command. More on this can be
found on the official docs.

## 2. Choose an image

So, let’s get cracking. Before we create a new instance, we will need to know
what “image” we want to use, and what “package” we want to run. A “package” is
like an instance type, it defines the specs of the machine you are starting.
Let’s use the CLI to list `id`, `name` and `version` of images matching
“couchdb”:

```sh
sdc-listimages | json -a id name version os | grep couchdb
```

This will output something like:

```
acf16260-48e3-11e4-b6a5-0b29395f1d96 couchdb 14.2.0 smartos
81ea4dc2-7aff-11e4-866f-273a920433fb couchdb 14.3.0 smartos
3abc27e6-cd79-11e4-ad17-ab914a388d7c couchdb 14.4.0 smartos
```

For this example we note down the id of the latest version.

## 3. Choose a package

Now we need to choose a package. To list `id` and `name` of plans matching
“standard”:

```sh
sdc-listpackages | json -a id name | grep standard
```

This will show a long list with all the different “standard” packages. For the
example I picked `g3-standard-1-smartos` (id:
`11a01166-3f15-4857-bfde-b5c326acd85f`).

## 4. Create machine

We are now ready to spin up a machine using a couchdb image:

```sh
sdc-createmachine --name=couch-1 --image=3abc27e6-cd79-11e4-ad17-ab914a388d7c --package=11a01166-3f15-4857-bfde-b5c326acd85f
```

This will produce output like:

```json
{
  "id": "2540fe4f-44a3-c195-bd3e-ac0e15fab0f9",
  "name": "couch-1",
  "type": "smartmachine",
  "state": "provisioning",
  "image": "3abc27e6-cd79-11e4-ad17-ab914a388d7c",
  "ips": [],
  "memory": 1024,
  "disk": 33792,
  "metadata": {
    "root_authorized_keys": "<your-ssh-key>"
  },
  "tags": {},
  "created": "2015-05-29T10:25:17.589Z",
  "updated": "2015-05-29T10:25:17.589Z",
  "networks": [],
  "dataset": "sdc:sdc:couchdb:14.4.0",
  "firewall_enabled": false,
  "compute_node": null,
  "package": "g3-standard-1-smartos"
}
```

At this point you can just sit back and wait for the machine to boot up. You can
check the machine’s details and provisioning status using `sdc-getmachine`. Once
the machine has started, a CouchDB server will be running on port 5984. But it
will only be visible on the local network. If you want to expose your CouchDB
directly on the public network you can follow the steps below.

## 5. Expose on public network

### Create firewall rule

First, we create a firewall rule that will allow traffic into our CouchDB
instance:

```sh
$ sdc-createfirewallrule --rule="FROM any TO tag role = couchdb ALLOW tcp PORT 5984" --enabled=true
```

```json
{
  "id": "cfa7dfe3-cc7b-4655-a1dd-e06144a45349",
  "rule": "FROM any TO tag role = couchdb ALLOW tcp PORT 5984",
  "enabled": true
}
```

This basically tells the firewall to “allow all incoming tcp traffic on port
5984 for machines tagged with role=couchdb”.

### Tag machine

Now that we have a firewall rule for machines tagged with `role=couchdb`, we
need to add the `role` tag our new machine so that the firewall rule applies to
it:

```sh
$ sdc-addmachinetags --tag="role=couchdb" 2540fe4f-44a3-c195-bd3e-ac0e15fab0f9
```

```json
{
  "role": "couchdb"
}
```

### Enable firewall

By default, the Cloud Firewall is not enabled, so we enable it for our new
machine:

```sh
$ sdc-enablemachinefirewall 2540fe4f-44a3-c195-bd3e-ac0e15fab0f9
{}
```

### Change CouchDB’s configuration to bind on public ip

Now port 5984 will be reachable on your new machine, but CouchDB by default will
bind to 127.0.0.1, so it will not be reachable. The final step is to tell
CouchDB to listen on the public network. To do so, log in to your machine via
SSH and edit /opt/local/etc/couchdb/local.ini. Find a line like
`!bind_address = 127.0.0.1` and change it to:

```
bind_address = 0.0.0.0
```

Restart couchdb service:

```sh
svcadm restart svc:/pkgsrc/couchdb:default
```

Go to `http://<public-ip-address>:5984` and you should see CouchDB’s welcome
response:

```json
{"couchdb":"Welcome","uuid":"33efba52cd9e79c83ea3712aef8d4fc1","version":"1.6.1","vendor":{"version":"1.6.1","name":"The Apache Software Foundation"}}
```

#€ Conclusions

Joyen’t Smart Data Centre rocks! It is really easy (and quick) to spin up a
CouchDB instance. It worked like a charm on first attempt!
