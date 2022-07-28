const receiptsTableEl = $("#receipts_table");
// var data;
const getReceipts = async () => {
  const receiptsResponse = await fetch("/api/receipts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await receiptsResponse.json();
  console.log(data);
  addReceipts(data);
};
function addReceipts(data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const trEl = $("<tr>");
    trEl.appendTo(receiptsTableEl);
    const idEl = $("<td>")
      .addClass("text-center text-muted")
      .text(i + 1);
    idEl.appendTo(trEl);
    const dateEl = $("<td>")
      .addClass("text-center")
      .text(data[i].file.receipts[0].date);
    dateEl.appendTo(trEl);
    const storeEl = $("<td>")
      .addClass("text-center")
      .text(data[i].file.receipts[0].merchant_name);
    storeEl.appendTo(trEl);
    const totalEl = $("<td>")
      .addClass("text-center")
      .text(`$${data[i].file.receipts[0].total}`);
    totalEl.appendTo(trEl);
    const actionsEl = $(`<td class="text-center">
        <button class="btn btn_action btn-sm">Details</button>
      </td>`);
    actionsEl.appendTo(trEl);
  }

  /**
     *   <tr>
                      <td class="text-center text-muted">#345</td>
                      <td class="text-center">03/03/2022</td>
                      <td class="text-center">Walmart</td>
                      <td class="text-center">Kentucky</td>
                      <td class="text-center">
                        <div class="badge-warning">Pending</div>
                      </td>
                      <td class="text-center">
                        <button class="btn btn-focus btn-sm">Details</button>
                      </td>
                    </tr>
     */
}
function init() {
  getReceipts();
  //   console.log(data);
}
init();
