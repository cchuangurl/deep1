var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var KnowledgeSchema = new Schema(
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
KnowledgeSchema
.virtual('url')
.get(function () {
  return '/deep1/knowledge/' + this._id;
});
KnowledgeSchema
        .virtual('date')
        .get(function () {
        return this.a40date.getFullYear()+"/"+this.a40date.getMonth()+"/"+this.a40date.getDate();
});
KnowledgeSchema.set("toJSON",{getters:true,virtual:true});
KnowledgeSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Knowledge', KnowledgeSchema);