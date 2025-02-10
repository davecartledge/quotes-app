import { generatePDF } from "@/utils/generatePDF";
import { MutableRefObject } from "react";

interface FooterButtonsProps {
  quoteRef: MutableRefObject<HTMLDivElement | null>;
  openModal: () => void;
}

export default function FooterButtons({ quoteRef, openModal }: FooterButtonsProps) {
  return (
    <footer className="mt-8 border-t">
      <button
        aria-label="Add new quote item"
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition duration-300 ease-in-out hide-on-pdf"
        onClick={openModal}
      >
        Add Quote Item
      </button>
      <button
        className="mt-4 ml-2 px-4 py-2 border hover:bg-slate-100 rounded font-semibold transition duration-300 ease-in-out hide-on-pdf"
        onClick={() => generatePDF(quoteRef.current)}
      >
        Save as PDF
      </button>
    </footer>
  )
};
