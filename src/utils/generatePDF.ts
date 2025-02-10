import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(quoteElement: HTMLElement | null): Promise<void> {
  if (!quoteElement) return;

  const excludeFromPDF = Array.from(
    quoteElement.querySelectorAll(".hide-on-pdf")
  ) as HTMLElement[];

  excludeFromPDF.forEach(el => el.style.display === "none");

  const canvas = await html2canvas(quoteElement, {
    scale: 2,
    windowHeight: quoteElement.scrollHeight
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
  pdf.save("quote.pdf");

  excludeFromPDF.forEach(el => el.style.display === "");
}
