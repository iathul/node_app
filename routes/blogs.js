// setup REST routes
app.get("/",function(req,res){
    res.render("auth");
});

app.get("/blogs",function(req,res){
    blog.find({},function(err,blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index" , {blogs : blogs,currentuser: req.user})
        }
    });
   
});

// New Route

app.get("/blogs/new",function(req,res){
    res.render("new");
});

// Post route
app.post("/blogs",function(req,res){
    blog.create(req.body.blog,function(err,newblog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
});

// Get by ID
app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("showid",{blog:found});
        }
    });
});

//Edit items
app.get("/blogs/:id/edit",function(req,res){
    if (req.isAuthenticated()){
        blog.findById(req.params.id,function(err,found){
            if(err){
                res.redirect("/blogs");
            }
            else{
                
              //  console.log(found.user._id);
               // if(found.author.id.equals(req.user._id)){
                res.render("edit",{blog:found});

            //    }
            //    else{
              //          res.send("Invalid Permissions");
               // }
                
            }
        });

    }
    else{
        res.redirect("/signin");
    }
    
    
});

//Update items

app.put("/blogs/:id",function(req,res){
        blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updated){
            if(err){
                res.redirect("/blogs");
            }else {
                res.redirect("/blogs/"+req.params.id);
            }

        });

});

//Delete items
app.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});
