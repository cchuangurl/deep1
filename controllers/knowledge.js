//載入相對應的model
const Knowledge = require('../models/index').knowledge;
const Term = require('../models/index').term;
const Staffinfo = require('../models/index').staffinfo;
const send = require('koa-send');
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/knowledge !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Knowledge.find({}).then(async knowledges=>{
        //console.log("found knowledges:"+knowledges);
        console.log("type of knowledges:"+typeof(knowledges));
        console.log("type of 1st knowledge:"+typeof(knowledges[0]));
        console.log("1st knowledge:"+knowledges[0])
        console.log("No. of knowledge:"+knowledges.length)
        let knowledgelist=encodeURIComponent(JSON.stringify(knowledges));
        console.log("type of knowledges:"+typeof(knowledgelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("knowledge/listpage",{
        //ctx.response.send({
            knowledgelist:knowledgelist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Knowledge.find({}) failed !!");
        console.log(err)
    })
},
//列出某category清單
async category(ctx, next){
    console.log("found route /deep1/knowledge/category !!");
    var statusreport=ctx.query.statusreport;
    var specific=ctx.query.specific;
    var classtype=ctx.query.classtype;
    console.log("gotten query:"+specific);    
	await Knowledge.find({a30category:specific}).then(async knowledges=>{
        //console.log("found knowledges:"+knowledges);
        console.log("type of knowledges:"+typeof(knowledges));
        console.log("type of 1st knowledge:"+typeof(knowledges[0]));
        console.log("1st knowledge:"+knowledges[0])
        console.log("No. of knowledge:"+knowledges.length)
        let knowledgelist=encodeURIComponent(JSON.stringify(knowledges));
        console.log("type of knowledges:"+typeof(knowledgelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("knowledge/partlistpage",{
        //ctx.response.send({
            knowledgelist,
            classtype,
            specific,
            statusreport
        })
    })
    .catch(err=>{
        console.log("Knowledge.find({category}) failed !!");
        console.log(err)
    })
},
//列出某domain清單
async domain(ctx, next){
	console.log("found route /deep1/knowledge/domain !!");
    var statusreport=ctx.query.statusreport;
    var specific=ctx.query.specific;
    var classtype=ctx.query.classtype;
    console.log("gotten query:"+specific);    
	await Knowledge.find({a05domain:specific}).then(async knowledges=>{
        //console.log("found knowledges:"+knowledges);
        console.log("type of knowledges:"+typeof(knowledges));
        console.log("type of 1st knowledge:"+typeof(knowledges[0]));
        console.log("1st knowledge:"+knowledges[0])
        console.log("No. of knowledge:"+knowledges.length)
        let knowledgelist=encodeURIComponent(JSON.stringify(knowledges));
        console.log("type of knowledges:"+typeof(knowledgelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("knowledge/partlistpage",{
        //ctx.response.send({
            knowledgelist,
            classtype,
            specific,
            statusreport
        })
    })
    .catch(err=>{
        console.log("Knowledge.find({domain}) failed !!");
        console.log(err)
    })
},
//列出某course清單
async course(ctx, next){
    console.log("found route /deep1/knowledge/course !!");
    var statusreport=ctx.query.statusreport;
    var specific=ctx.query.specific;
    var classtype=ctx.query.specific;
    console.log("gotten query:"+specific);    
	await Knowledge.find({a33course:specific}).then(async knowledges=>{
        //console.log("found knowledges:"+knowledges);
        console.log("type of knowledges:"+typeof(knowledges));
        console.log("type of 1st knowledge:"+typeof(knowledges[0]));
        console.log("1st knowledge:"+knowledges[0])
        console.log("No. of knowledge:"+knowledges.length)
        let knowledgelist=encodeURIComponent(JSON.stringify(knowledges));
        console.log("type of knowledges:"+typeof(knowledgelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("knowledge/partlistpage",{
        //ctx.response.send({
            knowledgelist:knowledgelist,
            classtype,
            specific,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Knowledge.find({course}) failed !!");
        console.log(err)
    })
},
//到新增資料頁
async inputpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    var termlist;
    var staffinfolist;
    await Term.find({a15model:"knowledge"})
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
    await Staffinfo.find({})
    .then(async staffs=>{
        console.log("type of staffs:"+typeof(staffs));
        console.log("type of 1st staff:"+typeof(staffs[0]));
        console.log("1st staff:"+staffs[0])
        console.log("No. of staff:"+staffs.length)
        staffinfolist=encodeURIComponent(JSON.stringify(staffs));
        console.log("type of staffinfolist:"+typeof(staffinfolist));
        await ctx.render("knowledge/inputpage",{
            statusreport:ctx.request.body.statusreport,
            termlist,
            staffinfolist
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
    console.log("entered Knowledge.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    var termlist;
    var staffinfolist;
    var knowledge;
    await Term.find({a15model:"knowledge"})
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
    await Knowledge.findById(ctx.params.id)
        .then(async knowledgex=>{
            console.log("knowledgex:"+knowledgex);
            knowledge=encodeURIComponent(JSON.stringify(knowledgex));
            console.log("knowledge:"+knowledge);
            console.log("type of knowledge:"+typeof(knowledge));
            await ctx.render("knowledge/editpage",{
                termlist,
                staffinfolist,
                knowledge,
                statusreport
            })
        })
        .catch(err=>{
            console.log("Knowledge.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},

//到檢視單筆資料頁
async lookpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    var classtype=ctx.query.classtype;
    var specific=ctx.query.specific;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered Knowledge.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Knowledge.findById(ctx.params.id)
        .then(async knowledgex=>{
            console.log("knowledgex:"+knowledgex);
            let knowledge=encodeURIComponent(JSON.stringify(knowledgex));
            console.log("knowledge:"+knowledge);
            console.log("type of knowledge:"+typeof(knowledge));
            await ctx.render("knowledge/lookpage",{
                knowledge,
                classtype,
                specific,
                statusreport
            })
        })
        .catch(err=>{
            console.log("Knowledge.findById(ctx.params.id) failed !!");
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
    let foldpath="public/knowledgefile/";
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
    await Knowledge.find({a30category:category})
    .then(async (knowledges)=>{
        console.log("type of knowledges:"+typeof(knowledges));
        console.log("type of 1st knowledge:"+typeof(knowledges[0]));
        console.log("1st knowledge:"+knowledges[0])
        console.log("No. of knowledge:"+knowledges.length)
        let knowledgelist=encodeURIComponent(JSON.stringify(knowledges));
        console.log("type of knowledges:"+typeof(knowledgelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("outerweb/chosenpage",{
            knowledgelist:knowledgelist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Knowledge.find({{a30category:category}}) failed !!");
        console.log(err)
    })
},

//寫入一筆資料
async create(ctx,next){
    var new_knowledge = new Knowledge(ctx.request.body);
    console.log(new_knowledge);
    await new_knowledge.save()
    .then(()=>{
        console.log("Saving new_knowledge....");
    statusreport="儲存單筆知識資料後進入本頁";
    ctx.redirect("/deep0/knowledge/?statusreport="+statusreport)
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
    var knowledgeArray;    
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
        knowledgeArray=new Array(lineno);
        
        let saveone=(async new_knowledge=>{ 
                await new_knowledge.save()
                .then(()=>{
                    console.log("Saved document:"+new_knowledge.a15describe)
                    })
                .catch((err)=>{
                    console.log("Knowledge.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            knowledgeArray[k]=new Array(11);
            for (let m=0;m<11;m++){
                knowledgeArray[k][m]=tempstore[m][k]
                //console.log(knowledgeArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of knowledgeArray:"+knowledgeArray[0][0]);
        console.log("read total lines:"+knowledgeArray.length);
        let sequence=Promise.resolve();
        knowledgeArray.forEach(function(knowledgej){
            sequence=sequence.then(function(){
                var new_knowledge = new Knowledge({
                    a05domain:knowledgej[0],
                    a15describe:knowledgej[1],
                    a20filename:knowledgej[2],
                    a25alias:knowledgej[3],
                    a30category:knowledgej[4],
                    a33course:knowledgej[5],
                    a35uploader:knowledgej[6],
                    a40date:knowledgej[7],
                    a45reveal:knowledgej[8],
                    a50is4download:knowledgej[9],
                    a99footnote:knowledgej[10]
                });//EOF new knowledge
                    saveone(new_knowledge)
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
    .then(async()=>{
        //console.log("going to list prject....");
        //ctx.redirect("/deep0/project/?statusreport="+statusreport)
        console.log("go back to datamanage.ejs");
        await ctx.render("innerweb/datamanage/datamanagetemp",{
            statusreport
        })
    })
    .catch((err)=>{
        console.log("batch input knowledge failed !!")
        console.log(err)
    })
},

//依參數id更新資料
async update(ctx,next){
    let {_id}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    await Knowledge.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newknowledge)=>{
        console.log("Saving new_knowledge....:"+newknowledge);
    statusreport="更新單筆知識資料後進入本頁";
    ctx.redirect("/deep1/knowledge/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export