// Shared top-bar behaviour: the "+" add popup
const addBtn = document.getElementById("addBtn");
const addMenu = document.getElementById("addMenu");

addBtn.addEventListener("click", e => {
  if (addMenu.contains(e.target)) {
    // choosing an option closes the menu; clicks on the padding keep it open
    if (e.target.closest("a")) addBtn.classList.remove("open");
    return;
  }
  addBtn.classList.toggle("open");
});

document.addEventListener("click", e => {
  if (!addBtn.contains(e.target)) addBtn.classList.remove("open");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") addBtn.classList.remove("open");
});
