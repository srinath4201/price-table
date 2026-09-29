// Shared side menu for product pages.
// Usage: <aside class="side" id="side" data-active="general"></aside>
//        (optionally data-sub="fields-table" to highlight a sub menu link)
(function () {
  const side = document.getElementById("side");
  if (!side) return;

  // keep ?name=...&code=... when moving between product pages
  const qs = location.search;
  const S = "#dfe2ee";
  const chev = `<svg class="chev" width="11" height="7" viewBox="0 0 11 7" fill="none" stroke="${S}" stroke-width="1.6"><path d="M1 1l4.5 4.5L10 1"/></svg>`;

  const items = [
    { key: "general", label: "General Info", href: "product-general.html",
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" stroke="${S}" stroke-width="1.3"><path d="M10 1H3a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 3 16h5"/><path d="M10 1l4 4v3"/><path d="M10 1v4h4"/><path d="M4.5 7h5M4.5 10h3M4.5 13h2"/><path d="M13.5 9.5l1.5 1.5-4.5 4.5H9V14z"/></svg>` },
    { key: "fields", label: "Fields and Values", href: "product-fields.html",
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" stroke="${S}" stroke-width="1.2"><path d="M10 1H3a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 3 16h4"/><path d="M10 1l4 4v2M10 1v4h4"/><path d="M4.5 7h5M4.5 10h3"/><circle cx="12" cy="12.5" r="1.6"/><path d="M12 9.3v1.1M12 14.6v1.1M8.8 12.5h1.1M14.1 12.5h1.1"/></svg>`,
      sub: [
        { key: "fields-table", label: "Fields and Values Table View", href: "product-fields.html" },
        { key: "fields-hierarchy", label: "Fields and Values Hierarchy View", href: "#" },
        { key: "edi", label: "EDI Setup View", href: "#" }
      ] },
    { key: "materials", label: "Materials", href: "#", more: true,
      icon: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" stroke="${S}" stroke-width="1.2" stroke-linejoin="round"><path d="M8.5 1L16 4.8 8.5 8.6 1 4.8z"/><path d="M1 8l7.5 3.8L16 8"/><path d="M1 11.2L8.5 15l7.5-3.8"/></svg>` },
    { key: "price", label: "Price Tables", href: "#",
      icon: `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" stroke="${S}" stroke-width="1.2"><rect x="1" y="1" width="13" height="12" rx="1"/><path d="M1 5h13M1 9h8M5.5 5v8"/><circle cx="13" cy="12" r="3.3" fill="#1c1f3a"/><path d="M13.8 10.6a1 1 0 0 0-1.8.6v2.2h-.7M12 12.4h1.3M11.3 13.4h2.8"/></svg>` },
    { key: "operations", label: "Operations", href: "#", more: true,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="${S}" stroke-width="1.2"><circle cx="8" cy="8" r="7"/><circle cx="8" cy="8" r="2.2"/><path d="M8 3.2v1.4M8 11.4v1.4M3.2 8h1.4M11.4 8h1.4"/></svg>` },
    { key: "recipe", label: "Recipe Setup", href: "#",
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="${S}" stroke-width="1.2"><path d="M3 15V4.5A1.5 1.5 0 0 1 4.5 3H6M10 3h1.5A1.5 1.5 0 0 1 13 4.5V15z"/><rect x="6" y="1.5" width="4" height="3" rx=".8"/><path d="M1 15h14M5.5 8h5M5.5 11h3"/></svg>` },
    { key: "production", label: "Production Setup", href: "#",
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="${S}" stroke-width="1.2"><rect x="1" y="1.5" width="14" height="10" rx="1"/><path d="M5 15h6M8 11.5V15"/><circle cx="8" cy="6.5" r="1.8"/><path d="M8 3.3v1M8 8.7v1M4.8 6.5h1M10.2 6.5h1"/></svg>` },
    { key: "manual", label: "Product manual", href: "#",
      icon: `<svg width="15" height="16" viewBox="0 0 15 16" fill="none" stroke="${S}" stroke-width="1.2"><path d="M2.5 1h10v12h-10A1.5 1.5 0 0 0 1 14.5V2.5A1.5 1.5 0 0 1 2.5 1z"/><path d="M1 14.5A1.5 1.5 0 0 0 2.5 16h10v-3"/><path d="M7.5 4v2.5M7.5 8.5v.2"/></svg>` },
    { key: "discounts", label: "Global discounts", href: "#",
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="${S}" stroke-width="1.2"><path d="M8 1l1.8 1.3 2.2-.1.7 2.1 1.8 1.3-.7 2.1.7 2.1-1.8 1.3-.7 2.1-2.2-.1L8 15l-1.8-1.3-2.2.1-.7-2.1-1.8-1.3.7-2.1-.7-2.1 1.8-1.3.7-2.1 2.2.1z"/><path d="M5.8 10.2l4.4-4.4"/><circle cx="6" cy="6" r=".7"/><circle cx="10" cy="10" r=".7"/></svg>` }
  ];

  const active = side.dataset.active;
  const activeSub = side.dataset.sub;
  const link = href => (href === "#" ? "#" : href + qs);

  side.innerHTML = `
    <div class="side-head">
      <span>Menu</span>
      <button class="side-toggle" id="sideToggle" title="Collapse menu"><svg width="12" height="11" viewBox="0 0 12 11" fill="none" stroke="#fff" stroke-width="1.8"><path d="M5.5 1L1.5 5.5l4 4.5M10.5 1l-4 4.5 4 4.5"/></svg></button>
    </div>
    <ul class="side-menu">
      ${items.map(it => {
        const isActive = it.key === active;
        const cls = [isActive && "active", isActive && it.sub && "open"].filter(Boolean).join(" ");
        const icon = isActive ? it.icon.replaceAll(S, "#fff") : it.icon;
        return `<li class="${cls}" data-key="${it.key}">
          <a href="${link(it.href)}" title="${it.label}">${icon}<span class="label">${it.label}</span>${it.sub || it.more ? chev : ""}</a>
          ${it.sub ? `<ul class="sub">${it.sub.map(s =>
            `<li><a href="${link(s.href)}" class="${s.key === activeSub ? "current" : ""}" title="${s.label}">${s.label}</a></li>`).join("")}</ul>` : ""}
        </li>`;
      }).join("")}
    </ul>`;

  // On the page that owns a sub menu, clicking its header opens/closes it
  side.querySelectorAll(".side-menu > li.active").forEach(li => {
    if (!li.querySelector(".sub")) return;
    li.firstElementChild.addEventListener("click", e => {
      e.preventDefault();
      li.classList.toggle("open");
    });
  });

  document.getElementById("sideToggle").addEventListener("click", () => side.classList.toggle("collapsed"));

  // Breadcrumb shows the product that was opened
  const crumb = document.getElementById("crumbProduct");
  const name = new URLSearchParams(qs).get("name");
  if (crumb && name) crumb.textContent = name;
})();
