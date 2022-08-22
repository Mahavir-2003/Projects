// Importing Node modules that we are going to use 
const express = require("express");
const bodyparser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");



// creating variables to store data 
const page_data =
  "Lorem, ipsum dolor amet consectetur adipisicing elit. Atque aperiam ex dolore eos corporis aliquid cumque ut fugiat ipsam facilis? Inventore architecto voluptatem quasi cum suscipit minima libero! Ratione, nemo. lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro beatae, voluptate animi praesentium sapiente voluptatum iure magnam culpa veritatis rerum debitis molestiae, voluptatem eligendi nam modi,  ";
const about_data =
  "Lorem, ipsum dolor amet consectetur adipisicing elit. Atque aperiam ex dolore eos corporis aliquid cumque ut fugiat ipsam facilis? Inventore architecto voluptatem quasi cum suscipit minima libero! Ratione, nemo. lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro beatae, voluptate animi praesentium sapiente voluptatum iure magnam culpa veritatis rerum debitis molestiae, voluptatem eligendi nam modi,";
// these are the static data ↑
 
//setting up the schema for the blog
const blogs_schema = {
  blog_name : {type : "string"},
  blog_data : {type : "string"}
}
//setting up the schema for the blog completed

//creating a mongoose model
const Blog = mongoose.model('Blogs',blogs_schema);
//completed a mongoose model

// Setting up the required server constant 
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/BlogsDB", { useNewUrlParser: true});

// get and post for "/" directory 
app.get("/", (req, res) => {

  Blog.find({} , (err, blog_obj) => {
    if(err) {
      console.log(err);
    }else{
      res.render("home", {
        page_name: "Home",
        page_data: page_data,
        posts: blog_obj,
      });
    }
  });


  
});

// get for "/about" directory 

app.get("/about", (req, res) => {
  res.render("about", { page_name: "About", page_data: about_data });
});

// get and post for "/addblog" directory 

app.get("/addblog", (req, res) => {
  res.render("addblog");
});

app.post("/addblog", (req, res) => {
  const Blog_name = req.body.blog_title;
  const Blog_data = req.body.blog_data;
  
  const blog = new Blog({
     blog_name: Blog_name,
     blog_data: Blog_data
  });

  blog.save();

  res.redirect("/");
});

// get and post for "/posts/----" directory 

app.get("/posts/:post_title", (req, res) => {
  const requestedtitle = _.lowerCase(req.params.post_title);

  Blog.find({}, (err, blog_obj) => {
     blog_obj.forEach(function(blog){
       let blog_title = _.lowerCase(blog.blog_name);

        if(requestedtitle === blog_title){
          res.render("post", {
            blog_name: blog.blog_name,
            blog_data: blog.blog_data
          });
        }
     })
  });

});

// creating server at port 3000 

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
 