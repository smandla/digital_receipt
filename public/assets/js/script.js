const buttonEl = $("#submit_btn");
const fileEl = $("#file");

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

  document.location.replace(`./saveReceipt`);
  if (window.location.pathname === "/saveReceipt") {
    console.log();
    // saveReceipt(newReceipt);
  }
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
