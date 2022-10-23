//載入相對應的model
const User = require('../models/index').user;
const Post = require('../models/index').post;
const Knowlege = require('../models/index').knowlege;
const Project = require('../models/index').project;
module.exports = {

//到本企業內部網頁-登入員工業務要覽
async daily(ctx,next){
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
    await ctx.render("innerweb/operateentry" ,{
        statusreport
    });
},
//客服業務處理-回應留言
async response(ctx, next){
    statusreport="";
    await ctx.render("innerweb/operate/replypage" ,{
        statusreport
    });
},

//客服業務處理-回應需求
async reception(ctx, next){
    statusreport="";
    await ctx.render("innerweb/operate/responsepage" ,{
        statusreport
    });
},
//客服業務處理-ocosa分析
async ocosa(ctx, next){
    statusreport="";
    await ctx.render("innerweb/operate/ocosapage" ,{
        statusreport
    });
},
//客服業務處理-行動規劃及進度管控
async actionplan(ctx, next){
    statusreport="";
    await ctx.render("innerweb/operate/planpage" ,{
        statusreport
    });
},
//到知識整合
async integrate(ctx, next){
    statusreport="";
    await ctx.render("innerweb/KIentry" ,{
        statusreport
    });
},
//到行政作業
async affaire(ctx, next){
    statusreport="";
    await ctx.render("innerweb/affaireentry" ,{
        statusreport
    });
},
//行政作業-人力資源
async personnel(ctx, next){
    statusreport="";
    await ctx.render("innerweb/affaire/HRpage" ,{
        statusreport
    });
},
//行政作業-財務會計
async finance(ctx, next){
    statusreport="";
    await ctx.render("innerweb/affaire/financepage" ,{
        statusreport
    });
},
//行政作業-資訊通訊
async ICT(ctx, next){
    statusreport="";
    await ctx.render("innerweb/affaire/ICTpage" ,{
        statusreport
    });
},
//到資料庫維管
async datamange(ctx, next){
    statusreport="";
    await ctx.render("innerweb/datamanageentry" ,{
        statusreport
    });
},
//判定登入人群組
async group(ctx,next){
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
//到意見反映
async idea(ctx, next){
    statusreport="";
    await ctx.render("innerweb/team/ideapage" ,{
        statusreport
    });
},
}//EOF export