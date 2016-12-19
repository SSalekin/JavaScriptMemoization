import Benchmark from './benchmark';
import Fibonacci from './fibonacci';
import MemoizedFibonacci from './memoized_fibonacci';

console.log("Fibonacci ", Benchmark(Fibonacci, 50));
console.log("Memoized Fibonacci ", Benchmark(MemoizedFibonacci, 50));
