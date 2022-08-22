const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: { type: "string" },
};

const Item = mongoose.model("items", itemsSchema);

const item1 = new Item({
  name: "Bring Food",
});

const item2 = new Item({
  name: "Make Tea",
});

const basicitems = [item1, item2];

const listschema = {
  name  : { type: "string"},
  items : [itemsSchema]
}

const List = mongoose.model("List", listschema);


app.get("/", (req, res) => {


  Item.find({}, function (err, result) {
    if (result.length === 0) {
      // -------------
      Item.insertMany(basicitems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully inserted");
          res.redirect("/");
        }
      });
      // -------------
      console.log("Succesfully inserted the default items");
    } else if (err) {
      console.log(err);
    } else {
      res.render("list", { listtitle:" today ", newlistitem: result });
    }
    
  });
});

app.post("/", function (req, res) {
  const itemname = req.body.newitem;
  const listname = req.body.list;

const item = new Item({
    name: itemname,
  });

  if(listname === "today") {
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name : listname} , function(err , foundlist){
      foundlist.items.push(item);
      foundlist.save();
      res.redirect("/" + listname);
    })
  }

});

app.post("/delete", function (req, res) {
  const checkeditemid = req.body.checkbox;
  const listname = req.body.listname;

  if(listname === "today"){
    Item.findByIdAndRemove(checkeditemid, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesfully Deleted the item from today List With ID " + checkeditemid);
      }
    });
  
    res.redirect("/" + listname);
  }else{

    List.updateOne({name : listname} , { $pull : { items : { _id : checkeditemid}} }, function(err ,foundlist){
       if(!err){
        res.redirect("/" + listname);
        console.log("Item removed from " + listname + "List With ID " + checkeditemid);
       }else{
        console.log(err);
       }
    })
  }
});


app.get("/:customlistname" , function (req, res) {
  const customlistname = req.params.customlistname;

  List.findOne({name : customlistname}, function (err, foundlist) {
    if(!err){
      if(!foundlist){

        const list = new List({
          name : customlistname ,
          items : basicitems 
        });

        list.save();
        res.redirect("/" + customlistname);
      }else{
        res.render("list", { listtitle: customlistname , newlistitem: foundlist.items });
      }
    }

  })

});



app.listen(3000, () => {
  console.log("listening on 3000");
});
