//載入相對應的model
const Process = require('../models/index').process;
const Term = require('../models/index').term;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/process !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Process.find({}).then(async processs=>{
        //console.log("found processs:"+processs);
        console.log("type of processs:"+typeof(processs));
        console.log("type of 1st process:"+typeof(processs[0]));
        console.log("1st process:"+processs[0])
        console.log("No. of process:"+processs.length)
        let processlist=encodeURIComponent(JSON.stringify(processs));
        console.log("type of processs:"+typeof(processlist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("process/listpage",{
        //ctx.response.send({
            processlist:processlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Process.find({}) failed !!");
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
    console.log("entered Process.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Process.findById(ctx.params.id)
        .then(async processx=>{
            console.log("processx:"+processx);
            let process=encodeURIComponent(JSON.stringify(processx));
            console.log("process:"+process);
            console.log("type of process:"+typeof(process));
            await ctx.render("process/editpage",{
                process:process,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Process.findById(ctx.params.id) failed !!");
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
    var new_process = new Process(ctx.request.body);
    console.log(new_process);
    await new_process.save()
    .then(()=>{
        console.log("Saving new_process....");
    statusreport="儲存單筆程序資料後進入本頁";
    ctx.redirect("/deep1/process/?statusreport="+statusreport)
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
    var processArray;
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
        processArray=new Array(lineno);
        
        let saveone=(async new_process=>{ 
                await new_process.save()
                .then(()=>{
                    console.log("Saved document:"+new_process.a15action)
                    })
                .catch((err)=>{
                    console.log("Process.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            processArray[k]=new Array(9);
            for (let m=0;m<9;m++){
                processArray[k][m]=tempstore[m][k]
                //console.log(processArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of processArray:"+processArray[0][0]);
        console.log("read total lines:"+processArray.length);
        let sequence=Promise.resolve();
        processArray.forEach(function(processj){
            sequence=sequence.then(function(){
                var new_process = new Process({
                    a10stage:processj[0],
                    a15action_id:processj[1],
                    a20doer:processj[2],
                    a25startdate:processj[3],
                    a30timeconsume:processj[4],
                    a35cost:processj[5],
                    a40preceding:processj[6],
                    a45status:processj[7],
                    a99footnote:processj[8]
                });//EOF new process
                    saveone(new_process)
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
        console.log("go back to datamanage3.ejs");
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
    await Process.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a process....");
    statusreport="刪除單筆程序資料後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deep1/process/?statusreport="+statusreport)
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
    await Process.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newprocess)=>{
        console.log("Saving new_process....:"+newprocess);
    statusreport="更新單筆程序資料後進入本頁";
    ctx.redirect("/deep1/process/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export