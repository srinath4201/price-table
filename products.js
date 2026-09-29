// [product, code, reportCode, category, showInJobForm, backorder, backorderEditable]
const products = [
  ["Shutter New","963","","Shutter V2",true,false,false],
  ["Zebra blinds","1656","","Blinds with fabrics",true,true,false],
  ["Roller Blinds","197","","Blinds with fabrics",true,true,true],
  ["Puma S-300 Awning","102","AWN-PS300","Awnings",false,false,true],
  ["Ecowood Plus Shutter","362","","Shutter",true,false,false],
  ["Roller TDI","123","","Blinds with fabrics",true,false,false],
  ["Curtain production","154","","Blinds with fabrics",true,false,false],
  ["Verticals","721","","Blinds with fabrics",true,false,false],
  ["Timberlux EDI","700","","Blinds with slats",false,false,false],
  ["Fauxwood Venetian","692","","Blinds with slats",true,false,false],
  ["Sunwood EDI","691","","Blinds with slats",true,false,false],
  ["TD77 Doors","1144","","Blinds with slats",true,false,true],
  ["Curtain InHouse","099","","Soft Furnishings",true,false,false],
  ["Romans (Darpan)","988","","Blinds with fabrics",true,true,true],
  ["Ziptrak Blinds","018","","Blinds with fabrics",true,false,false],
  ["Одговорите на неколико","199","RB215","Blinds with fabrics",true,true,true],
  ["Aluminium Venetian (DEC) EDI","6187","","Blinds with slats",true,false,false],
  ["Verticals (Arena) EDI Old","013","","Blinds with fabrics",true,false,false],
  ["Excel Roller (DEC) EDI 2024","603","","Blinds with fabrics",true,false,false],
  ["Easy Fit Roller (Arena) EDI 2025","706","","Blinds with fabrics",true,false,false],
  ["Alpha test","568","","Awnings",true,false,true],
  ["Vertical Louvers only","113","","Blinds with fabrics",true,false,false],
  ["Test product","101","","Blinds with fabrics",true,false,false],
  ["Roller Blinds TEST","006","","Blinds with fabrics",false,false,false],
  ["Curtain (Kensington Blinds)","007","","Blinds with fabrics",false,false,false]
];

const rowsEl = document.getElementById("rows");
const checkAll = document.getElementById("checkAll");
const searchInputs = [...document.querySelectorAll(".search")];
const jobFormSelect = document.getElementById("jobFormFilter");
const backorderSelect = document.getElementById("backorderFilter");
const selected = new Set();

const toggle = (on, upper, attrs) =>
  `<button class="toggle ${on ? "on" : "off"}" ${attrs}>${upper ? (on ? "ON" : "OFF") : (on ? "On" : "Off")}<span class="knob"></span></button>`;

// 4 x 4 dotted grid icon
const gridIcon = `<svg class="dots" width="16" height="13" viewBox="0 0 16 13" fill="#1592d8">${
  [0, 3.6, 7.2, 10.8].map(y => [0, 4, 8, 12].map(x => `<rect x="${x}" y="${y}" width="2" height="2"/>`).join("")).join("")
}</svg>`;

function visibleRows() {
  const q = searchInputs.map(i => i.value.trim().toLowerCase());
  const jf = jobFormSelect.value;
  const bo = backorderSelect.value;
  return products
    .map((p, i) => ({ p, i }))
    .filter(({ p }) =>
      q.every((v, c) => !v || p[c].toLowerCase().includes(v)) &&
      (!jf || String(p[4]) === jf) &&
      (!bo || String(p[5]) === bo));
}

function render() {
  const rows = visibleRows();
  rowsEl.innerHTML = rows.map(({ p, i }) => `<tr>
    <td class="c-chk"><input type="checkbox" class="chk" data-i="${i}" ${selected.has(i) ? "checked" : ""}></td>
    <td><a class="p-link" href="product-general.html?${new URLSearchParams({ name: p[0], code: p[1], report: p[2], category: p[3] })}">${p[0]}</a></td>
    <td>${p[1]}</td>
    <td>${p[2]}</td>
    <td>${p[3]}</td>
    <td>${toggle(p[4], true, `data-i="${i}" data-field="4"`)}</td>
    <td>${toggle(p[5], false, `data-i="${i}" data-field="5" ${p[6] ? "" : "disabled"}`)}</td>
    <td class="c-menu"><span class="kebab"><i></i><i></i><i></i></span></td>
    <td class="c-grid">${gridIcon}</td>
    <td class="c-set"></td>
  </tr>`).join("");
  checkAll.checked = rows.length > 0 && rows.every(({ i }) => selected.has(i));
}

rowsEl.addEventListener("click", e => {
  const btn = e.target.closest(".toggle");
  if (!btn || btn.disabled) return;
  const p = products[btn.dataset.i];
  p[btn.dataset.field] = !p[btn.dataset.field];
  render();
});

rowsEl.addEventListener("change", e => {
  if (!e.target.classList.contains("chk")) return;
  const i = Number(e.target.dataset.i);
  e.target.checked ? selected.add(i) : selected.delete(i);
  render();
});

checkAll.addEventListener("change", () => {
  visibleRows().forEach(({ i }) => checkAll.checked ? selected.add(i) : selected.delete(i));
  render();
});

document.querySelectorAll(".search-cell").forEach(cell => {
  cell.querySelector(".sicon").addEventListener("click", () => {
    cell.classList.toggle("open");
    if (cell.classList.contains("open")) cell.querySelector(".search").focus();
  });
});

searchInputs.forEach(i => i.addEventListener("input", render));
jobFormSelect.addEventListener("change", render);
backorderSelect.addEventListener("change", render);

render();
