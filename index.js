const fs = require("fs");
const axios = require("axios");
const request = require("request");
// const pic = require(".receipt.png");
var imageFile = "receipt1.jpeg";

const getData = () => {
  // const json =  response;
  // console.log(json);
  request.post(
    {
      url: "https://ocr.asprise.com/api/v1/receipt",
      formData: {
        client_id: "TEST", // Use 'TEST' for testing purpose
        recognizer: "auto", // can be 'US', 'CA', 'JP', 'SG' or 'auto'
        ref_no: "ocr_nodejs_123", // optional caller provided ref code
        file: fs.createReadStream(imageFile), // the image file
      },
    },
    function (error, response, body) {
      if (error) {
        console.error(error);
      }
      console.log(body); // Receipt OCR result in JSON
    }
  );
};
function init() {
  getData();
}
init();
