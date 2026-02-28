export function formatXml(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const errorNode = doc.querySelector("parsererror");
  if (errorNode) throw new Error("Invalid XML: " + (errorNode.textContent?.slice(0, 200) || "parse error"));

  let formatted = "";
  let indent = "";
  const lines = xml.replace(/(>)\s*(<)/g, "$1\n$2").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("</")) indent = indent.slice(2);
    formatted += indent + trimmed + "\n";
    if (
      trimmed.startsWith("<") &&
      !trimmed.startsWith("</") &&
      !trimmed.startsWith("<?") &&
      !trimmed.endsWith("/>") &&
      !/<\/[^>]+>$/.test(trimmed)
    ) {
      indent += "  ";
    }
  }
  return formatted.trim();
}

export const xmlSample = `<bookstore><book category="fiction"><title lang="en">The Great Gatsby</title><author>F. Scott Fitzgerald</author><year>1925</year><price>10.99</price></book><book category="non-fiction"><title lang="en">Sapiens</title><author>Yuval Noah Harari</author><year>2011</year><price>14.99</price></book></bookstore>`;
