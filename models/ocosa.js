var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OcosaSchema = new Schema(
  {
    a05project_id:{type:Schema.Types.ObjectID,required:false},
    a10object:{type:String,required:false},
    a15CSF:{type:String,required:false},
    a20CSForder:{type:Number,required:false},
    a25obstacle:{type:String,required:false},
    a30obstacleorder:{type:Number,required:false},
    a35strategy:{type:String,required:false},
    a40strategyorder:{type:Number,required:false},
    a45action:{type:String,required:false},
    a50actiondoer:{type:Number,required:false},
    a99footnote:{type:String,required:false}     
  }
);

// Virtual for ocosa's URL
OcosaSchema
.virtual('url')
.get(function () {
  return '/deep1/ocosa/' + this._id;
});
OcosaSchema.set("toJSON",{getters:true,virtual:true});
OcosaSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Ocosa', OcosaSchema);