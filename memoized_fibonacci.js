let cache = [];
const MemoizedFibonacci = function(n) {
  if (n<=1) {
    return n;
  }
  if(cache[n] === undefined){
    cache[n] = MemoizedFibonacci(n-1)+MemoizedFibonacci(n-2);
  }
  return cache[n];
};

export default MemoizedFibonacci;
