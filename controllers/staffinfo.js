//載入相對應的model
const Staffinfo = require('../models/index').staffinfo;
const Term = require('../models/index').term;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/staffinfo !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Staffinfo.find({}).then(async staffinfos=>{
        //console.log("found staffinfos:"+staffinfos);
        console.log("type of staffinfos:"+typeof(staffinfos));
        console.log("type of 1st staffinfo:"+typeof(staffinfos[0]));
        console.log("1st staffinfo:"+staffinfos[0])
        console.log("No. of staffinfo:"+staffinfos.length)
        let staffinfolist=encodeURIComponent(JSON.stringify(staffinfos));
        console.log("type of staffinfos:"+typeof(staffinfolist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("staffinfo/listpage",{
        //ctx.response.send({
            staffinfolist:staffinfolist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Staffinfo.find({}) failed !!");
        console.log(err)
    })
},


//到新增資料頁
inputpage(req, res) {
    //在router設定了
},

//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered Staffinfo.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Staffinfo.findById(ctx.params.id)
        .then(async staffinfox=>{
            console.log("staffinfox:"+staffinfox);
            let staffinfo=encodeURIComponent(JSON.stringify(staffinfox));
            console.log("staffinfo:"+staffinfo);
            console.log("type of staffinfo:"+typeof(staffinfo));
            await ctx.render("staffinfo/editpage",{
                staffinfo:staffinfo,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Staffinfo.findById(ctx.params.id) failed !!");
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
    var new_staffinfo = new Staffinfo(ctx.request.body);
    console.log(new_staffinfo);
    await new_staffinfo.save()
    .then(()=>{
        console.log("Saving new_staffinfo....");
    statusreport="儲存單筆員工資料後進入本頁";
    ctx.redirect("/deep1/staffinfo/?statusreport="+statusreport)
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
    setTimeout(function(){
        console.log("10 more second later...");
         ctx.redirect("/deep1/staffinfo/?statusreport="+statusreport)
        },10000);//EOF setTimeOut middle
    var lineReader = readline.createInterface({            
        input: fs.createReadStream(filepath+datafile+'.csv') 
    });
    var lineno=0;
    var staffinfoArray;
    var tempstore=new Array(17);
    for (let i=0;i<17;i++){
        tempstore[i]=new Array(); 
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{       
    //當讀入一行資料時
    lineReader.on('line', function(data) {            
        var values = data.split(',');
        for (let i=0;i<17;i++){
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
        staffinfoArray=new Array(lineno);
        
        let saveone=(async new_staffinfo=>{ 
                await new_staffinfo.save()
                .then(()=>{
                    console.log("Saved document:"+new_staffinfo.a10firstname)
                    })
                .catch((err)=>{
                    console.log("Staffinfo.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            staffinfoArray[k]=new Array(17);
            for (let m=0;m<17;m++){
                staffinfoArray[k][m]=tempstore[m][k]
                //console.log(staffinfoArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of staffinfoArray:"+staffinfoArray[0][0]);
        console.log("read total lines:"+staffinfoArray.length);
        let sequence=Promise.resolve();
        staffinfoArray.forEach(function(staffinfoj){
            sequence=sequence.then(function(){
                var new_staffinfo = new Staffinfo({
                    a05lastname:staffinfoj[0],
                    a10firstname:staffinfoj[1],
                    a13identity:staffinfoj[2],
                    a15gender:staffinfoj[3],
                    a20birthday:staffinfoj[4],
                    a25dateofjoin:staffinfoj[5],
                    a28department:staffinfoj[6],
                    a30position:staffinfoj[7],
                    a33tel:staffinfoj[8],
                    a35phoneno:staffinfoj[9],
                    a40email:staffinfoj[10],
                    a45address:staffinfoj[11],
                    a50degree:staffinfoj[12],
                    a55resume:staffinfoj[13],
                    a60expertise:staffinfoj[14],
                    a65extra:staffinfoj[15],
                    a99footnote:staffinfoj[16]
                    });//EOF new staffinfo
                    saveone(new_staffinfo)
                .catch(err=>{
                    console.log(err)
                })
                //await ctx.redirect("/deep1/staffinfo/?statusreport="+statusreport)
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
        statusreport="完成staffinfo批次輸入";      
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
    await Staffinfo.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a staffinfo....");
    statusreport="刪除單筆員工資料後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deep1/staffinfo/?statusreport="+statusreport)
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
    await Staffinfo.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newstaffinfo)=>{
        console.log("Saving new_staffinfo....:"+newstaffinfo);
    statusreport="更新單筆員工資料後進入本頁";
    ctx.redirect("/deep1/staffinfo/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export