// This file contains all shared TypeScript interfaces/types

export interface QuoteItem {
  description: string;
  price: number;
  quantity: number;
  type: 'credit' | 'charge';
}

// You can add more shared types here as needed
export interface QuoteTableProps {
  items: QuoteItem[];
  deleteItem: (index: number) => void;
}

export interface ModalProps {
  onClose: () => void;
  onSave: (item: QuoteItem, addAnother: boolean) => void;
}

