var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IdeaSchema = new Schema(
  {
    a05ipofwriter:{type:String,required:false},
    a10writer:{type:String,required:false},
    a15dateofidea:{type:Date,required:true},
    a20titleofidea:{type:String,required:false},
    a25idea:{type:String,required:false},
    a30codelast:{type:String,required:false},
    a35codethis:{type:String,required:false},
    a40responsor:{type:String,required:false},
    a45response:{type:String,required:false},
    a50followact:{type:String,required:false},
    a99footnote:{type:String,required:false}      
  }
);

// Virtual for idea's URL
IdeaSchema
.virtual('url')
.get(function () {
  return '/deep1/idea/' + this._id;
});
IdeaSchema
        .virtual('dateofidea')
        .get(function () {
        return this.a15dateofidea.getFullYear()+"/"+this.a15dateofidea.getMonth()+"/"+this.a15dateofidea.getDate();
});
IdeaSchema.set("toJSON",{getters:true,virtual:true});
IdeaSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Idea', IdeaSchema);