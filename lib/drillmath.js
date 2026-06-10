/* drillmath.js — the formulas behind the Fin-Eng Drill, as a pure module.
 *
 * Contract (same as blackscholes.js): ALL rates are decimals (0.05 = 5%),
 * times in years. No DOM, no state — just math, so test/drillmath.test.mjs
 * can pin every formula to textbook anchors and the page can't drift.
 */

/** Bond price per 100 face. couponRate/ytm as decimals, m payments per year. */
export function bondPrice(couponRate, ytm, years, m = 2) {
  const F = 100, c = F * couponRate / m, y = ytm / m, n = Math.round(years * m);
  let p = 0;
  for (let t = 1; t <= n; t++) p += c / Math.pow(1 + y, t);
  return p + F / Math.pow(1 + y, n);
}

/** Gordon growth value: D1 / (r - g). Throws if r <= g (the model's hard rule). */
export function gordonValue(D1, g, r) {
  if (r <= g) throw new RangeError('Gordon model needs r > g');
  return D1 / (r - g);
}

/** Two-asset portfolio volatility (decimal), weights wA + (1-wA). */
export function portfolioVol(wA, volA, volB, rho) {
  const wB = 1 - wA;
  const variance = wA * wA * volA * volA + wB * wB * volB * volB
    + 2 * wA * wB * volA * volB * rho;
  return Math.sqrt(Math.max(variance, 0));
}

/** Minimum-variance weight in asset A, clamped to [0,1] (long-only). */
export function minVarWeightA(volA, volB, rho) {
  const denom = volA * volA + volB * volB - 2 * rho * volA * volB;
  if (Math.abs(denom) < 1e-12) return 0.5;
  const w = (volB * volB - rho * volA * volB) / denom;
  return Math.min(1, Math.max(0, w));
}

/** GBM expected price: E[S_T] = S0 * e^(mu*T). */
export function gbmMean(S0, mu, T) {
  return S0 * Math.exp(mu * T);
}

/** Annualized Sharpe ratio from annual mean return and volatility (decimals). */
export function sharpe(meanAnnual, volAnnual, rf = 0) {
  if (volAnnual <= 0) return NaN;
  return (meanAnnual - rf) / volAnnual;
}
