//載入相對應的model
const Project = require('../models/index').project;
const Term = require('../models/index').term;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/project !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Project.find({}).then(async projects=>{
        //console.log("found projects:"+projects);
        console.log("type of projects:"+typeof(projects));
        console.log("type of 1st project:"+typeof(projects[0]));
        console.log("1st project:"+projects[0])
        console.log("No. of project:"+projects.length)
        let projectlist=encodeURIComponent(JSON.stringify(projects));
        console.log("type of projects:"+typeof(projectlist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("project/listpage",{
        //ctx.response.send({
            projectlist:projectlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Project.find({}) failed !!");
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
    console.log("entered Project.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Project.findById(ctx.params.id)
        .then(async projectx=>{
            console.log("projectx:"+projectx);
            let project=encodeURIComponent(JSON.stringify(projectx));
            console.log("project:"+project);
            console.log("type of project:"+typeof(project));
            await ctx.render("project/editpage",{
                project:project,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Project.findById(ctx.params.id) failed !!");
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
    var new_project = new Project(ctx.request.body);
    console.log(new_project);
    await new_project.save()
    .then(()=>{
        console.log("Saving new_project....");
    statusreport="儲存單筆專案管理資料後進入本頁";
    ctx.redirect("/deep1/project/?statusreport="+statusreport)
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
    var projectArray;
    var tempstore=new Array(14);
    for (let i=0;i<14;i++){
        tempstore[i]=new Array(); 
    };
    let readfile=(()=>{
            console.log("reading..."+datafile+".csv");
            return new Promise((resolve,reject)=>{    
            //當讀入一行資料時
            lineReader.on('line', function(data) {            
                var values = data.split(',');
                for (let i=0;i<14;i++){
                    tempstore[i][lineno]=values[i].trim();
                }
                lineno++;
                console.log("read line:"+data)
            })//EOF lineReader.on
            resolve();
            })//EOF promise
    })//EOF readfile
    let savedata=(()=>{
        return new Promise((resolve, reject)=>{
        projectArray=new Array(lineno);
        let saveone=(async new_project=>{ 
                await new_project.save()
                .then(()=>{
                    console.log("Saved document:"+new_project.a15name)
                    })
                .catch((err)=>{
                    console.log("Project.save() failed !!")                    
                    console.log(err)
                })       
            });//EOF saveone
        
        for (let k=0;k<lineno;k++){
            projectArray[k]=new Array(14);
            for (let m=0;m<14;m++){
                projectArray[k][m]=tempstore[m][k]
                //console.log(projectArray[k])
            }
        }
        console.log("3 seconds later...")
        console.log("1st datum of projectArray:"+projectArray[0][0]);
        console.log("read total lines:"+projectArray.length);
        let sequence=Promise.resolve();
        projectArray.forEach(function(projectj){
            sequence=sequence.then(async function(){
                var new_project = new Project({
                    a05client_id:projectj[0],
                    a10staff_id:projectj[1],
                    a15name:projectj[2],
                    a20type:projectj[3],
                    a25describe:projectj[4],
                    a30requestdate:projectj[5],
                    a35proposaldate:projectj[6],
                    a40contractdate:projectj[7],
                    a45process:projectj[8],
                    a50fullfitdate:projectj[9],
                    a55realrevenue:projectj[10],
                    a60paydate:projectj[11],
                    a65status:projectj[12],
                    a99footnote:projectj[13],
                });//EOF new project
                await saveone(new_project);
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
//依參數id刪除資料
async destroy(ctx,next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Project.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a project....");
    statusreport="刪除單筆專案管理資料後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deep1/project/?statusreport="+statusreport)
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
    await Project.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newproject)=>{
        console.log("Saving new_project....:"+newproject);
    statusreport="更新單筆專案管理資料後進入本頁";
    ctx.redirect("/deep1/project/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export