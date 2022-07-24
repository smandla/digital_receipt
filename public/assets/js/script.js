const buttonEl = $("#submit_btn");
const fileEl = $("#file");

buttonEl.on("click", (e) => {
  e.preventDefault();
  const fileVal = fileEl[0].files[0];
  console.log(fileVal);
  const newReceipt = {
    file: fileVal,
  };
  console.log(newReceipt);
  saveReceipt(fileVal).then(() => {
    console.log("done");
  });
});
const saveReceipt = async (receipt) => {
  console.log(receipt);
  await fetch("/api/receipt", {
    method: "POST",
    header: {
      "Content-Type": "multipart/form-data",
    },
    body: new FormData(receipt),
  });
};
function init() {}
