const Fibonacci = function(n) {
  if (n<=1) {
    return n;
  }
  return Fibonacci(n-1)+Fibonacci(n-2);
};

export default Fibonacci;
