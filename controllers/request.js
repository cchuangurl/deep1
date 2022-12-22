//載入相對應的model
const Request = require('../models/index').request;
const Term = require('../models/index').term;
const Staffinfo = require('../models/index').staffinfo;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/request !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Request.find({}).then(async requests=>{
        //console.log("found requests:"+requests);
        console.log("type of requests:"+typeof(requests));
        console.log("type of 1st request:"+typeof(requests[0]));
        console.log("1st request:"+requests[0])
        console.log("No. of request:"+requests.length)
        let requestlist=encodeURIComponent(JSON.stringify(requests));
        console.log("type of requests:"+typeof(requestlist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("request/listpage",{
        //ctx.response.send({
            requestlist:requestlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Request.find({}) failed !!");
        console.log(err)
    })
},


//到新增資料頁
async inputpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    var termlist;
    var staffinfolist;
    await Term.find({a15model:"request"})
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
        await ctx.render("request/inputpage",{
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
//到客戶填寫資料頁
async inputbyguest(ctx, next){
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }    
	await ctx.render("request/inputpage1",{
		statusreport:ctx.request.body.statusreport
	})
},
//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered Request.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    var termlist;
    var staffinfolist;
    var request;
    await Term.find({a15model:"request"})
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
    await Request.findById(ctx.params.id)
        .then(async requestx=>{
            console.log("requestx:"+requestx);
            request=encodeURIComponent(JSON.stringify(requestx));
            console.log("request:"+request);
            console.log("type of request:"+typeof(request));
            await ctx.render("request/editpage",{
                termlist,
                staffinfolist,  
                request,
                statusreport
            })
        })
        .catch(err=>{
            console.log("Request.findById(ctx.params.id) failed !!");
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
    var new_request = new Request(ctx.request.body);
    console.log(new_request);
    await new_request.save()
    .then(()=>{
        console.log("Saving new_request....");
    statusreport="儲存單筆客戶需求後進入本頁";
    ctx.redirect("/deep1/request/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},
//寫入一筆客戶填寫之資料
async create1(ctx,next){
    var got_request = ctx.request.body;
    console.log("got body:"+got_request);
    let requestdate=new Date();
    let clientip="127.0.1.1"; 
    /*
    let clientip=await getclientip(ctx.request);
    function getclientip(req){
        return req.header['x-forwarded-for']||req.header['x-real-ip']
    }
    console.log("client ip:"+clientip);
    */
    new_request=new Request({
        a05ipofclient:clientip,
        a10client:got_request.a10client,
        a15requestdate:requestdate,
        a20phoneno:got_request.a20phoneno,
        a23phoneno:got_request.a23tel,        
        a25email:got_request.a25email,
        a30address:got_request.a30address,
        a35request:got_request.a35request,
        a40deadline:got_request.a40deadline,
        a45stage:"begin",
        a65followact:"reply as soon"
    })
    console.log("revised body:"+new_request);
    await new_request.save()
    .then(()=>{
        console.log("Saving new_request....");
    statusreport="您的需求敬悉，將儘速回應您。謝謝！！";
    ctx.redirect("/deep1/outerweb/?statusreport="+statusreport)
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
    var requestArray;
    var tempstore=new Array(16);
    for (let i=0;i<16;i++){
        tempstore[i]=new Array(); 
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{       
    //當讀入一行資料時
    lineReader.on('line', function(data) {            
        var values = data.split(',');
        for (let i=0;i<16;i++){
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
        requestArray=new Array(lineno);
        
        let saveone=(async new_request=>{ 
                await new_request.save()
                .then(()=>{
                    console.log("Saved document:"+new_request.a10client)
                    })
                .catch((err)=>{
                    console.log("Request.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            requestArray[k]=new Array(16);
            for (let m=0;m<16;m++){
                requestArray[k][m]=tempstore[m][k]
                //console.log(requestArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of requestArray:"+requestArray[0][0]);
        console.log("read total lines:"+requestArray.length);
        let sequence=Promise.resolve();
        requestArray.forEach(function(requestj){
            sequence=sequence.then(function(){
                var new_request = new Request({
                    a05ipofclient:requestj[0],
                    a10client:requestj[1],
                    a15requestdate:requestj[2],
                    a20phoneno:requestj[3],
                    a23tel:requestj[4],
                    a25email:requestj[5],
                    a30address:requestj[6],
                    a35request:requestj[7],
                    a40deadline:requestj[8],
                    a45status:requestj[9],
                    a50contactor:requestj[10],
                    a55howtodo:requestj[11],
                    a60initial:requestj[12],
                    a65followup:requestj[13],
                    a70extra:requestj[14],
                    a99footnote:requestj[15]
                });//EOF new request
                    saveone(new_request)
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
    await Request.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a request....");
    statusreport="刪除單筆客戶需求後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deep1/request/?statusreport="+statusreport)
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
    await Request.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newrequest)=>{
        console.log("Saving new_request....:"+newrequest);
    statusreport="更新單筆客戶需求後進入本頁";
    ctx.redirect("/deep1/request/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export