import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(quoteElement: HTMLElement | null): Promise<void> {
  if (!quoteElement) return;

  const excludeFromPDF = Array.from(
    quoteElement.querySelectorAll(".hide-on-pdf")
  ) as HTMLElement[];

  // Force hide elements with !important
  excludeFromPDF.forEach(el => {
    el.style.cssText = "display: none !important";
  });

  const canvas = await html2canvas(quoteElement, {
    scale: 2,
    windowHeight: quoteElement.scrollHeight
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
  pdf.save("quote.pdf");

  // Reset styles
  excludeFromPDF.forEach(el => {
    el.style.cssText = "";
  });
}
