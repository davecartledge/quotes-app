import ItemRow from "@/components/itemRow";
import { QuoteItem } from "@/types";

interface QuoteTableProps {
  items: QuoteItem[];
  deleteItem: (index: number) => void;
}

export default function QuoteTable({ items, deleteItem }: QuoteTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-slate-300">
        <thead className="bg-slate-200">
          <tr>
            <th className="border p-2 text-left w-10">Quantity</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-right w-24">Unit Price</th>
            <th className="border p-2 text-right w-24">Subtotal</th>
            <th className="border p-2 text-right w-24">VAT</th>
            <th className="border p-2 text-left w-10 hide-on-pdf">Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <ItemRow key={index} item={item} index={index} onDelete={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
