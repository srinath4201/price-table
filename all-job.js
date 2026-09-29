const statusClass = {
  "Agent Quote":"st-agent","Lead":"st-lead","Order":"st-order","Invoiced":"st-invoiced",
  "Quote Rejected":"st-rejected","Partially paid":"st-partial","Backorder":"st-backorder"
};

// [ref, deliveryRef, due, qty, notes, status, cost, lastName, gross, overdue]
const data = [
  ["ON5506","","26-09-2026","0/1","","Agent Quote","0.00","","58.00"],
  ["ON5505","","26-09-2026","0/1","","Agent Quote","70.00","","324.24"],
  ["ON5504","","26-09-2026","0/1","","Lead","500.00","","1321.24"],
  ["ORD5503","","26-09-2026","0/1","","Agent Quote","0.00","R","60.00"],
  ["ON5502","","26-09-2026","0/1","","Lead","0.00","Quote 94","58.00"],
  ["ON5501","","","0/0","","Lead","0.00","","58.00"],
  ["ORD5500","","25-09-2026","0/1","","Order","222.00","Hem","327.00"],
  ["ORD5499","","23-09-2026","0/0","","Invoiced","0.00","Hem","60.00",1],
  ["ON5498","","","0/0","","Lead","0.00","Raj","58.00"],
  ["ON5497","","24-09-2026","0/1","","Invoiced","98.50","Raj","278702.24"],
  ["ON5496","","","0/1","","Quote Rejected","90.50","","278685.00"],
  ["ON5495","","24-09-2026","0/2","","Lead","626.08","Quote 94","280052.61"],
  ["ORD5494","","","0/0","","Lead","0.00","","60.00"],
  ["ON5493","","22-09-2026","0/1","","Partially paid","0.00","","165.00",1],
  ["ON5492","","22-09-2026","0/2","","Lead","82.05","","278780.00",1],
  ["ON5491","","24-09-2026","0/2","Anschrift ändern","Quote Rejected","228.00","","435.00"],
  ["ON5490","","","0/1","","Backorder","0.00","John","60.00"],
  ["ON5489","","21-09-2026","0/1","","Agent Quote","0.00","John","165.00",1],
  ["ON5488","","24-09-2026","0/1","","Lead","500.00","","1325.00"],
  ["ON5487","","15-09-2026","0/2","","Invoiced","90.50","","288395.00",1],
  ["ON5486","","17-09-2026","0/2","","Lead","90.50","","288395.00",1],
  ["ON5485","","15-09-2026","0/0","","Invoiced","0.00","","60.00",1],
  ["ON5484","","14-09-2026","0/1","","Lead","0.00","","58.00",1],
  ["ON5483","","","0/1","","Agent Quote","0.00","","60.00"]
];

const searchIcon = '<span class="sicon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9aa6ad" stroke-width="2.4"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg></span>';

document.getElementById("filterRow").innerHTML =
  '<th class="c-chk"></th><th class="c-exp"></th>' +
  Array.from({length:9}, (_, i) => `<th class="${i===8?'c-gross':'col'}">${searchIcon}</th>`).join("") +
  '<th class="c-act"></th>';

const caret = c => `<svg class="caret" width="9" height="6" viewBox="0 0 9 6"><path d="M0 0h9L4.5 6z" fill="${c}"/></svg>`;

document.getElementById("rows").innerHTML = data.map(r => {
  const [ref,del,due,qty,notes,status,cost,last,gross,overdue] = r;
  const caretColor = overdue ? "#f0303a" : (status === "Quote Rejected" ? "#fff" : "#1f1f1f");
  return `<tr class="${overdue ? 'overdue' : ''}">
    <td class="c-chk"><span class="chk"></span></td>
    <td class="c-exp"><span class="exp"><svg width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="#fff" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg></span></td>
    <td>${ref}</td>
    <td>${del}</td>
    <td>${due}</td>
    <td>${qty}</td>
    <td>${notes}</td>
    <td class="status ${statusClass[status]}">${status}${caret(caretColor)}</td>
    <td>£ ${cost}</td>
    <td>${last}</td>
    <td class="c-gross">£ ${gross}</td>
    <td class="c-act"><span class="kebab"><i></i><i></i><i></i></span></td>
  </tr>`;
}).join("");
