/* Tests for lib/drillmath.js — every drill formula pinned to hand-computed anchors. */
import { bondPrice, gordonValue, portfolioVol, minVarWeightA, gbmMean, sharpe }
  from '../lib/drillmath.js';

let passed = 0, failed = 0;
function ok(cond, msg) {
  if (cond) { passed++; }
  else { failed++; console.error('  FAIL:', msg); }
}
function close(a, b, tol, msg) { ok(Math.abs(a - b) <= tol, `${msg} (got ${a}, want ${b}±${tol})`); }

// ── bondPrice ──
// 5y 4% semi-annual at 5% YTM: annuity 2×(1−1.025⁻¹⁰)/0.025 + 100×1.025⁻¹⁰ = 95.6240
close(bondPrice(0.04, 0.05, 5, 2), 95.6240, 0.001, 'bond 5y 4% semi @5%');
// coupon == yield -> exactly par
close(bondPrice(0.06, 0.06, 7, 2), 100, 1e-9, 'coupon==yield is par');
close(bondPrice(0.06, 0.06, 13, 1), 100, 1e-9, 'par holds annual too');
// zero coupon = pure discount of face
close(bondPrice(0, 0.05, 5, 2), 100 / Math.pow(1.025, 10), 1e-9, 'zero coupon');
// higher yield -> lower price (the see-saw)
ok(bondPrice(0.04, 0.06, 5, 2) < bondPrice(0.04, 0.05, 5, 2), 'price falls as yield rises');

// ── gordonValue ──
close(gordonValue(2, 0.03, 0.09), 33.3333, 0.001, 'Gordon 2/(9%−3%)');
close(gordonValue(1.5, 0.02, 0.07), 30, 1e-9, 'Gordon 1.5/(7%−2%)');
let threw = false;
try { gordonValue(2, 0.09, 0.09); } catch { threw = true; }
ok(threw, 'Gordon throws when r <= g');

// ── portfolioVol ──
// 60/40, σ 20%/7%, ρ 0.2: var = 0.0144 + 0.000784 + 0.001344 = 0.016528 → 12.856%
close(portfolioVol(0.6, 0.20, 0.07, 0.2), Math.sqrt(0.016528), 1e-9, 'portfolio vol 60/40');
// ρ=1 collapses to the weighted average of vols
close(portfolioVol(0.5, 0.10, 0.30, 1), 0.20, 1e-9, 'rho=1 is linear mix');
// ρ=-1 with equal vols and 50/50 hedges to zero
close(portfolioVol(0.5, 0.15, 0.15, -1), 0, 1e-9, 'rho=-1 perfect hedge');
// diversification: vol at ρ=0 is below ρ=1
ok(portfolioVol(0.5, 0.2, 0.1, 0) < portfolioVol(0.5, 0.2, 0.1, 1), 'lower rho lowers risk');

// ── minVarWeightA ──
// (0.0049 − 0.0028)/(0.04 + 0.0049 − 0.0056) = 0.0021/0.0393 = 0.053435...
close(minVarWeightA(0.20, 0.07, 0.2), 0.0021 / 0.0393, 1e-9, 'min-var weight');
ok(minVarWeightA(0.40, 0.05, 0.9) >= 0 && minVarWeightA(0.40, 0.05, 0.9) <= 1, 'clamped to [0,1]');
// equal vols, rho<1 -> 50/50 by symmetry
close(minVarWeightA(0.2, 0.2, 0.3), 0.5, 1e-9, 'symmetric assets split 50/50');

// ── gbmMean ──
close(gbmMean(100, 0.08, 1), 100 * Math.exp(0.08), 1e-9, 'E[S] = S0·e^muT');
close(gbmMean(100, 0, 5), 100, 1e-9, 'zero drift stays put');

// ── sharpe ──
close(sharpe(0.10, 0.20), 0.5, 1e-9, 'sharpe 10%/20%');
close(sharpe(0.12, 0.20, 0.02), 0.5, 1e-9, 'sharpe with rf');
ok(Number.isNaN(sharpe(0.1, 0)), 'zero vol is NaN, not Infinity');

console.log(`drillmath: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
