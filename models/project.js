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
        return this.a30requestdate.getFullYear()+"/"+this.a30requestdate.getMonth()+"/"+this.a30requestdate.getDate();
});
ProjectSchema
        .virtual('proposaldate')
        .get(function () {
        return this.a35proposaldate.getFullYear()+"/"+this.a35proposaldate.getMonth()+"/"+this.a35proposaldate.getDate();
});
ProjectSchema
        .virtual('contractdate')
        .get(function () {
        return this.a40contractdate.getFullYear()+"/"+this.a40contractdate.getMonth()+"/"+this.a40contractdate.getDate();
});
ProjectSchema
        .virtual('fullfitdate')
        .get(function () {
        return this.a50fullfitdate.getFullYear()+"/"+this.a50fullfitdate.getMonth()+"/"+this.a50fullfitdate.getDate();
});
ProjectSchema
        .virtual('paydate')
        .get(function () {
        return this.a60paydate.getFullYear()+"/"+this.a60paydate.getMonth()+"/"+this.a60paydate.getDate();
});
ProjectSchema.set("toJSON",{getters:true,virtual:true});
ProjectSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Project', ProjectSchema);