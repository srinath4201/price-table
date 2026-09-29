// [fieldName, fieldCode, fieldType, fieldInfo, mandatory, mobileQuickView, showOnJobItem, options]
// options: exp = has values to expand, sys = system field (no checkbox / menu), mobLock = mobile toggle locked
const fields = [
  ["Unit Type","","Unit Type","",true,false,true,{ sys:true }],
  ["Quantity","","Qty","",true,true,true,{ mobLock:true }],
  ["Location","","Location_Text","",false,false,true,{}],
  ["Supplier","","Supplier","",false,true,true,{}],
  ["Measure To","MT","List","",false,false,true,{ exp:true }],
  ["Width","","Numeric X","Add information here",false,true,true,{ mobLock:true }],
  ["Drop","","Numeric Y","",false,true,true,{ mobLock:true }],
  ["Installation Height","","Numeric","Min 1500 to 3500",false,false,false,{}],
  ["Product Type","RPT","Pricing Group","",false,true,true,{ exp:true }],
  ["Fabric","","Blinds Fabrics Materials","",false,true,true,{ exp:true }],
  ["Cassette Type","","List","",false,true,true,{ exp:true }],
  ["price group","Dual","Pricing Group","",false,false,true,{ exp:true }],
  ["Fabric allowance","","List","",false,false,true,{ exp:true }],
  ["Motor","","List","",false,false,true,{ exp:true }],
  ["new","","Numeric","",false,false,true,{}],
  ["Width2","","Numeric","",false,false,true,{}],
  ["Width3","","Numeric","",false,false,true,{}]
];

const rowsEl = document.getElementById("rows");
const checkAll = document.getElementById("checkAll");
const selected = new Set();
const expanded = new Set();
let menuRow = null; // row whose "⋮" menu is open

const toggle = (on, i, field, locked) =>
  `<button class="toggle${on ? "" : " off"}" data-i="${i}" data-field="${field}" ${locked ? "disabled" : ""}>${on ? "ON" : "OFF"}<span class="knob"></span></button>`;

// 4 x 4 dotted grid icon
const gridIcon = `<svg class="dots" width="15" height="13" viewBox="0 0 15 13" fill="#333">${
  [0, 3.6, 7.2, 10.8].map(y => [0, 4, 8, 12].map(x => `<rect x="${x}" y="${y}" width="2" height="2"/>`).join("")).join("")
}</svg>`;

const expIcon = `<svg width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="#fff" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>`;

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

function render() {
  rowsEl.innerHTML = fields.map((f, i) => {
    const o = f[7];
    return `<tr>
      <td class="c-chk">${o.sys ? "" : `<input type="checkbox" class="chk" data-i="${i}" ${selected.has(i) ? "checked" : ""}>`}</td>
      <td class="c-exp">${o.exp ? `<button class="exp${expanded.has(i) ? " open" : ""}" data-i="${i}" title="Show values">${expIcon}</button>` : ""}</td>
      <td>${esc(f[0])}</td>
      <td>${esc(f[1])}</td>
      <td>${esc(f[2])}</td>
      <td>${esc(f[3])}</td>
      <td>${toggle(f[4], i, 4)}</td>
      <td>${toggle(f[5], i, 5, o.mobLock)}</td>
      <td>${toggle(f[6], i, 6)}</td>
      <td class="c-menu">${o.sys ? "" : `<button class="kebab${menuRow === i ? " active" : ""}" data-i="${i}" title="Actions"><i></i><i></i><i></i></button>`}</td>
      <td class="c-grid">${gridIcon}</td>
    </tr>`;
  }).join("");
  const selectable = fields.map((f, i) => i).filter(i => !fields[i][7].sys);
  checkAll.checked = selectable.every(i => selected.has(i));
}

rowsEl.addEventListener("click", e => {
  const k = e.target.closest(".kebab");
  if (k) {
    const i = Number(k.dataset.i);
    menuRow === i ? closeRowMenu() : openRowMenu(i, k);
    return;
  }
  const t = e.target.closest(".toggle");
  if (t && !t.disabled) {
    const f = fields[t.dataset.i];
    f[t.dataset.field] = !f[t.dataset.field];
    render();
    return;
  }
  const x = e.target.closest(".exp");
  if (x) {
    const i = Number(x.dataset.i);
    expanded.has(i) ? expanded.delete(i) : expanded.add(i);
    render();
  }
});

rowsEl.addEventListener("change", e => {
  if (!e.target.classList.contains("chk")) return;
  const i = Number(e.target.dataset.i);
  e.target.checked ? selected.add(i) : selected.delete(i);
  render();
});

checkAll.addEventListener("change", () => {
  fields.forEach((f, i) => { if (!f[7].sys) checkAll.checked ? selected.add(i) : selected.delete(i); });
  render();
});

// ---------- Row "⋮" menu: Delete ----------
const rowMenu = document.getElementById("rowMenu");

function openRowMenu(i, btn) {
  const r = btn.getBoundingClientRect(); // measure before render() replaces the button
  menuRow = i;
  render();
  rowMenu.hidden = false;
  rowMenu.style.top = `${r.top + r.height / 2 - rowMenu.offsetHeight / 2}px`;
  rowMenu.style.left = `${r.left - 18 - rowMenu.offsetWidth}px`;
}

function closeRowMenu() {
  if (menuRow === null) return;
  menuRow = null;
  rowMenu.hidden = true;
  render();
}

