# memoization
Straightforward implementation of memoization in javascript

## Exemple Usage
```js
var memoize = require("memoization");
var fib = memoize(function(n){return n<2 ? n : fib(n-1) + fib(n-2);});
```

## Code
```js
function memoize(f) {
  var dict = {};
  return function() {
    var args = JSON.stringify(arguments);
    if(dict.hasOwnProperty(args)) return dict[args];
    var res = f.apply(null, arguments);
    dict[args] = res;
    return res;
  }
}

if (typeof module === "object") module.exports = memoize;
```
