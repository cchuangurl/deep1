var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var KnowlegeSchema = new Schema(
  {
    a05domain:{type:String,required:false},
    a15describe:{type:String,required:false},
    a20filename:{type:String,required:false},
    a25alias:{type:String,required:false},
    a30category:{type:String,required:false},
    a33course:{type:String,required:false},
    a35uploader:{type:String,required:false},
    a40date:{type:Date,required:true},
    a45reveal:{type:String,required:false},
    a50is4download:{type:Boolean,required:false},
    a99footnote:{type:String,required:false}     
  }
);

// Virtual for knowlege's URL
KnowlegeSchema
.virtual('url')
.get(function () {
  return '/deep1/knowlege/' + this._id;
});
KnowlegeSchema
        .virtual('date')
        .get(function () {
        return this.a40date.getFullYear()+"/"+this.a40date.getMonth()+"/"+this.a40date.getDate();
});
KnowlegeSchema.set("toJSON",{getters:true,virtual:true});
KnowlegeSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Knowlege', KnowlegeSchema);