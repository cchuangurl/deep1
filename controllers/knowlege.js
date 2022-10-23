//載入相對應的model
const Knowlege = require('../models/index').knowlege;
const send = require('koa-send');
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep0/knowlege !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Knowlege.find({}).then(async knowleges=>{
        //console.log("found knowleges:"+knowleges);
        console.log("type of knowleges:"+typeof(knowleges));
        console.log("type of 1st knowlege:"+typeof(knowleges[0]));
        console.log("1st knowlege:"+knowleges[0])
        console.log("No. of knowlege:"+knowleges.length)
        let knowlegelist=encodeURIComponent(JSON.stringify(knowleges));
        console.log("type of knowleges:"+typeof(knowlegelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("knowlege/listpage",{
        //ctx.response.send({
            knowlegelist:knowlegelist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Knowlege.find({}) failed !!");
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
    console.log("entered Knowlege.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Knowlege.findById(ctx.params.id)
        .then(async knowlegex=>{
            console.log("knowlegex:"+knowlegex);
            let knowlege=encodeURIComponent(JSON.stringify(knowlegex));
            console.log("knowlege:"+knowlege);
            console.log("type of knowlege:"+typeof(knowlege));
            await ctx.render("knowlege/editpage",{
                knowlege:knowlege,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Knowlege.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},

//到檢視單筆資料頁
async lookpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered Knowlege.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Knowlege.findById(ctx.params.id)
        .then(async knowlegex=>{
            console.log("knowlegex:"+knowlegex);
            let knowlege=encodeURIComponent(JSON.stringify(knowlegex));
            console.log("knowlege:"+knowlege);
            console.log("type of knowlege:"+typeof(knowlege));
            await ctx.render("knowlege/lookpage",{
                knowlege:knowlege,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Knowlege.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},

//依參數id取得資料
retrieve(req,res){

},
//依檔名送出檔案供下載
async sendfile(ctx, next) {
    const name = ctx.params.filename;
    // 引用需要的模組
    //const path=require("path");
    let foldpath="public/knowlegefile/";
    let filepath=foldpath+name;
    console.log("going to download filepath:");
	ctx.attachment(filepath);
    await send(ctx, filepath)
},
//依參數no取得一筆資料
findByNo(req,res){

},
//依參數category取得資料
async getchosen(ctx, next){
    console.log("going in method getchosen()!!")
    var {category}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    console.log("gotten category:"+category);
    console.log("gotten query:"+statusreport);
    await Knowlege.find({a30category:category})
    .then(async (knowleges)=>{
        console.log("type of knowleges:"+typeof(knowleges));
        console.log("type of 1st knowlege:"+typeof(knowleges[0]));
        console.log("1st knowlege:"+knowleges[0])
        console.log("No. of knowlege:"+knowleges.length)
        let knowlegelist=encodeURIComponent(JSON.stringify(knowleges));
        console.log("type of knowleges:"+typeof(knowlegelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("outerweb/chosenpage",{
            knowlegelist:knowlegelist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Knowlege.find({{a30category:category}}) failed !!");
        console.log(err)
    })
},

//寫入一筆資料
async create(ctx,next){
    var new_knowlege = new Knowlege(ctx.request.body);
    console.log(new_knowlege);
    await new_knowlege.save()
    .then(()=>{
        console.log("Saving new_knowlege....");
    statusreport="儲存單筆知識資料後進入本頁";
    ctx.redirect("/deep0/knowlege/?statusreport="+statusreport)
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
    var knowlegeArray;    
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
        tempstore[0][lineno]=values[0].trim();
        tempstore[1][lineno]=values[1].trim();
        tempstore[2][lineno]=values[2].trim();
        tempstore[3][lineno]=values[3].trim();
        tempstore[4][lineno]=values[4].trim();
        tempstore[5][lineno]=values[5].trim();
        tempstore[6][lineno]=values[6].trim();
        tempstore[7][lineno]=values[7].trim();
        tempstore[8][lineno]=values[8].trim();
        tempstore[9][lineno]=values[9].trim();
        tempstore[10][lineno]=values[10].trim();        
        lineno++;
        console.log("read line:"+data)
    });//EOF lineReader.on
    resolve();
            })//EOF promise
    })//EOF readfile
    let savedata=(()=>{
        return new Promise((resolve, reject)=>{
        knowlegeArray=new Array(lineno);
        
        let saveone=(async new_knowlege=>{ 
                await new_knowlege.save()
                .then(()=>{
                    console.log("Saved document:"+new_knowlege.a15describe)
                    })
                .catch((err)=>{
                    console.log("Knowlege.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            knowlegeArray[k]=new Array(11);
            for (let m=0;m<11;m++){
                knowlegeArray[k][m]=tempstore[m][k]
                //console.log(knowlegeArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of knowlegeArray:"+knowlegeArray[0][0]);
        console.log("read total lines:"+knowlegeArray.length);
        let sequence=Promise.resolve();
        knowlegeArray.forEach(function(knowlegej){
            sequence=sequence.then(function(){
                var new_knowlege = new Knowlege({
                    a05domain:knowlegej[0],
                    a10code:knowlegej[1],
                    a15describe:knowlegej[2],
                    a20filename:knowlegej[3],
                    a25alias:knowlegej[4],
                    a30category:knowlegej[5],
                    a35uploader:knowlegej[6],
                    a40date:knowlegej[7],
                    a45reveal:knowlegej[8],
                    a50is4download:knowlegej[9],
                    a99footnote:knowlegej[10]
                });//EOF new knowlege
                    saveone(new_knowlege)
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
        //ctx.redirect("/deep0/project/?statusreport="+statusreport)
        console.log("go back to datamanage2.ejs");
        await ctx.render("datamanage2",{
            statusreport
        })
    })
    .catch((err)=>{
        console.log("ctx.redirect failed !!")
        console.log(err)
    })
},

//依參數id更新資料
async update(ctx,next){
    let {_id}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    await Knowlege.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newknowlege)=>{
        console.log("Saving new_knowlege....:"+newknowlege);
    statusreport="更新單筆知識資料後進入本頁";
    ctx.redirect("/deep1/knowlege/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export