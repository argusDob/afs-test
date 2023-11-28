export default function convertDateFormat(dateString: string): string {
  const parts = dateString.split("-"); // Split the date by hyphen
  return `${parts[2]}-${parts[1]}-${parts[0]}`; // Rearrange the parts and format
}
