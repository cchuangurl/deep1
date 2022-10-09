var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    a03status:{type:String,required:true},
    a08infoID:{type:ObjectID,required:false},
    a10account:{type:String,required:true},
    a15password:{type:String,required:false},
    a45group:{type:String,required:false},
    a99footnote:{type:String,required:false}     
  }
);

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/deep1/user/' + this._id;
});
UserSchema.set("toJSON",{getters:true,virtual:true});
UserSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('User', UserSchema);