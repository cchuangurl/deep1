//載入相對應的model
const User = require('../models/index').user;
const Post = require('../models/index').post;
const Knowledge = require('../models/index').knowledge;
const Message = require('../models/index').message;
const Request = require('../models/index').request;
const Project = require('../models/index').project;
const Ocosa = require('../models/index').ocosa;
const Process = require('../models/index').process;
const Staffinfo = require('../models/index').staffinfo;
const Term = require('../models/index').term;
module.exports = {

//到本企業內部網頁-登入員工業務要覽
async daily(ctx,next){
    var {statusreport}=ctx.request.body;
    var {account}=ctx.request.body;
    var {password}=ctx.request.body;
    var postlist;
    var projectlist;
    var staffinfolist;
    var termpost;
    var termproject;
    console.log("gotten query:"+statusreport);
    await Post.find({a35reader:"staff"})    
    .then(async posts=>{;
        console.log("1st post:"+posts[0]);
        console.log("No. of post:"+posts.length);
        console.log("No. of posts:"+posts.length);
        postlist=encodeURIComponent(JSON.stringify(posts));
        console.log("type of postlist:"+typeof(postlist))
    })
    .catch(err=>{
        console.log("Post.find({post}) failed !!");
        console.log(err)
    })
    await Staffinfo.find({})    
    .then(async staffs=>{;
        console.log("1st stafft:"+staffs[0]);
        console.log("No. of staff:"+staffs.length);
        console.log("No. of staffs:"+staffs.length);
        staffinfolist=encodeURIComponent(JSON.stringify(staffs));
        console.log("type of staffinfolist:"+typeof(staffinfolist))
    })
    .catch(err=>{
        console.log("Post.find({staffinfo}) failed !!");
        console.log(err)
    })    
    await Term.find({a15model:"post"})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termpost=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termpost:"+typeof(termpost))
    })
    .catch(err=>{
        console.log("Term.find({postterm}) failed !!");
        console.log(err)
    })
    await Term.find({a15model:"project"})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termproject=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termproject:"+typeof(termproject));
    })
    .catch(err=>{
        console.log("Term.find({projectterm}) failed !!");
        console.log(err)
    })   
    await Project.find({})
    .then(async projects=>{;
        console.log("1st project:"+projects[0])
        console.log("No. of project:"+projects.length)
        projectlist=encodeURIComponent(JSON.stringify(projects));
        console.log("type of projectlist:"+typeof(projectlist));
        if(statusreport===undefined){
            statusreport="未截到status";
            console.log("未截到status!!");
        }
        await ctx.render("innerweb/dailypage",{
            postlist,
            projectlist,
            staffinfolist,
            termpost,
            termproject,
            statusreport
        })
    })
    .catch(err=>{
        console.log("Post.find({}) or Project.find({}) failed !!");
        console.log(err)
    }) 
},
//由本企業內部網頁回到員工業務要覽
async gobackdaily(ctx,next){
    var statusreport=ctx.query.statusreport;
    var postlist;
    console.log("gotten query:"+statusreport);
    await Post.find({})    
    .then(async posts=>{;
        console.log("1st post:"+posts[0]);
        console.log("No. of post:"+posts.length);
        let postchosen=new Array();
        for(let post of posts){
            if(post.a35reader=="staff"||post.a35reader=="all"){
                postchosen.push(post)
            }
        }
        console.log("No. of postchosen:"+postchosen.length);
        postlist=encodeURIComponent(JSON.stringify(postchosen));
        console.log("type of postlist:"+typeof(postlist))
    })
    .catch(err=>{
        console.log("Post.find({}) failed !!");
        console.log(err)
    })
    await Project.find({})
    .then(async projects=>{;
        console.log("1st project:"+projects[0])
        console.log("No. of project:"+projects.length)
        let projectlist=encodeURIComponent(JSON.stringify(projects));
        console.log("type of projectlist:"+typeof(projectlist));
        if(statusreport===undefined){
            statusreport="未截到status";
            console.log("未截到status!!");
        }
        await ctx.render("innerweb/dailypage",{
            postlist:postlist,
            projectlist:projectlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Post.find({}) or Project.find({}) failed !!");
        console.log(err)
    }) 
},
//到客服業務處理
async operate(ctx, next){
    statusreport="";
    await ctx.render("innerweb/operate/operateentry" ,{
        statusreport
    });
},
//客服業務處理-回應留言
async reply(ctx, next){
    var statusreport="由客服業務處理選項進入本頁";
    await Message.find({}).then(async messages=>{
        //console.log("found messages:"+messages);
        console.log("type of messages:"+typeof(messages));
        console.log("type of 1st message:"+typeof(messages[0]));
        console.log("1st message:"+messages[0])
        console.log("No. of message:"+messages.length)
        let messagelist=encodeURIComponent(JSON.stringify(messages));
        console.log("type of messages:"+typeof(messagelist));
    await ctx.render("innerweb/operate/replypage" ,{
        messagelist,        
        statusreport
    })
    })
    .catch(err=>{
        console.log("Message.find({}) failed !!");
        console.log(err)
    })   
},
//客服業務處理-回應需求
async reception(ctx, next){
    var statusreport="由客服業務處理選項進入本頁";
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
        await ctx.render("innerweb/operate/responsepage",{
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
//客服業務處理-客戶需求轉為專案
async project(ctx, next){
    statusreport="由客服業務處理選項進入本頁";
    await Project.find({}).then(async projects=>{
        //console.log("found projects:"+projects);
        console.log("type of projects:"+typeof(projects));
        console.log("type of 1st project:"+typeof(projects[0]));
        console.log("1st project:"+projects[0])
        console.log("No. of project:"+projects.length)
        let projectlist=encodeURIComponent(JSON.stringify(projects));
        console.log("type of projects:"+typeof(projectlist));
    await ctx.render("innerweb/operate/projectpage" ,{
        projectlist,        
        statusreport
    })
    })
    .catch(err=>{
        console.log("Project.find({}) failed !!");
        console.log(err)
    })  
},
//客服業務處理-ocosa分析
async ocosa(ctx, next){
    statusreport="由客服業務處理選項進入本頁";
    await Ocosa.find({}).then(async ocosas=>{
        //console.log("found ocosas:"+ocosas);
        console.log("type of ocosas:"+typeof(ocosas));
        console.log("type of 1st ocosa:"+typeof(ocosas[0]));
        console.log("1st ocosa:"+ocosas[0])
        console.log("No. of ocosa:"+ocosas.length)
        let ocosalist=encodeURIComponent(JSON.stringify(ocosas));
        console.log("type of ocosas:"+typeof(ocosalist));
    await ctx.render("innerweb/operate/ocosapage" ,{
        ocosalist,        
        statusreport
    })
    })
    .catch(err=>{
        console.log("Ocosa.find({}) failed !!");
        console.log(err)
    })
},
//客服業務處理-行動規劃及進度管控
async actionplan(ctx, next){
    statusreport="由客服業務處理選項進入本頁";
    await Process.find({}).then(async processs=>{
        //console.log("found processs:"+processs);
        console.log("type of processs:"+typeof(processs));
        console.log("type of 1st process:"+typeof(processs[0]));
        console.log("1st process:"+processs[0])
        console.log("No. of process:"+processs.length)
        let processlist=encodeURIComponent(JSON.stringify(processs));
        console.log("type of processs:"+typeof(processlist));
    await ctx.render("innerweb/operate/planpage" ,{
        processlist,        
        statusreport
    })
    })
    .catch(err=>{
        console.log("Process.find({}) failed !!");
        console.log(err)
    })
},
//到知識管理
async KM(ctx, next){
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
        await ctx.render("innerweb/KI/KMpage",{
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
//到知識整合-依企管分類
async KIbycate(ctx, next){
    let statusreport="知識整合-依企管分類！!";
    console.log("going in method KIbycate!!")
    var termcategory;
    await Term.find({a20field:"a30category",})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termcategory=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termcategory"+typeof(termcategory));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({a30category) failed !!");
        console.log(err)
    }) 
    await ctx.render("innerweb/KI/KIbycate" ,{
        termcategory,
        statusreport
    });
},
//到知識整合-依課程分類
async KIbycourse(ctx, next){
    let statusreport="知識整合-依課程分類！!";
    console.log("going in method KIbycourse!!")
    var termcourse;
    await Term.find({a20field:"a33course",})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termcourse=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termcategory"+typeof(termcategory));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({a33course) failed !!");
        console.log(err)
    }) 
    await ctx.render("innerweb/KI/KIbycourse" ,{
        termcourse,
        statusreport
    });
},
//到知識整合-依專業領域分類
async KIbydomain(ctx, next){
    let statusreport="知識整合-依專業領域分類！!";
    console.log("going in method KIbydomain!!")
    var termdomain;
    await Term.find({a20field:"a05domain",})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termdomain=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termcategory"+typeof(termcategory));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({a05domain) failed !!");
        console.log(err)
    }) 
    await ctx.render("innerweb/KI/KIbydomain" ,{
        termdomain,
        statusreport
    });
},
//到知識分類學
async classify(ctx, next){
    statusreport="";
    await ctx.render("innerweb/KI/classifypage" ,{
        statusreport
    });
},
//到行政作業
async affaire(ctx, next){
    statusreport="由行政作業選項進入本頁";
    console.log("進入controller的affaire");
    await ctx.render("innerweb/affaire/affaireentry" ,{
        statusreport
    });
},
//行政作業-人力資源
async personnel(ctx, next){
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
        await ctx.render("innerweb/affaire/HRpage",{
        //ctx.response.send({
            staffinfolist,
            statusreport
        })
    })
    .catch(err=>{
        console.log("Staffinfo.find({}) failed !!");
        console.log(err)
    })
},
//行政作業-財務會計
async finance(ctx, next){
    statusreport="由行政作業選項進入本頁";
    await ctx.render("innerweb/affaire/financepage" ,{
        statusreport
    });
},
//行政作業-資訊通訊
async ICT(ctx, next){
    statusreport="由行政作業選項進入本頁";
    await ctx.render("innerweb/affaire/ICTpage" ,{
        statusreport
    });
},
//到資料庫維管
async datamanage(ctx, next){    
    statusreport="";
    console.log("進入controller的datamanage");
    //await ctx.render("innerweb/datamanage/datamanageentry" ,{
    await ctx.render("innerweb/datamanage/datamanagetemp" ,{    
        statusreport
    });
},
//判定登入人群組
async group(ctx,next){
    console.log("進入controller的group");    
    let {statusreport}=ctx.request.body;
    let {account}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    console.log("gotten account:"+account);
    if(statusreport===undefined){
        statusreport="未截到status";
        console.log("未截到status!!");
    }
    /* 若資料庫需要先建立一些資料，則先用此段程式替代下段程式
    await ctx.render("datamanage" ,{
        statusreport,
        account
    })
    */  
    await User.findOne({a10account:account})
    .then(async user=>{
        console.log("gotten user:"+account);
        switch(user.a45group){
            case "admin":{
                await ctx.render("innerweb/datamanage/datamanage0" ,{
                    statusreport,
                    group:user.a45group
                });
                break                
            }
            case "management":{
                await ctx.render("innerweb/datamanage/datamanage1" ,{
                    statusreport,
                    group:user.a45group
                });
                break                
            }
            case "tester":{
                await ctx.render("innerweb/datamanage/datamanage2" ,{
                    statusreport,
                    group:user.a45group
                });
                break                
            }
            case "staff":{
                await ctx.render("innerweb/datamanage/datamanage3" ,{
                    statusreport,
                    group:user.a45group
                });
                break                
            }            
            default:{
                await ctx.redirect("/deep1/outerweb/?statusreport="+statusreport)
            }
        }
    })
    .catch(err=>{
        console.log("grouping failed !!");
        console.log(err)
    })
},

