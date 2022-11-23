//載入相對應的model
const Guestinfo = require('../models/index').guestinfo;
const Term = require('../models/index').term;
const User=require('../models/index').user;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/guestinfo !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Guestinfo.find({}).then(async guestinfos=>{
        //console.log("found guestinfos:"+guestinfos);
        console.log("type of guestinfos:"+typeof(guestinfos));
        console.log("type of 1st guestinfo:"+typeof(guestinfos[0]));
        console.log("1st guestinfo:"+guestinfos[0])
        console.log("No. of guestinfo:"+guestinfos.length)
        let guestinfolist=encodeURIComponent(JSON.stringify(guestinfos));
        console.log("type of guestinfos:"+typeof(guestinfolist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("guestinfo/listpage",{
        //ctx.response.send({
            guestinfolist:guestinfolist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Guestinfo.find({}) failed !!");
        console.log(err)
    })
},
//到新增資料頁
async inputpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }    
	await ctx.render("guestinfo/inputpage",{
		statusreport:ctx.request.body.statusreport
	})
},

//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered guestinfo.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Guestinfo.findById(ctx.params.id)
        .then(async guestinfox=>{
            console.log("Guestinfox:"+guestinfox);
            let guestinfo=encodeURIComponent(JSON.stringify(guestinfox));
            console.log("guestinfo:"+guestinfo);
            console.log("type of guestinfo:"+typeof(guestinfo));
            await ctx.render("guestinfo/editpage",{
                guestinfo:guestinfo,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Guestinfo.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},
//到訪客自己輸入資料頁
async register(req, res) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await User.find({})
        .then(async userlist=>{
            console.log("1st user:"+userlist[0].a10account);
            let accountarray=new Array();
            for (let user in userlist){
                accountarray.push(user.a10account);
            }
            console.log("the no of current user:"+accountarray.length);
            console.log("type of accountarray:"+typeof(accountarray));
            await ctx.render("guestinfo/inputoneself",{
                accountarray:accountarray,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("User.find({}) failed !!");
            console.log(err)
        })
},

//寫入一筆資料
async create(ctx,next){
    var new_guestinfo = new Guestinfo(ctx.request.body);
    console.log(new_guestinfo);
    await new_guestinfo.save()
    .then(()=>{
        console.log("Saving new_guestinfo....");
    statusreport="儲存單筆客戶資料後進入本頁";
    ctx.redirect("/deep1/guestinfo/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},
//寫入guest註冊資料並轉換為user
async createuser(ctx,next){
    var guestinfox=JSON.parse(decodeURIComponent(ctx.request.body));
    var new_guestinfo = new Guestinfo(guestinfox);
    console.log("get new_guestinfo"+new_guestinfo.a20account);
    await new_guestinfo.save()
    .then(async ()=>{
      let guest2user={
        a03status:"client",
        a08infoID:guestinfox._id,
        a10account:guestinfox.a20account,
        a15password:guestinfox.a25password,
        a45group:"member",
        a99footnote:guestinfox.a45business+guestinfox.a50extra
      }
      var new_user=new User(guest2user);
      await new_user.save()
        .then(()=>{
            console.log("Saving new_guestinfo as user....");
        })
        .catch((err)=>{
            console.log("User.save({}) failed !!");
            console.log(err)
        }) 
    })
    .then(()=>{
        console.log("Saving new_guestinfo....");
        statusreport="成功註冊會員資料後回到本頁";
        ctx.redirect("/deep1/branch/customer?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log("Guestinfo.save({}) failed !!");        
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
    var guestinfoArray;
    var tempstore=new Array(9);
    for (let i=0;i<9;i++){
        tempstore[i]=new Array(); 
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{      
    //當讀入一行資料時
    lineReader.on('line', function(data) {            
        var values = data.split(',');
        for (let i=0;i<9;i++){
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
        guestinfoArray=new Array(lineno);
        
        let saveone=(async new_guestinfo=>{ 
                await new_guestinfo.save()
                .then(()=>{
                    console.log("Saved document:"+new_guestinfo.a10visitor)
                    })
                .catch((err)=>{
                    console.log("Guestinfo.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            guestinfoArray[k]=new Array(6);
            for (let m=0;m<6;m++){
                guestinfoArray[k][m]=tempstore[m][k]
                //console.log(guestinfoArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of guestinfoArray:"+guestinfoArray[0][0]);
        console.log("read total lines:"+guestinfoArray.length);
        let sequence=Promise.resolve();
        guestinfoArray.forEach(function(guestinfoj){
            sequence=sequence.then(function(){
                var new_guestinfo = new Guestinfo({
                    a05ipofvisitor:guestinfoj[0],
                    a10visitor:guestinfoj[1],
                    a15dateofreg:guestinfoj[2],
                    a30phoneno:guestinfoj[3],
                    a35email:guestinfoj[4],
                    a40address:guestinfoj[5],
                    a45business:guestinfoj[6],
                    a50extra:guestinfoj[7],
                    a99footnote:guestinfoj[8]
                });//EOF new guestinfo
                    saveone(new_guestinfo)
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
        console.log("go back to datamanage.ejs");
        await ctx.render("innerweb/datamanage/datamanagetemp",{
            statusreport
        })
    })
    .catch((err)=>{
        console.log("ctx.redirect failed !!")
        console.log(err)
    })
},
//依參數id取得資料
async retrieve(ctx,next){

},
//依參數no取得一筆資料
async findByNo(ctx,next){
    
},

//依參數id刪除資料
async destroy(ctx,next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Guestinfo.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a guestinfo....");
    statusreport="刪除單筆客戶資料後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deep1/guestinfo/?statusreport="+statusreport)
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
    await Guestinfo.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newguestinfo)=>{
        console.log("Saving new_guestinfo....:"+newguestinfo);
    statusreport="更新單筆客戶資料後進入本頁";
    ctx.redirect("/deep1/guestinfo/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export