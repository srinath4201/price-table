const C = "#0ea8e0";
const icons = {
  company:`<svg width="18" height="19" viewBox="0 0 18 19" fill="${C}"><path d="M1 3h7v16H1zM9 7h8v12H9z"/><g fill="#fff"><rect x="2.5" y="5" width="1.6" height="1.6"/><rect x="5" y="5" width="1.6" height="1.6"/><rect x="2.5" y="8.5" width="1.6" height="1.6"/><rect x="5" y="8.5" width="1.6" height="1.6"/><rect x="2.5" y="12" width="1.6" height="1.6"/><rect x="5" y="12" width="1.6" height="1.6"/><rect x="11" y="9.5" width="1.6" height="1.6"/><rect x="13.5" y="9.5" width="1.6" height="1.6"/><rect x="11" y="13" width="1.6" height="1.6"/><rect x="13.5" y="13" width="1.6" height="1.6"/></g></svg>`,
  system:`<svg width="18" height="16" viewBox="0 0 18 16" fill="${C}"><rect x="0" y="1" width="18" height="11" rx="1.5"/><path d="M6 15h6v1H6zM8 12h2v3H8z"/><circle cx="9" cy="6.5" r="2.6" fill="#fff"/><circle cx="9" cy="6.5" r="1.2"/></svg>`,
  calendar:`<svg width="17" height="17" viewBox="0 0 17 17" fill="${C}"><rect x="0" y="2" width="17" height="15" rx="1.5"/><rect x="3.5" y="0" width="2" height="4" rx="1"/><rect x="11.5" y="0" width="2" height="4" rx="1"/><g fill="#fff"><rect x="2" y="6" width="13" height="9"/></g><g fill="${C}"><rect x="3" y="7" width="2" height="2"/><rect x="6" y="7" width="2" height="2"/><rect x="9" y="7" width="2" height="2"/><rect x="12" y="7" width="2" height="2"/><rect x="3" y="10" width="2" height="2"/><rect x="6" y="10" width="2" height="2"/><rect x="9" y="10" width="2" height="2"/><rect x="12" y="10" width="2" height="2"/><rect x="3" y="13" width="2" height="1.5"/><rect x="6" y="13" width="2" height="1.5"/></g></svg>`,
  status:`<svg width="19" height="14" viewBox="0 0 19 14" fill="${C}"><rect x="0" y="1" width="9" height="2" rx="1"/><rect x="0" y="6" width="12" height="2" rx="1"/><rect x="0" y="11" width="17" height="2" rx="1"/><circle cx="15" cy="3.5" r="3.5"/></svg>`,
  product:`<svg width="16" height="16" viewBox="0 0 16 16" fill="${C}"><rect x="0" y="0" width="16" height="4" rx="1"/><path d="M1 5h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/><rect x="5" y="7" width="6" height="1.8" rx=".9" fill="#fff"/></svg>`,
  comm:`<svg width="17" height="16" viewBox="0 0 17 16" fill="${C}"><path d="M2 0h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7l-4 4v-4H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/><g fill="#fff"><circle cx="5" cy="6" r="1"/><circle cx="8.5" cy="6" r="1"/><circle cx="12" cy="6" r="1"/></g></svg>`,
  reports:`<svg width="15" height="18" viewBox="0 0 15 18" fill="${C}"><path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H10l5 5v11.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 0 16.5z"/><path d="M10 0v5h5" fill="#8fd6f2"/><g fill="#fff"><rect x="3" y="11" width="2" height="4"/><rect x="6.5" y="8" width="2" height="7"/><rect x="10" y="10" width="2" height="5"/></g></svg>`,
  automation:`<svg width="18" height="17" viewBox="0 0 18 17" fill="${C}"><rect x="6" y="0" width="6" height="5" rx="1"/><rect x="0" y="11" width="6" height="6" rx="1"/><rect x="12" y="11" width="6" height="6" rx="1"/><path d="M8.3 5h1.4v3H15v3h-1.4V9.4H4.4V11H3V8h5.3z"/></svg>`,
  custom:`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="${C}" stroke-width="1.6"><path d="M12 2H2.5A1.5 1.5 0 0 0 1 3.5v11A1.5 1.5 0 0 0 2.5 16h10a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M4 6h5M4 9h4M4 12h6"/><path d="M14.5 1.2l1.3 1.3-6 6-1.8.5.5-1.8z" fill="${C}"/></svg>`,
  online:`<svg width="18" height="16" viewBox="0 0 18 16" fill="${C}"><rect x="1" y="0" width="16" height="11" rx="1.5"/><path d="M6 15h6v1H6zM8 11h2v4H8z"/><circle cx="9" cy="5.5" r="3.3" fill="none" stroke="#fff" stroke-width="1"/><path d="M5.7 5.5h6.6M9 2.2c-1.6 2-1.6 4.6 0 6.6M9 2.2c1.6 2 1.6 4.6 0 6.6" stroke="#fff" stroke-width="1" fill="none"/></svg>`,
  production:`<svg width="18" height="16" viewBox="0 0 18 16" fill="${C}"><path d="M0 16V6l5 3V6l5 3V6l5 3V0h3v16z"/><g fill="#fff"><rect x="2.5" y="11" width="2" height="2"/><rect x="7" y="11" width="2" height="2"/><rect x="11.5" y="11" width="2" height="2"/></g></svg>`,
  copilot:`<svg width="21" height="19" viewBox="0 0 21 19" fill="none" stroke="${C}" stroke-width="1.4"><path d="M3 5c0-2.2 3.1-4 7-4s7 1.8 7 4-3.1 4-7 4-7-1.8-7-4z"/><path d="M3 5v5c0 2.2 3.1 4 7 4 .7 0 1.3 0 2-.1"/><path d="M3 10v4c0 2.2 3.1 4 7 4"/><circle cx="16.5" cy="14.5" r="2" /><path d="M16.5 10.8v1.4M16.5 16.8v1.4M12.8 14.5h1.4M18.8 14.5h1.4"/></svg>`
};

