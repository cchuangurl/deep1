var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema(
  {
    a05client_id:{type:Schema.Types.ObjectID,required:false},
    a10staff_id:{type:Schema.Types.ObjectID,required:false},
    a15name:{type:String,required:false},
    a20type:{type:String,required:false},
    a25describe:{type:String,required:false},
    a30requestdate:{type:Date,required:false},
    a35proposaldate:{type:Date,required:false},
    a40contractdate:{type:Date,required:false},
    a45stage:{type:Array,required:false},
    a50fullfitdate:{type:Date,required:false},
    a55realrevenue:{type:Number,required:false},
    a60paydate:{type:Date,required:false},
    a65status:{type:Boolean,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for project's URL
ProjectSchema
.virtual('url')
.get(function () {
  return '/deep1/project/' + this._id;
});
ProjectSchema
        .virtual('requestdate')
        .get(function () {
            if(this.a30requestdate!=null&&typeof(this.a30requestdat)!="undefined"){
        return this.a30requestdate.getFullYear()+"/"+this.a30requestdate.getMonth()+"/"+this.a30requestdate.getDate();
    }
    else{
        return typeof(this.a30requestdate);
    }
    });
ProjectSchema
        .virtual('proposaldate')
        .get(function () {
            if (this.a35proposaldate!=null&&typeof(this.a35proposaldate)!="undefined"){
        return this.a35proposaldate.getFullYear()+"/"+this.a35proposaldate.getMonth()+"/"+this.a35proposaldate.getDate();
    }
    else{
        return typeof(this.a35proposaldate);
    }
    });
ProjectSchema
        .virtual('contractdate')
        .get(function () {
            if (this.a40contractdate!=null&&typeof(this.a40contractdate)!="undefined"){
        return this.a40contractdate.getFullYear()+"/"+this.a40contractdate.getMonth()+"/"+this.a40contractdate.getDate();
    }
    else{
        return typeof(this.a40contractdate);
    }
    });

ProjectSchema
        .virtual('fullfitdate')
        .get(function () {
            if(this.a50fullfitdat!=null&&typeof(this.a50fullfitdate)!="undefined"){
        return this.a50fullfitdate.getFullYear()+"/"+this.a50fullfitdate.getMonth()+"/"+this.a50fullfitdate.getDate();
    }
    else{
        return typeof(this.a50fullfitdate);
    }
    });
ProjectSchema
        .virtual('paydate')
        .get(function () {
            if(this.a60paydate!=null&&typeof(this.a60paydate)!="undefined"){
        return this.a60paydate.getFullYear()+"/"+this.a60paydate.getMonth()+"/"+this.a60paydate.getDate();
    }
    else{
        return typeof(this.a60paydate);
    }
    });

ProjectSchema.set("toJSON",{getters:true,virtual:true});
ProjectSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Project', ProjectSchema);