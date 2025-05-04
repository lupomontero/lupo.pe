---
url: https://lupomontero.com/using-javascript-closures-to-create-private-scopes/
tags:
  - javascript
author: lupo
publishedAt: 2011-03-06
---

# Using JavaScript closures to create private scopes

One of the best known problems in JavaScript is it’s dependance on a global
scope, which basically means that any variables you declare outside of a
function live in the same name space: the ominous `window` object. Because of
the nature of web pages, many scripts from differnt sources can (and will) run
on the same page sharing a common global scope and this can be a really really
bad thing as it can lead to name collisions (variables with the same names being
overwritten) and security issues.

To minimise the problem we can use JavaScript’s powerful closures to create
private scopes where we can be sure our variables are invisible to other scripts
on the page.

So what is a closure? Well, I could have used the definition given by
[Wikipedia](https://en.wikipedia.org/wiki/Closure_(computer_programming)), but
after reading it myself I think we need a simpler, more practical explanation
for web developers.

In JavaScript when you declare a function, the body of the function has access
to its parent scope and its own local (private) scope. Closure means that
functions close over the variables around them, so that functions created inside
of another function still have access to the scope in which they were created
even after the parent function has returned. Consider this:

```js
var makeFunction = function () {
  var foo = true;
  return function () {
    return foo;
  };
};

var myFunc = makeFunction();
myFunc(); // true
```

In the code above you can see that `makeFunction` returns an anonymous function,
and this function still has access to `foo`.

Closures together with anonymous functions can be used to achieve effective
_private_ scopes. If you have used any AJAX before you will have probably seen
anonymous functions. This are functions that don’t have a name and are often
used as callbacks passed as arguments when invoking a function that performs an
asynchronous task. Something like:

```js
foo('bar', function () {
  //...
});
```

But _anonymous_ functions can also serve a different purpose: creating scope.
All variables declared inside a function are only visible inside that function
and hidden from code outside. If we only want to create scope we don’t really
need to give the function a name, we only need to execute the function once so
we can just use the invokation operator on the anonymous function itself.

```js
function () {
  //...
}();
```

The last `()` is the invokation operator. This syntax is a bit weird, so to make
it easier to read you will normally see it like this:

```js
(function () {
  //...
}());
```

Wrapping the function in parens makes it easier to see that something funny is
going on with that function. The function is basically executing itself right
after being declared and since it is anonymous and hasn’t been assigned to any
variable it can not be referenced, effectively creating a private scope.

This comes in very handy and is commonly used to wrap whole scripts, putting all
your code in a closure and then publishing a public interface on the `window`
object.

```js
(function () {
  var a = 'not foo again';
  var foo = function (b) {
    // do something funky with a and b
  };
  window.myPlugin = foo;
}());
```

In the example above variable `a` is completely private, whereas `foo` has been
published on the `window` object under the name `myPlugin`, so from outside this
code `foo` can be called using `window.myPlugin()` or just `myPlugin()` because
`window` is the global object. This is known as the module pattern and it is
very nicely explained by Ben Cherry in [this post](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html).

This is also very common when writing [jQuery](http://jquery.com/) plugins. For
example, if we wanted to write a plugin that simply adds a class to the selected
nodes (this is a bit silly but should do for the example) we can write something
like this:

```js
(function ($) {
  var a = 'just-a-classname';
  $.fn.myPlugin = function () {
    $(this).addClass(a);
  };
}(jQuery));
```

Note that we are passing `jQuery` to the anonymous function as a parameter and
that parameter is given the name of `$` inside it’s own local scope.

So now after you have loaded jQuery and your plugin on the page you can add the
class name `just-a-classname` to all links by doing this:

```js
jQuery('a').myPlugin();
```

I hope that if you read this far you found this post useful. Please leave a
comment and share your thoughts.