const cards = [
  ["company","Company settings",["Application setup","Company profile","Financial & Tax setup","Country","Currency conversion","Payment configuration","Social media links","Terms & Conditions"]],
  ["system","System settings",["Users & Roles","Price setup","Customer account","Standard delivery","Express","Service charges","Restore","Log history","Import history"]],
  ["calendar","Calendar settings",["Appointment types","Calendar setup","Calendar integration setup","Checklist"]],
  ["status","Status",["Status","Manual notes"]],
  ["product","Product configuration",["Field types","Options & Materials","Pricing groups","Pricing types & Unit types","Products","Suppliers"]],
  ["comm","Communication",["Emails","Text message"]],
  ["reports","Reports Setup",["Reports & Templates","General reports setup"]],
  ["automation","Automation",["Automation rules"]],
  ["custom","Customization forms",["Field settings","Modules"]],
  ["online","Online ordering setup",["Online ordering setup","Trade user setup"]],
  ["online","Website setup",["E-commerce products","SEO","Coupons"]],
  ["production","Production setup",["Production configuration","Product workflow","Optimisation setup","Production storage configuration","User allocation"]],
  ["copilot","BM Copilot settings",["Configuration","Billing","Usage logs"]]
];

// Pages that exist so far; everything else stays "#"
const links = {
  "Field types":"field-types.html",
  "Products":"products.html"
};

const esc = s => s.replace(/&/g,"&amp;");
document.getElementById("cards").innerHTML = cards.map(([icon,title,items]) => `
  <section class="card">
    <div class="card-head">${icons[icon]}<h2>${esc(title)}</h2></div>
    <ul>${items.map(i => `<li><a href="${links[i] || "#"}">${esc(i)}</a></li>`).join("")}</ul>
  </section>`).join("");
