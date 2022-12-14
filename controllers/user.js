//載入相對應的model
const User = require('../models/index').user;
const Term = require('../models/index').term;
const Staffinfo = require('../models/index').staffinfo;
const Guestinfo = require('../models/index').guestinfo;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/user !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await User.find({}).then(async users=>{
        //console.log("found users:"+users);
        console.log("type of users:"+typeof(users));
        console.log("type of 1st user:"+typeof(users[0]));
        console.log("1st user:"+users[0])
        console.log("No. of user:"+users.length)
        let userlist=encodeURIComponent(JSON.stringify(users));
        console.log("type of users:"+typeof(userlist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("user/listpage",{
        //ctx.response.send({
            userlist:userlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("User.find({}) failed !!");
        console.log(err)
    })
},


//到新增資料頁
async inputpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    var termlist;
    var staffinfolist;
    var guestinfolist;
    await Term.find({a15model:"user"})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termlist=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termlist:"+typeof(termlist));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({}) failed !!");
        console.log(err)
    })
    await Guestinfo.find({})
    .then(async guests=>{
        console.log("type of guests:"+typeof(guests));
        console.log("type of 1st guest:"+typeof(guests[0]));
        console.log("1st guest:"+guests[0])
        console.log("No. of guest:"+guests.length)
        guestinfolist=encodeURIComponent(JSON.stringify(guests));
        console.log("type of guestinfolist:"+typeof(guestinfolist));
    })
    .catch(err=>{
        console.log("Guestinfo.find({}) failed !!");
        console.log(err)
    }) 
    await Staffinfo.find({})
    .then(async staffs=>{
        console.log("type of staffs:"+typeof(staffs));
        console.log("type of 1st staff:"+typeof(staffs[0]));
        console.log("1st staff:"+staffs[0])
        console.log("No. of staff:"+staffs.length)
        staffinfolist=encodeURIComponent(JSON.stringify(staffs));
        console.log("type of staffinfolist:"+typeof(staffinfolist));
        await ctx.render("user/inputpage",{
            statusreport:ctx.request.body.statusreport,
            termlist,
            staffinfolist,
            guestinfolist
        })
    })
    .catch(err=>{
        console.log("Staffinfo.find({}) failed !!");
        console.log(err)
    }) 
},
//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered User.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    var termlist;
    var staffinfolist;
    var guestinfolist;
    var user;
    await Term.find({a15model:"user"})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termlist=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termlist:"+typeof(termlist));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({}) failed !!");
        console.log(err)
    })
    await Guestinfo.find({})
    .then(async guests=>{
        console.log("type of guests:"+typeof(guests));
        console.log("type of 1st guest:"+typeof(guests[0]));
        console.log("1st guest:"+guests[0])
        console.log("No. of guest:"+guests.length)
        guestinfolist=encodeURIComponent(JSON.stringify(guests));
        console.log("type of guestinfolist:"+typeof(guestinfolist));
    })
    .catch(err=>{
        console.log("Guestinfo.find({}) failed !!");
        console.log(err)
    }) 
    await Staffinfo.find({})
    .then(async staffs=>{
        console.log("type of staffs:"+typeof(staffs));
        console.log("type of 1st staff:"+typeof(staffs[0]));
        console.log("1st staff:"+staffs[0])
        console.log("No. of staff:"+staffs.length)
        staffinfolist=encodeURIComponent(JSON.stringify(staffs));
        console.log("type of staffinfolist:"+typeof(staffinfolist))
    })
    .catch(err=>{
        console.log("Staffinfo.find({}) failed !!");
        console.log(err)
    }) 
    await User.findById(ctx.params.id)
        .then(async userx=>{
            console.log("userx:"+userx);
            user=encodeURIComponent(JSON.stringify(userx));
            console.log("user:"+user);
            console.log("type of user:"+typeof(user));
            await ctx.render("user/editpage",{
                termlist,
                staffinfolist,
                guestinfolist,
                user,
                statusreport
            })
        })
        .catch(err=>{
            console.log("User.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},

//依參數id取得資料
retrieve(req,res){

},
//依參數no取得一筆資料
findByNo(req,res){

},

//寫入一筆資料
async create(ctx,next){
    var new_user = new User(ctx.request.body);
    console.log(new_user);
    await new_user.save()
    .then(()=>{
        console.log("Saving new_user....");
    statusreport="儲存單筆使用者帳號後進入本頁";
    ctx.redirect("/deep1/user/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},
//批次新增資料
async batchinput(ctx, next){
    var statusreport=ctx.query.statusreport;
    var datafile=ctx.query.datafile;
    console.log("got the name of datafile:"+datafile)   
    // 引用需要的模組
    const fs = require('fs');
    const path=require("path");
    const readline = require('readline');
    // 逐行讀入檔案資料
    //定義輸出串流
    //var writeStream = fs.createWriteStream('out.csv');

    //定義讀入串流 (檔案置於/public目錄下)
    let filepath=path.join(__dirname,"../public/csv/");
    var lineReader = readline.createInterface({            
        input: fs.createReadStream(filepath+datafile+'.csv') 
    });
    var lineno=0;
    var userArray;
    var tempstore=new Array(6);
    for (let i=0;i<6;i++){
        tempstore[i]=new Array(); 
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{       
    //當讀入一行資料時
    lineReader.on('line', function(data) {            
        var values = data.split(',');
        for (let i=0;i<6;i++){
            tempstore[i][lineno]=values[i].trim();
        }
        lineno++;
        console.log("read line:"+data)
    });//EOF lineReader.on
    resolve();
            })//EOF promise
    })//EOF readfile
    let savedata=(()=>{
        return new Promise((resolve, reject)=>{
        userArray=new Array(lineno);
        
        let saveone=(async new_user=>{ 
                await new_user.save()
                .then(()=>{
                    console.log("Saved document:"+new_user.a05name)
                    })
                .catch((err)=>{
                    console.log("User.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            userArray[k]=new Array(6);
            for (let m=0;m<6;m++){
                userArray[k][m]=tempstore[m][k]
                //console.log(userArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of userArray:"+userArray[0][0]);
        console.log("read total lines:"+userArray.length);
        let sequence=Promise.resolve();
        userArray.forEach(function(userj){
            sequence=sequence.then(function(){
                var new_user = new User({
                    a03status:userj[0],
                    a08infoID:userj[1],
                    a10account:userj[2],
                    a15password:userj[3],
                    a45group:userj[4],
                    a99footnote:userj[5]
                });//EOF new user
                    saveone(new_user)
                .catch(err=>{
                    console.log(err)
                })
            })//EOF sequence
            })//EOF forEach
            resolve();
        })//EOF promise
        })//EOF savedata
    await readfile()
    .then(()=>{
        setTimeout(savedata,3000)
    })
    .then(async ()=>{
        //console.log("going to list prject....");
        //ctx.redirect("/deep1/project/?statusreport="+statusreport)
        console.log("go back to datamanage1.ejs");
        statusreport="完成user批次輸入";      
        await ctx.render("innerweb/datamanage/datamanagetemp",{
            statusreport
        })
    })
    .catch((err)=>{
        console.log("ctx.redirect failed !!")
        console.log(err)
    })
},
//依參數id刪除資料
async destroy(ctx,next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await User.deleteOne({_id: ctx.params.id})
    .then(async ()=>{
        console.log("Deleted a user....");
    statusreport="刪除單筆使用者帳號後進入本頁";
    //ctx.res.end()
    await ctx.redirect("/deep1/user/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},

//依參數id更新資料
async update(ctx,next){
    let {_id}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    await User.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then(async (newuser)=>{
        console.log("Saving new_user....:"+newuser.a05name);
    statusreport="更新單筆使用者帳號後進入本頁";
    await ctx.redirect("/deep1/user/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},
//客戶登入
async guestlogin(ctx, next){
    let {account}=ctx.request.body;
    let {password}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    if(statusreport===undefined){
        statusreport="未截到status"
    } 
	await User.find({})
    .then(async users=>{
        //console.log("found users:"+users);
        console.log("type of users:"+typeof(users));
        console.log("type of 1st user:"+typeof(users[0]));
        console.log("1st user:"+users[0])
        console.log("No. of user:"+users.length)
        for(user of users){
            if(user.a10account==account){
                await ctx.render("request/lookpage",{
                        statusreport:statusreport
                    })   
            }
        }
        await ctx.render("user/loginerr")        
    })
    .catch(err=>{
        console.log("User.find({}) failed !!");
        console.log(err)
    })
}
}//EOF export