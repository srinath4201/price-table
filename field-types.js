const fieldTypes = FIELD_TYPES; // from js/field-types-data.js

const rowsEl = document.getElementById("rows");
const searchCell = document.getElementById("searchCell");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const statusSelect = document.getElementById("status");

// Fill category options from the data
[...new Set(fieldTypes.map(f => f[1]))].forEach(c => categorySelect.add(new Option(c, c)));

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const cat = categorySelect.value;
  const st = statusSelect.value;

  rowsEl.innerHTML = fieldTypes
    .map((f, i) => ({ f, i }))
    .filter(({ f }) =>
      (!q || f[0].toLowerCase().includes(q)) &&
      (!cat || f[1] === cat) &&
      (!st || String(f[2]) === st))
    .map(({ f, i }) => `<tr>
      <td>${f[0]}</td>
      <td>${f[1]}</td>
      <td><button class="toggle${f[2] ? "" : " off"}" data-i="${i}"><span class="label">${f[2] ? "On" : "Off"}</span><span class="knob"></span></button></td>
    </tr>`)
    .join("");
}

rowsEl.addEventListener("click", e => {
  const btn = e.target.closest(".toggle");
  if (!btn) return;
  const row = fieldTypes[btn.dataset.i];
  row[2] = !row[2];
  render();
});

document.getElementById("searchBtn").addEventListener("click", () => {
  searchCell.classList.toggle("open");
  if (searchCell.classList.contains("open")) searchInput.focus();
});

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
statusSelect.addEventListener("change", render);

render();
