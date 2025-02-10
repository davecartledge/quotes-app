import { formatCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('£1,234.56');
  });

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-£1,234.56');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('£0.00');
  });

  it('throws error for invalid input', () => {
    expect(() => formatCurrency(NaN)).toThrow('formatCurrency expects a valid number');
  });
});
