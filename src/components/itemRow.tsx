import { QuoteItem } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { TrashIcon } from "@heroicons/react/24/solid";

interface ItemRowProps {
  item: QuoteItem;
  index: number;
  onDelete: (index: number) => void;
}

export default function ItemRow({ item, index, onDelete }: ItemRowProps) {
  // Calculate totals
  const itemTotal = item.price * item.quantity;
  const subtotal = item.type === "credit" ? -itemTotal : itemTotal;
  const vat = item.type !== "credit" ? itemTotal * 0.2 : 0;

  // Confirm before deleting an item
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove "${item.description}"?`)) {
      onDelete(index);
    }
  };

  return (
    <tr className="border">
      <td className="border p-2 text-center whitespace-nowrap">{item.quantity}</td>
      <td className="border p-2 whitespace-nowrap">
        {item.type === "credit" ? "Credit: " : ""}
        {item.description}
      </td>
      <td className="border p-2 text-right whitespace-nowrap">{formatCurrency(item.price)}</td>
      <td className="border p-2 text-right whitespace-nowrap">{formatCurrency(subtotal)}</td>
      <td className="border p-2 text-right whitespace-nowrap">{formatCurrency(vat)}</td>
      <td className="border p-2 text-center whitespace-nowrap hide-on-pdf">
        <button
          className="hover:text-slate-500 p-2"
          onClick={handleDelete}
          aria-label={`Remove item ${item.description}`}
        >
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
