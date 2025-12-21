document.addEventListener("DOMContentLoaded", () => {
  const tocList = document.getElementById("toc-list");
  const toc = document.getElementById("floating-toc");
  const toggleBtn = document.getElementById("toc-toggle");

  if (!tocList || !toc) return;

  // Utility: generate stable IDs
  function slugify(text) {
    return text.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Find all top-level sections
  document.querySelectorAll("section.page-section").forEach(section => {
    const sectionHeading = section.querySelector(".section-heading");
    if (!sectionHeading) return;

    const sectionTitle = sectionHeading.textContent;
    const sectionId = section.id || slugify(sectionTitle);
    section.id = sectionId;

    // Section TOC entry
    const li = document.createElement("li");
    li.className = "toc-section";

    const a = document.createElement("a");
    a.href = `#${sectionId}`;
    a.textContent = sectionTitle;
    a.className = "toc-h1";

    li.appendChild(a);

    // Inner headings (collapsed by default)
    const innerList = document.createElement("ul");
    innerList.className = "toc-sublist";

    section.querySelectorAll(".section-content h1, .section-content h2, .section-content h3")
      .forEach(h => {
        if (!h.id) h.id = slugify(sectionId + "-" + h.textContent);

        const subLi = document.createElement("li");
        subLi.className = `toc-${h.tagName.toLowerCase()}`;

        const subA = document.createElement("a");
        subA.href = `#${h.id}`;
        subA.textContent = h.textContent;

        subLi.appendChild(subA);
        innerList.appendChild(subLi);
      });

    if (innerList.children.length > 0) {
      li.appendChild(innerList);
    }

    tocList.appendChild(li);
  });

  // Toggle entire TOC
  toggleBtn.addEventListener("click", () => {
    toc.classList.toggle("collapsed");
  });

  // Expand/collapse per section
  tocList.addEventListener("click", e => {
    if (e.target.classList.contains("toc-h1")) {
      const parent = e.target.parentElement;
      parent.classList.toggle("expanded");
    }
  });
});