//到各種model管理(0)
async managepage0(ctx, next){
	statusreport="由某類資料管理進入本頁";
    await ctx.render("innerweb/datamanage/datamanage0" ,{
        statusreport
        
    })
},
//到各種model管理(一)
async managepage1(ctx, next){
	statusreport="由某類資料管理進入本頁";
    await ctx.render("innerweb/datamanage/datamanage1" ,{
        statusreport
    })
},
//到各種model管理(二)
async managepage2(ctx, next){
	statusreport="由某類資料管理進入本頁";
    await ctx.render("innerweb/datamanage/datamanage2" ,{
        statusreport
    })
},
//到各種model管理(三)
async managepage3(ctx, next){
	statusreport="由某類資料管理進入本頁";
    await ctx.render("innerweb/datamanage/datamanage3" ,{
        statusreport
    })
},
//業績看板
async outcome(ctx, next){
    statusreport="";
    await ctx.render("innerweb/team/outcomepage" ,{
        statusreport
    });
},
//到內部通訊
async communicate(ctx, next){
    statusreport="";
    await ctx.render("innerweb/team/communicatepage" ,{
        statusreport
    });
},
//到回映意見反映
async ideadeal(ctx, next){
    statusreport="";
    await ctx.render("innerweb/team/ideadealpage" ,{
        statusreport
    });
},
}//EOF export