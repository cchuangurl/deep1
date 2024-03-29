//載入相對應的model
const Message = require('../models/index').message;
const Term = require('../models/index').term;
const Staffinfo = require('../models/index').staffinfo;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep1/message !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Message.find({}).then(async messages=>{
        //console.log("found messages:"+messages);
        console.log("type of messages:"+typeof(messages));
        console.log("type of 1st message:"+typeof(messages[0]));
        console.log("1st message:"+messages[0])
        console.log("No. of message:"+messages.length)
        let messagelist=encodeURIComponent(JSON.stringify(messages));
        console.log("type of messages:"+typeof(messagelist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("message/listpage",{
        //ctx.response.send({
            messagelist:messagelist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Message.find({}) failed !!");
        console.log(err)
    })
},


//到新增資料頁
async inputpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    var termlist;
    var messagelist;
    var staffinfolist;
    await Message.find({})
    .then(async messages=>{
        console.log("type of messages:"+typeof(messages));
        console.log("type of 1st message:"+typeof(messages[0]));
        console.log("1st message:"+messages[0])
        console.log("No. of message:"+messages.length)
        messagelist=encodeURIComponent(JSON.stringify(messages));
        console.log("type of messagelist:"+typeof(messagelist));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Idea.find({}) failed !!");
        console.log(err)
    })
    await Term.find({a15model:"message"})
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
        await ctx.render("message/inputpage",{
            statusreport:ctx.request.body.statusreport,
            termlist,
            staffinfolist,
            messagelist
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
    var status=ctx.query.status;    
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered Message.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    var termlist;
    var messagelist;
    var staffinfolist;
    var message;
    await Message.find({})
    .then(async messages=>{
        console.log("type of messages:"+typeof(messages));
        console.log("type of 1st message:"+typeof(messages[0]));
        console.log("1st message:"+messages[0])
        console.log("No. of message:"+messages.length)
        messagelist=encodeURIComponent(JSON.stringify(messages));
        console.log("type of messagelist:"+typeof(messagelist));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Idea.find({}) failed !!");
        console.log(err)
    })
    await Term.find({a15model:"message"})
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
    await Message.findById(ctx.params.id)
    .then(async messagex=>{
        console.log("messagex:"+messagex);
        message=encodeURIComponent(JSON.stringify(messagex));
        console.log("message:"+message);
        console.log("type of message:"+typeof(message));
        if(status=="0"){
        await ctx.render("message/editpage",{
            termlist,
            staffinfolist,  
            message,
            statusreport
        })
        }else{
        await ctx.render("message/editpage1",{
            termlist,
            staffinfolist,  
            request,
            statusreport
        })   
        }
    })
        .catch(err=>{
            console.log("Message.findById(ctx.params.id) failed !!");
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
    var new_message = new Message(ctx.request.body);
    console.log(new_message);
    await new_message.save()
    .then(()=>{
        console.log("Saving new_message....");
    statusreport="儲存單筆客戶留言後進入本頁";
    ctx.redirect("/deep1/message/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},
//寫入一筆客戶留言
async create1(ctx,next){
    var got_message = ctx.request.body;
    console.log(got_message);
    let messagedate=new Date();
    let clientip="127.0.2.2";
    /*   
    let clientip=await getclientip(ctx.request);
    function getclientip(req){
        return req.header['x-forwarded-for']||req.header['x-real-ip']
    }
    console.log("client ip:"+clientip);
    
    let title=got_message.a25message.subString(0,19);
    */
   let title="測試用留言";
    new_message=new Message({
        a05ipofwriter:clientip,
        a10writer:got_message.a10writer,
        a15dateofmsg:messagedate,
        a20titleofmsg:title,
        a25message:got_message.a25message,
        a30codelast:got_message.a30codelast,
        a35codethis:got_message.a35codethis,
        a40responsor:got_message.a40responsor,
        a45response:got_message.a45response,
        a50followact:got_message.a50followact
    })
    console.log("revised body:"+new_message);
    await new_message.save()
    .then(()=>{
        console.log("Saving new_message....");
    statusreport="您的指教敬悉，將儘速回應您。謝謝！！";
    ctx.redirect("/deep1/branch/customer/?statusreport="+statusreport)
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
    var messageArray;
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
        messageArray=new Array(lineno);
        
        let saveone=(async new_message=>{ 
                await new_message.save()
                .then(()=>{
                    console.log("Saved document:"+new_message.a10writer)
                    })
                .catch((err)=>{
                    console.log("Message.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            messageArray[k]=new Array(11);
            for (let m=0;m<11;m++){
                messageArray[k][m]=tempstore[m][k]
                //console.log(messageArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of messageArray:"+messageArray[0][0]);
        console.log("read total lines:"+messageArray.length);
        let sequence=Promise.resolve();
        messageArray.forEach(function(messagej){
            sequence=sequence.then(function(){
                var new_message = new Message({
                    a05ipofwriter:messagej[0],
                    a10writer:messagej[1],
                    a15dateofmsg:messagej[2],
                    a20titleofmsg:messagej[3],
                    a25message:messagej[4],
                    a30codelast:messagej[5],
                    a35codethis:messagej[6],
                    a40responsor:messagej[7],
                    a45response:messagej[8],
                    a50followact:messagej[9],
                    a99footnote:messagej[10]
                });//EOF new message
                    saveone(new_message)
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
    var status=ctx.query.status;
    console.log("gotten query:"+statusreport);
    await Message.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a message....");
    statusreport="刪除單筆客戶留言後進入本頁";
    //ctx.res.end()
    if(status=="0"){    
        ctx.redirect("/deep1/message/?statusreport="+statusreport)
        }else{
        ctx.redirect("/deep1/innerweb/workzone/message/?statusreport="+statusreport)   
        }
        })
        .catch((err)=>{
            console.log(err)
        })
},

//依參數id更新資料
async update(ctx,next){
    let {_id}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    var status=ctx.query.status;
    console.log("gotten query:"+statusreport);
    await Message.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newmessage)=>{
        console.log("Saving new_message....:"+newmessage);
    statusreport="更新單筆客戶留言後進入本頁";
    if(status=="0"){    
        ctx.redirect("/deep1/message/?statusreport="+statusreport)
        }else{
        ctx.redirect("/deep1/innerweb/workzone/message/?statusreport="+statusreport)   
        }
        })
        .catch((err)=>{
            console.log(err)
        })
}
}//EOF export