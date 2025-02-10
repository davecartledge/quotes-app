import { ModalProps, QuoteItem } from "@/types";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";

export default function Modal({ onClose, onSave }: ModalProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const closeButton = closeButtonRef.current;

    // Handle clicks outside the modal
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle pressing the Escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Attach event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      // Return focus to the button that opened the modal
      if (closeButton) {
        closeButton.focus();
      }

      // Clean up event listeners
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleSubmit = (e?: React.FormEvent, addAnother = false) => {
    if (e) e.preventDefault();

    const form = formRef.current;
    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      return;
    }

    const formData = new FormData(form);

    // Create item with correct types
    const item: QuoteItem = {
      quantity: Number(formData.get("quantity")),
      type: formData.get("type")?.toString().toLowerCase() as 'credit' | 'charge',
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
    };

    onSave(item, addAnother);

    if (!addAnother) {
      onClose();
    } else {
      form.reset();
      const quantityInput = form.querySelector<HTMLInputElement>("input[name='quantity']");
      if (quantityInput) {
        quantityInput.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white p-4 md:p-8 rounded w-11/12	lg:w-1/2 focus:outline-none"
        tabIndex={-1}
      >
        {/* Modal header */}
        <header className="flex justify-between border-b pb-6">
          <h2 className="text-xl font-semibold" id="modal-title">New Quote Item</h2>
          <button ref={closeButtonRef} onClick={onClose} aria-label="Close modal">
            <XMarkIcon className="h-5 w-5 hover:text-slate-500" />
          </button>
        </header>

        {/* Form for adding a quote item */}
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="py-10">
            <div className="flex gap-6">
              {/* Quantity Field */}
              <div className="w-1/5">
                <label className="block mb-2 font-semibold">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  required
                  className="w-full p-2 border transition duration-300 ease-in-out border-slate-200
                  focus:outline-none focus:border-slate-400 hover:border-slate-400 cursor-pointer rounded mb-4"
                />
              </div>

              {/* Type Field */}
              <div className="w-4/5">
                <label className="block mb-2 font-semibold">Type</label>
                <div className="relative">
                  <select
                    name="type"
                    required
                    className="w-full bg-transparent text-slate-700 border rounded pl-2 pr-8 py-2
                    transition duration-300 ease-in-out border-slate-200 focus:outline-none
                    focus:border-slate-400 hover:border-slate-400 cursor-pointer appearance-none"
                  >
                    <option value="charge">Charge</option>
                    <option value="credit">Credit</option>
                  </select>
                  <ChevronDownIcon className="h-5 w-5 absolute top-2.5 right-2.5 text-slate-700" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Description Field */}
            <label className="block mb-2 font-semibold">Details</label>
            <textarea
              name="description"
              required
              className="w-full p-2 border transition duration-300 ease-in-out border-slate-200
              focus:outline-none focus:border-slate-400 hover:border-slate-400 cursor-pointer rounded mb-4"
            />

            {/* Unit Price Field */}
            <label className="block mb-2 font-semibold">Unit Price (£)</label>
            <input
              type="number"
              name="price"
              required
              className="w-1/5 p-2 border transition duration-300 ease-in-out border-slate-200
              focus:outline-none focus:border-slate-400 hover:border-slate-400 cursor-pointer rounded mb-4"
            />
          </div>

          {/* Modal footer with action buttons */}
          <footer className="flex flex-col md:flex-row justify-between items-center border-t pt-6 gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <button type="submit" className="text-sm md:text-base px-2 md:px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded font-semibold transition duration-300 ease-in-out">
                Create and finish
              </button>
              <button type="button" onClick={() => handleSubmit(undefined, true)} className="text-sm md:text-base px-2 md:px-4 py-2 border hover:bg-slate-100 rounded font-semibold transition duration-300 ease-in-out">
                Create and add another
              </button>
            </div>
            <button type="button" onClick={onClose} className="text-sm md:text-base font-semibold hover:text-slate-500 transition duration-300 ease-in-out">
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
