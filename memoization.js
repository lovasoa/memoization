function memoize(f) {
  var dict = {};
  return function() {
    var args = JSON.stringify(arguments);
    if(dict.hasOwnProperty(args)) return dict[args];
    var res = f.apply(this, arguments);
    dict[args] = res;
    return res;
  }
}

if (typeof module === "object") module.exports = memoize;
