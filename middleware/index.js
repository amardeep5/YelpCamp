var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ALL MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground){
            if(err){
                req.flash("error","camp not found")
               res.redirect("/campgrounds");
           } else {
                 //does user own campground?
               if(foundCampground.author.id.equals(req.user._id))  {
                 next();
               } else {
                  req.flash("error","you dont have permission ")
                res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment){
            if(err){
              req.flash("error","comment not found")
               res.redirect("/campgrounds");
           } else {
                 //does user own comment?
               if(foundComment.author.id.equals(req.user._id)) {
                 next();
               } else {
                req.flash("error","you dont have permission ")
                res.redirect("back");
               }
           }
        });
    } else {
      req.flash("error","Please Login First")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First")
    res.redirect("/login");

}
module.exports = middlewareObj;
