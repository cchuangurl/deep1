var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RequestSchema = new Schema(
  {
    a05ipofclient:{type:String,required:false},
    a10client:{type:String,required:false},
    a15requestdate:{type:Date,required:true},
    a20phoneno:{type:String,required:false},
    a23tel:{type:String,required:false},
    a25email:{type:String,required:false},
    a30address:{type:String,required:false},
    a35request:{type:String,required:false},
    a40deadline:{type:Date,required:false},
    a45status:{type:String,required:false},
    a50contactor:{type:Schema.Types.ObjectID,required:false},
    a55howtodo:{type:String,required:false},
    a60initial:{type:String,required:false},
    a65followup:{type:String,required:false},
    a70extra:{type:String,required:false},
    a99footnote:{type:String,required:false}     
  }
);

// Virtual for request's URL
RequestSchema
.virtual('url')
.get(function () {
  return '/deep1/request/' + this._id;
});
RequestSchema
        .virtual('requestdate')
        .get(function () {
            if (this.a15requestdate!=null&&typeof(this.a15requestdate)!="undefined"){            
        return this.a15requestdate.getFullYear()+"/"+this.a15requestdate.getMonth()+"/"+this.a15requestdate.getDate();
    }
    else{
        return typeof(this.a15requestdate);
    }
    });
RequestSchema
        .virtual('deadline')
        .get(function () {
            if(this.a40deadline!=null&&typeof(this.a40deadline)!="undefined"){
        return this.a40deadline.getFullYear()+"/"+this.a40deadline.getMonth()+"/"+this.a40deadline.getDate();
    }
    else{
        return typeof(this.a40deadline);
    }

    });
RequestSchema.set("toJSON",{getters:true,virtual:true});
RequestSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Request', RequestSchema);