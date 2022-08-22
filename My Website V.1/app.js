const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/contact.html", function (req, res) {
  res.sendFile(__dirname + "/contact.html");
});

app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about.html", function (req, res) {
  res.sendFile(__dirname + "/about.html");
});

app.get("/My_cv", function (req, res) {
  res.sendFile(__dirname + "/my_cv.pdf");
}); 

app.post("/contact.html", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.Subject;
  const message = req.body.message;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          SUBJECT: subject,
          MESSAGE: message,
        },
      },
    ],
  };

  const jsondata = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/cf590ed37a";

  const options = {
    method: "post",
    auth: "CARNAGE:0c27d593bf743bf3806b6182c7cf942c-us9",
  };

  const request = https.request(url, options, function (responce) {
    if (
      responce.statusCode === 200 &&
      name != "" &&
      email != "" &&
      subject != "" &&
      message != ""
    ) {
      res.sendFile(__dirname + "/thanks.html");
    } else {
      res.sendFile(__dirname + "/Error.html");
    }

    responce.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsondata);
  request.end();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port 3000");
});
