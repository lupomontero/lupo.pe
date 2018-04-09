# Writing Node.js modules in C++

* URL: https://lupomontero.com/writing-node-js-modules-in-cpp/
* Tags: `c++`, `javascript`, `node`
* Author: lupo
* Published on: 2011-03-13

***

Today I found myself looking at how to write [Node.js](https://nodejs.org)
modules in C++. I read [@izs’s article on the How to Node website](https://howtonode.org/how-to-module)
and felt tempted to explore the C++ route, being already familiar with their
JavaScript counterparts.

I am no C++ expert, in fact I’m quite a noobie, but I have read a lot of it (it
is used to ilustrate programming concepts in sooooo many books) and even managed
to write a couple of command line tools for my own use. Anyway, the idea in this
post is to show the most basic interaction between a C++ module and node.js. The
examples I have seen have been very useful, but I felt the need to simplify the
code even more and reduce the “hello world” module into the bare minimum.

So this is my go at it (this has been updated to work with Node.js v4.0.0):

```c++
#include <node.h>

namespace cpphello {

  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Object;
  using v8::String;
  using v8::Value;

  void Foo(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello World"));
  }

  void Init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "foo", Foo);
  }

  NODE_MODULE(cpphello, Init)

}
```

This code registers a module called `cpphello`. This module has one method
called `foo`, and this method simply returns a string (`"Hello World"`).

> UPDATE: This example has been updated thanks to pull requests from [kul](https://github.com/lupomontero/node-cpphello/pull/2)

So from a Node.js JavaScript file we could use it like this:

```js
var cpphello = require('./cpphello');

cpphello.foo(); // hello world
```

You can get the whole source code for this hello world module from
[GitHub](https://github.com/lupomontero/node-cpphello). There you will find the
`.cpp` file with the c++ source and a JavaScript file using the module together
with the build script.

Ok, so now that I have a basic hello world module I can’t help but wondering,
how much faster will the C++ code run? Well, at this point I just had to, so I
wrote a really quick and dirty test. The test implements the exact same piece of
code both in C++ and JavaScript and then compares execution times. You can
download the test also from GitHub: https://github.com/lupomontero/node-cppspeed.

The results:

```
foo run in 167ms
cppfoo run in 18ms
c++ was 9.3 times faster
```

Other examples:

* https://github.com/pkrumins/node-async
* https://github.com/isaacs/node-async-simple
