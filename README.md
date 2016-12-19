## Memoization
[Memoization](https://en.wikipedia.org/wiki/Memoization) is an optimization technique primarily used to speedup programs by storing the results of expensive function calls, and serving the cached result when the same function is called again. It derived from the latin world [Memorendum](https://en.wikipedia.org/wiki/Memorandum) which meant 'to be remembered'.

## Why
To quote wikipedia, 'A memoized function "remembers" the results corresponding to some set of specific inputs. Subsequent calls with remembered inputs return the remembered result rather than recalculating it, thus eliminating the primary cost of a call with given parameters from all but the first call made to the function with those parameters.'

Thus, it lowers the function's time cost in exchange for space cost, IE, meoized functions gets speed optimizations at the cost of being memory hungry. And so, it might not be the best solution for devices that needs to prioritize memory cost.


## History
The term 'Memoization' was first used by British Professor [Donald Michie](https://en.wikipedia.org/wiki/Donald_Michie) in 1968. Prof Michie was a researcher in artificial intelligence who worked as part of the British code-breaking group at Bletchley Park during World War II. He helped solve [Tunny](https://en.wikipedia.org/wiki/Lorenz_cipher), a German teleprinter cipher during the war and was director of the University of Edinburgh's Department of Machine Intelligence and Perception.
Prof. Michie first proposed of using memoized functions to improve performance of machine learning.


### A much better explanation by Gayle McDowell

#### (author of Cracking the Coding Interview)

[youtube-700x400](https://youtu.be/P8Xa2BitN3I)



## Example
The best way to demonstrate the functionality and benefits of memoization is to apply it in 'Fibonacci Number' algorithm.

So, to freshen our knowledge, Fibonacci numbers are those numbers which follow the fact that every number after the first two is the sum of the two preceding numbers.

here's a basic recursive implementation,

```JavaScript
const Fibonacci = function(n) {
  if (n<=1) {
    return n;
  }
  return Fibonacci(n-1)+Fibonacci(n-2);
};
```

Note that, here are too many redundant calculations are being done. If you see the figure below, to calculate Fibonacci(6) we need to make a lots of repeating functions calls (colored in red). And these increase the computation time.

![fibonacci(6)](http://i.imgur.com/bgqt2er.png)


here's the implementation of the same code, with caching added to it (memoized)

```JavaScript
let cache = [];http://i.imgur.com/bgqt2er.png
const MemoizedFibonacci = function(n) {
  if (n<=1) {
    return n;
  }
  if(cache[n] === undefined){
    cache[n] = MemoizedFibonacci(n-1) + MemoizedFibonacci(n-2);
  }
  return cache[n];
};
```

So, we just simply add a array `cache` to store the calculated results. At each recursion, we check if the result have already been calculated. If so, we return the cached result `cache[n]`, if no we calculate and save it to `cache` and finally return it.

![memoized_fibonacci(6)](http://i.imgur.com/5npqumM.png)


### Benchmarking it

Lets be honest, no code optimization is satisfying until you can benchmark your code. Unfortunately [jsPef.com](https://jsperf.com/) is down and I couldn't test the improvements there. But you can check the tests done by [Addy Osmani](https://addyosmani.com/) on his [great article about memoization](https://addyosmani.com/blog/faster-javascript-memoization/) .

So, instead I wrote a small (highly inefficient also) function to calculate the computation time. Here's the code

```JavaScript
const Benchmark = function(func, n){
  const startingTime = new Date().getTime();
  const result = func(n);

  return {
    result: result,
    calculationTime: `${(new Date().getTime() - startingTime)}ms`
  };
};
```
All it does it, before executing a function (passed as parameter), it keeps a track of current time. After the function execution is finished it compares the starting time with time at that point, and thus calculates the number of milliseconds it took to compute.

Now, we call both the cached and non-cached fibonacci code,

```JavaScript
import Benchmark from './benchmark';
import Fibonacci from './fibonacci';
import MemoizedFibonacci from './memoized_fibonacci';

console.log("Fibonacci ", Benchmark(Fibonacci, 40));
console.log("Memoized Fibonacci ", Benchmark(MemoizedFibonacci, 40));
```

##### Results
```
> Memoization@1.0.0 start /home/salekin/dev/tutorials/js/Memoization
> babel-node app.js --presets es2015,stage-2

Fibonacci  { result: 12586269025, calculationTime: '215862ms' }
Memoized Fibonacci  { result: 12586269025, calculationTime: '16ms' }
```

We try to find the 40th fibonacci with both implementations.You can see the non-cached version takes almost three and a half minutes, while the cached version almost finishes instantaneously (16ms).

This was run on a fairly fast (?) core i5  machine several times with the results being almost the same. That shows, how much redundant calculation is being done with the non-cached version.

### Limitations
There are several things which must be kept in mind when implementing memoization. First, by storing old results, memoized functions consume additional memory. In the Fibonacci example, the additional memory consumption is unbounded. If memory usage is a concern, then a fixed size cache should be used. The overhead associated with memoization can also make it impractical for functions with execute quickly or that are executed infrequently.

The biggest limitation of memoization is that it can only be automated with functions that are [referentially transparent](https://en.wikipedia.org/wiki/Referential_transparency_(computer_science)). A function is considered referentially transparent if its output depends only on its inputs, and it does not cause any side effects.  A call to a referentially transparent function can be replaced by its return value without changing the semantics of the program.  The Fibonacci function is referentially transparent because it depends solely on the value of “n”. In the following example, the function foo() is not referentially transparent because it uses a global variable, “bar”. Since “bar” can be modified outside of foo(), there is no guarantee that the return value will remain the same for each input value. In this example, the two calls to foo() return the values two and three, even though the same arguments are passed to both calls.

You can read about it in detail [here](https://www.sitepoint.com/implementing-memoization-in-javascript/)

### Things to remember

- Memoization can potentially increase performance by caching the results of previous function calls.
- Memoized functions store a cache which is indexed by their input arguments.  If the arguments exist in the cache, then the cached value is returned.  Otherwise, the function is executed and the newly computed value is added to the cache.
- Object arguments should be stringified before using as an index.
- Memoization can be automatically applied to referentially transparent functions.
- Memoization may not be ideal for infrequently called or fast executing functions.

### Practice Code

Here's a [Coin Change](https://www.hackerrank.com/challenges/coin-change) problem by HackerRank. It's easier to solve it using recursion, than iteration.

You can it's implementation by Gayle McDowell here
[youtube-700x400](https://youtu.be/sn0DWI-JdNA)



### Study Material

[Implementing Memoization in JavaScript by SitePoint](https://www.sitepoint.com/implementing-memoization-in-javascript/)

[Faster JavaScript Memoization For Improved Application Performance by Addy Osmani](https://addyosmani.com/blog/faster-javascript-memoization/)

[Memoization, Speed Up Your Javascript Performance from require 'mind'](http://requiremind.com/memoization-speed-up-your-javascript-performance/)

[Wikipedia](https://en.wikipedia.org/wiki/Memoization)

[And most importantly, JavaScript: the good parts by Douglas Crockford ](https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/ch04s15.html)
