
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    a10posttype:{type:String,required:false},
    a15poster:{type:Schema.Types.ObjectID,required:false},
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
            if (this.a20postdate!=null&&typeof(this.a20postdate)!="undefined"){
        return this.a20postdate.getFullYear()+"/"+this.a20postdate.getMonth()+"/"+this.a20postdate.getDate();
    }
    else{
        return typeof(this.a20postdate);
    }
    });
PostSchema
        .virtual('datetodown')
        .get(function () {
            if (this.a45datetodown!=null&&typeof(this.a45datetodown)!="undefined"){
                
        return this.a45datetodown.getFullYear()+"/"+this.a45datetodown.getMonth()+"/"+this.a45datetodown.getDate();
            }    
        else{
                return typeof(this.a45datetodown);
            }
    });
PostSchema.set("toJSON",{getters:true,virtual:true});
PostSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Post', PostSchema);