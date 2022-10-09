//載入相對應的model
const User = require('../models/index').user;
const Post = require('../models/index').post;
const Knowlege = require('../models/index').knowlege;
const Project = require('../models/index').project;
module.exports = {
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
                await ctx.render("datamanage1" ,{
                    statusreport,
                    account
                });
                break                
            }
            case "management":{
                await ctx.render("datamanage2" ,{
                    statusreport,
                    account
                });
                break                
            }
            case "tester":{
                await ctx.render("datamanage2" ,{
                    statusreport,
                    account
                });
                break                
            }
            case "staff":{
                await ctx.render("datamanage3" ,{
                    statusreport,
                    account
                });
                break                
            }            
            default:{
                await ctx.redirect("/deep0/branch/customer/?statusreport="+statusreport)
            }
        }
    })
    .catch(err=>{
        console.log("grouping failed !!");
        console.log(err)
    })
},
//到資料管理
/*
async managepage(ctx, next){
    statusreport="由某類資料管理進入本頁";
    await ctx.render("datamanage" ,{
        statusreport
    });
},
*/
//到企業管理
async affaire(ctx,next){
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
        await ctx.render("branch/affaire/affaire",{
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
//到知識管理
profession(req,res){

},
//到知識整合
integrate(req,res){

},

//到企業布告
board(req,res){

},
//到業務專案管理
project(req,res){

},
//到內部通訊
communicate(req,res){

},
//到員工專區
personnel(req,res){

},
//到意見反映
idea(req,res){

},
//到對外首頁
async customer(ctx,next){
    let statusreport="歡迎到Deep服務系統！!";
    var postlist;
    console.log("gotten query:"+statusreport);
    await Post.find({})    
    .then(async posts=>{;
        console.log("1st post:"+posts[0])
        console.log("No. of post:"+posts.length)
        let postchosen=new Array();
        for(let post of posts){
            if(post.a35reader=="guest"||post.a35reader=="all"){
                postchosen.push(post)
            }
        }
        console.log("No. of postchosen:"+postchosen.length);
        postlist=encodeURIComponent(JSON.stringify(postchosen));
        console.log("type of postlist:"+typeof(postlist));
    })
    .catch(err=>{
        console.log("Post.find({}) failed !!");
        console.log(err)
    })
    await Knowlege.find({})
    .then(async knowleges=>{;
        console.log("1st knowlege:"+knowleges[0])
        console.log("No. of knowlege:"+knowleges.length)
        let knowlegelist=encodeURIComponent(JSON.stringify(knowleges));
        console.log("type of knowlegelist:"+typeof(knowlegelist));
        if(statusreport===undefined){
            statusreport="未截到status";
            console.log("未截到status!!");
        }
        await ctx.render("branch/customer/homepage",{
            postlist:postlist,
            knowlegelist:knowlegelist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Knowlege.find({}) failed !!");
        console.log(err)
    })
},
}//EOF export