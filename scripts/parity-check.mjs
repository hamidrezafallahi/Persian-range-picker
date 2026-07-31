/**
 * Accuracy self-checks for dateEngine (jalaali-js / Borkowski).
 * Run: npx tsx scripts/parity-check.mjs
 */
import engine from '../src/dateEngine/index.ts';

const cases = [];
function assertEq(label, a, b) {
  const ok = Object.is(a, b) || a === b;
  cases.push({ label, a, b, ok });
  if (!ok) console.error('FAIL', label, { a, b });
}

const knownTs = engine('1395/1/23', 'jYYYY/jM/jD').startOf('day').valueOf();
assertEq('1395/01/23 → YYYY-MM-DD', engine(knownTs).format('YYYY-MM-DD'), '2016-04-11');
assertEq('1395/01/23 j format', engine(knownTs).format('jYYYY/jMM/jDD'), '1395/01/23');

assertEq('leap 1395 Esfand days', engine.jDaysInMonth(1395, 11), 30);
assertEq('common 1394 Esfand days', engine.jDaysInMonth(1394, 11), 29);
assertEq('Farvardin days', engine.jDaysInMonth(1403, 0), 31);
assertEq('Mehr days', engine.jDaysInMonth(1403, 6), 30);

assertEq('isLeap 1395', engine.isLeapJalaaliYear(1395), true);
assertEq('isLeap 1394', engine.isLeapJalaaliYear(1394), false);

const now = Date.now();
assertEq(
  'start/end day order',
  engine(now).startOf('day').valueOf() < engine(now).endOf('day').valueOf(),
  true
);
assertEq(
  'jMonth start day=1',
  engine(now).startOf('jMonth').format('jDD'),
  '01'
);
assertEq(
  'subtract month then add back',
  engine(now).startOf('day').subtract(1, 'jMonth').add(1, 'jMonth').format('jYYYY/jMM/jDD'),
  engine(now).startOf('day').format('jYYYY/jMM/jDD')
);

assertEq(
  'parse compact',
  engine('14030115', 'jYYYYjMMjDD').format('jYYYY/jMM/jDD'),
  '1403/01/15'
);

assertEq('weekday stable', typeof engine(now).day() === 'number', true);
assertEq(
  'day(6) is Saturday',
  engine(now).day(6).format('ddd'),
  'Sat'
);

const failed = cases.filter((c) => !c.ok);
console.log(`Passed ${cases.length - failed.length}/${cases.length}`);
if (failed.length) {
  process.exit(1);
}
console.log('All accuracy checks passed.');
