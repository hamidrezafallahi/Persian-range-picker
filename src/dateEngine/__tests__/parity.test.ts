import { describe, expect, it } from 'vitest';
import engine from '../index';

describe('dateEngine parity', () => {
  const knownTs = engine('1395/1/23', 'jYYYY/jM/jD').startOf('day').valueOf();

  it('maps 1395/01/23 to gregorian 2016-04-11', () => {
    expect(engine(knownTs).format('YYYY-MM-DD')).toBe('2016-04-11');
    expect(engine(knownTs).format('jYYYY/jMM/jDD')).toBe('1395/01/23');
  });

  it('reports jalali month lengths and leap years', () => {
    expect(engine.jDaysInMonth(1395, 11)).toBe(30);
    expect(engine.jDaysInMonth(1394, 11)).toBe(29);
    expect(engine.jDaysInMonth(1403, 0)).toBe(31);
    expect(engine.jDaysInMonth(1403, 6)).toBe(30);
    expect(engine.isLeapJalaaliYear(1395)).toBe(true);
    expect(engine.isLeapJalaaliYear(1394)).toBe(false);
  });

  it('supports startOf/endOf and jMonth arithmetic', () => {
    const now = Date.now();
    expect(engine(now).startOf('day').valueOf()).toBeLessThan(
      engine(now).endOf('day').valueOf()
    );
    expect(engine(now).startOf('jMonth').format('jDD')).toBe('01');
    expect(
      engine(now)
        .startOf('day')
        .subtract(1, 'jMonth')
        .add(1, 'jMonth')
        .format('jYYYY/jMM/jDD')
    ).toBe(engine(now).startOf('day').format('jYYYY/jMM/jDD'));
  });

  it('parses compact jalali and weekday', () => {
    expect(engine('14030115', 'jYYYYjMMjDD').format('jYYYY/jMM/jDD')).toBe(
      '1403/01/15'
    );
    expect(typeof engine(Date.now()).day()).toBe('number');
    expect(engine(Date.now()).day(6).format('ddd')).toBe('Sat');
  });
});
