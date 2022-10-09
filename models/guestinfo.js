var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuestinfoSchema = new Schema(
  {
    a05ipofvisitor:{type:String,required:false},
    a10visitor:{type:String,required:false},
    a15dateofreg:{type:Date,required:true},
    a30phoneno:{type:String,required:false},
    a35email:{type:String,required:false},
    a40address:{type:String,required:false},
    a45business:{type:String,required:false},
    a50extra:{type:String,required:false},
    a99footnote:{type:String,required:false}     
  }
);

// Virtual for guestinfo's URL
GuestinfoSchema
.virtual('url')
.get(function () {
  return '/deep1/guestinfo/' + this._id;
});
GuestinfoSchema
        .virtual('dateofreg')
        .get(function () {
        return this.a15dateofreg.getFullYear()+"/"+this.a15dateofreg.getMonth()+"/"+this.a15dateofreg.getDate();
});
GuestinfoSchema.set("toJSON",{getters:true,virtual:true});
GuestinfoSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Guestinfo', GuestinfoSchema);