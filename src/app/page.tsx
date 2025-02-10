"use client";

import { useRef, useState } from "react";

import FooterButtons from "@/components/footerButtons";
import Header from "@/components/header";
import Modal from "@/components/modal";
import QuoteTable from "@/components/quoteTable";

import { QuoteItem } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";

// Function to calculate totals
const calculateTotals = (items: QuoteItem[]) => {
  let subtotal = 0;
  let vat = 0;

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;

    if (item.type === "credit") {
      subtotal -= itemTotal;
    } else {
      subtotal += itemTotal;
      vat += itemTotal * 0.2; // Calculate VAT only on non-credit items
    }
  });

  return { subtotal, vat, total: subtotal + vat };
};

export default function QuotePage() {
  const [items, setItems] = useState<QuoteItem[]>([]); // Stores the list of items in the quote
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const quoteRef = useRef<HTMLDivElement>(null); // Reference for PDF generation

  // Adds a new item
  const addItem = (item: QuoteItem, addAnother = false) => {
    if (!item || !item.description || isNaN(item.price) || item.price <= 0) return;
    setItems((prevItems) => [...prevItems, item]);
    if (!addAnother) setIsModalOpen(false);
  };

  // Deletes an item
  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const { subtotal, vat, total } = calculateTotals(items);

  return (
    <main className="p-4 sm:p-6 max-w-screen-lg mx-auto bg-white rounded border border-slate-300 mt-4 sm:mt-8">
      <div className="bg-white" ref={quoteRef}>
        <Header />
        <div className="pt-8">
          {items.length > 0 ? (
            <QuoteTable items={items} deleteItem={deleteItem} />
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Add new quote item"
              className="text-center font-semibold block p-8 rounded border border-slate-300 w-full bg-slate-200 hover:bg-slate-300 transition duration-300 ease-in-out"
            >
              Add an item to get started
            </button>
          )}

          {items.length > 0 && (
            <div className="text-right mt-4 pb-4">
              <p>Subtotal: {formatCurrency(subtotal)}</p>
              <p>VAT (20%): {formatCurrency(vat)}</p>
              <p className="font-semibold">Total: {formatCurrency(total)}</p>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <FooterButtons quoteRef={quoteRef} openModal={() => setIsModalOpen(true)} />
        )}
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onSave={addItem} />}
    </main>
  );
}
