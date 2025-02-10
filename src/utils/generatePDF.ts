import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (quoteElement: HTMLDivElement | null) => {
  if (!quoteElement) return;

  const excludeFromPDF = quoteElement.querySelectorAll<HTMLElement>(".hide-on-pdf");
  excludeFromPDF.forEach((el) => (el.style.display = "none"));

  const canvas = await html2canvas(quoteElement, { scale: 2, windowHeight: quoteElement.scrollHeight });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("quote.pdf");

  // Reset the display of hidden elements
  excludeFromPDF.forEach((el) => (el.style.display = ""));
};
