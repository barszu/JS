self.onmessage = function (MessageEvent) {
  const {iterations} = MessageEvent.data;
  const res = calculatePrimes(iterations);
  self.postMessage({res});
  self.close();
}

function calculatePrimes(iterations) {
  const primes = [];
  for (let i = 0; i < iterations; i++) {
    const candidate = i * (1000000000 * Math.random());
    let isPrime = true;
    for (let c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

