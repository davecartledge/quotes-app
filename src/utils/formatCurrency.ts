export function formatCurrency(value: number): string {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("formatCurrency expects a valid number");
  }

  return value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