// Indexes above the deleted row move up by one
const shiftSet = (set, removed) => {
  const next = [...set].filter(i => i !== removed).map(i => (i > removed ? i - 1 : i));
  set.clear();
  next.forEach(i => set.add(i));
};

document.getElementById("rowDelete").addEventListener("click", () => {
  const i = menuRow;
  closeRowMenu();
  fields.splice(i, 1);
  shiftSet(selected, i);
  shiftSet(expanded, i);
  render();
});

document.addEventListener("click", e => {
  if (menuRow !== null && !rowMenu.contains(e.target) && !e.target.closest(".kebab")) closeRowMenu();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeRowMenu(); });
document.querySelector(".grid").addEventListener("scroll", closeRowMenu);
window.addEventListener("resize", closeRowMenu);

// Full screen for the table panel
document.getElementById("fullBtn").addEventListener("click", () => {
  const main = document.querySelector(".main");
  document.fullscreenElement ? document.exitFullscreen() : main.requestFullscreen();
});

// ---------- Add New Field popup ----------
const modal = document.getElementById("fieldModal");
const form = document.getElementById("fieldForm");
const fName = document.getElementById("fName");
const fCode = document.getElementById("fCode");
const fType = document.getElementById("fType");
const fInfo = document.getElementById("fInfo");
const infoCount = document.getElementById("infoCount");
const yn = {
  jobItem: document.getElementById("fJobItem"),
  portal: document.getElementById("fPortal"),
  mobile: document.getElementById("fMobile"),
  mandatory: document.getElementById("fMandatory")
};
const ynDefaults = { jobItem: true, portal: true, mobile: false, mandatory: false };

// Field Type options come from the Field Types page list (js/field-types-data.js)
FIELD_TYPES.forEach(([name]) => fType.add(new Option(name, name)));

// "Pricing group filter" asks for a Supplier, then a Product Type
const PRICING_FILTER_TYPE = "Pricing group filter";
const SUPPLIERS = ["Arena", "Decora", "Louvolite", "Style Studio"];
const PRODUCT_TYPES = ["Blinds with fabric", "Louvers", "Slat only"];

const fSupplier = document.getElementById("fSupplier");
const fProductType = document.getElementById("fProductType");
const supplierRow = document.getElementById("supplierRow");
const productTypeRow = document.getElementById("productTypeRow");
SUPPLIERS.forEach(n => fSupplier.add(new Option(n, n)));
PRODUCT_TYPES.forEach(n => fProductType.add(new Option(n, n)));

function syncDependents() {
  const isFilter = fType.value === PRICING_FILTER_TYPE;
  supplierRow.hidden = !isFilter;
  if (!isFilter) fSupplier.value = "";
  productTypeRow.hidden = !(isFilter && fSupplier.value);
  if (productTypeRow.hidden) fProductType.value = "";
}
fType.addEventListener("change", syncDependents);
fSupplier.addEventListener("change", () => {
  fProductType.value = "";
  syncDependents();
});

const setYN = (btn, on) => {
  btn.classList.toggle("no", !on);
  btn.firstChild.textContent = on ? "Yes" : "No";
};
const isYes = btn => !btn.classList.contains("no");
Object.values(yn).forEach(btn => btn.addEventListener("click", () => setYN(btn, !isYes(btn))));

function openModal() {
  form.reset();
  Object.entries(ynDefaults).forEach(([k, v]) => setYN(yn[k], v));
  [fName, fType, fSupplier, fProductType].forEach(el => (el === fName ? el : el.parentElement).classList.remove("invalid"));
  syncDependents();
  infoCount.textContent = "0/250";
  modal.hidden = false;
  fName.focus();
}
const closeModal = () => { modal.hidden = true; };

document.getElementById("addFieldBtn").addEventListener("click", openModal);
modal.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

fInfo.addEventListener("input", () => { infoCount.textContent = `${fInfo.value.length}/250`; });

document.getElementById("insertLink").addEventListener("click", () => {
  const url = prompt("Enter link URL");
  if (!url) return;
  const { selectionStart: s, selectionEnd: e, value } = fInfo;
  fInfo.value = (value.slice(0, s) + url + value.slice(e)).slice(0, 250);
  fInfo.dispatchEvent(new Event("input"));
  fInfo.focus();
});

fName.addEventListener("input", () => fName.classList.remove("invalid"));
[fType, fSupplier, fProductType].forEach(sel =>
  sel.addEventListener("change", () => sel.parentElement.classList.remove("invalid")));

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = fName.value.trim();
  const type = fType.value;
  const needsFilter = type === PRICING_FILTER_TYPE;
  const supplier = fSupplier.value;
  const productType = fProductType.value;
  fName.classList.toggle("invalid", !name);
  fType.parentElement.classList.toggle("invalid", !type);
  fSupplier.parentElement.classList.toggle("invalid", needsFilter && !supplier);
  fProductType.parentElement.classList.toggle("invalid", needsFilter && !!supplier && !productType);
  if (!name) { fName.focus(); return; }
  if (!type) { fType.focus(); return; }
  if (needsFilter && !supplier) { fSupplier.focus(); return; }
  if (needsFilter && !productType) { fProductType.focus(); return; }

  fields.push([
    name, fCode.value.trim(), type, fInfo.value.trim(),
    isYes(yn.mandatory), isYes(yn.mobile), isYes(yn.jobItem),
    needsFilter ? { onlinePortal: isYes(yn.portal), supplier, productType } : { onlinePortal: isYes(yn.portal) }
  ]);
  closeModal();
  render();
  document.querySelector(".grid").scrollTop = 1e6;
});

render();
