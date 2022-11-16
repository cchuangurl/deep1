//載入相對應的model
const Idea = require('../models/index').idea;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deeo1/idea !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Idea.find({}).then(async ideas=>{
        //console.log("found ideas:"+ideas);
        console.log("type of ideas:"+typeof(ideas));
        console.log("type of 1st idea:"+typeof(ideas[0]));
        console.log("1st idea:"+ideas[0])
        console.log("No. of idea:"+ideas.length)
        let idealist=encodeURIComponent(JSON.stringify(ideas));
        console.log("type of ideas:"+typeof(idealist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("idea/listpage",{
        //ctx.response.send({
            idealist:idealist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Idea.find({}) failed !!");
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
    console.log("entered Idea.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Idea.findById(ctx.params.id)
        .then(async ideax=>{
            console.log("ideax:"+ideax);
            let idea=encodeURIComponent(JSON.stringify(ideax));
            console.log("idea:"+idea);
            console.log("type of idea:"+typeof(idea));
            await ctx.render("idea/editpage",{
                idea:idea,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Idea.findById(ctx.params.id) failed !!");
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
    var new_idea = new Idea(ctx.request.body);
    console.log(new_idea);
    await new_idea.save()
    .then(()=>{
        console.log("Saving new_idea....");
    statusreport="儲存單筆客戶留言後進入本頁";
    ctx.redirect("/deeo1/idea/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},
//寫入一筆客戶留言
async create1(ctx,next){
    var got_idea = ctx.request.body;
    console.log(got_idea);
    let ideadate=new Date();
    let clientip="127.0.2.2";
    /*   
    let clientip=await getclientip(ctx.request);
    function getclientip(req){
        return req.header['x-forwarded-for']||req.header['x-real-ip']
    }
    console.log("client ip:"+clientip);
    
    let title=got_idea.a25idea.subString(0,19);
    */
   let title="測試用留言";
    new_idea=new Idea({
        a05ipofwriter:clientip,
        a10writer:got_idea.a10writer,
        a15dateofidea:ideadate,
        a20titleofidea:title,
        a25idea:got_idea.a25idea,
        a30codelast:got_idea.a30codelast,
        a35codethis:got_idea.a35codethis,
        a40responsor:got_idea.a40responsor,
        a45response:got_idea.a45response,
        a50followact:got_idea.a50followact
    })
    console.log("revised body:"+new_idea);
    await new_idea.save()
    .then(()=>{
        console.log("Saving new_idea....");
    statusreport="您的指教敬悉，將儘速回應您。謝謝！！";
    ctx.redirect("/deeo1/branch/customer/?statusreport="+statusreport)
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
    var ideaArray;
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
        ideaArray=new Array(lineno);
        
        let saveone=(async new_idea=>{ 
                await new_idea.save()
                .then(()=>{
                    console.log("Saved document:"+new_idea.a10writer)
                    })
                .catch((err)=>{
                    console.log("Idea.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            ideaArray[k]=new Array(11);
            for (let m=0;m<11;m++){
                ideaArray[k][m]=tempstore[m][k]
                //console.log(ideaArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of ideaArray:"+ideaArray[0][0]);
        console.log("read total lines:"+ideaArray.length);
        let sequence=Promise.resolve();
        ideaArray.forEach(function(ideaj){
            sequence=sequence.then(function(){
                var new_idea = new Idea({
                    a05ipofwriter:ideaj[0],
                    a10writer:ideaj[1],
                    a15dateofidea:ideaj[2],
                    a20titleofidea:ideaj[3],
                    a25idea:ideaj[4],
                    a30codelast:ideaj[5],
                    a35codethis:ideaj[6],
                    a40responsor:ideaj[7],
                    a45response:ideaj[8],
                    a50followact:ideaj[9],
                    a99footnote:ideaj[10]
                });//EOF new idea
                    saveone(new_idea)
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
        //ctx.redirect("/deeo1/project/?statusreport="+statusreport)
        console.log("go back to datamanagetemp.ejs");
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
    await Idea.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a idea....");
    statusreport="刪除單筆客戶留言後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deeo1/idea/?statusreport="+statusreport)
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
    await Idea.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newidea)=>{
        console.log("Saving new_idea....:"+newidea);
    statusreport="更新單筆客戶留言後進入本頁";
    ctx.redirect("/deeo1/idea/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export