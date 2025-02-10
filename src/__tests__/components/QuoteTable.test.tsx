import QuoteTable from '@/components/quoteTable';
import { render, screen } from '@testing-library/react';

describe('QuoteTable', () => {
  const mockItems = [
    {
      description: 'Test item',
      price: 100,
      quantity: 1,
      type: 'charge'
    }
  ];

  it('renders table headers correctly', () => {
    render(<QuoteTable items={mockItems} deleteItem={() => { }} />);

    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Unit Price')).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('VAT')).toBeInTheDocument();
  });
});
