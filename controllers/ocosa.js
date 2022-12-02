//載入相對應的model
const Ocosa = require('../models/index').ocosa;
const Project = require('../models/index').project;
const User=require('../models/index').user;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/ocosa !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Ocosa.find({}).sort({a20CSForder:1,a30obstacleorder:1,a40strategyorder:1,a50actiondoer:1}).then(async ocosas=>{
        //console.log("found ocosas:"+ocosas);
        console.log("type of ocosas:"+typeof(ocosas));
        console.log("type of 1st ocosa:"+typeof(ocosas[0]));
        console.log("1st ocosa:"+ocosas[0])
        console.log("No. of ocosa:"+ocosas.length)
        let ocosalist=encodeURIComponent(JSON.stringify(ocosas));
        console.log("type of ocosas:"+typeof(ocosalist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("ocosa/listpage",{
        //ctx.response.send({
            ocosalist:ocosalist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Ocosa.find({}) failed !!");
        console.log(err)
    })
},


//到新增資料頁
async inputpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    var projectlist;
    await Project.find({})
    .then(async projects=>{
        console.log("type of projects:"+typeof(projects));
        console.log("type of 1st project:"+typeof(projects[0]));
        console.log("1st project:"+projects[0])
        console.log("No. of project:"+projects.length)
        projectlist=encodeURIComponent(JSON.stringify(projects));
        console.log("type of projectlist:"+typeof(projectlist));
        await ctx.render("ocosa/inputpage",{
            statusreport:ctx.request.body.statusreport,
            projectlist
        })
    })
    .catch(err=>{
        console.log("Project.find({}) failed !!");
        console.log(err)
    }) 
},
//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered ocosa.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    var projectlist;
    var ocosa;
    await Project.find({})
    .then(async projects=>{
        console.log("type of projects:"+typeof(projects));
        console.log("type of 1st project:"+typeof(projects[0]));
        console.log("1st project:"+projects[0])
        console.log("No. of project:"+projects.length)
        projectlist=encodeURIComponent(JSON.stringify(projects));
        console.log("type of projectlist:"+typeof(projectlist))
    })
    .catch(err=>{
        console.log("Project.find({}) failed !!");
        console.log(err)
    })  
    await Ocosa.findById(ctx.params.id)
        .then(async ocosax=>{
            console.log("Ocosax:"+ocosax);
            ocosa=encodeURIComponent(JSON.stringify(ocosax));
            console.log("ocosa:"+ocosa);
            console.log("type of ocosa:"+typeof(ocosa));
            await ctx.render("ocosa/editpage",{
                projectlist,
                ocosa,
                statusreport
            })
        })
        .catch(err=>{
            console.log("Ocosa.findById(ctx.params.id) failed !!");
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
            await ctx.render("ocosa/inputoneself",{
                accountarray:accountarray,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("User.find({}) failed !!");
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
    var new_ocosa = new Ocosa(ctx.request.body);
    console.log(new_ocosa);
    await new_ocosa.save()
    .then(()=>{
        console.log("Saving new_ocosa....");
    statusreport="儲存單筆客戶資料後進入本頁";
    ctx.redirect("/deep1/ocosa/?statusreport="+statusreport)
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
    var ocosaArray;
    var tempstore=new Array(11);
    for (let i=0;i<11;i++){
        tempstore[i]=new Array(); 
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{      
    //當讀入一行資料時
    lineReader.on('line', function(data) {            
        var values = data.split(',');
        for (let i=0;i<11;i++){
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
        ocosaArray=new Array(lineno);
        
        let saveone=(async new_ocosa=>{ 
                await new_ocosa.save()
                .then(()=>{
                    console.log("Saved document:"+new_ocosa.a10visitor)
                    })
                .catch((err)=>{
                    console.log("Ocosa.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            ocosaArray[k]=new Array(11);
            for (let m=0;m<11;m++){
                ocosaArray[k][m]=tempstore[m][k]
                //console.log(ocosaArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of ocosaArray:"+ocosaArray[0][0]);
        console.log("read total lines:"+ocosaArray.length);
        let sequence=Promise.resolve();
        ocosaArray.forEach(function(ocosaj){
            sequence=sequence.then(function(){
                var new_ocosa = new Ocosa({
                    a05project_id:ocosaj[0],
                    a10object:ocosaj[1],
                    a15CSF:ocosaj[2],
                    a20CSForder:ocosaj[3],
                    a25obstacle:ocosaj[4],
                    a30obstacleorder:ocosaj[5],
                    a35strategy:ocosaj[6],
                    a40strategyorder:ocosaj[7],
                    a45action:ocosaj[8],
                    a50actiondoer:ocosaj[9],
                    a99footnote:ocosaj[10]
                });//EOF new ocosa
                    saveone(new_ocosa)
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
        console.log("go back to datamanage2.ejs");
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
    await Ocosa.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a ocosa....");
    statusreport="刪除單筆客戶資料後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deep1/ocosa/?statusreport="+statusreport)
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
    await Ocosa.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newocosa)=>{
        console.log("Saving new_ocosa....:"+newocosa);
    statusreport="更新單筆客戶資料後進入本頁";
    ctx.redirect("/deep1/ocosa/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export