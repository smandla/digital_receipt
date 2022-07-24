const buttonEl = $("#submit_btn");
const fileEl = $("#file");

buttonEl.on("click", (e) => {
  e.preventDefault();
  const fileVal = fileEl[0].files[0];
  console.log(fileVal);
});
function init() {}
