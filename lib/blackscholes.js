// lib/blackscholes.js — pure Black–Scholes option pricing (ES module, no build step).
//
// Mirrors lib/loot.js in spirit: this file knows NOTHING about the DOM, sliders, or
// canvases. You hand it numbers, it hands back numbers. That is exactly what makes it
// unit-testable in Node (see test/blackscholes.test.mjs) and reusable by any page.
//
// Unit contract (read this before calling):
//   S, K   : prices, same currency               (e.g. 100)
//   sigma  : annual volatility as a DECIMAL       (0.20 means 20%)
//   T      : time to expiry in YEARS              (0.5 = six months)
//   r      : annual risk-free rate as a DECIMAL   (0.05 means 5%)
// The options.html UI collects percents from its sliders and converts before calling —
// the math here always speaks decimals, so there is one consistent contract.

// Standard-normal CDF via Abramowitz & Stegun 7.1.26 (max abs error ~7.5e-8).
// N(x) = the probability a standard normal random variable lands at or below x.
export function normCDF(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp(-x * x / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}

// The two intermediate terms of Black–Scholes. Roughly: d1/d2 measure how many
// standard deviations of (log) move the stock needs for the option to expire
// in-the-money. N(d2) is the risk-neutral probability the call is exercised.
export function d1d2(S, K, sigma, T, r) {
  const vsqrt = sigma * Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / vsqrt;
  const d2 = d1 - vsqrt;
  return { d1, d2 };
}

/**
 * Price a European call & put, plus their deltas, under Black–Scholes.
 * @returns {{call:number, put:number, d1:number, d2:number, deltaCall:number, deltaPut:number}}
 */
export function blackScholes(S, K, sigma, T, r) {
  // Degenerate cases: no time left or no volatility ⇒ the option is worth exactly
  // its intrinsic value (max(S-K,0) for a call). Handling these first also avoids
  // dividing by zero in d1 (sigma·√T would be 0).
  if (T <= 0 || sigma <= 0) {
    return {
      call: Math.max(S - K, 0),
      put: Math.max(K - S, 0),
      d1: 0, d2: 0,
      deltaCall: S > K ? 1 : 0,
      deltaPut: S < K ? -1 : 0,
    };
  }
  const { d1, d2 } = d1d2(S, K, sigma, T, r);
  const disc = K * Math.exp(-r * T);             // present value of the strike
  const call = S * normCDF(d1) - disc * normCDF(d2);
  const put = call - S + disc;                   // put–call parity: P = C − S + Ke^(−rT)
  return { call, put, d1, d2, deltaCall: normCDF(d1), deltaPut: normCDF(d1) - 1 };
}
