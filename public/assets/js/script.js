const buttonEl = $("#submit_btn");
const fileEl = $("#file");

// Toggles dropdown menu
$(document).ready(function() {
  $(".dropdown-toggle").dropdown();
});
// Changes dropdown menu value text depending on user selection
$(".dropdown-menu a").click(function(){
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

const getLatestReceipt = async () => {
  const response = await fetch("/api/receipt", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const receiptJson = await response.json();
  console.log(receiptJson);
};

// const getAndRenderReceipt = () => getLatestReceipt().then(renderReceipt);
console.log(window.location.pathname);
if (window.location.pathname === "/saveReceipt") {
  console.log("in save receipt");
  getLatestReceipt();
}
const dropZoneInputEl = document.querySelector(".drop-zone__input");
const dropZoneElement = dropZoneInputEl.closest(".drop-zone");
dropZoneElement.addEventListener("click", (e) => {
  console.log("clicked");
  dropZoneInputEl.click();
});
dropZoneInputEl.addEventListener("change", (e) => {
  // fileEl[0].files[0];
  // console.log(fileEl[0].files[0]);
  console.log(dropZoneInputEl.files[0]);
  if (dropZoneInputEl.files.length) {
    updateThmbNl(dropZoneInputEl.files[0]);
  }
});
dropZoneElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZoneElement.classList.add(".drop-zone--over");
});
["dragleave", "dragend"].forEach((type) => {
  dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("drop-zone--over");
  });
});
dropZoneElement.addEventListener("drop", (e) => {
  e.preventDefault();

  if (e.dataTransfer.files.length) {
    dropZoneInputEl.files = e.dataTransfer.files;
    updateThmbNl(e.dataTransfer.files[0]);
  }

  dropZoneElement.classList.remove("drop-zone--over");
});

function updateThmbNl(file) {
  let thmbnlEl = dropZoneElement.querySelector(".drop-zone__thumb");

  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }
  if (!thmbnlEl) {
    thmbnlEl = document.createElement("div");
    thmbnlEl.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thmbnlEl);
  }
  thmbnlEl.dataset.label = file.name;
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      thmbnlEl.style.backgroundImage = `url("${reader.result}")`;
    };
  } else {
    thmbnlEl.style.backgroundImage = null;
  }
}

buttonEl.on("click", (e) => {
  e.preventDefault();
  const fileVal = fileEl[0].files[0];
  console.log("fileVAL", fileVal);
  let newReceipt = new FormData();
  newReceipt.append("file", fileVal);
  console.log(newReceipt);

  saveReceipt(newReceipt);

  console.log(window.location.pathname);
  window.location.pathname = "/saveReceipt";
  // console.log(window.location.pathname);
});
const renderReceipt = async (receipt) => {
  let jsonReceipt = await receipt.json();
  console.log(jsonReceipt);
  return jsonReceipt;
  // if (window.location.pathname === "/saveReceipt") {
  //   console.log(jsonReceipt);
  // }
};

const saveReceipt = (receipt) => {
  console.log(receipt);
  fetch("/upload", {
    method: "POST",
    body: receipt,
  });

  // (F) PR;
};
function init() {}
