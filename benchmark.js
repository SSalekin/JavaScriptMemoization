const Benchmark = function(func, n){
  const startingTime = new Date().getTime();
  const result = func(n);

  return {
    result: result,
    calculationTime: `${(new Date().getTime() - startingTime)}ms`
  };
};

export default Benchmark;
