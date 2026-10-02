function parseLegalMarkdown(md) {
  const lines = md.split("\n");
  const sections = [];
  let currentContent = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      if (currentContent) {
        sections.push({ type: "paragraph", content: currentContent.trim() });
        currentContent = "";
      }
      sections.push({ type: "heading1", content: trimmed.slice(2) });
    } else if (trimmed.startsWith("## ")) {
      if (currentContent) {
        sections.push({ type: "paragraph", content: currentContent.trim() });
        currentContent = "";
      }
      sections.push({ type: "heading2", content: trimmed.slice(3) });
    } else if (trimmed.startsWith("### ")) {
      if (currentContent) {
        sections.push({ type: "paragraph", content: currentContent.trim() });
        currentContent = "";
      }
      sections.push({ type: "heading3", content: trimmed.slice(4) });
    } else if (trimmed === "") {
      if (currentContent) {
        sections.push({ type: "paragraph", content: currentContent.trim() });
        currentContent = "";
      }
    } else {
      currentContent += (currentContent ? " " : "") + trimmed;
    }
  }
  if (currentContent) {
    sections.push({ type: "paragraph", content: currentContent.trim() });
  }
  return sections;
}
export {
  parseLegalMarkdown as p
};
