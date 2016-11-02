var memoize = require("./memoization.js");

exports['test fibonacci function'] = function(assert) {
  var fib = memoize(function(n){return n<2 ? n : fib(n-1) + fib(n-2);});
  // fib(3) == fib(2) + fib(1) == (0+1) + 1 == 2
  assert.equal(fib(3), 2, 'Result is correct');

  //test that the underlying function is called only n+1 times while computing fib(n)
  // if the function has been memoized, then only computing fib(0), fib(1), ..., fib(n) will be necessary
  var calls_counter = 0;
  var fib_callcounted = memoize(function(n){
    calls_counter++;
    return n<2 ? n : fib_callcounted(n-1) + fib_callcounted(n-2);
  });
  var n = 10;
  fib_callcounted(n);
  assert.equal(calls_counter, n+1, "The function has indeed been memoized");
}

exports['test memoized method in an object'] = function(assert) {
  function Answer() {
    this.answer = 42;
  }
  Answer.prototype.getAnswer = memoize(function(){
    return this.answer;
  });
  var answer = new Answer;
  assert.equal(answer.getAnswer(), 42, "Memoized method can access instance variables");
}
 

if (module == require.main) require('test').run(exports);
