var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    a10posttype:{type:String,required:false},
    a15poster:{type:String,required:false},
    a20postdate:{type:Date,required:false},
    a25posttitle:{type:String,required:true},
    a30postcontent:{type:String,required:false},
    a35reader:{type:String,required:false},
    a40showtype:{type:String,required:false},
    a45datetodown:{type:Date,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for post's URL
PostSchema
        .virtual('url')
        .get(function () {
        return '/deep1/post/' + this._id;
    });
PostSchema
        .virtual('postdate')
        .get(function () {
        return this.a20postdate.getFullYear()+"/"+this.a20postdate.getMonth()+"/"+this.a20postdate.getDate();
});
PostSchema
        .virtual('datetodown')
        .get(function () {
        return this.a45datetodown.getFullYear()+"/"+this.a45datetodown.getMonth()+"/"+this.a45datetodown.getDate();
});
PostSchema.set("toJSON",{getters:true,virtual:true});
PostSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Post', PostSchema);