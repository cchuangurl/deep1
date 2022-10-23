var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProcessSchema = new Schema(
  {
    a10stage:{type:String,required:false},
    a15action_id:{type:Schema.Types.ObjectID,required:false},
    a20doer:{type:Schema.Types.ObjectID,required:false},
    a25startdate:{type:Date,required:false},
    a30timeconsume:{type:Number,required:false},
    a35cost:{type:Number,required:false},
    a40preceding:{type:Boolean,required:false},
    a45status:{type:Boolean,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for process's URL
ProcessSchema
.virtual('url')
.get(function () {
  return '/deep1/process/' + this._id;
});
ProcessSchema
        .virtual('startdate')
        .get(function () {
        return this.a60startdate.getFullYear()+"/"+this.a60startdate.getMonth()+"/"+this.a60startdate.getDate();
});
ProcessSchema.set("toJSON",{getters:true,virtual:true});
ProcessSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Process', ProcessSchema);