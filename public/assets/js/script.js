const buttonEl = $("#submit_btn");
const fileEl = $("#file");

buttonEl.on("click", (e) => {
  e.preventDefault();
  const fileVal = fileEl[0].files[0];
  console.log("fileVAL", fileVal);
  let newReceipt = new FormData();
  newReceipt.append("file", fileVal);
  console.log(newReceipt);
  saveReceipt(newReceipt).then(() => {
    console.log("done");
  });
});
const saveReceipt = (receipt) => {
  console.log(receipt);
  fetch("/upload", {
    method: "POST",
    body: receipt,
  })
    .then((result) => {
      if (result.status != 200) {
        throw new Error("Bad Server Response");
      }
      return result.text();
    })
    .then((response) => {
      console.log(response);
    })

    // (E) HANDLE ERRORS - OPTIONS
    .catch((error) => {
      console.log(error);
    });

  // (F) PR;
};
function init() {}
