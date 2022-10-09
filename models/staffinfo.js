var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StaffinfoSchema = new Schema(
  {
    a05lastname:{type:String,required:false},
    a10fistname:{type:String,required:true},
    a13identity:{type:String,required:false},
    a15gender:{type:String,required:false},
    a20birthday:{type:Date,required:false},
    a25dateofjoin:{type:Date,required:false},
    a28department:{type:String,required:false},
    a30position:{type:String,required:false},
    a33tel:{type:String,required:false},
    a35phoneno:{type:String,required:false},
    a40email:{type:String,required:false},
    a45address:{type:String,required:false},
    a50degree:{type:Array,required:false},
    a55resume:{type:Array,required:false},
    a60expertise:{type:Array,required:false},
    a65extra:{type:String,required:false},
    a99footnote:{type:String,required:false}     
  }
);

// Virtual for staffinfo's URL
StaffinfoSchema
.virtual('url')
.get(function () {
  return '/deep1/staffinfo/' + this._id;
});
StaffinfoSchema
        .virtual('birthdate')
        .get(function () {
        return this.a20birthday.getFullYear()+"/"+this.a20birthday.getMonth()+"/"+this.a20birthday.getDate();
});
StaffinfoSchema
        .virtual('dateofjoin')
        .get(function () {
        return this.a25dateofjoin.getFullYear()+"/"+this.a25dateofjoin.getMonth()+"/"+this.a25dateofjoin.getDate();
});
StaffinfoSchema.set("toJSON",{getters:true,virtual:true});
StaffinfoSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Staffinfo', StaffinfoSchema);