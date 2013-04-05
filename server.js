var express = require("express");
var mongoose = require("mongoose");
var pages = require("./routes/pages");
var app = express();

try {
  mongoose.connect("mongodb://localhost/test");
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function callback() {
    // Base Student Schema
    var pageSchema = mongoose.Schema({
        name:  String,
    });
    // Schema Methods
    pageSchema.methods.addName = function() {
        var name = this.name ? "Student defined name is " + this.name : "No student name defined";
        console.log("Added Name: " + name);
    }
    
    // Base Page Models
    var studentDemoPage = mongoose.model("Student Demographics Page Model", pageSchema);
    var ellPage = mongoose.model("ELL Page Model", pageSchema);
    var incidentPage = mongoose.model("Incident Page Model", pageSchema);

    // Specific Student Definitions
    var rowenStupplebeen = new student({ name: "Rowen Stupplebeen" });
  });
}
catch(err) {
  alert("Error: " + err.message);
}
app.get('/pages', pages.findAll);
app.get('/pages/:id', pages.findById);

app.listen(3000);
console.log('Listening on port 3000...');
