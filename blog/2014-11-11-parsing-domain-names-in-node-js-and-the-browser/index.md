---
tags:
  - javascript
  - node
author: lupo
publishedAt: 2014-11-11
---

# Parsing domain names in node.js and the browser

Parsing domain names in a useful way is a bitch. Top level domains have lots of
exceptions and weird rules that are imposible to reflect in a sensible regular
expression.

The only reliable way of approaching this is using a regularly updated list of
all known public suffixes and their basic rules.

Thankfully, the Mozilla guys maintain the [Public Suffix List](https://publicsuffix.org/)
which is exactly such a list.

Based on this list I have written a JavaScript module that allows you to parse
domain names into meaningful parts: [psl](https://github.com/wrangr/psl).

For most domain names it is pretty straight forward to figure out what the
"tld", "apex domain" and "subdomain" are. For example, given `www.foo.com` we
can easily tell `com` is the "tld", while the "apex domain" is `foo.com` and
`www` is a subdomain.

Now consider domain names like `a.b.c.d.foo.uk.com`. If you are familiar with
domain name registrations you probably know where this is going. Exceptional
rules apply for many "public suffixes", and in practical terms, `uk.com` should
be considered as the "tld" and not `com`.

`psl` allows you to easily determine which part of the domain name is the `tld` or
`public suffix`.

```js
var psl = require('psl');

var parsed = psl.parse('a.b.c.d.foo.uk.com');

console.log(parsed.tld); // 'uk.com'
console.log(parsed.sld); // 'foo'
console.log(parsed.domain); // 'foo.uk.com'
console.log(parsed.subdomain); // 'a.b.c.d'
```

It handles all kinds of special rules like the ones affecting `.jp`, where the
registry reserves domains for each prefecture and government body, but domains
can also be registered at the top level domain. Consider `a.b.ide.kyoto.jp` and
`www.sony.jp`.

```js
var psl = require('psl');

var parsed = psl.parse('a.b.ide.kyoto.jp');

console.log(parsed.tld); // 'ide.kyoto.jp'
console.log(parsed.sld); // 'b'
console.log(parsed.domain); // 'b.ide.kyoto.jp'
console.log(parsed.subdomain); // 'a'

var parsed2 = psl.parse('www.sony.jp');

console.log(parsed2.tld); // 'jp'
console.log(parsed2.sld); // 'sony'
console.log(parsed2.domain); // 'sony.jp'
console.log(parsed2.subdomain); // 'www'
```

Finally, another very important thing to bear in mind is
[internationalised domain names](http://en.wikipedia.org/wiki/Internationalized_domain_name).
`psl` handles both punnycode ascii domains as well as unicode.

```js
var psl = require('psl');

var parsed = psl.parse('www.食狮.中国');

console.log(parsed.tld); // '中国'
console.log(parsed.sld); // '食狮'
console.log(parsed.domain); // '食狮.中国'
console.log(parsed.subdomain); // 'www'

var parsed2 = psl.parse('shishi.中国');

console.log(parsed2.tld); // '中国'
console.log(parsed2.sld); // 'shishi'
console.log(parsed2.domain); // 'shishi.中国'
console.log(parsed2.subdomain); // null

var parsed3 = psl.parse('shishi.xn--fiqs8s');

console.log(parsed3.tld); // 'xn--fiqs8s'
console.log(parsed3.sld); // 'shishi'
console.log(parsed3.domain); // 'shishi.xn--fiqs8s'
console.log(parsed3.subdomain); // null
```

Feedback and pull requests are welcome 😉

* [Source on GitHub](https://github.com/wrangr/psl)
* [Releases via NPM](https://www.npmjs.org/package/psl)
