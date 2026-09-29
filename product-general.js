// Fill the form from the product that was clicked on the Products page
const params = new URLSearchParams(location.search);
const nameInput = document.getElementById("productName");
const codeInput = document.getElementById("productCode");
const reportInput = document.getElementById("reportCode");
const categorySelect = document.getElementById("productCategory");
const crumbProduct = document.getElementById("crumbProduct");

if (params.has("name")) nameInput.value = params.get("name");
if (params.has("code")) codeInput.value = params.get("code");
if (params.get("report")) reportInput.value = params.get("report");
if (params.has("category")) {
  const cat = params.get("category");
  if (![...categorySelect.options].some(o => o.value === cat)) categorySelect.add(new Option(cat, cat));
  categorySelect.value = cat;
}
crumbProduct.textContent = nameInput.value || "Product";
document.title = `${crumbProduct.textContent} - General Info`;
nameInput.addEventListener("input", () => { crumbProduct.textContent = nameInput.value || "Product"; });

// Focus the product name like the screenshot
nameInput.focus();
nameInput.setSelectionRange(nameInput.value.length, nameInput.value.length);

// Discount checkboxes stay locked until the lock is clicked
const lockBtn = document.getElementById("lockBtn");
lockBtn.addEventListener("click", () => {
  const unlocked = lockBtn.classList.toggle("unlocked");
  lockBtn.title = unlocked ? "Lock" : "Unlock to edit";
  document.querySelectorAll("#discountChecks input").forEach(c => { c.disabled = !unlocked; });
});

// Module ON / OFF toggles
document.querySelectorAll(".modules .toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const off = btn.classList.toggle("off");
    btn.firstChild.textContent = off ? "OFF" : "ON";
  });
});

// ---------- Image galleries ----------
const galleryFile = document.getElementById("galleryFile");
let activeGallery = null;

const removeBtn = `<button type="button" class="rm" title="Remove"><svg width="6" height="6" viewBox="0 0 6 6" stroke="#fff" stroke-width="1.4"><path d="M1 1l4 4M5 1L1 5"/></svg></button>`;

// A box with no images left switches to the dashed upload style (.img-box.empty)
const syncEmpty = box => box.classList.toggle("empty", !box.querySelector(".thumb"));

const pickImage = box => {
  activeGallery = box;
  galleryFile.value = "";
  galleryFile.click();
};

function addImage(box, file) {
  if (!file || !file.type.startsWith("image/")) return;
  if (file.size > 1024 * 1024) { alert("Image must be 1 MB or smaller."); return; }
  if (box.dataset.single) box.querySelectorAll(".thumb").forEach(t => t.remove());
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.style.backgroundImage = `url("${URL.createObjectURL(file)}")`;
  thumb.innerHTML = removeBtn;
  box.insertBefore(thumb, box.querySelector(".add-img"));
  if (!box.querySelector(".thumb.selected")) thumb.classList.add("selected");
  syncEmpty(box);
}

document.querySelectorAll(".img-box").forEach(box => {
  box.addEventListener("click", e => {
    if (box.classList.contains("empty")) { pickImage(box); return; }
    const rm = e.target.closest(".rm");
    const thumb = e.target.closest(".thumb");
    if (rm) {
      const wasSelected = thumb.classList.contains("selected");
      thumb.remove();
      const first = box.querySelector(".thumb");
      if (wasSelected && first) first.classList.add("selected");
      syncEmpty(box);
      return;
    }
    if (thumb) {
      box.querySelectorAll(".thumb").forEach(t => t.classList.toggle("selected", t === thumb));
      return;
    }
    if (e.target.closest(".add-img")) pickImage(box);
  });

  // drag and drop works on the empty (upload) state
  box.addEventListener("dragover", e => {
    if (!box.classList.contains("empty")) return;
    e.preventDefault();
    box.classList.add("over");
  });
  box.addEventListener("dragleave", () => box.classList.remove("over"));
  box.addEventListener("drop", e => {
    if (!box.classList.contains("empty")) return;
    e.preventDefault();
    box.classList.remove("over");
    addImage(box, e.dataTransfer.files[0]);
  });

  syncEmpty(box);
});

galleryFile.addEventListener("change", () => {
  if (activeGallery) addImage(activeGallery, galleryFile.files[0]);
});

// ---------- Upload drop zones ----------
document.querySelectorAll(".drop").forEach(drop => {
  const input = drop.querySelector("input");
  const text = drop.querySelector(".drop-text");
  const original = text.innerHTML;

  const show = file => {
    if (!file) { text.innerHTML = original; return; }
    if (file.size > 1024 * 1024) { alert("Image must be 1 MB or smaller."); text.innerHTML = original; return; }
    text.innerHTML = `<span class="file-name"></span>`;
    text.firstChild.textContent = file.name;
  };

  input.addEventListener("change", () => show(input.files[0]));
  drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", e => {
    e.preventDefault();
    drop.classList.remove("over");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      show(file);
    }
  });
});

// ---------- Save & Next: check required fields ----------
document.getElementById("productForm").addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  [nameInput, codeInput].forEach(input => {
    const empty = !input.value.trim();
    input.classList.toggle("invalid", empty);
    if (empty && ok) { input.focus(); ok = false; }
  });
});

[nameInput, codeInput].forEach(input =>
  input.addEventListener("input", () => input.classList.remove("invalid")));
