// test/blackscholes.test.mjs — verifies the Black–Scholes module against
// textbook-known values. Run with: npm test  (or: node test/blackscholes.test.mjs)
//
// Like test/loot.test.mjs, this is a tiny self-contained runner — no framework,
// no dependencies — so Atlas keeps its no-build promise. Exits non-zero on any
// failure, so a pre-commit hook or CI can rely on it.

import { normCDF, blackScholes } from '../lib/blackscholes.js';

let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log('  ✓', name); }
  else { fail++; console.log('  ✗', name); }
}
// Real-valued math is never bit-exact, so we assert "within tol" instead of ===.
// tol is the largest error we will tolerate; pick it just above the method's
// known numerical error (A&S CDF error is ~1e-7, so 1e-3 is a safe ceiling).
function near(name, got, want, tol = 1e-4) {
  ok(`${name} (got ${got}, want ${want} ±${tol})`, Math.abs(got - want) <= tol);
}

console.log('normCDF anchors');
near('N(0) = 0.5', normCDF(0), 0.5, 1e-6);
near('N(1.96) ≈ 0.975', normCDF(1.96), 0.975, 1e-3);
near('N(-1.96) ≈ 0.025', normCDF(-1.96), 0.025, 1e-3);
ok('symmetry: N(x) + N(-x) = 1', Math.abs((normCDF(0.7) + normCDF(-0.7)) - 1) < 1e-6);

console.log('Black–Scholes — the textbook case (S=K=100, σ=20%, T=1yr, r=5%)');
{
  const o = blackScholes(100, 100, 0.20, 1, 0.05);
  near('call price = 10.4506', o.call, 10.4506, 1e-3);
  near('put price = 5.5735', o.put, 5.5735, 1e-3);
  near('d1 = 0.35', o.d1, 0.35, 1e-9);
  near('call delta = N(0.35) ≈ 0.6368', o.deltaCall, 0.6368, 1e-3);
  near('put delta ≈ -0.3632', o.deltaPut, -0.3632, 1e-3);
}

console.log('put–call parity holds exactly: C − P = S − K·e^(−rT)');
{
  for (const S of [80, 100, 130]) {
    const o = blackScholes(S, 100, 0.25, 0.5, 0.03);
    const rhs = S - 100 * Math.exp(-0.03 * 0.5);
    near(`parity at S=${S}`, o.call - o.put, rhs, 1e-9);
  }
}

console.log('edge cases (no time / no volatility ⇒ pure intrinsic value)');
{
  const expired = blackScholes(120, 100, 0.20, 0, 0.05);
  near('T=0 call = intrinsic 20', expired.call, 20, 1e-9);
  near('T=0 put = 0', expired.put, 0, 1e-9);
  ok('T=0 call delta = 1 (in the money)', expired.deltaCall === 1);

  const novol = blackScholes(90, 100, 0, 1, 0.05);
  near('σ=0 OTM call = 0', novol.call, 0, 1e-9);
}

console.log('sanity: more volatility ⇒ a pricier option (vega is positive)');
{
  const lo = blackScholes(100, 100, 0.10, 1, 0.05).call;
  const hi = blackScholes(100, 100, 0.40, 1, 0.05).call;
  ok('call(σ=40%) > call(σ=10%)', hi > lo);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
