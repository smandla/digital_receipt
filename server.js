const express = require("express");
const fs = require("fs");
const { randomUUID } = require("crypto");
const path = require("path");
const noteData = require("./db/db.json");
const { random } = require("colors");
const request = require("request");

// const multer = require("multer");
// const upload = multer({ dest: "./public/data/uploads/" });
const fileUpload = require("express-fileupload");
const PORT = 3000;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("in here");
  //   console.log(__dirname);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/saveReceipt", (req, res) => {
  console.log("in here");
  //   console.log(__dirname);
  res.sendFile(path.join(__dirname, "/public/saveReceipt.html"));
});
app.get("/api/receipt", (req, res) => {
  res.json(noteData[noteData.length - 1]);
});
app.post("/upload", (req, res) => {
  var newData;
  // TODO: process the file upload
  console.log(req.files.file);
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.file;
  const name = file.name;
  console.log(name);
  const path = __dirname + "/public/data/uploads/" + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    // return res.send({ path: path });
  });
  request.post(
    {
      url: "https://ocr.asprise.com/api/v1/receipt",
      formData: {
        client_id: "TEST", // Use 'TEST' for testing purpose
        recognizer: "auto", // can be 'US', 'CA', 'JP', 'SG' or 'auto'
        ref_no: "ocr_nodejs_123", // optional caller provided ref code
        file: fs.createReadStream(file.name), // the image file
      },
    },
    function (error, response, body) {
      if (error) {
        console.log("ERROR");
        console.error(error);
      }
      console.log("BODY", body); // Receipt OCR result in JSON
      newData = { file: JSON.parse(body) };
      console.log("NEW DATA", newData);
      noteData.push(newData);
      console.log("NOTEDATA", noteData);
      fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) =>
        err ? console.error(err) : console.log("success")
      );
    }
  );

  res.send(noteData);
});

app.get("/api/notes", (req, res) => res.json(noteData));
app.post("/api/notes", (req, res) => {
  const { title, text, file } = req.body;
  console.log(title, text, file);
  const newNote = {
    id: randomUUID(),
    title: title,
    text: text,
  };
  noteData.push(newNote);

  //   console.log(noteData);
  //   console.log(req.query);

  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) =>
    err ? console.error(err) : console.log("Success")
  );
  res.send(noteData);
});
// const imageStorage = multer.diskStorage({
//   // Destination to store image
//   destination: "/public/data/uploads",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//     // file.fieldname is name of the field (image)
//     // path.extname get the uploaded file extension
//   },
// });
// app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
// });
app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  const index = noteData
    .map((item) => {
      return item.id;
    })
    .indexOf(req.params.id);
  noteData.splice(index, 1);

  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) =>
    err ? console.error(err) : console.log("Success")
  );
  res.json({});
});
app.listen(PORT, () => {
  console.log(`Example app listening at https://localhost:${PORT}`);
});
